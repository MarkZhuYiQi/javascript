/**
 * Created by SZL4ZSY on 7/27/2016.
 */
/*
window.onload=function(){

/!*
    document.onclick=function(){
        alert(this);    //代表document对象
    };
*!/
    // document.onclick=box;   //被box绑定了
};
function box(){
    alert(this);        //代表document
}
box();      //window对象，全局范围调用，this代表window
*/

//证明有一个函数后台传递给了事件
/*
window.onload=function(){
    document.onclick=function(){
        alert(arguments.length);    //1个，有一个隐藏的默认对象参数，就是event对象
        alert(arguments[0]);    //mouseEvent
    }
};
*/

/*
function box(a,b){
    alert(arguments.length);    //获取参数的数量，2个
}
box(4,5);*/

//浏览器鼠标事件返回值相关
/*
window.onload=function(){
    document.onmousedown=function(event){
        alert(getButton(event));
        // alert(event.button);        //W3C,非IE，老IE不支持，新IE右键不支持，做兼容
        // alert(window.event);    //IE chrome支持，ff不支持，Chrome也支持W3C，都支持以W3C为准
        if(getButton(event)==0)alert("left");
        if(getButton(event)==1)alert("center");
        if(getButton(event)==2)alert("right");
    }
};
*/

/*
//跨浏览器鼠标按钮
function getButton(evt){
    var e=evt||window.event;  //获取后台默认对象，老IE不支持,做兼容
    if(evt){
        return e.button;
    }else if(window.event){
        switch(e.button){
            case 1:
                return 0;
            case 4:
                return 1;
            case 2:
                return 2;
        }
    }
}
*/

/*
//离边框的坐标
window.onload=function(){
    document.onclick=function(evt){
        var e=evt||window.event;
        alert(e.clientX+','+e.clientY);  //同时计入滚动条的距离
        alert(e.clientX+document.documentElement.scrollTop+','+e.clientY+document.documentElement.scrollLeft);  //同时计入滚动条的距离
    }
};*/

/*
//离屏幕的坐标
window.onload=function(){
    document.onclick=function(evt){
        var e=evt||window.event;
        alert(e.screenX+','+e.screenY);
    }
};*/


/*
//获取shift，alt，ctrl
window.onload=function(){
    document.onclick=function(evt) {
        alert(getKey(evt));
    }
}
function getKey(evt){
    var e=evt||window.event;        //兼容获取事件对象
    var keys=[];
    if(e.shiftKey)keys.push("shift");
    if(e.ctrlKey)keys.push("ctrl");
    if(e.altKey)keys.push("alt");
    return keys;
}
*/

/*
window.onload=function(){
    document.onkeydown=function(evt){      //keypress非字符键不返回，区分大小写，区别于keydown/keyup
        alert(evt.keyCode);     //返回键码，不区分大小写
    }
};
//分号在不同浏览器不同，IE是186 ff是59
*/

/*
//低版本IE是undefined,不支持charcode;
window.onload=function(){
    document.onkeypress=function(evt){      //keypress非字符键不返回，区分大小写，区别于keydown/keyup
        alert(getCharCode(evt));
        alert(String.fromCharCode(getCharCode(evt)));
    }
};
//最终的兼容方案，兼容各种浏览器，返回字符编码
function getCharCode(evt){
    var e=evt||window.event;
    if(typeof e.charCode=="number"){
        return e.charCode;
    }else{
        return e.keyCode;
    }
}*/

/*
window.onload=function(){
    var click=document.getElementById("click");
    click.onclick=function(evt){
        var e=evt||window.event;
        alert(e.target.tagName);
        alert(e.target.innerHTML);
    }
};
*/

/*
//事件冒泡
window.onload=function(){
    document.onclick=function(evt){
        alert("document");
        cancelEvent(evt);
    };
    document.documentElement.onclick=function(evt){
        alert("html");
        cancelEvent(evt);
    };
    document.body.onclick=function(evt){
        alert("body");
        cancelEvent(evt);
    };
    document.getElementById("click").onclick=function(evt){
        alert("div");
        cancelEvent(evt);
    };
    document.getElementsByTagName("input")[0].onclick=function(evt){
        alert("input");
        // e.stopPropagation();    //停止冒泡
        // e.cancelBubble=true;    //IE老版本用的冒泡
        cancelEvent(evt);
    };
};
//兼容方案 停止事件冒泡
function cancelEvent(evt){
    var e=evt||window.event;
    if(typeof e.stopPropagation){
        e.stopPropagation();
    }else if(typeof e.cancelBubble){
        e.stopPropagation();
    }
}
*/
