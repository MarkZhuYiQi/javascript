/**
 * Created by SZL4ZSY on 7/26/2016.
 */
window.onload=function(){
    var box=document.getElementById("box");
    // alert(box.style.width);
    // alert(box.style.height);

/*
    //获取css计算后的大小，如果没有设置，非IE返回默认大小，IE9以下会返回auto
    var style=window.getComputedStyle?window.getComputedStyle(box,null):null||box.currentStyle;
    alert(style.width);
    alert(style.height);
*/

/*
    //使用CSSStyleSheet对象中的CSSRULES属性,必须已经设置过，如果没有设置就为空了
    var sheet=document.styleSheets[0];
    var rule=(sheet.cssRules||sheet.rules)[0];
    alert(rule.style.width);
    alert(rule.style.height);
*/

//以上三种都没有经过计算得出实际尺寸 只是返回到设置的尺寸而已。



//默认为px，如果设置了其他单位，返回出来的结果还会转换为PX像素
//     alert(typeof box.clientHeight);
//     alert(box.clientWidth);
    //增加border边框\margin外边距 不改变宽高
    //增加滚动条，最终值等于原本减去滚动条大小
    //增加内边距，最终值等于原本加上内边距大小



    // alert(box.scrollWidth);
    // alert(box.scrollHeight);
    //ie浏览器在指定高度下获取scroll宽高会理解为获取有效内容（文本）的高度
    //文本溢出没有加滚动条，不同浏览器不相同的结果

    // alert(box.offsetHeight);
    // alert(box.offsetWidth);
    //外边距，滚动条无变化
    //内边距，边框会增加到实际大小中

    // alert(box.clientTop);
    // alert(box.clientLeft);
    //获得边框大小

    // alert(box.offsetLeft);
    // alert(box.offsetTop);
    //获得距离父元素边框的距离，配合position left top使用

    // alert(box.offsetParent.tagName);    //获得父元素,IE认为是HTML，非IE是body，也要设定位
    // alert(box.offsetParent.offsetTop+box.offsetTop);
    // alert(offsetTop(box));      //递归出box距离边框的距离


    //滚动条位置设定
    // alert(box.scrollTop=200);
    // scrollTop(box);
    // alert(box.scrollLeft);



};

//边距距离
/*
function offsetTop(element){
    var top=element.offsetTop;  //第一层
    var parent=element.offsetParent;
    while(parent!==null){
        top+=parent.offsetTop;
        parent=parent.offsetParent;
    }
    return top;
}*/

/*
 //滚动条拉倒顶
 function scrollTop(element){
 if(element.scrollTop!=0){
 element.scrollTop=0;
 }
 }*/
