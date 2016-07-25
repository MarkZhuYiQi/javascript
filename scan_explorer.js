/**
 * Created by Administrator on 2016/7/24.
 */

/*
//浏览器及版本号
alert("name:"+navigator.appName);
alert("version:"+navigator.appVersion);
alert("proxy:"+navigator.userAgent);
alert("system:"+navigator.platform);
*/

/*
//浏览器嗅探器
alert("name:"+BrowserDetect.browser);
alert("version:"+BrowserDetect.version);
alert("system:"+BrowserDetect.OS);
*/

/*
//列出所有插件名
for(var i=0;i<navigator.plugins.length;i++){
    document.write(navigator.plugins[i].name+"<br />");
}
*/

/*
//检测非IE浏览器插件是否存在
function hasPlugin(name){
    var name=name.toLowerCase();
    for(var i=0;i<navigator.plugins.length;i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
            return true;
        }
    }
    return false;
}
alert(hasPlugin("Flash"));
alert(hasPlugin("java"));
*/

/*
//检测IE中的ActiveX控件
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(e){
        return false;
    }
}
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));//检测flash
*/

/*
//兼容所有浏览器的检查控件
function hasPlugin(name){
    var name=name.toLowerCase();
    for(var i=0;i<navigator.plugins.length;i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(e){
        return false;
    }
}
function hasFlash() {
    var result = hasPlugin("Flash");
    if (!result) {
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}
alert(hasFlash());
*/

/*
//遍历非IE下所有MIME类型信息
for(var i=0;i<navigator.mimeTypes.length;i++){
    if(navigator.mimeTypes[i].enabledPlugin!=null){
        document.write("<dl>");
        document.write("<dd>类型名称:"+navigator.mimeTypes[i].type+"</dd>");
        document.write("<dd>类型引用:"+navigator.mimeTypes[i].enabledPlugin.name+"</dd>");
        document.write("<dd>类型描述:"+navigator.mimeTypes[i].description+"</dd>");
        document.write("<dd>类型后缀:"+navigator.mimeTypes[i].suffixes+"</dd>");
        document.write("<dl>");
    }
}
*/

/*
//根据浏览器区分宽度设置
var width=window.innerWidth;
if(typeof width!="number"){
    if(document.compatMode="CSSICompat"){
        width=document.documentElement.clientWidth;
    }else{
        width=document.body.clientWidth;
    }
}
*/

/*
//能力检测
var width=window.innerWidth;
if(typeof width!="number"){
    width=document.documentElement.clientWidth;
}
alert(width);
*/

/*
//怪癖检测 bug
var box={
    toString:function(){},
    toString2:function(){}
};
for(var o in box){
    alert(o);
}*/

//用户代理检测
document.write(navigator.userAgent);
document.write("<br />");
document.write(navigator.platform);
var client=function(){
    //引擎
    var engine={
        ie:false,       //用于确定是否是IE引擎
        gecko:false,
        webkit:false,
        KHTML:false,
        opera:false,
        ver:0   //引擎版本
    };

    //浏览器
    var browser={
        firefox:false,
        ie:false,
        chrome:false,
        safari:false,
        opera:false,
        ver:0,
        name:""
    };
    //系统
    var system={
        windows:false,
        mac:false,
        unix:false,
        systemName:""
    };


    //核心检测程序
    var ua=navigator.userAgent;
    var p=navigator.platform;
    if(p.indexOf("Win")==0){
        system.windows=true;
        if(/Windows NT (\S+);/.test(ua)) {
            switch (RegExp["$1"]) {
                case "6.1":
                    system.systemName = "Windows 7";
                    break;
            }
        }
    }



    if(window.opera){
        engine.opera=browser.opera=true;      //表示是opera浏览器
        engine.ver=browser.ver=window.opera.version();
        browser.name="Opera";
    }
    else if(/AppleWebKit\/(\S+)/.test(ua)){
        engine.webkit=browser.chrome=true;
        engine.ver=browser.ver=RegExp["$1"];
        if(/Chrome\/(\S+)/.text(ua)){
            browser.name="Chrome";
            browser.ver=RegExp["$1"];
            browser.chrome=true;
        }else{
            browser.name="safari";
            if(/Version\/(\S+)/.test(ua)){
                browser.ver=RegExp["$1"];
            }
            browser.safari=true;
        }
    }
    else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.gecko=browser.firefox=true;
        engine.ver=browser.ver=RegExp['$1'];
        if(/Firefox\/(\S+)/.test(ua)){
            browser.name="Firefox";
            browser.firefox=true;
            browser.ver=RegExp["$1"];
        }

    }
    else if(/MSIE ([^;]+)/.test(ua)){
        engine.ie=browser.ie=true;
        engine.ver=browser.ver=RegExp["$1"];
        browser.name="Internet Explorer";
    }

    //可以同时返回浏览器，系统和引擎
    return {
        engine:engine,  //属性：对象
        browser:browser,
        system:system

    };
}();
// alert(client.engine.ie);
// alert(client.engine.ver);

//window对象支持opera属性
if(client.engine.opera){
    alert("目前使用的opera版本为"+client.engine.ver);
}
if(client.engine.webkit){
    alert("webkit engine version is: "+client.engine.ver);
}
if(client.engine.gecko){
    alert("gecko engine version is: "+client.engine.ver);
}
if(client.engine.ie){
    alert("ie engine version is: "+client.engine.ver);
}
alert(client.browser.name);
alert(client.system.systemName);