/**
 * Created by szl4zsy on 9/28/2016.
 */

var http=require('http');
var queryString=require("querystring");
var postData=queryString.stringify({
    'content':'我偏拿慕课网测试！',
    'cid':'348'
});
var options={
    hostname:'www.imooc.com',
    port:'80',
    path:'/course/document',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'en-US,en;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':80,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'PHPSESSID=4lpmlm0u4nkts84ndr8d6fdmr7; imooc_uuid=e013618a-48a7-4c97-a58b-e555f1e8cf1a; imooc_isnew_ct=1474961136; loginstate=1; apsid=Q1ODg2N2FkM2ZkOWUzOTNhYTgwZTE3ZGU0ZTFhMDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjU1MDk3OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6aHV5aXFpXzAyNkAxNjMuY29tAAAAAAAAAAAAAAAAADNkZmNiNGU4YWZmZTc3NmI2YmUwOTQ2ZmU3YjQxYzBjBx%2FqVwcf6lc%3DYW; last_login_username=zhuyiqi_026%40163.com; jwplayer.volume=100; jwplayer.qualityLabel=è¶æ¸; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1474961136; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1475055713; IMCDNS=0; imooc_isnew=2; cvde=57ea1ef0c2b49-50',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/video/8837',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
};
var req=http.request(options,function(res){
    console.log('status:'+res.statusCode);
    console.log('headers:'+JSON.stringify(res.headers));
    res.on('data',function(chunk){
        console.log();
    })
});