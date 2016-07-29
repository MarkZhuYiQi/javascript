/**
 * Created by SZL4ZSY on 7/29/2016.
 */

/*
    /!**
     * try-catch
     * 1.可以获取错误信息
     * 2.可以避免浏览器控制台报错
     * 3.可以屏蔽错误，继续执行，但是继续执行的语句和错误的语句有关联则继续出错
    **!/
    try{
        window.abc();
    }catch(e){      //e表示接收的错误对象
        // alert(e);
        alert(e.name);  //老IE不支持
        alert(e.message);
    }finally{
        alert("不管是否错误，这句话都会执行");
    }
    //try表示尝试执行里面的代码，如果有错误则执行catch后面的方法，e为报错
*/

/*
    box();
    function box(){
        try{
            var b={};
            window.abc();
        }catch(e){
            alert(e);   //有错误，在继续执行也还是会错，所以返回
            return;
        }finally{
            alert("不管是否产生错误都执行");
            b=null;
        }

        b=null;
        alert("end");
    }
*/

// new Array(9999999999999999999999999);   //rangeError,范围错误
// var box=x;          //引用错误，变量未定义
// a $ b;                  //SyntaxError: 语法错误
// new 10;                 //type error;10不是构造函数

/*
    //可以利用错误信息做出更精确的错误处理
    try{
        new 10;
    }catch(e){
        if(e instanceof TypeError){
            alert("类型错误:"+e);
        }else{
            alert("unknown error:"+e);
        }
    }
*/

/*
    //try-catch的意义
    //1.可以通过修改代码来拍错的，不需要使用try-catch
    //2.流量拿起兼容性问题，可以通过判断浏览器或者判断是否支持某个属性或者方法来判断

    //比如无法修改代码的情况下，可能会发生错误，这个时候用trycatch；
    try{
        alert(innerWidth);  //W3C
    }catch(e){
        alert(document.documentElement.clientWidth);    //IE
    }
    //这样的确可以实现兼容性问题，但逻辑错误,trycatch资源消耗很大
    //因为innerWidth不支持不一定是IE
*/

/*
    try{
        new 10;
    }catch(e){
        if(e instanceof TypeError){
            throw new TypeError("类型错误：实例化new时可能产生了错误");
        }else{
            // alert(e);   //这种行为叫处理错误，浏览器不报错了，屏蔽了错误提示
            throw new Error("unknown error");
        }
    }

    //抛出错误，说明我们自己无法解决，需要把错误爆出来。
*/

/*
//错误事件
    //触发错误就执行，必须放在最开始的位置
    addEvent(window,"error",function(){
        alert("program has something wrong");
    });
    new 10;
*/

//常见错误类型
//     alert(1=="1");  //true,相等比的是值，类型不比较
//     alert(1==="1");  //false,全等需要比较类型
//     alert(1==true);     //true
//     alert(1===true);    //false
    //在类型不相等的情况下，建议使用全等===匹配类型
/*

    var box=0;      //危险的判断
    // if(box){        //0转换为布尔值是false
    if(typeof box=="number"){
        alert(box);
    }
    //PS typeof box 返回的是类型的字符串，右边“number”本身就是字符串，所以用相等就足够，资源节省
    //类型是一样时没必要用全等
*/

/*
// 数据类型错误
    function getQueryString(url) {
        if (typeof url == "string") {
            var pos = url.indexOf("?");
            return pos;
        }else{
            alert("data type error");
        }
    }
    // alert(getQueryString("index.html?id=5"));
    alert(getQueryString(5));
*/

/*
    //
    function sortArray(arr){
        // if(typeof arr.sort=="function"){    //判断sort方法是否存在
        if(arr instanceof Array){    //判断sort方法是否存在
            arr.sort();
            return arr;
        }else{
            return "数据出错";
        }
    }
    // var box=[5,6,1,3,9,10];
    // var box= {
    //     sort:function(){}
    // };
    var box=null;
    alert(sortArray(box));

    //如果我模拟了数组的sort方法的对象，就能绕过判断
    //typeof arr.sort=="function"判断还会导致两个错误，模拟sort对象方法
*/

//错误调试方法
/*
    console.error("错误");
    console.info("信息");
    console.log("日志");
    console.warn("警告");
*/

/*
    var num1=1;
    // console.log("num1="+num1+"类型："+typeof num1);
    var num2=2;
    // console.log("num1="+num2+"类型："+typeof num2);
    var result=num1+num2;
    alert(result);
    //console调试不删除程序也照样执行，alert会阻断后面的代码执行
*/

/*
    var num1=1;
    if(typeof num1!="number") throw new Error("num1 must be number!");
    var num2=2;
    if(typeof num2!="number") throw new Error("num2 must be number!");
    var result = num1+num2;
    aler    t(result);
*/

addEvent(window,"load",function(){
    var box=document.getElementById("box");
    addEvent(box,"click",function(){
        this.innerHTML="what a fucking day!";
    });
});
//设置的断点就是调试的起点，单步进入就是一步一步的执行流程
//断点要及时清除





































//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}