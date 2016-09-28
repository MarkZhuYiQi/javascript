/**
 * Created by szl4zsy on 9/28/2016.
 */

var http=require("http");
http.createServer(function(request,response){
    response.writeHead(200,{"Content-type":"text/plain"});
    response.write("hello world");
    response.end();
}).listen(8888);