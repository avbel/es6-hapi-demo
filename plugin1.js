"use strict";

module.exports.register = function*(plugin, options){

  //named handler
  plugin.handler("plugin1Handler", function(route, options){
    return function*(request){
      return {data: [1,2,3]}; //as json
    }
  });

  plugin.method("plugin1.method1", function*(k){
    return [10 + k, 20 + k, 30 + k, 40 + k];
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