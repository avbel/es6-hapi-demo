/*
port 8000
/item/<number>
*/
"use strict";

let Hapi = require("hapi");
let co = require("co");


//emulate db functions
function getItem(id, cb){
   setTimeout(cb.bind(null,null, {name: "item" + id, id: id}), 200);
}

function getItemDetails(id, cb){
   let details = [
      {details: "1"},
      {details: "2"},
      {details: "3"},
      {details: "4"},
   ];
   setTimeout(cb.bind(null,null,details), 300);
}


//Server code

let server = Hapi.createServer(3000);


//Add  support of using generators as route handlers (TODO move to plugin)
server.ext("onPreHandler", function(request, next){
  let handler = request.route.handler;
  if(handler.coPowered){
    return next();
  }
  request.route.handler = function(req, reply){
    let res = handler.apply(this, arguments);
    if(res && (typeof res.next === "function" || typeof res.then === "function" || typeof res === "function")){
      co(res)(function(err, result){
        if(err){
          return reply(Hapi.error(err.message || err));
        }
        if(result){
          return reply(result);
        }
      });
    }
  };
  request.route.handler.coPowered = true
  next();
});



server.route({
  method: "GET",
  path: "/item/{id}",
  handler: function *(request, reply) { //using generator as handler
    let item = yield getItem.bind(null, request.params.id);
    item.details = yield getItemDetails.bind(null, request.params.id);
    reply(item);
  }
});


server.handler("test", function (route, options) { //named handler with generator
  return function* (request, reply) {
    let item = yield getItem.bind(null, 1);
    reply(options);
  }
});

server.route({
    method: "GET",
    path: "/test",
    handler: { test: { msg: "test" } } //using of named handler
});



server.start();

