---
layout: post
title: "Creating GeoJSON in client-side JS"
---

Often times I find myself with spatial data in non-spatial formats. Equally as often, those data cannot be permanently changed into a spatial format since they are being continually updated in their original format by someone else. Rendering spatial data requires GeoJSON. GeoJSON is derived from JSON (JavaScript Object Notation) and adds a spatial key/value pair into the mix. The data type has a required format, which can be found at [geojson.org](http://geojson.org) and seen below:

{% highlight javascript %}
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
{% endhighlight %}

It's effectively a javascript object with a standardized format, including **type**, **geometry**, and any number of **properties** (metadata). Much of the time I'm able to convert the data on the client side into a useable geojson format, which can then be mapped. The loop structure is consistent, but how I obtain the data can vary (ajax, jQuery, php, etc.). The use case for this loop is extremely app-specific, so it may not be the thing you need. I just tend to use it a lot for development purposes.

###Basic Loop

{% highlight javascript %}
var geojson = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];
 
for (var k in data) {
  var newFeature = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": parseFloat(data[k].lng), parseFloat(data[k].lon)]
    },
    "properties": {
      "title": data[k].title,
      "description": data[k].desc
    }
  }
  geojson['features'].push(newFeature);
}
{% endhighlight %}

###Tabletop.js

Typically I see data come in .csv formats, which is great for keeping things under control and organized - but difficult for the browser. Lately I've seen most .csv on Google Spreadsheets - which can work to our benefit. 

Introducing [tabletop.js](https://github.com/jsoma/tabletop), a slick javascript library that grabs data from Google Spreadsheets and returns a data object for you to manipulate. Two things need to happen here:

1. Tabletop makes a call to the Spreadsheets API and returns a nice JSON object
2. You loop through that returned data JSON object and create a new GeoJSON object

Things start to get redundant, but for development and a reasonable number of points this works out great.

{% highlight javascript %}
var geojson = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];

Tabletop.init({
  key: 'spreadsheet-key',
  callback: function(data, tabletop) {
    $.each(data, function(key, val) {
      var newFeature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [parseFloat(val.longitude), parseFloat(val.latitude)]
        },
        "properties": {
          "title": val.groupname,
          "description": val.fulldescription,
          "shortdesc": val.shortdescription,
          "twitter": val.twitter,
          "contact": val.contactname,
          "contactEmail": val.contactemail,
          "marker-size": "large",
          "marker-color": "#4682b4",
          "marker-symbol": ""
        }
      }
      geojson['features'].push(newFeature); 
    });
    mapIt(geojson);
  },
  simpleSheet: true
});
{% endhighlight %}