/**
 * Created by SZL4ZSY on 8/1/2016.
 */

//连缀功能,连续设置元素属性CSS文本等等

window.onload=function(){
    // alert(Base.getId("box").innerHTML);
    // Base.getId("box").css("color","red").css("backgroundColor","black").html("pox").click(function(){
    //     alert("a");
    // });
    // alert(base.getId("box").elements.length);
    $().getId("box").css("color","red").css("background","black");
    $().getTagName("p").css("color","green").css("background","#eee").html("段落").click(function(){
        alert("a")
    });
};
    //Base是一个基础库的核心对象
    //统统返回base对象

/*
//函数式
function $(id){     //封装ID获取
    return document.getElementById(id);
}
*/

//对象式
/*
var Base={
    getId:function(id){
        return document.getElementById(id);
    },
    getName:function (name){
        return document.getElementsByName(name);
    },
    getTagName:function(tag){
        return document.getElementsByTagName(tag);
    }
};
*/
//每次调用的时候都是新建一个对象
var $=function(){
    return new Base();
};

function Base(){
    //创建一个数组保存获取的节点和节点数组
    this.elements=[];
    //获取ID节点
    this.getId=function(id){
        this.elements.push(document.getElementById(id));
        return this;
    };
    //获取元素节点
    this.getTagName=function(tag){
        // this.elements.push(document.getElementsByTagName(tag));  //这样不行，只进去第一个
        var tags=document.getElementsByTagName(tag);
        for(var i=0;i<tags.length;i++){
            this.elements.push(tags[i]);
        }
        return this;
    };
}
Base.prototype.css=function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style[attr]=value;    //用数组方式
    }
    return this;
};
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].innerHTML=str;    //用数组方式
    }
    return this;
};
Base.prototype.click=function(func){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=func;    //用数组方式
    }
    return this;
};