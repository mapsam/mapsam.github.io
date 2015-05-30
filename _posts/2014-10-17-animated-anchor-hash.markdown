---
layout: post
title: "Animating Page Scroll with Anchor Hash"
extra_js:
  - animated-anchor-hash.js
---

When using in-page anchor links, you typically create the <span>a</span> tag with the <span>id</span> hash of the element you want to scroll to - <span>&lt;a href="#your-element"&gt;</span>. The default functionality is to jump the page to that anchor point instantly, without any animation. This can be somewhat confusing for a user, especially if you want your site to be notably vertical and in a specific order.

In order to ensure the page scrolls to that point, you must set a condition when clicking links on your page. Essentially, when you click any <span>&lt;a&gt;</span> tag, you will run a check on the <span>href</span> attribute for any existence of the <span>#</span> hash. If this condition satisfies as true, you can collect the height and offset information of that element from the current position of the page, and animate your scroll to that specific extent.

**Example** [Click me](#bottom) to get past all of these dumb images that Sam has on twitter.

![twitter 1](https://pbs.twimg.com/media/B0CQfCkCYAAKJy-.jpg:large)
![twitter 2](https://pbs.twimg.com/media/BzXOLfFCIAAGYba.jpg:large)
![twitter 3](https://pbs.twimg.com/media/ByVPqJzCYAAlwDQ.png:large)

<h2 id="bottom">You scrolled down!</h2>

This is a great UI technique, and so simple to execute on your page. Here's the code snippet:

{% highlight javascript %}
$('a').on('click', function(){
  if($(this).attr('href').indexOf('#')>-1) {
    event.preventDefault();
    var id = $(this).attr("href");
    var top = $(id).offset().top;
    $("html, body").animate({
      scrollTop: top
    }, 500); // you can set any time here
  }
});
{% endhighlight %}

Remember, you can manipulate that snippet to effectively do whatever you like when you click a page hash. I tend to offset the page scroll by <span>20px</span> or so to make sure the element I scroll to has a bit of padding above.

{% highlight javascript %}
// ...
$("html, body").animate({
  scrollTop: top-20 // 20 pixel offset
}, 500);
// ...
{% endhighlight %}