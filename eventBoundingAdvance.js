/**
 * Created by SZL4ZSY on 7/27/2016.
 */

/*
//onload事件排序
window.onload=function(){
    var box=document.getElementById("click");
    box.click=function(){
    }
};
function addLoadEvent(func){
    if(typeof window.onload!="function"){
        var oldOnload=window.onload;
        window.onload=function(){
            oldOnload();
            //()相当于window.onload(),但是window.onload()不能执行
            //所有相当于window.onload=function();
            func();
        };
    }else{
        window.onload=func;
    }
}*/

/*
//事件切换器
window.onload=function(){       //window.onload也可以换成window['onload']
    var box=document.getElementById("click");
    box.onclick=function(){     //这是闭包函数了，闭包内部的对象指向了window全局而不是box，可以通过call传递参数
        toBlue.call(this);      //通过call传递box对象
    };
};
*/

/*
//事件切换器2
addLoadEvent(window,"load",function(){
    var box=document.getElementById("click");
    addLoadEvent(box,"click",toBlue);     //this无法传递过去
});
//function在box.onclick执行，this代表了box，如果在全局执行，this代表window
function toRed(){
    this.className="red";
    removeLoadEvent(this,"click");
    addLoadEvent(this,'click',toBlue);
}
function toBlue(){
    this.className="blue";
    removeLoadEvent(this,"click");
    addLoadEvent(this,'click',toRed);
}
//新款顺序执行事件函数
function addLoadEvent(obj,type,func) {
    var saved=null;
    if(typeof obj["on"+type] == "function"){
        saved=obj["on"+type];
    }
    //执行事件
    obj["on"+type]=function(){
        saved?saved():null;
        func.call(this);    //把this传递过去
    }
}
//移出之前的事件，否则会报错，无限递归，卡死浏览器
function removeLoadEvent(obj,type){
    if(obj["on"+type])obj["on"+type]=null;
}
*/

/*
//测试addloadEvent
addLoadEvent(window,"load",function(){
    alert("lee");
});
addLoadEvent(window,"load",function(){
    alert("2lee");
});
addLoadEvent(window,"load",function(){
    alert("3lee");
});
*/


/*
//W3C事件处理函数！！自带两个添加事件和删除事件
//1.覆盖问题
window.addEventListener("load",function(){
    alert("Lee");
},false);
window.addEventListener("load",function(){
    alert("2Lee");
},false);
window.addEventListener("load",function(){
    alert("3Lee");
},false);
*/

/*
//2.重复添加问题
window.addEventListener("load",init,false);
window.addEventListener("load",init,false);
window.addEventListener("load",init,false);
function init(){
    alert("lee");
}
*/

/*
//3.是否可以传递this
window.addEventListener("load",function(){
    var box=document.getElementById("click");
    box.addEventListener("click",toBlue,false);
},false);
function toRed(){
    this.className="red";
    this.removeEventListener("click",toRed,false);
    this.addEventListener("click",toBlue,false);
}
function toBlue(){
    this.className="blue";
    this.removeEventListener("click",toBlue,false);
    this.addEventListener("click",toRed,false);
}
*/

//4添加一个额外的方法，是否会被覆盖，或只执行一次

//综上，W3C完美的解决了这些问题，但是IE9之前的浏览器不支持，而采用了自己的事件

//冒泡和捕获

/*
window.addEventListener("load",function(){
    var box=document.getElementById("click");
    box.addEventListener("click",function(){
        alert("div");
    },true);
    document.addEventListener("click",function(){
        alert("document");
    },true);
},false);
*/

//IE事件绑定机制,事件名称必须带ON！！！！！！！！！必须带！！！！！！！
/*
//1，覆盖问题，没问题
window.attachEvent("onload",function(){
    alert("lee");
});
window.attachEvent("onload",function(){
    alert("2lee");
});
window.attachEvent("onload",function(){
    alert("3lee");
});
*/

/*
//2.相同函数屏蔽问题,新IE解决了
window.attachEvent("onload",init);
window.attachEvent("onload",init);
function init(){
    alert("lee");
}
*/

/*
//3,，是否可以传递this
window.attachEvent("onload",function(){
    var box=document.getElementById("click");
    box.attachEvent("onclick",function(){
        alert(this===box);
        alert(this===window);       //不能传递this
    });
});
*/

/*
//4.添加额外的方法是否会被覆盖或执行一次
window.attachEvent("onload",function(){
    var box=document.getElementById("click");
    box.attachEvent("onclick",function(){
        alert("less");
    });
    box.attachEvent("onclick",function(){
        alert("lee");
    });
});
*/


/*
//IE事件切换器
window.attachEvent("onload",function(){
    var box=document.getElementById("click");
    box.attachEvent("onclick",toBlue);
});
function toRed(){
    var that=window.event.srcElement;
    that.className="red";
    that.detachEvent("onclick",toRed);
    that.attachEvent("onclick",toBlue);
}
function toBlue(){
    var that=window.event.srcElement;
    that.className="blue";
    that.detachEvent("onclick",toBlue);
    that.attachEvent("onclick",toRed);
}
*/

/*
//event对象的获取
window.attachEvent("onload",function(){
    var box=document.getElementById("click");
    box.attachEvent("onclick",function(evt){
        alert(evt);         //获得event对象
        alert(evt.type);
        alert(window.event.srcElement.tagName);
    });
});
*/

//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}

//跨浏览器移出事件
function removeEvent(obj,type,func){
    if(obj.removeEventListener){
        obj.removeEventListener(type,func,false);  //兼容W3C
    }else if(obj.detachEvent){
        obj.detachEvent("on"+type,func);    //兼容IE
    }
}
//跨浏览器获取目标对象
function getTarget(evt){
    if(evt.target){
        return evt.target;
    }else if(window.event.srcElement){
        return window.event.srcElement;
    }
}
addEvent(window,"load",function(){
    var box=document.getElementById("click");
    addEvent(box,"click",toBlue);
});
function toRed(evt){
    var that=getTarget(evt);
    that.className="red";
    removeEvent(that,"click",toRed);
    addEvent(that,"click",toBlue);
}
function toBlue(evt){
    var that=getTarget(evt);
    that.className="blue";
    removeEvent(that,"click",toBlue);
    addEvent(that,"click",toRed);
}