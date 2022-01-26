---
layout: post
title: "Earth & Three.js"
extra_js:
  earth-threejs.js
extra_js_cdn:
  https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
---

Just a small experiment with three.js and a globe. Learned a lot from [this blog post](https://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html).

First is just a simplified `SphereGeometry` with a `WireframeGeometry` overlayed as a child of the spherical mesh.

<div id="first" style="width:100%;height:200px;"></div>

Second we use `loadTexture` along with the `MeshBasicMaterial`.

<div id="texture" style="width:100%;height:200px;"></div>

The simplified sphere is fun but doesn't really look like a globe. Adding more vertices to the `SphereGeometry` gives us a more realistic view. Note the increased complexity of the mesh.

<div id="vertices" style="width:100%;height:200px;"></div>

Finally some rotation using `mesh.rotation.y` and an animation function that fires every redraw of the canvas.

<div id="rotation" style="width:100%;height:200px;"></div>
