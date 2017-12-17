exports = module.exports = function(agent) {
  var api = {};
  
  api.publish = function(url, options, cb) {
    // options.headers
    // options.body
    
    console.log('PUBLISH:');
    console.log(url);
    //console.log(options);
    
    var conn = agent.connection(url);
    
    var topic = 'host+org.npmjs.registry';
    console.log('  to: ' + topic);
    
    conn.connect(); // move this, build options
    
    conn.publish(topic, options, function(err) {
      //console.log('PUBLISHED!');
      //console.log(err);
    })
    
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@singleton'] = true;
exports['@require'] = [
  './agent'
];
