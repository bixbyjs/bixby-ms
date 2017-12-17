exports = module.exports = function(agent) {
  var api = {};
  
  api.publish = function(url, options, cb) {
    // options.headers
    // options.body
    
    options.url = url;
    
    
    // TODO: try catch this...
    var name = agent.getName(options);
    var topic = agent.parseTopic(url, options);
    
    var conn = agent._connections[name];
    if (conn) {
      
    } else {
      conn = agent.createConnection(options);
      agent.addConnection(conn);
      
      conn.once('ready', function() {
        conn.publish(topic, options, function(err) {
          console.log('PUBLISHED!');
          console.log(err);
        });
      });
    }
  }
  
  api.globalAgent = agent;
  
  return api;
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@require'] = [
  './agent'
];
