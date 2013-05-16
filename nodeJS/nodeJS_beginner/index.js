var server = require("./server4");
var router = require("./router");

server.start(router.route);