/**
 * Created by szl4zsy on 9/27/2016.
 */
var server=require("./server");
var router=require("./router");
server.start(router.route);