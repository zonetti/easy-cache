var EasyCache = function() {

  var cache = {};

  return {

    now: function() {
      return new Date().getTime();
    },

    set:  function(key, value, duration) {
      var self = this
        , oldRecord = cache[key]
        , newRecord = {value: value};

      if (oldRecord && oldRecord.timeout)
        clearTimeout(oldRecord.timeout);

      if (!isNaN(duration)) {
        newRecord.expire = duration + self.now();
        newRecord.timeout = setTimeout(function() {
          self.unset(key);
        }, duration);
      }

      cache[key] = newRecord;
    },

    get: function(key) {
      var self = this
        , record = cache[key];

      if (record != undefined) {
        if (record.expire && record.expire <= self.now()) {
          self.unset(key);
          throw new Error('Key expired: ' + key);
        } else {
          return record.value;
        }
      }

      throw new Error('Invalid key: ' + key);
    },

    exists: function(key) {
      return cache[key]
        && (cache[key].expire && cache[key].expire <= this.now() || !cache[key].expire);
    },

    unset: function(key) {
      delete(cache[key]);
    },

    clear: function() {
      return cache = {};
    }

  };

}

module.exports = new EasyCache();