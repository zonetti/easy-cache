var should = require('should');

var cache = require('./index');

describe('Test', function() {

  beforeEach(function() {
    cache.clear();
  });

  it('should set a key', function() {
    cache.set('key', 'value');
    cache.get('key').should.equal('value');
    cache.exists('key').should.be.true;
    cache.size().should.equal(1);
  });

  it('invalid key should return null', function() {
    should(cache.get('invalid key')).be.null;
  });

  it('should set a key that expires', function(done) {
    cache.set('timer', 'value', 100);
    setTimeout(function() {
      cache.get('timer').should.equal('value');
      cache.exists('timer').should.be.true;
      cache.size().should.equal(1);
    }, 50);
    setTimeout(function() {
      cache.exists('timer').should.be.false;
      cache.size().should.equal(0);
      should(cache.get('timer')).be.null;
      done();
    }, 150);
  });

  it('should unset a key', function() {
    cache.set('key', 'value');
    cache.get('key').should.equal('value');
    cache.exists('key').should.be.true;
    cache.size().should.equal(1);
    cache.unset('key');
    cache.exists('key').should.be.false;
    cache.size().should.equal(0);
    should(cache.get('key')).be.null;
  });

  it('should clear', function() {
    cache.set('key', 'value');
    cache.set('anotherKey', 'anotherValue');
    cache.size().should.equal(2);
    cache.clear();
    cache.size().should.equal(0);
  });

});
