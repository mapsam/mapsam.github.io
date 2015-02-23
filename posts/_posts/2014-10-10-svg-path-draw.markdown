---
layout: post
title: "Drawing SVG Paths"
extra_css:
  - svg-path.css
extra_js:
  - svg-path.js
---

SVG is versatile and scalable. Let's animate it.

SVG <span>path</span> animations are derived from the manipulation of two important style attributes, <span>stroke-dasharray</span> & <span>stroke-dashoffset</span>. <span>stroke-dasharray</span> defines the width and spacing of your <span>path</span> dashed line. <span>stroke-dashoffset</span> defines the beginning point of your dashes. To draw your SVG, you effectively set <span>stroke-dasharray</span> to the length of your path element, and animate the <span>stroke-dashoffset</span> to appear as if it is drawing the line. 

There are **two important things** to know here, 1) this solution is based on CSS3 transformations so you have to be ready for cross-browser compatibility issues, and 2) I learned all of this from [Jake Archibald's post](http://jakearchibald.com/2013/animated-line-drawing-svg/), where you can learn a ton more about how this is actually working.

Here's the function I've been using, and you can manipulate it accordingly. I recommend reading the post above, along with Jake's post about [web animations at Smashing Magazine](http://www.smashingmagazine.com/2013/03/04/animating-web-gonna-need-bigger-api/), which explains the different approaches to animating objects on your screen with and without javascript.

## function animatePath()

<div id="animate">Draw It!</div><br>

<svg version="1.1" id="dash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="500px" height="200px" viewBox="0 0 500 200" enable-background="new 0 0 500 200" xml:space="preserve">
<path fill="none" stroke="#000000" stroke-miterlimit="10" d="M32.79,65.305c6.751-8.867,16.037-15.489,26.056-20.423
  c10.893-5.364,22.937-6.148,34.85-4.776c9.994,1.15,13.173,3.649,17.451,12.704c9.333,19.754,17.246,42.04,35.94,54.962
  c9.024,6.238,18.602,8.162,29.452,8.447c10.791,0.284,24.88,0.943,34.864-3.985c16.311-8.051,19.989-34.098,12.51-49.187
  c-6.803-13.723-22.235-27.104-38.541-25.356c-25.58,2.741-24.823,32.441-13.86,48.993c11.39,17.196,30.039,30.425,49.908,35.671
  c17.663,4.664,35.746,2.186,53.708,3.44c13.237,0.924,26.378,3.582,39.069,7.425c11.136,3.371,27.855,7.859,34.571,18.568
  c4.13,6.585,5.06,16.882,3.454,24.378c-1.592,7.432-6.326,9.409-13.662,9.711c-11.246-0.93-22.232-3.216-32.958-6.86
  c-16.988-4.9-33.782-10.39-50.385-16.468c-12.659-4.903-32.388-9.94-34.058-26.305c-3.107-30.464,29.818-50.548,53.634-60.551
  c15.022-6.31,32.261-8.785,46.621-16.539c8.604-4.645,11.515-9.994,4.802-18.116c-7.135-8.633-18.77-11.795-28.913-15.189
  c-7.427-2.485-14.663-6.36-22.015-1.641c-13.83,8.877-5.33,24.367,3.597,33.089c10.806,8.961,22.902,15.658,36.29,20.09
  c17.179,6.252,34.843,10.489,52.992,12.709c16.957,2.233,33.964,2.785,51.021,1.652c11.087-0.266,21.446-3.02,31.078-8.261
  c3.419-2.794,9.365-10.883,6.015-15.96"/>
</svg>
<br>

{% highlight js %}
function animatePath(id, duration) {
  var path = document.querySelector('#'+id+' path');
  var length = path.getTotalLength();
  path.style.transition = path.style.WebkitTransition = 'none';
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset \
                          ' + duration + 'ms ease-in-out';
  path.style.strokeDashoffset = '0';
}

// execute the function
animatePath('dash', 3000);
{% endhighlight %}