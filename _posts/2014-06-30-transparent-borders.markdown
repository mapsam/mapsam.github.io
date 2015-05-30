---
layout: post
title: "Transparent Borders"
extra_css: "transparent-borders.css"
---

Here's a teeny, awesome little design touch I've been into lately. It fakes out a border with the CSS <span>box-shadow</span> class but removes the spread and uses <span>rgba()</span>.

<div id="example1">
  <div class="image">
    <div class="caption">
    The Golden Gate Bridge
    </div>
  </div>
</div>

{% highlight css %}
#caption {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.3);
  /* other styles */
}
{% endhighlight %}

I love this touch because it not only gives a nice separation between image and other blocks, but the border will vary depending on the image itself since the reduced opacity takes on color from beneath. Pretty neat stuff, folks!