"use strict";

module.exports.register = function*(plugin, options){
  plugin.log(["plugin"], "Loading plugin1");

  //named handler
  plugin.handler("plugin1Handler", function(route, options){
    return function*(request){
      return {data: [1,2,3]}; //as json
    }
  });

  plugin.route({
    method: "GET",
    path: "/plugin1",
    handler: function *(request) {
      return "plugin1";
    }
  });
};

module.exports.register.attributes = {
  name: "plugin1",
  version: "1.0.0"
}