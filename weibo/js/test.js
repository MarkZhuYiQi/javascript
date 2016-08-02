/**
 * Created by SZL4ZSY on 8/1/2016.
 */


//跨浏览器事件绑定,不需要标准化event了因为函数自带各自标准的event
function addEvent(obj,type,func){
    if(typeof obj.addEventListener!="undefined"){
        obj.addEventListener(type,func,false);  //捕获不需要,false
/*
    }else if(typeof obj.attachEvent!="undefined"){
        obj.attachEvent("on"+type,function(){
            func.call(obj,window.event); //对象冒充，解决低版本IE this在函数中一直指向window
            //call里面的第一个参数指向的是this，冒充作用域
            //但是用了call无法标准化event，无法删除事件
            //标准化event可以用传参解决
        });
*/
    }else {
        //创建一个存放事件的哈希表（散列表）
        //这样创建一个event对象，可以在obj的作用域下的所有函数使用
        if (!obj.events)obj.events = {};
        //创建存放事件的数组
        if (!obj.events[type]) {
            obj.events[type] = [];
            //把第一次的事件处理函数储存到第一个位置上
            if (obj["on" + type])obj.events[type][0] = func;
        }else{
            //对相同的注册函数进行屏蔽，不添加进计数器中
            if(addEvent.equal(obj.events[type],func))return false;
        }
        //第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.Id++] = func;
        // alert(obj.events[type].length);
        //执行事件处理函数
        obj["on" + type] = addEvent.exec;
    }
}
/*
 为每个事件分配一个计数器
 js一切都是对象，所以addevent.id语法正确，是一个全局变量
 */
addEvent.Id=1;      //清晰得告诉你这是addevent专用的

//执行事件处理函数
addEvent.exec=function(event){
    var e=event||addEvent.fixEvent(window.event);
    for (var i in this.events[e.type]) {
        // this.events[e.type][i]();    //新版浏览器都没问题，旧IE无法传递this
        this.events[e.type][i].call(this,e);  //call的疑问很大！！！！！

    }
};
//对同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
    for(var i in es){
        if(es[i]==fn)return true;
        return false;
    }
};

//跨浏览器删除事件
function removeEvent(obj,type,func){
    if(typeof obj.removeEventListener!="undefined") {
        obj.removeEventListener(type, func, false);
    /*
     }else if(typeof obj.detachEvent!="undefined"){
        obj.detachEvent("on"+type,func);
     }
     */
    }else{
        for(var i in obj.events[type]){
            if(obj.events[type][i]==func){
                delete obj.events[type][i];
            }
        }
    }
}


window.onload=function(){
    var button=document.getElementById("btn");
/*
    addEvent(button,"click",fn1);
    addEvent(button,"click",fn1);
    addEvent(button,"click",fn2);
    addEvent(button,"click",fn3);
    removeEvent(button,"click",fn1);
*/
    var a = document.getElementById("a");
    addEvent(a,"click",function(e){
        preDef(e);
    });
    addEvent(button,"click",function(e){
        e.stopPropagation();
        alert("button");
    });
    addEvent(document,"click",function(){
        alert("document");
    });
};
function fn(e){
    // alert(this.value);
    alert(e.clientX);
}
function fn1(e){
    alert("11"+this.value+e.clientX);
}
function fn2(e){
    alert("22"+this.value+e.clientX);
}
function fn3(e){
    alert("33"+this.value+e.clientX);
}
