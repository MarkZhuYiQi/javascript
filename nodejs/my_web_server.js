/**
 * Created by Administrator on 2016/9/26.
 */
let http=require('http');
var server=http.createServer((req,res)=>{
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end('hello world\n');
});
server.listen(8888);
console.log('Server running on port 8888');