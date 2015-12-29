---
layout: post
title: "Writing a node module"
---

<aside>
    <ol>
        <li><a href="#one">Module structure & index.js</a></li>
        <li><a href="#two">Command line interface</a></li>
        <li><a href="#three">Using dependencies</a></li>
        <li><a href="#four">Parameters & callbacks</a></li>
        <li><a href="#five">Publishing</a></li>
    </ol>
</aside>

Writing a node module can be a bit complex. There are a number of subjective decisions that come into play, which can make learning from existing modules difficult. I find it easiest to start from the bare minimum, increasing functionality only when the need arrises.

This post will go through some major components of a node module, including:

1. a light-weight structure for your module and supporting files
2. registering dependencies: using other node modules as helpers
3. how to turn your module into a bash command so you can use it in your terminal
4. how to deploy your module to `npm`'s registry.

Writing a node module requires Node.js on your computer. You can download that at [nodejs.org](https://nodejs.org).

<div id="one"></div>

# 1. Module structure & `index.js`

The structure of a node module was the biggest hurdle for me to get over. There are a lot of files, and things linking back and forth. The major structure I like to use keeps things clean at the root level. For the rest of this post, let's assume we are creating a module called `timebuddy` that has the user input a date, and return in a javascript-friendly format (thanks, buddy). You can download this module [here](https://github.com/mapsam/timebuddy).

```python
timebuddy/       # root directory, named after your module
 - index.js      # main file
 - package.json  # information about your module and dependencies
 - timebuddy     # (optional) a file representing a bash command, used for CLI
 - src/          # (optional) additional custom files for keeping index.js clean
 - test/         # (optional) directory hosting all of your test related code
```

### `package.json`

This file is unique to libraries using Node in some capacity. It doesn't mean a library is a module, though. In order to generate this file dynamically,  enter `npm init` into your terminal and follow the prompts. It can be changed later so don't feel pressure to get it all right at first.

> Every Node module requires a `package.json` but not every `package.json` file is for a unique module

You can use Node in many different ways, and a `package.json` file purely denotes that you are using some Node libraries to make your job easier. A core piece of `package.json` is to list out dependencies.

If you install a Node module or a project using Node, you'll notice a `node_modules/` directory that includes a fair number of libraries depending on the size of your project. This is generated dynamically by taking the list of dependencies from your `package.json` file, the version number, and installing from their repsective repositories. This way you can always keep things up to date as the authors make changes.

### Creating `index.js`

Create a file named `index.js`. This is where it all happens. Just like `index.html` being the priamary file in a webpage, `index.js` is the primary file in a Node module. Let's start by logging a generated time string to the user:

```javascript
function timebuddy() {
    var date = new Date();
    console.log(date);
}

timebuddy();
```

Let's execute this file. You can run it in your terminal by entering `node index.js`. Wham! The time! That's neat. This isn't particualarly "node friendly" though. In order to do that, we want to export timebuddy as a module, not just as a logging function.

```javascript
'use strict';

module.exports = timebuddy;

function timebuddy() {
    var date = new Date();
    return date;
}
```

*Notice that we are returning `date` above, instead of logging it.*

### `module.exports`

What's going on here? What is this `module.exports` business? In order for Node to recognize `time` as a unique library, we want to export it to be used later. You'll notice if you run `node index.js` now, it will not log to the terminal. Hm. How can we get this to work? We need to do a couple of things:

1. Use `timebuddy` in a file, which we can do through a
2. command line interface

<div id="two"></div>

# 2. Command line interface

In order to make this run effectively on the command line, we have to do a couple of things.

1. create a file named `timebuddy` without a file extension. 
2. Add a new section to `package.json` for naming you bash command
3. `npm link` your module's `index.js` file to a bash command on your local machine

### `timebuddy` file

Add `#!/usr/bin/env node` to the top, which tells your computer to execute as a node file, which is why we don't need a `.js` extension. 

```javascript
#!/usr/bin/env node

var timebuddy = require('./'); // imports index.js functionality

var now = timebuddy();         // stores response in a variable
console.log(now);              // logs now to terminal
```

### Add a `bin` command to `package.json`

New bash command called `timebuddy` executes the file created above using node, denoted by the first line.

```JSON
"bin": {
    "timebuddy": "./timebuddy"
},
```

### Link your project to your local bash commands

This makes development easier, and will link all of your executing bash commands to `index.js` so you don't have to continually recreate the files. Run `npm link` in your terminal at the root of the project. This should ouput some information showing where `/usr/local/bin` is pointing to as a source executable.

```bash
$ npm link
/usr/local/bin/timebuddy -> /usr/local/lib/node_modules/timebuddy/timebuddy
/usr/local/lib/node_modules/timebuddy -> /Users/mapsam/github/timebuddy
```

Assuming no errors (typically related to permissions when writing to `/usr/local/bin` you should now be able to run `timebuddy` in your terminal and get the date back!

What's really cool about the above, is that we are using `timebuddy` as a function to do some work for us, and logging it in a separate file. This means we can have different functionalty in our bash command versus the module, which just returns a value.

<div id="three"></div>

# 3. Using dependencies

Dependencies are the foundation of Node modules. You can use other Node modules in your own in order to take functionality from other libraries. This keeps code clean, modular, and prevents developers from rewriting functionality across different modules.

### `require()`

Similar to python where you can `import` different libraries, Node allows you to do this with `require` statements, which keeps your files clean from clutter of other, potentially huge libraries. We used `require` above to import our own work, which means you can require external libraries as well as internal.

<div id="four"></div>

# 4. Parameters & callbacks

### Parameters

To make `timebuddy` more robust, we want to allow the user to add some parameters to return the time in a particular format. First, we'll allow the user to add their own date string since maybe everyone won't need the time *right now* but the time at another point. It will look something like this:

```javascript
'use strict';

module.exports = timebuddy;

function timebuddy(time) {
    var time = (time ? new Date(time) : new Date());
    return time;
}
```

Update the bash version to include a date as a parameter:

```javascript
#!/usr/bin/env node

var timebuddy = require('./');

var christmas = timebuddy('12/25/2015');
console.log(christmas);
```

Now, instead of the time being today, we ONLY return the date of Christmas in 2015. That's not particularly helpful, but you can hopefully see where this is going. Our function in `index.js` is great - it returns an input. But our bash command is reliant on us *knowing* a date before we can run the `timebuddy()` function. How do we allow the user to specify inputs on the command line? 

### CLI parameters

Introduction `process.argv`. This is a built-in part of node that allows you to access different portions of the process during run-time. We can get parameters this way via `argv` which is an array representation of arguments passed. The first value is always `Node`, the second is _______, and the rest are order of parameters given by the user.

If we want `timebuddy "12/25/2015"` to work, we'll have to capture the argument and pass it into our function.

```javascript
#!/usr/bin/env node

var timebuddy = require('./');

var userInput = process.argv[2];
var time = timebuddy(userInput);
console.log(time);
```

Huzzah! Now we are taking user inputs and passing them into Node functions. What a time to be alive.

### Callbacks

Sometimes callbacks are helpful ways of executing information and allowing the user to handle the reponse *only when the module has finished running*. Let's say `timebuddy` becomes particularly robust and takes a while to execute, we wouldn't want to let the user go forward until we have returned something useful. What if we error out? We should also tell the user that. Callbacks allow us to build this, so we can run code syncronously, in Node's asyncronous environment.

Update `index.js` to take one more parameter, a callback.

```
'use strict';

module.exports = timebuddy;

function timebuddy(time, callback) {
    var time = (time ? new Date(time) : new Date());
    callback(null, time);
}
```

Notice how we pass `null` with our callback, it's good practice to pass in errors as the first parameter in Node. This allows the user to constantly check for errors. Right now, if we get to running the callback successfully, we want to pass a `null` error since everything looks great. Let's update our bash command now:

```javascript
#!/usr/bin/env node

var timebuddy = require('./');

var userInput = process.argv[2];
timebuddy(userInput, function(error, response) {
    if (error) throw error;
    console.log(response);
});
```

The above passes an anonymous function through as a callback with two parameters `error` and `response`. We can check if there is an error, and then handle the response.

### Extra stuff

Writing a bunch of different functions and wanting to keep `index.js` short? I find it particularly helpful to write any extended functionality in the `src/` directory. Let's say we create a file called `month.js` in the `src/` directory and want to use it in `index.js`. Go ahead and create it, then import it using `require`.

```javascript
'use strict';

module.exports = timebuddy;

var month = require('./src/month.js');

function timebuddy(time, callback) {
    var time = (time ? new Date(time) : new Date());
    callback(null, time);
}
```

This gives you the ability to break code apart into distinct groups of functionality. It's great for keeping code clean, easy to read, and testable. I highly recommend using `tap` for testing node modules.

<div id="five"></div>

# 5. Publishing

Publishing your node module is the final way to give it a home at [npmjs.org/registry/timebuddy](https://npmjs.org/registry/timebuddy). Setting up your npm account is straightforward - make an account at `npmjs.org` - and add it as your default settings in `npm` on your computer. To publish your module, which will allow other people to `npm install timebuddy` from the registry, you can run `npm publish`. This will check for version changes and add all of the information from your `package.json` as data to the site. Don't forget to add a proper `README.md` file so people know what your module can do.

---

That's it! I get a lot of my inspiration from the way Mapbox structures their modules. Simple, single functionality, and highly testable.