/**
 * Created by SZL4ZSY on 7/26/2016.
 */
//使用行内属性
/*
window.onload=function(){
    alert(document.implementation.hasFeature("CSS","2.0"));
    var box=document.getElementById("box");
    alert(box.style);
    alert(box.style.color);
    alert(box.style.fontSize);
    alert(box.style.background);
    alert(box.style.float);
    alert(box.style.cssFloat);
    alert(box.style.styleFloat);        //FF不支持
};*/

/*
window.onload=function(){
    var box=document.getElementById("box");
    box.style.color="red";
    box.style.fontSize="20px";
    box.style.background="#eee";
    box.style.float="right";
    box.style.cssfloat="right";
    box.style.stylefloat="right";
    typeof box.style.cssFloat!="undefined"?box.style.cssFloat="right":box.style.styleFloat="right";
};*/

/*
//操作CSS样式
window.onload=function(){
    var box=document.getElementById("box");
    box.id="pox";       //交换ID，使用该id的样式
    pox.style.color="white";    //id混乱，都可用
};
//不建议通过变换ID来改变CSS样式，会非常混乱
*/

/*
//操作CSS，
window.onload=function(){
    var box=document.getElementById("box");
    box.className="bbb";
    addClass(box,"aaa");
    removeClass(box,"aaa");
};
//
function hasClass(element,className){
    return (!!element.className.match(new RegExp('(\s+|^)'+className+'(\s+|$)')));       //一定要精确查找
//正则表达式，查找是否有，有就返回
}
function addClass(target,newClass){     //添加class
    if(!hasClass(target,newClass)){
        target.className+=" "+newClass;
    }else{
        target.className=newClass;
    }
}
function removeClass(element,className){        //移除某个class名
    if(hasClass(element,className)){
        element.className=element.className.replace(new RegExp('(\s+|^)'+className+'(\s+|$)')," ");
    }
}*/







//cssrules 操作
// window.onload=function(){
    //检测是否支持sheet样式表
    //alert(document.implementation.hasFeature('StyleSheet','2.0'));
    // var link=document.getElementsByTagName("link")[0];
    // var sheet=link.sheet;   //CSSStyleSheet，表示链接的css样式表对象
    // var sheet=link.sheet||link.styleSheet;      //兼容IE
    // alert(sheet);
    //更加简便的获取sheet
    // var sheet=document.styleSheets[0];  //所有浏览器都兼容的属性
    // alert(sheet.disabled=true);         //禁用样式表
    // alert(sheet.href);              //sheet的路径
    // alert(sheet.media[0]);
    // alert(sheet.title);         //link的title

    // alert(sheet.cssRules);          //一群样式的集合就是规则
    // alert(sheet.cssRules[0]);
    // alert(sheet.cssRules[0].cssText);   //得到第一个规则的CSS
    // alert(sheet.cssRules[0].selectorText);  //叠一个规则的名字
    // sheet.deleteRule(0);        //删除第一个规则
    // sheet.insertRule("body{background-color:red}",0);   //添加一条规则在第一个位置上

    //IE9以前使用的rules
    // alert(sheet.rules);
    // sheet.removeRule(0);
    // sheet.addRule("body","background-color:grey",0);

    //跨浏览器兼容
    // var rules=sheet.cssRules||sheet.rules;
    // deleteRule(sheet,0);
    // insertRule(sheet,"body","background-color:grey",0);
// };
/*
//跨浏览器兼容删除第一条规则
function deleteRule(sheet,position){
    if(sheet.deleteRule){
        sheet.deleteRule(position);
    }else if(sheet.removeRule){
        sheet.removeRule(position);
    }
}
//兼容浏览器添加一条规则
function insertRule(sheet,tag,state,position){
    if(sheet.insertRule){
        sheet.insertRule(tag+"{"+state+"}",position);
    }else if(sheet.addRule){
        sheet.addRule(tag,state,position);
    }
}*/




/*
window.onload=function(){
    var sheet=document.styleSheets[0];
    var rules=sheet.cssRules||sheet.rules;
    var rulesFirst=rules[0];
    // alert(rulesFirst.cssText);
    // alert(rulesFirst.selectorText);
    alert(rulesFirst.style.color="green");  //通过rules对象在CSS表中修改颜色

  //这种方式是写在了标签当中的
  //   var box=document.getElementById("box");
  //   box.style.color="blue";

};
*/
