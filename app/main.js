exports = module.exports = function(agent) {
  var api = {};
  
  api.publish = function(url, options, cb) {
    // options.headers
    // options.body
    
    options.url = url;
    
    
    var ctx = agent.getContext(options);
    
    var conn = agent._connections[ctx.name];
    if (conn) {
      
    } else {
      conn = agent.createConnection(ctx);
      conn.once('ready', function() {
        conn.publish(ctx.topic, options, function(err) {
          console.log('PUBLISHED!');
          console.log(err);
        });
      });
      
      // TODO: do once('error') here, for error handling
      
      conn.connect(ctx.options);
    }
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@singleton'] = true;
exports['@require'] = [
  './agent'
];
