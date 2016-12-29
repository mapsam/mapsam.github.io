---
layout: post
title: "Retrieve site URL via JS"
---

Working with multi-sites can be tricky, especially when you have specific scripts running that require specific information based on the differing site domains. I typically run into this issue when I need to grab, for instance, an instagram feed for a specific restaurant, but another feed for another restaurant and both are using the same javascript file. The following script can be used for any number of reasons, but my favorites are:

* building a static URL for Ajax calls, which tends to work more systematically instead of looking for data with relative paths
* running page-specific javascript by checking the URL first, then running functions
* safeguarding data scripts (i.e. Google Analytics) from running on dev servers, which prevents the need to remove the script


```javascript
pathArray = window.location.href.split( '/' );
protocol = pathArray[0];
host = pathArray[2];
url = protocol + '//' + host;
```

## Bonus Script

There are a ton of ways to get the URL, especially if you are working with more than just JavaScript. In **WordPress**, you can get any number of directory paths or URIs, but you can also push information from your PHP into your javascript functions if you define them in your <span>functions.php</span> file in the <span>enqueue_script</span> process.

```php
<?php
wp_register_script( 'js_file', 'path/to/site.js' );
// get base URL
$base_url = $_SERVER['SERVER_NAME'];
// get request URI for finding the full path for sub pages
$request_uri = $_SERVER['REQUEST_URI'];
// build an array of data to pass to your javascript file
$site_data = array( 'base_url' => $base_url, '$request_uri' => $request_uri );
// localize_script sends PHP found data as an object array usable in your javascript
wp_localize_script( 'js_file', 'siteInfo', $site_data );
// queue your script file for useage
wp_enqueue_script( 'js_file' );
?>
```

Then in your javascript file you can access the data via the name of your object; in this example the object is named <span>siteInfo</span>.

```javsacript
alert(siteInfo.base_url); // alerts www.example.com
```

~Boo~ Yay URLs!
