/**
 * Created by Administrator on 2016/7/31.
 */
function createXHR(){
    if(typeof XMLHttpRequest!="undefined"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject!="undefined"){
        var versions=[
            "MSXML2.XMLHttp.6.0",
            "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp"
        ];
        for(var i=0;i<versions.length;i++){
            try{
                return new ActiveXObject(versions[i]);
            }catch(e){
                //跳过
            }
        }
    }else{
        throw new Error("your system does not support XHR object");
    }
}
addEvent(window,"click",function(){
    var xhr=createXHR();
// var xhr=new XMLHttpRequest();
    xhr.open("get","demo.php?rand"+Math.random(),false); //准备发送请求,get方式，同步
    xhr.send(null);                     //发送请求，get不需要数据提交，则为null

    // alert(xhr.status);          //http头状态
    // alert(xhr.statusText);      //http头信息
    if(xhr.status==200){
        alert(xhr.responseText);        //打印返回的数据
    }else{
        alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
    }
//如果没有想服务器端发送，firebug无法送提示，如果有send 方法，则firebug会提示已发送
//通过点击事件，不断发送请求，最后返回最新数据
//IE浏览器第一次向服务器端请求，获取最新数据，第二次默认获得缓存数据，导致数据不是最新
//处理缓存，可以用js随机字符串处理缓存
});









































//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}