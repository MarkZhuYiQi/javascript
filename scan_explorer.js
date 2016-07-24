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

