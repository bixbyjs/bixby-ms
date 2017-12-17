exports = module.exports = function(IoC, logger) {
  var Agent = require('../lib/agent');
  
  
  var agent = new Agent();
  
  return Promise.resolve(agent)
    .then(function(agent) {
      var protoPlugIns = IoC.components('http://i.bixbyjs.org/ms/protocol');
    
      return Promise.all(protoPlugIns.map(function(plugin) { return plugin.create(); } ))
        .then(function(plugins) {
          plugins.forEach(function(plugin, i) {
            logger.info('Loaded messaging protocol: ' + protoPlugIns[i].a['@name']);
            agent.use(plugin);
          });
        })
        .then(function() {
          return agent;
        });
    })
    .then(function(agent) {
      return agent;
    });
}

exports['@implements'] = 'http://i.bixbyjs.org/ms/Agent';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
