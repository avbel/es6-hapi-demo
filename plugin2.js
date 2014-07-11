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
        return "plugin2Ext";
      }
    });
  });

};

module.exports.register.attributes = {
  name: "plugin2",
  version: "1.0.0"
}