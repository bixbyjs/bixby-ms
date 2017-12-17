function Agent() {
  this._protos = [];
}

Agent.prototype.use = function(proto) {
  this._protos.push(proto)
}

Agent.prototype.connection = function(options, cb) {
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  return this.__createConnection(options);
}

Agent.prototype.__createConnection = function(options) {
  var protos = this._protos
    , proto, h, i, len;
  for (i = 0, len = protos.length; i < len; ++i) {
    proto = protos[i];
    h = proto.canHandle(options);
    if (h) {
      var conn = proto.create(h.options || options);
      return conn;
    }
    
    // TODO: error, unsupported protocol
  }
}


module.exports = Agent;
