exports = module.exports = function(IoC, google, logger) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var detectFuncs = IoC.components('http://i.bixbyjs.org/ms/env/detectFunc');
    
      return Promise.all(detectFuncs.map(function(comp) { return comp.create(); } ))
        .then(function(fns) {
          fns.forEach(function(fn) {
            logger.info('Loaded message service environment detector: ' + fn.name);
            factory.use(fn);
          });
        })
        .then(function() {
          factory.use(google);
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      var iface = factory.create();
      return IoC.create(iface);
    });
}

exports['@implements'] = 'http://i.bixbyjs.org/ms/Broker';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './broker/google',
  'http://i.bixbyjs.org/Logger'
];
