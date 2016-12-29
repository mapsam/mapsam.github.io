---
layout: post
title: "Object.assign()"
---

I came across the JavaScript [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method recently, which is used to copy properties from one or more objects into a new or target object. Here's how it's used:

```javascript
var objectA = {one: 1};
var objectB = {two: 2};
var objectC = Object.assign({}, objectA, objectB);
console.log(objectC); // {one: 1, two: 2};
```

The Object.assign() method can take any number of objects, but the first is the returned value. Above I merge everything into a new, empty object, instead of `objectA` or `objectB` to avoid mutating them. The right most object gets priority, merging itself into the object to the left, and so on.

Pretty neat! On the surface, this feels pretty useful. It can come in handy when assigning objects or other default properties. Here's an example of that:

```javascript
var defaults = {
  color: '#ffffff',
  private: true
};

var custom = {
  color: '#000000'
};

var options = Object.assign({}, defaults, custom);
console.log(options); // {color: '#000000', private: true}
```

The `color` value in the `default` object is overridden by the matching value in the `custom` object. All is good if you are using basic values in your objects.

**Watch out for nested objects!** One GOTCHA when using Object.assign() is to avoid making assumptions with nested objects and their values. Here's a nested object carrying over as expected:

```javascript
var defaults = {
  color: '#ffffff',
  position: { left: 0, top: 0 }
};

var custom = {
  color: '#000000',
  position: { left: 10 }
};

var options = Object.assign({}, defaults, custom);
console.log(options); // {color: '#000000', position: {left: 10}}
```

See how the `position` value _only_ includes the `left` parameter? The method takes the **whole** value and overrides the original. Therefore it sees the parameter `position` is present, and replaces the default value with the new value, which happens to be an object with _only_ the `left` parameter, but not `top` value.

```javascript
console.log(options.position.top); // undefined
```

The `top` parameter is completely gone. No good! This is intended behavior, but if using Object.assign() willy nilly can leave you in a world of hurt. I recommend looking at [deep-assign](https://github.com/sindresorhus/deep-assign), a small node library that extends the method to deeply assign values. With the same values as above, here's the final output:

```javascript
console.log(options); // {color: '#000000', position: {left: 10, top: 0}}
```
