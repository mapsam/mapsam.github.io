---
layout: post
title: "WordPress Helpers"
---

The following are scripts and settings that I typically use when working in WordPress. They are here for me to reuse, but please feel free to use yourself!

### Category Permalinks

{% highlight html %}
http://example.com/%category%/%postname%/
{% endhighlight %}

### Featured Image URL

Get it

{% highlight php %}
$img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'single-page-thumbnail');
{% endhighlight %}

Use it **php**

{% highlight php %}
<?php
echo '<div class="post-featured-image" style="background-image:url('.$img[0].');filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='.$img[0].', sizingMethod="scale");-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='.$img[0].', sizingMethod="scale");"></div>'
?>
{% endhighlight %}

Use it **HTML**

{% highlight html %}
<div class="post-featured-image" style="background-image:url(<?php echo $img[0] ?>);filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=<?php echo $img[0] ?>, sizingMethod="scale");-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=<?php echo $img[0] ?>, sizingMethod="scale");"></div>
{% endhighlight %}

waka