/**
 * Created by Administrator on 2016/7/23.
 */
/*
第一个参数是目标url
第二个参数是窗口名称或者是窗口的目标，命名窗口，凡是以这个名称打开的窗口，都在这个窗口中加载URL
    目标：_blank(新窗口),_parent(在本窗口内加载)
第三个目标：特定的字符串，表示各种属性，窗口配置
    .
    .
    .
    location:yes/no;是否在浏览器中显示地址栏
    toolbar:yes/no;是否显示工具栏
*/
// var box=open("http://www.baidu.com","baidu",'width=400,height=400,top=100,left=100');
//open本身会返回子窗口window对象，表示子窗口弹出
// window.open("test.html","baidu",'width=400,height=400,top=100,left=100');


/*
//窗口位置属性
//以下两个属性火狐不认识
alert(window.screenLeft);
alert(window.screenTop);
//火狐支持的窗口位置属性，IE不支持
alert(window.screenX);
alert(window.screenY);
//跨浏览器操作
var leftX=typeof window.screenLeft=='number'?window.screenLeft:window.screenX;
var leftX=typeof window.screenTop=='number'?window.screenTop:window.screenY;
*/


/*
// 窗口页面大小
alert(window.innerHeight);
alert(window.innerWidth);
alert(window.outerHeight);
alert(window.outerWidth);
//谷歌浏览器没有内外的说法，都是一样的,不计入边框宽度
//IE支持的属性
alert(document.documentElement.clientWidth);
alert(document.documentElement.clientHeight);

var width=window.innerWidth;
var height=window.innerHeight;
//跨浏览器兼容函数
if(typeof width!="number"){
    if(document.compatMode=="CSS1Compat"){
        width=document.documentElement.clientWidth;
        height=document.documentElement.clientHeight;
    }else{
        width=document.body.clientWidth;
        height=document.body.clientHeight;
    }
}
*/

/*

//超时调用，2秒后执行函数
setTimeout(function(){
    alert("Lee");
},2000);    //2秒后执行第一个参数的代码块
*/

/*
//清除超时调用
var box=setTimeout(function(){      //返回值是超时调用的ID
    alert("Lee");
},2000);
clearTimeout(box);          //box清除时间调用
*/


/*
//间歇调用
setInterval(function(){
    alert("lee")
},1000);
clearInterval(box);
*/


/*
//定时器
var num=0;
var max=5;
var id=null;
function box(){
    num++;
    document.getElementById("test").innerHTML+=num;
    if(num==max){
        clearInterval(id);
        alert("5s");
    }
}
id=setInterval(box,1000);
*/


/*
//使用超时调用模拟定时器间歇调用
var num=0;
var max=5;
function box(){
    num++;
    document.getElementById("test").innerHTML+=num;
    if(num==max){
        alert("5s");
    }else{
        setTimeout(box,1000);
    }
}
setTimeout(box,1000);
*/

/*
//拆分url
function getArgs(){
    var args=[];
    var qs=location.search.length>0?location.search.substring(1):"";
    var items=qs.split('&');
    var item=null,name=null,value=null;
    for(var i=0;i<items.length;i++){
        item=items[i].split('=');
        name=item[0];
        value=item[1];
        args[name]=value;
    }
    return args;
}
var args=getArgs();
alert(args['id']);
*/

location.assign("index.html");
location.reload();

function a(){
    // location.href="http://www.baidu.com";
    location.replace("http://www.baidu.com");   //不产生历史痕迹的跳转，无法后退
}

alert(history.length);
function back(){
    history.back();
}
function forward(){
    history.forward();
}
function go(num){
    history.go(num);        //指定前进或后退几页
}