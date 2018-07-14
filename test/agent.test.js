/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/agent');


describe('agent', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/ms/Agent');
    expect(factory['@singleton']).to.be.true;
  });
  
  describe('Agent', function() {
    var container = {
      components: function() {},
      create: function() {}
    };
    
    
    describe('without protocols', function() {
      before(function() {
        sinon.stub(container, 'components').returns([]);
      });
      
      after(function() {
        container.components.restore();
      });
      
      
      var agent;
      before(function(done) {
        var promise = factory(container);
        promise.then(function(a) {
          agent = a;
          done();
        });
      });
      
      it('should conform to interface', function() {
        expect(agent.createConnection).to.be.a('function');
      });
    }); // without protocols
    
  });
  
});
