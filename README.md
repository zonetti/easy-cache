# easy-cache

[![Build Status](https://secure.travis-ci.org/zonetti/easy-cache.png)](http://travis-ci.org/zonetti/easy-cache)

An easy way to handle in-memory cache.

## Install

```
npm install easy-cache
```

## Basic usage

```javascript
var cache = require('easy-cache');

cache.set('foo', 'bar');
console.log(cache.getSize()); // output: 1
console.log(cache.get('foo')); // output: bar
cache.unset('foo'); // remove specific record

cache.set('temporary', 'value', 100); // duration in ms
console.log(cache.get('temporary')); // output: value

setTimeout(function() {
  try {
    console.log(cache.get('temporary')); // throws an exception
  } catch(err) {
    console.log(err.message);
  }
}, 150);

if (!cache.exists('temporary')) {
  console.log('Key does not exist');
}

cache.clear(); // remove all records
```

## Credits

Inspired by [node-cache][1].

[1]: https://github.com/ptarjan/node-cache