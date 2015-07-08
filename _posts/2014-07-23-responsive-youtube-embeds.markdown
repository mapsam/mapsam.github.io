---
layout: post
title: "Responsive YouTube Embeds"
extra_css:
  - responsive-video.css
---

The responsive nature of the modern web is making content integration tricky - especially in the age of video. Working with Youtube videos typically involves <span>&lt;iframe&gt;</span> embeds, which don't give you a ton of freedom due to Cross Origin Issues unless you use the Youtube API. The API can be a bit cumbersome for a simple, single video though.

Making these videos respond to your screen size can be an issue largely because your iframe has to be malleable and responsive, but that doesn't mean your content within the <span>&lt;iframe&gt;</span> can be responsive. So, the responsive video turns into a hack. Albiet, a very reliable and useful one!

### CSS

```CSS
.video {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  width:100%;
}
.video iframe {
  position: absolute;
  width:100%;
  height:100%;
}
```

### HTML

```HTML
<div class="video">
<iframe src="..." frameborder="0" allowfullscreen></iframe>
</div>
```

<div class="video">
<iframe src="http://www.youtube.com/embed/BPkMh7bR4PE?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

This trick is possible because of the extra padding set to the <span>.video</span> div, which is at a percentage of its size and will therefore scale if the <span>.video</span> div changes in width. The <span>&lt;iframe&gt;</span> then scales with it and subsequently, the video itself.

This of course is relying on your video to be at the standard 16:9 screen ratio (*notice 9 divided by 16 is .5625*) - hence **56.25%** in the padding. Other videos will need other padding percentages to fit their ratio.