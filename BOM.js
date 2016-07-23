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


