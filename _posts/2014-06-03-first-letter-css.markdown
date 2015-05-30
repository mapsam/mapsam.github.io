---
layout: post
title: "CSS :first-letter"
extra_css: "first-letter.css"
---

I stumbled upon [an article](http://www.vox.com/a/internet-maps) the other day that caught my eye. In particular - the usage of a CSS technique I had never seen before... <span>::first-letter</span>.

Who knew!? I surely did not.

<!-- <blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>How did I not know :first-letter existed? <a href="https://t.co/pUeh8JMIEi">https://t.co/pUeh8JMIEi</a></p>&mdash; Sam Matthews (@vancematthews) <a href="https://twitter.com/vancematthews/statuses/473975217941774336">June 3, 2014</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->


<div class="first">
To the east the outflung arm of the mountains marched to a sudden end, and far lands could be
descried beyond them, wide and vague. To the south the Misty Mountains receded endlessly as far
as sight could reach. Less than a mile away, and a little below them, for they still stood high up on the west side of the dale, there lay a mere. It was long and oval, shaped like a great spear-head thrust deep into the northern glen; but its southern end was beyond the shadows under the sunlit sky. Yet its waters were dark: a deep blue like clear evening sky seen from a lamp-lit room. Its face was still and unruffled. About it lay a smooth sward, shelving down on all sides to its bare unbroken rim.
</div>

The pseudo selector is relatively straightforward, though you can find yourself in a world of hurt if you start trying to select the first paragraph element in a container. It's best to try and pinpoint your first paragraph by a unique classname.

{% highlight css %}
p::first-letter {
  font-size:5em;
  color:steelblue;
  line-height:1;
  font-weight:900;
  margin:0 .1em -.3em 0;
  float:left;
}
{% endhighlight %}

Below is how to select the first paragraph tag in a container and act on the first letter:

{% highlight css %}
p:first-child::first-letter {
  /* stuffs */
}
{% endhighlight %}

You're safe using the double colon <span>::</span> as the selector if you are working in modern browsers. But the [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) say if you need IE8 or earlier support, use the single colon.

