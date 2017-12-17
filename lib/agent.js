function Agent() {
  this._protos = [];
  this._connections = {};
}

Agent.prototype.use = function(proto) {
  this._protos.push(proto)
}

Agent.prototype.getContext = function(options) {
  var protos = this._protos
    , proto, ctx, i, len;
  for (i = 0, len = protos.length; i < len; ++i) {
    proto = protos[i];
    ctx = proto.canHandle(options);
    if (ctx) {
      ctx.module = proto;
      return ctx;
    }
  }
  
  // TODO: error, unsupported protocol
}

Agent.prototype.createConnection = function(context) {
  return context.module.create(context.options);
}


module.exports = Agent;
