/**
 * Created by Administrator on 2016/7/26.
 */
//动态加载JS脚本文件
/*
window.onload=function(){
    alert(typeof justForTest);

};
var flag=true;      //如果flag为真就加载JS脚本
if(flag){
    loadScript("justForTest.js")
}

function loadScript(url){
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src=url;
    document.getElementsByTagName("head")[0].appendChild(script);
}*/

/*
//动态加载JS代码
window.onload=function(){

};
var flag=true;
if(flag){
    var script=document.createElement("script");
    script.type="text/javascript";
    // script.appendChild(document.createTextNode("alert('Lee')"));
    script.text="alert('Lee')";  //更兼容的方式
    document.getElementsByTagName("head")[0].appendChild(script);
}*/

/*
//动态加载CSS
window.onload=function(){

};
var flag=true;
if(flag){
    var link=document.createElement("link");
    link.rel="stylesheet";
    link.type="text/css";
    link.href="basic.css";
    document.getElementsByTagName("head")[0].appendChild(link);

}*/


window.onload=function(){

};
var flag=true;
if(flag){
    // var style=document.createElement("style");
    // style.type="text/css";
    // style.appendChild(document.createTextNode("#box{color:black;}"));   //老IE不认
    // document.getElementsByTagName("head")[0].appendChild(style);
    insertRule(document.styleSheets[0],"#box","font-size:80px;",0);
}
function insertRule(sheet,selectorText,cssText,position){
    if(sheet.insertRule){
        alert(0);
        sheet.insertRule(selectorText+"{"+cssText+"}",position);
    }else if(sheet.addRule){
        sheet.addRule(selectorText,cssText,position);
    }else{
        alert(1);
    }
}