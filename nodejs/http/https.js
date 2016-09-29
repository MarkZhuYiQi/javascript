/**
 * Created by szl4zsy on 9/29/2016.
 */
var https=require("https");
var fs=require("fs");
var options={
    key:fs.readFileSync('ssh_key.pem'),
    cert:fs.readFileSync('ssh_cert.pem'),
};
https.createServer(options,function(req,res){
    res.writeHead(200);     //返回状态值
    res.end("Hello imooc"); //
}).listen(8888);