---
layout: post
title: "Geocoding in the terminal with Mapbox"
---

In need of geocoding a number of addresses in a CSV file for some mapping work, I created a module `mbgeocode` that ingests a CSV and outputs a GeoJSON file of all successfull addresses geocoded. This project relies on the [Mapbox geocoding API](https://www.mapbox.com/developers/api/geocoding/), which allows for requests sent via `HTTPS` and returns geocoded information in the form of a [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md).

This is a Node.js module, so you'll have to have Node installed on your computer. You can install `mbgeocode` via the [npm registry](https://www.npmjs.com/package/mbgeocode), which gives you global access to using the `mbgeocode` on your machine.

```bash
npm install -g mbgeocode
```

### Usage

Geocoding requires two inputs:

1. CSV file with appropriately named colums
2. A Mapbox API [token](https://www.mapbox.com/help/define-access-token/)

```bash
mbgeocode file.csv <mapbox_token>
```

Here's an example of it in action.

![terminal example](/images/posts/20151220-mbgeocode.gif)

There are a number of features that I'd like to add over time, including:

* More flexible column name intakes, so users don't have to format CSVs perfectly.
* Similarly, allow a user to specify which column is the address if address information isn't spread across columns
* Test with browserify and use in the browser
* Test running across the Mapbox "batch" geocoder to test for speed differences

You can find the project on [Github](https://github.com/mapsam/mbgeocode).
