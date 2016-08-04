/**
 * Created by SZL4ZSY on 8/4/2016.
 */



/*
addEvent(document,"DOMContentloaded",function(){
    var box=document.getElementById("box");
    alert(box.innerHTML);
});
*/

/*
window.onload=function(){
    var box=document.getElementById("box");
    alert(box.innerHTML);
    alert(document.onDOMContentLoaded);
};
*/

/*
window.DOMContentLoaded=function(){
    var box=document.getElementById("box");
    alert(box.innerHTML);
};
*/

/*
    //IE678模拟DOMContentLoaded,新浏览器不支持！
    document.write("<script id='ie_loaded' src='javascript:void(0)'></script>");
    var ie_loaded=document.getElementById("ie_loaded");
    //判断是否完全加载完毕DOM
    ie_loaded.onreadystatechange =function(){
        if(this.readyState=="complete"){
            var box=document.getElementById("box");
            alert(box.innerHTML);
        }
    };
    //有效，DOM加载完毕后执行节点操作，然后加载图片
    //缺陷，如果有IFRAME标签，那么这种方法就会等待IFRAME里面的内容加载才能执行节点
*/

/*
    //使用doscroll,能解决IFRAME问题 IE678
    var timer=null;
    timer=setInterval(function(){
        try{
            document.documentElement.doScroll("left");
            var box=document.getElementById("box");
            alert("box");
        }catch(e){
            throw new Error(e);
        }
    });
*/

/*
    //DOM加载完后执行script然后再加载图片
    function addDomLoaded(func){
        if(document.addEventListener){  //W3C
            addEvent(document,"DOMContentLoaded",function(){
                func();
                removeEvent(document,"DOMContentLoaded",arguments.callee);
            });
        }else{
            var timer=null;
            timer=setInterval(function(){
                try{
                    document.documentElement.doScroll("left");
                    func();
                }catch(e){
                    throw new Error(e);
                }
            });
        }
    }
    addDomLoaded(function(){
        var box=document.getElementById("box");
        alert("box");
    });
*/



//兼容低版本
window.onload=function(){

};

/*
    //setInterval设置时间间隔，不停的运行不停的运行
    var int=self.setInterval("clock()",1000);
    function clock(){
        var d=new Date();
        var t=d.toLocaleTimeString();
        document.getElementById("clock").value=t;
    }
*/


/*
var isReady=false;                  //运行完毕的判断
var timer=null;                     //计数器为空
function doReady(func){
    if(timer)clearInterval(timer);  //如果时间已经存在就清除事件
    if(isReady)return;              //如果已经加载完毕就返回
    isReady=true;                   //将运行完毕的判断设置为真
    func();                         //执行事件
}
function addDomLoaded(func){
/!*
    //这种方法，目前在主流浏览器判断的都是complete，类似于onload，即图片加载后才加载
    timer=setInterval(function(){
        if(/loaded|complete/.test(document.readyState)){    //loaded是部分加载，只是dom加载完毕，complete是完全加载
            doReady(func);
        }
    },1);
*!/
    //通过判断文档的DOM方法是否都存在来判断
    timer=setInterval(function(){
        if(document&&document.getElementById&&document.getElementsByTagName&&document.body){
            doReady(func);
        }
    },1);
}
*/






function addDomLoaded(func){
    var isReady=false;                  //运行完毕的判断
    var timer=null;                     //计数器为空
    function doReady(func){
        if(timer)clearInterval(timer);  //如果时间已经存在就清除事件
        if(isReady)return;              //如果已经加载完毕就返回
        isReady=true;                   //将运行完毕的判断设置为真
        func();                         //执行事件
    }
    if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.webkit<525)){
        //无论采用哪种，基本用不到
        /*
         //这种方法，目前在主流浏览器判断的都是complete，类似于onload，即图片加载后才加载
         timer=setInterval(function(){
         if(/loaded|complete/.test(document.readyState)){    //loaded是部分加载，只是dom加载完毕，complete是完全加载
         doReady(func);
         }
         },1);
         */
        //通过判断文档的DOM方法是否都存在来判断
        timer=setInterval(function(){
            if(document&&document.getElementById&&document.getElementsByTagName&&document.body){
                doReady(func);
            }
        },1);
    }else if(document.addEventListener){  //W3C
        addEvent(document,"DOMContentLoaded",function(){
            func();
            removeEvent(document,"DOMContentLoaded",arguments.callee);
        });
    }else if(sys.ie&&sys.ie<9){
        var timer=null;
        timer=setInterval(function(){
            try{
                document.documentElement.doScroll("left");
                doReady(func);
            }catch(e){
                // throw new Error(e);
            }
        },1);
    }
}
addDomLoaded(function(){
    var box=document.getElementById("box");
    alert(box.innerHTML);
});