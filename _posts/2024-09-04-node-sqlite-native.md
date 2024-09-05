---
layout: post
title: "Native SQLite in Node.js v22.5.0"
---

Node.js v22.5.0 introduces an experimental [native `sqlite` module](https://nodejs.org/api/sqlite.html) as part of the core language. Until now, sqlite access in Javascript has largely been by way of the [node-sqlite3](https://github.com/TryGhost/node-sqlite3) (originally created and maintained by Mapbox, now by TryGhost) and [better-sqlite3](https://github.com/WiseLibs/better-sqlite3). These libraries both rely on prebuilt native C++ binaries to ship alongside the NPM package, which can introduce some issues across different architectures and Node versions. 

A native interface for SQLite could impact the future of these modules. From what I've gathered across [various](https://github.com/WiseLibs/better-sqlite3/issues/1234) [threads](https://github.com/nodejs/node/issues/53264), the Node.js interface will remain simple and straightforward, whereas the custom modules will expose more options for developers as needed. In particular you can build against custom versions of SQLite if necessary, unlike Node.js which ships with a static version.

## Interface

The new native module requires running with `--experimental-sqlite` from the CLI, as it is under active development and subject to breaking changes.

```
node --experimental-sqlite script.js
```

### `DatabaseSync` class

The interface for the native SQLite module is simple, focusing exclusively on a `DatabaseSync` class. 

```js
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:');
```

With a database initiated, you have two options to execute statements:

1. `db.exec()` - execute a statement without return values. This is helpful for `CREATE` statements and other administrative commands.
1. `db.prepare()` - execute a statement and get the results. This is helpful `INSERT` and `SELECT` statements and allows you to re-use a statement with variable input.

### `db.exec()`

Create a table

```js
db.exec(`
  CREATE TABLE data(
    id INTEGER PRIMARY KEY,
    name TEXT
  ) STRICT
`);
```

Insert values into the database

```js
db.exec(`
  INSERT INTO data (id, name)
  VALUES (1, 'Sam Matthews')
`);
```

### `db.prepare()`

This method is helpful when query results are required and/or when you want to re-use a statement.

Re-useable insert statement

```js
const insert = db.prepare('INSERT INTO data (id, name) VALUES (?, ?)');
insert.run(1, 'Sam Matthews');
insert.run(2, 'Leslie Knope');
```

The `db.prepare()` method returns a StatementSync class. This class cannot be constructed directly and is only returned by this method. There are a few methods on this class:

1. `statement.all()` - executes the statement and returns all results as an array. This is the most common method to use for querying.
1. `statement.get()` - executes the statement and returns the first result as an object.
1. `statement.expandedSQL()` - returns the source SQL of the prepared statement with the parameter placeholders replaced by values

```js
const query = db.prepare('SELECT * FROM data WHERE id > ?');

query.all();
// undefined

query.all(0);
// [
//   [Object: null prototype] { id: 1, name: 'Sam Matthews' },
//   [Object: null prototype] { id: 2, name: 'Leslie Knope' }
// ]

query.all(1);
// [ [Object: null prototype] { id: 2, name: 'Leslie Knope' } ]

query.get(0);
// [Object: null prototype] { id: 1, name: 'Sam Matthews' }

query.expandedSQL(0);
// SELECT * FROM data WHERE id > 0.0
```

### Reading from file

I downloaded the [Washington State libraries dataset](https://data.wa.gov/dataset/Washington-Library-Locations/4aw2-b4zh/about_data) to write some simple adhoc queries from an SQLite file. Here you pass the path to the file when constructing the `DatabaseSync` class.

```js
const db = new DatabaseSync('./wa-libraries.sqlite');
const query = db.prepare(`
  SELECT 
    LDLI_City,
    COUNT(0) as count
  FROM Washington_Library_Locations 
  GROUP BY 1
  HAVING count > 5
  ORDER BY 2 DESC
`);

query.all();
// [
//   { "LDLI_City": "Seattle", "count": 105 },
//   { "LDLI_City": "Tacoma", "count": 26 },
//   { "LDLI_City": "Spokane", "count": 24 },
//   { "LDLI_City": "Bellingham", "count": 13 },
//   { "LDLI_City": "Vancouver", "count": 12 },
//   { "LDLI_City": "Olympia", "count": 12 },
//   { "LDLI_City": "Walla Walla", "count": 10 },
//   { "LDLI_City": "Yakima", "count": 8 },
//   { "LDLI_City": "Lakewood", "count": 7 },
//   { "LDLI_City": "Shelton", "count": 6 },
//   { "LDLI_City": "Richland", "count": 6 },
//   { "LDLI_City": "Bellevue", "count": 6 }
// ]
```
