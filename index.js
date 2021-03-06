module.exports = (function() {

  var cache = {};

  function now() {
    return new Date().getTime();
  }

  return {

    set: function(key, value, duration) {
      var self = this;
      var oldRecord = cache[key];
      var newRecord = {value: value};

      if (typeof oldRecord !== 'undefined' && typeof oldRecord.timeout !== 'undefined') {
        clearTimeout(oldRecord.timeout);
      }

      if (typeof duration === 'number' && duration % 1 === 0) {
        newRecord.expire = duration + now();
        newRecord.timeout = setTimeout(function() {
          self.unset(key);
        }, duration);
      }

      cache[key] = newRecord;
    },

    get: function(key) {
      var record = cache[key];

      if (typeof record !== 'undefined') {
        return record.value;
      }

      return null;
    },

    exists: function(key) {
      return (
        typeof cache[key] !== 'undefined' &&
        (
          (typeof cache[key].expire !== 'undefined' && cache[key].expire > now()) ||
          typeof cache[key].expire === 'undefined'
        )
      );
    },

    unset: function(key) {
      delete cache[key];
    },

    size: function() {
      return Object.keys(cache).length;
    },

    clear: function() {
      cache = {};
    }

  };

})();