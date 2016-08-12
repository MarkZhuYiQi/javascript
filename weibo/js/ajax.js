/**
 * Created by SZL4ZSY on 8/12/2016.
 */
function createXHR(){
    if(typeof XMLHttpRequest!="undefined"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject!="undefined"){
        if(typeof arguments.callee.ActiveXString!="string"){
            var versions=[
                "MSXML2.XMLHttp.6.0",
                "MSXML2.XMLHttp.3.0",
                "MSXML2.XMLHttp"
            ];
            for (var i=0;i<versions.length;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.ActiveString=versions[i];
                    break;
                }catch(e){
                    //jump
                }
            }
        }
        return new ActiveXObject(arguments.callee.ActiveString);
    }else{
        throw new Error("No XHR object available");
    }
}
//封装一个AJAX
function ajax(obj){
    // var xhr=createXHR();
    var xhr=(function(){
        if(typeof XMLHttpRequest!="undefined"){
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject!="undefined"){
            if(typeof arguments.callee.ActiveXString!="string"){
                var versions=[
                    "MSXML2.XMLHttp.6.0",
                    "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"
                ];
                for (var i=0;i<versions.length;i++){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.ActiveString=versions[i];
                        break;
                    }catch(e){
                        //jump
                    }
                }
            }
            return new ActiveXObject(arguments.callee.ActiveString);
        }else{
            throw new Error("No XHR object available");
        }
    })();
    // obj.data=params(obj.data);
    obj.data=(function(data){
        var arr=[];
        for(var i in data){
            arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
        }
        return arr.join("&");
    })(obj.data);
    obj.url=obj.url+"?rand="+Math.random();
    if(obj.method==="get")obj.url+=obj.url.indexOf("?")==-1?"?"+obj.data:"&"+obj.data;
    if(obj.async){
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4)callback();            //加括号就是执行函数，将函数结果拿回来，不加括号就是将函数整个搬过来
        }
    }
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method==="post"){
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(obj.data);
    }else if(obj.method=="get"){
        xhr.send(null);
    }
    if(!obj.async){
        callback();
    }
    function callback(){
        if(xhr.status>=200&&xhr.status<300||xhr.status==300){
            obj.success(xhr.responseText);  //回调传参,调用的是对象里的函数
        }else{
            alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
        }
    }
}
//对象转换成字符串
function params(data){
    var arr=[];
    for(var i in data){
        arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
    }
    return arr.join("&");
}