---
layout: post
title: "Developing with NPM & GitHub branches"
---

Much of my recent work at Mapbox has been around developing and testing node modules lay the groundwork of our vector tile pipeline. All of our node modules that we use across tools, such as [`tilelive`](https://www.npmjs.com/package/tilelive), are published to NPM, which means we release semantically versioned updates.

When developing NPM hosted packages, it can become a pain to constantly push updates to NPM especially since this can have effects on others using your modules. We want to be able to test changes of node modules across our team and pipeline without relying on NPM's publishing service.

A quick way around this is to use GitHub as a means of testing development versions, without publishing to NPM.

Say we have two repositories, **`lemon`** and **`fruit-basket`**. The `fruit-basket` module relies on `lemon` as a dependency in it's `package.json` file:

```
{
  "name": "fruit-basket",
  "description": "A basket of fruits",
  "version" : "0.1.0",
  "repository": {
    "type": "git",
    "url": "git://github.com/mapsam/fruit-basket.git"
  },
  "dependencies": {
    "lemon": "1.0.0"
  }
}
```

If we were developing `lemon@2.0.0` and wanted to make sure `fruit-basket` still worked, you could publish dev versions to NPM like `lemon@2.0.0-dev` if you wanted, but that's an unecessary step.

Since `lemon` is a GitHub repository, we can actually point the dependency version at a GitHub branch! Assuming `lemon@2.0.0` is being developed on the `big-update` branch, we can update our `package.json` to the following:

```
{
  "dependencies": {
    "lemon": "https://github.com/mapsam/lemon/tarball/big-update"
  }
}
```

Pretty neat! Now if you remove your `node_modules` directory in `fruit-basket` and re-install all of your dependencies, you'll notice the version of `lemon` you are pointing at is `2.0.0`. You can check what version of a dependency you are using by running `npm ls lemon`.

### Bonus points

You can point your dependencies at [more than GitHub branches](https://docs.npmjs.com/files/package.json#github-urls)! You can point to *gitsha*'s and *releases* as well. As of NPM `1.1.65` you don't even need the github prefix.

```
{
  "dependencies": {
    "lemon": "git://github.com/mapsam/lemon.git#gitsha",
    "lemon": "git://github.com/mapsam/lemon.git#release",
    "lemon": "mapsam/lemon",
    "lemon": "mapsam/lemon#gitsha",
    "lemon": "mapsam/lemon#release"
  }
}
```

Save your publishing to NPM for real releases!
