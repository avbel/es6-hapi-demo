"use strict";

module.exports.register = function*(plugin, options){
  plugin.dependency("plugin1", function*(plugin){
    plugin.route({
      method: "GET",
      path: "/plugin2",
      handler: {plugin1Handler: {}} //using named handler from plugin1
    });

    plugin.ext("onRequest", function*(request){
      if(request.url.path == "/plugin2Ext"){
        return yield plugin.methods.plugin1.method1.bind(null, 5); //using method of plugin1
      }
    });
  });

};

module.exports.register.attributes = {
  name: "plugin2",
  version: "1.0.0"
}