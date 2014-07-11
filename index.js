"use strict";

let Hapi = require("co-hapi");
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


co(function*(){
  //Server code
  let server = Hapi.createServer(3000);


  server.route({
    method: "GET",
    path: "/item/{id}",
    handler: function *(request) { //using generator as handler
      let item = yield getItem.bind(null, request.params.id);
      item.details = yield getItemDetails.bind(null, request.params.id);
      return item;
    }
  });


  server.handler("test", function (route, options) { //named handler with generator
    return function* (request, reply) {
      let item = yield getItem.bind(null, 1);
      reply(options); // or 'return options'
    }
  });
  server.route({
    method: "GET",
    path: "/test",
    handler: { test: { msg: "test" } } //using of named handler
  });
  yield server.start();
})(function(err){
  if(err){
    console.error(err);
  }
});

