exports = module.exports = function(agent) {
  var api = {};
  
  api.publish = function(url, options, cb) {
    // options.headers
    // options.body
    
    options.url = url;
    
    
    // TODO: try catch this...
    var name = agent.getName(options);
    
    var conn = agent._connections[name];
    if (conn) {
      
    } else {
      conn = agent.createConnection(options);
      agent.addConnection(conn);
      
      var l = conn.location.parse(url);
      
      conn.once('ready', function() {
        conn.publish(l.topic, options, function(err) {
          if (err) { return cb(err); }
          return cb();
        });
      });
    }
  }
  
  api.createConnection = function(options, readyListener) {
    return agent.createConnection(options, readyListener);
  }
  
  api.parseQueue = function(url) {
    return agent.parseTopic({ url: url });
  }
  
  return api;
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@require'] = [
  './agent'
];
