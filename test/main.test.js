/* global describe, it */

var expect = require('chai').expect;
var factory = require('../app/main');


describe('main', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/ms');
    expect(factory['@singleton']).to.be.true;
  });
  
});
