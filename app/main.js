exports = module.exports = function() {
  var api = {};
  
  api.publish = function(url, options, cb) {
    // options.headers
    // options.body
    
    console.log('PUBLISH:');
    console.log(url);
    //console.log(options);
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/ms';
exports['@singleton'] = true;
exports['@require'] = [
];
