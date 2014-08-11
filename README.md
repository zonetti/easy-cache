# easy-cache [![Build Status](https://secure.travis-ci.org/zonetti/easy-cache.png)](http://travis-ci.org/zonetti/easy-cache)

A simple NodeJS module to handle in-memory key/value cache.

## Install

```
npm install easy-cache
```

## Basic usage

```javascript
var cache = require('easy-cache');

cache.set('foo', 'bar');
console.log(cache.get('foo')); // 'bar'
console.log(cache.size()); // 1
cache.unset('foo');
console.log(cache.get('foo')); // null
console.log(cache.size()); // 0

cache.set('temporary', 'value', 100); // duration in ms
console.log(cache.get('temporary')); // 'value'
console.log(cache.exists('temporary')); // true

setTimeout(function() {
  console.log(cache.get('temporary')); // null
  if (!cache.exists('temporary')) {
    console.log('Key does not exist');
  }
  cache.clear(); // remove all records
}, 150);
```

## Credits

Inspired by [node-cache][1].

[1]: https://github.com/ptarjan/node-cache