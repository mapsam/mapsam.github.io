---
layout: post
title: "D3 Background Hash Patterns"
---

D3 is one of my favorite mapping tools, largely because it makes me still feel like a cartographer in a land where markers and map tiles reign supreme (though you can find beautiful cartography in map tiles as well!). It reminds me of creating static maps in Illustrator and having control over the exact styles visible to the viewer. One important style to work with in any cartographic product is the concept of styling **no data** - or, the absense of data from the map, which can be just as important as the data itself (*or themselves*).

A particular way to showcase *no data* is using a grayscale color or a **pattern** that is completely separate from the styles used in the presense of data. In D3 or, rather, SVG, this can be a troublesome task; designing patterns for elements of varying shapes and sizes.

![Example of No Data hashing](/images/posts/20141120-nodata.png)

## Enter `defs` and `pattern`

SVG allows for some really interesting linking between styles and elements. Since the language is XML-based, we can reference IDs of defined styles to use in our SVG elements.

In D3, we can create these re-usable patterns with the standard `.append()` functions and your `svg` object you'll be working with. *(big shoutout to Lars Katthoff on [Stackoverflow](http://stackoverflow.com/questions/17568858/simple-hash-pattern-svg-in-d3js) for sharing this technique)*

**Create the pattern style**

```javascript
var defs = svg.append('defs'); // svg is the SVG element you are working with
var dashWidth = 5; // change this to define the distance between hashes
var g = defs.append("pattern")
    .attr('id', 'hash')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', dashWidth)
    .attr('height', dashWidth)
    .attr("x", 0).attr("y", 0)
    .append("g").style("fill", "none").style("stroke", "#e5e5e5").style("stroke-width", 0.5);
g.append("path").attr("d", "M0,0 l"+dashWidth+","+dashWidth);
g.append("path").attr("d", "M"+dashWidth+",0 l-"+dashWidth+","+dashWidth);
```

The above essentially appends the following to your SVG element for usage as a fill style referenced by `#hash`.

```html
<defs>
  <pattern id="hash" patternUnits="userSpaceOnUse" width="5" height="5" x="0" y="0"><g style="fill: none; stroke: rgb(229, 229, 229); stroke-width: 0.5px;"><path d="M0,0 l5,5"></path><path d="M5,0 l-5,5"></path></g></pattern>
</defs>
```

**Assign pattern to your `path` elements**

In order to assign the proper pattern, you can set `fill:url(#hash);` to your elements, which should properly mask and take on the style.

```javascript
svg.selectAll(".elem")
  .data(...)  
  .enter().append("path") 
  .attr("class", "elem")
  .attr("style", "fill:url(#hash);")
  .attr("d", path);
```

And voila! You will see some sweet hashing taking effect. One cool thing with SVG patterns that you can see in the example below is that the pattern will run uniformly between elements. If you hover on Tanzania, you'll notice some adminstrative borders each with their own `#hash` style, yet the pattern is fluid between them.

<iframe src="http://broadstreetmaps.giscollective.org/d3hash-example" width="600" height="400" frameborder="0" style="overflow:hidden;"></iframe>

*note: this takes a while to load since it's through an `iframe`, sorry! You can view the [raw example here](http://broadstreetmaps.giscollective.org/d3hash-example)*

To extend it further, you can define multiple patterns based on your data and essentially set them to create a density style map, the difference being the space between your hash lines.

<iframe src="http://broadstreetmaps.giscollective.org/d3hash-example2" width="600" height="400" frameborder="0" style="overflow:hidden;"></iframe>

D3 is fun!