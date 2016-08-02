/**
 * Created by SZL4ZSY on 8/2/2016.
 */
//跨浏览器获得视窗大小
function getInner(){
    if(typeof window.innerWidth!="undefined"){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else{
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }

    }
}
//跨浏览器获取style
function getStyle(element,attr){
    if(typeof window.getComputedStyle!="undefined"){    //W3C，计算后的CSS属性
        return window.getComputedStyle(element,null)[attr];
    }else if(typeof this.elements[i].currentStyle!="undefined"){    //IE
        return element.currentStyle[attr];
    }
}
//判断class是否存在
function hasClass(element,className){
    return element.className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"));
}
//添加link或者style的css规则
function insertRule(sheet,selectorText,cssText,position){
    if(typeof sheet.insertRule!="undefined"){
        sheet.insertRule(selectorText+"{"+cssText+"}",0);   //W3C
    }else if(typeof sheet.addRule!="undefined"){
        sheet.addRule(selectorText,cssText,position);  //IE9一下
    }
}

//删除link或者style的css规则
function removeRule(sheet){
    if(typeof sheet.deleteRule!="undefined"){
        sheet.deleteRule(0);   //W3C
    }else if(typeof sheet.removeRule!="undefined"){
        sheet.removeRule(0);  //IE9一下
    }
}
//获取event
function getEvent(event){
    return event||window.event;
}
//取消默认行为
function preDef(event){
    var e=getEvent(event);
    if(typeof e.preventDefault!="undefined"){   //W3C
        e.preventDefault();
    }else{  //ie
        e.returnValue=false;
    }
}
