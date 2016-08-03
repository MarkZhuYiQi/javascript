/**
 * Created by Administrator on 2016/8/3.
 */

/*
(function getState(){       //闭包
    alert();
})();
*/

(function(){
    window.sys={};      //让外部可以访问，保存浏览器信息对象
    var ua=navigator.userAgent.toLowerCase();   //获取浏览器信息字符串
    var s;      //浏览器信息数组，浏览器名称+版本
    alert(ua);

    // alert((/msie ([\d\.]+)/).test(ua));  //返回布尔值，证明是否找到
    if((/msie ([\d\.]+)/).test(ua)){
        s=ua.match(/msie ([\d\.]+)/);      //msie 7.0,7.0
        sys.ie=s[1];        //得到IE10之前的版本号
    }else if(/firefox\/[\d\.]+/.test(ua)){
        s=ua.match(/firefox\/([\d\.]+)/);
        sys.ff=s[1];
    }else if(/chrome\/([\d\.]+)/.test(ua)){
        s=ua.match(/chrome\/([\d\.]+)/);
        sys.chrome=s[1];
    }else if((/rv:([\d\.]+)/).test(ua)){
        s=ua.match(/rv:([\d\.]+)/);
        sys.ie=s[1];
    }




})();

if(sys.ie){
    alert("IE浏览器！版本："+sys.ie);
}else if(sys.ff){
    alert("Firefox! 版本："+sys.ff);
}else if(sys.chrome){
    alert("Chrome! 版本："+sys.chrome);
}