/**
 * Created by Administrator on 2016/7/30.
 */
/*
    alert(typeof document.cookie);  //string
*/

/*
    //向本地磁盘写入cookie
    document.cookie="user=mark";
    alert(document.cookie);
*/

/*
    //编码
    document.cookie="user="+encodeURIComponent("朱逸琦");
    alert(decodeURIComponent(document.cookie));
*/

/*
    //之前留下的cookie内容，写入了磁盘
    alert(decodeURIComponent(document.cookie));
*/

/*
    // document.cookie="key=value; expires=time; path=visit path; domain=domain; secure(https limit)";
    var date=new Date();
    date.setDate(date.getDate()+7);        //失效时间，如果设置到之前就删除了cookie
    // alert(date);
    document.cookie="user="+encodeURIComponent("朱逸琦")+";expires="+date;
    //七天后过期
    // document.cookie="user="+encodeURIComponent("朱逸琦")+";expires="+new Date(0);
    //删除方法
*/

/*
    //设置路径
    var path="/G:/temp/";
    document.cookie="user="+encodeURIComponent("朱逸琦")+"; Path="+path;
    alert(decodeURIComponent(document.cookie));
*/

/*
    //domain,只能设置在同一域名下,二级域名
    var domain="";
*/

    //将cookie封装成函数

/*
 // 设置cookie
     document.cookie="user=mark";
     document.cookie="url=caiwu.com";
     document.cookie="email=red@163.com";
     alert(document.cookie);
 */


/*
//设置cookie函数
function setCookie(name,value,expires,path,domain,secure){
    var cookieName=encodeURIComponent(name)+"="+encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName+="; expires="+expires;
    }
    if(path instanceof String){
        cookieName+="; path="+path;
    }
    if(domain instanceof String){
        cookieName+="; domain="+domain;
    }
    if(secure){
        cookieName+="; secure="+true;
    }
    document.cookie=cookieName;
}
//过期时间
    function setCookieDate(day){
        var date=null;
        if(typeof day =="number" && day>0){
            date=new Date();
            date.setDate(date.getDate()+day);
        }else{
            throw new Error("date illegal!must be a number and over 0");
        }
        return date;
    }
    // setCookie("user","朱逸琦",setCookieDate(1));
    // setCookie("email","red_026@163.com",setCookieDate(1));
    // setCookie("url","www.caiwu.com",setCookieDate(1));
*/

/*
//获取cookie
    function getCookie(name){
        var cookieName=encodeURIComponent(name)+"=";
        var cookieStart=document.cookie.indexOf(cookieName);    //不存在就是-1
        var cookieValue=null;
        if(cookieStart>-1){
            var cookieEnd=document.cookie.indexOf(";",cookieStart);
            if(cookieEnd==-1){
                cookieEnd=document.cookie.length;
            }
            cookieValue=decodeURIComponent(document.cookie.substring(cookieStart,cookieEnd));
        }else{
            alert("cookie does not exist!");
        }
        return cookieValue;
    }
    alert(getCookie("user"));
*/

/*
    //类似cookie的保存到本地方式，只有IE可以使用！~！！！！！！，也是保存在cookie文件夹里的
    //不设置时间就永久保存
    // <div style="behavior:url(#default#userData)" id="box"></div>
    addEvent(window,"load",function(){
        var box=document.getElementById("box");
        box.setAttribute("name","lee");  //名值对
        box.expires=setCookieDate(1);    //设置过期时间
        box.save("user");                //相当于cookie名
        box.load("user");                   //相当于加载cookie
        alert(box.getAttribute("name"));
        box.removeAttribute("name");
        alert(box.getAttribute("name"));
    });
    function setCookieDate(day){
        var date=null;
        if(typeof day =="number" && day>0){
            date=new Date();
            date.setDate(date.getDate()+day);
        }else{
            throw new Error("date illegal!must be a number and over 0");
        }
        // alert(date.toGMTString());
        return date.toGMTString();      //转换成格林威治字符串
    }
*/

    //localStorage
    localStorage.setItem("item","lee");
    localStorage.removeItem("item");
    alert(localStorage.getItem("item"));

    localStorage.bbb="mark";
    localStorage.removeItem("bbb");
    alert(localStorage.bbb);



































//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}