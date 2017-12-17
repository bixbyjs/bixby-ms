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
      
      conn.connect(); // move this, build options
    
      conn.publish(ctx.topic, options, function(err) {
        //console.log('PUBLISHED!');
        //console.log(err);
      })
    }
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@singleton'] = true;
exports['@require'] = [
  './agent'
];
