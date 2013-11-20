var should = require('should');

var cache = require('../index');

describe('Tests', function() {

  beforeEach(function() {
    cache.clear();
  });

  it('should set a key', function() {
    cache.set('key', 'value');
    cache.get('key').should.equal('value');
    cache.exists('key').should.be.true;
    cache.getSize().should.equal(1);
  });

  it('should faild with invalid key', function() {
    try  {
      cache.get('invalid key');
    } catch(err) {
      err.message.should.be.equal('Invalid key: invalid key');
    }
  });

  it('should set a key that expires', function(done) {
    cache.set('timer', 'value', 100);
    setTimeout(function() {
      cache.get('timer').should.equal('value');
      cache.exists('timer').should.be.true;
      cache.getSize().should.equal(1);
    }, 50);
    setTimeout(function() {
      cache.exists('timer').should.be.false;
      cache.getSize().should.equal(0);
      try {
        cache.get('timer').should.equal('value');
      } catch(err) {
        err.message.should.be.equal('Invalid key: timer');
        done();
      }
    }, 150);
  });

  it('should unset a key', function() {
    cache.set('key', 'value');
    cache.get('key').should.equal('value');
    cache.exists('key').should.be.true;
    cache.getSize().should.equal(1);
    cache.unset('key');
    cache.exists('key').should.be.false;
    cache.getSize().should.equal(0);
    try {
      cache.get('key');
    } catch(err) {
      err.message.should.be.equal('Invalid key: key');
    }
  });

  it('should clear', function() {
    cache.set('key', 'value');
    cache.set('anotherKey', 'anotherValue');
    cache.getSize().should.equal(2);
    cache.clear();
    cache.getSize().should.equal(0);
  });

});