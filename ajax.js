/**
 * Created by Administrator on 2016/7/31.
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
            ]
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


/*
    //同步请求
    addEvent(window,"keyup",function(){
        var xhr=createXHR();
        xhr.open("get","add.php?rand"+Math.random(),false); //准备发送请求,get方式，同步
        xhr.send(null);                     //发送请求，get不需要数据提交，则为null

        // alert(xhr.status);          //http头状态
        // alert(xhr.statusText);      //http头信息
        // if(xhr.status==200){
        if(xhr.status>=200&&xhr.status<300||xhr.status==300){
            alert(xhr.responseText);        //打印返回的数据
        }else{
            alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
        }
    //如果没有想服务器端发送，firebug无法送提示，如果有send 方法，则firebug会提示已发送
    //通过点击事件，不断发送请求，最后返回最新数据
    //IE浏览器第一次向服务器端请求，获取最新数据，第二次默认获得缓存数据，导致数据不是最新
    //处理缓存，可以用js随机字符串处理缓存
    });
*/

/*
    //异步请求
    addEvent(window,"click",function(){
        var xhr=createXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||(xhr.status==300)){
                    alert(xhr.responseText);
                }else{
                    alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
                }
            }
        };
        xhr.open("get","add.php?rand="+Math.random(),true);
        xhr.send(null);
        // xhr.abort();        //取消异步请求,必须放在这里
    });
*/

//头信息，响应头信息->服务器返回的信息，客户端可以获取，但不可以设置
//请求头信息->客户端可以设置，但不可以获取

/*
    //响应头信息
    addEvent(window,"click",function(){
        var xhr=createXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||(xhr.status==300)){
                    // alert(xhr.getAllResponseHeaders()); //获得全部响应头信息
                    alert(xhr.getResponseHeader("Content-type"));   //指定响应头信息
                }else{
                    alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
                }
            }
        };
        xhr.open("get","add.php?rand="+Math.random(),true);
        // xhr.setRequestHeader("myheader","Mark");        //设置请求头信息，一般不用
        xhr.send(null);
        // xhr.abort();        //取消异步请求,必须放在这里
    });
*/

/*
    //GET请求
    //ajax全部使用utf-8，所以要将所有编码统一为UTF-8
    addEvent(window,"click",function(){
        var xhr=createXHR();
        var url="add.php?rand="+Math.random();
        url = params(url,"name","M&ark");
        url = params(url,"age",26);
        alert(url);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||(xhr.status==300)){
                    alert(xhr.responseText);
                }else{
                    alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
                }
            }
        };
        xhr.open("get",url,true);
        xhr.send(null);
        // xhr.abort();        //取消异步请求,必须放在这里
    });
    function params(url,name,value){
        url+=url.indexOf("?")==-1?"?":"&";
        url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
        return url;
    }
*/

/*
    //POST请求
    //POST必须模仿表单提交，更改请求头
    addEvent(window,"click",function(){
        var xhr=createXHR();
        var url="add.php?rand="+Math.random();
        alert(url);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||(xhr.status==300)){
                    alert(xhr.responseText);
                }else{
                    alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
                }
            }
        };
        xhr.open("post",url,true);      //1.改为post
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  //2.添加头信息
        xhr.send("name=Lee&age=26");        //3.添加参数
        // xhr.abort();        //取消异步请求,必须放在这里
    });
*/


/*
    //JSON加载
    addEvent(window,"click",function(){
        var xhr=createXHR();
        var url="ajax.json?rand="+Math.random();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||(xhr.status==300)){
                    var box=JSON.parse(xhr.responseText);   //转换成js数组
                    alert(box[1]["name"]);
                }else{
                    alert("data return failed!status code:"+xhr.status+";status info:"+xhr.statusText);
                }
            }
        };
        xhr.open("get",url,true);
        xhr.send(null);
        // xhr.abort();        //取消异步请求,必须放在这里
    });
*/

//封装一个AJAX
function ajax(obj){
    var xhr=createXHR();
    obj.data=params(obj.data);
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
addEvent(window,"load",function(){
    ajax({
        method:     "get",
        url:        "add.php",
        data:       {
                        "name":"Lee",
                        "age":26
                    },
        async:      true,
        success:    function(text){
                        alert(text);
                    }
    });
});
/*
    //作用域，无法返回
    function a(){
        function b(){
            return 123;
        }
        return 456;
    }
    alert(a());
*/






















//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}