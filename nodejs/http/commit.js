/**
 * Created by szl4zsy on 9/28/2016.
 */


//慕课网客户端提交评论
// var http=require('http');
// var queryString=require("querystring");
// var postData=queryString.stringify({
//     'content':'测试下自己写的，能用不',
//     'mid':'8837'
// });
// var options={
//     hostname:'www.imooc.com',
//     port:'80',
//     path:'/course/docomment',
//     method:'POST',
//     headers:{
//         'Accept':'application/json, text/javascript, */*; q=0.01',
//         'Accept-Encoding':'gzip, deflate',
//         'Accept-Language':'en-US,en;q=0.8',
//         'Connection':'keep-alive',
//         'Content-Length':postData.length,
//         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
//         'Cookie':'PHPSESSID=4lpmlm0u4nkts84ndr8d6fdmr7; imooc_uuid=e013618a-48a7-4c97-a58b-e555f1e8cf1a; imooc_isnew_ct=1474961136; loginstate=1; apsid=Q1ODg2N2FkM2ZkOWUzOTNhYTgwZTE3ZGU0ZTFhMDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjU1MDk3OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6aHV5aXFpXzAyNkAxNjMuY29tAAAAAAAAAAAAAAAAADNkZmNiNGU4YWZmZTc3NmI2YmUwOTQ2ZmU3YjQxYzBjBx%2FqVwcf6lc%3DYW; last_login_username=zhuyiqi_026%40163.com; jwplayer.volume=100; jwplayer.qualityLabel=è¶æ¸; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1474961136; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1475055713; IMCDNS=0; imooc_isnew=2; cvde=57ea1ef0c2b49-50',
//         'Host':'www.imooc.com',
//         'Origin':'http://www.imooc.com',
//         'Referer':'http://www.imooc.com/video/8837',
//         'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
//         'X-Requested-With':'XMLHttpRequest'
//     }
// };
// var req=http.request(options,function(res){
//     console.log('status:'+res.statusCode);
//     console.log('headers:'+JSON.stringify(res.headers));
//     res.on('data',function(chunk){
//         console.log(Buffer.isBuffer(chunk));
//         console.log(typeof chunk);
//     })
//     res.on('end',function(){
//         console.log('评论完毕');
//     });
// });
// req.on('error',function(e){
//     console.log('error:'+e.message);
// });
// req.write(postData);
// req.end();


//smzdm评论
var http=require("http");
var queryString=require("querystring");
var postData=queryString.stringify({
    'callback':'jQuery1110039291138760745525_1475069694502',
    'type':3,
    'pid':6463675,
    'parentid':0,
    'vote_id':0,
    'vote_type':'',
    'vote_group':'',
    'content':'样子看起来还不错',
    '_':1475069694504
});
var options= {
    hostname: 'zhiyou.smzdm.com',
    port: 80,
    path: '/user/comment/ajax_set_comment?' + postData,
    method: 'GET',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Cookie': 'smzdm_user_source=FB6619CEAFAE17DDDF4B7ACA3C3ADEB4; __jsluid=d6b8018e9ad4567f24afbfd8368266f6; web_ab=A1; smzdm_wordpress_360d4e510beef4fe51293184b8908074=qq_1bq6s%7C1476109261%7C3bf3480407fbad6c1bde4b4aa94235e1; smzdm_wordpress_logged_in_360d4e510beef4fe51293184b8908074=qq_1bq6s%7C1476109261%7C0ed80bc3e9284fba2aaf207306475423; user-role-smzdm=subscriber; sess=Y2M0YWJ8MTQ3NjEwOTI2MXw4ODQyMzg2Njc5fDVmMjU4MTRkYjJmMDdhZDQ5YzJjZTlhNjcxZTkzNjMz; user=qq_1bq6s%7C8842386679; smzdm_user_view=39F923A87504D42E0BF6EFB521F7C209; _gat_UA-27058866-1=1; PHPSESSID=hskcadjhu9qi20t9ffbv8rbpd2; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1474724724,1474768259,1474820225,1475069582; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1475069599; _ga=GA1.2.1740799711.1470311014; wt3_eid=%3B999768690672041%7C2146462201700737125%232147506969500118468; wt3_sid=%3B999768690672041',
        'Host': 'zhiyou.smzdm.com',
        'Referer': 'http://www.smzdm.com/p/6463675/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
    }
};
var req=http.request(options,function(res){
    console.log('STATUS:'+res.statusCode);
    console.log('headers:'+JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });
    res.on('end',function(){
        console.log('评论完毕');
    });
});
req.on('error',function(e){
    console.log('problems with request:'+e.message);
});
req.end();
