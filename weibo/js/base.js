/**
 * Created by SZL4ZSY on 8/1/2016.
 */



//每次调用的时候都是新建一个对象
var $=function(){
    return new Base();
};
//基础类库
function Base(){
    //创建一个数组保存获取的节点和节点数组
    //私有属性，防止共有导致操作影响无关元素
    this.elements=[];
}

//获取ID节点
Base.prototype.getId=function(id){
    this.elements.push(document.getElementById(id));
    return this;
};
//获取CLASS节点
Base.prototype.getClass=function(className,id){
    var node=null;
    if(arguments.length==2){
        node=document.getElementById(id);
    }else{
        node=document;
    }
    var all=node.getElementsByTagName("*");
    for(var i=0;i<all.length;i++){
        if(all[i].className==className){
            this.elements.push(all[i]);
        }
    }
    return this;
};
//筛选出指定节点
Base.prototype.getElement=function(num){
    var element=this.elements[num];
    this.elements=[];
    this.elements[0]=element;
    return this;
}
//获取元素节点
Base.prototype.getTagName=function(tag){
    // this.elements.push(document.getElementsByTagName(tag));  //这样不行，只进去第一个
    var tags=document.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        this.elements.push(tags[i]);
    }
    return this;
};

//设置CSS
Base.prototype.css=function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){
            if(typeof window.getComputedStyle!="undefined"){    //W3C，计算后的CSS属性
                return window.getComputedStyle(this.elements[i],null)[attr];
            }else if(typeof this.elements[i].currentStyle!="undefined"){    //IE
                return this.elements[i].style[attr];
            }

        }
        this.elements[i].style[attr]=value;    //用数组方式
    }
    return this;
};
//设置innerHTML
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==0){        //如果自身参数为0
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML=str;    //用数组方式
    }
    return this;
};
//设置点击事件
Base.prototype.click=function(func){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=func;    //用数组方式
    }
    return this;
};

//添加Class
Base.prototype.addClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))){   //必须双\\
            this.elements[i].className+=" "+className;
        }
    }
    return this;
};
//移除CLASS
Base.prototype.removeClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))){
            this.elements[i].className=this.elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"),'');
        }
    }
    return this;
};
//添加link或style的CSS规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
    var sheet=document.styleSheets[num];        //获得样式表
    if(typeof sheet.insertRule!="undefined"){
        sheet.insertRule(selectorText+"{"+cssText+"}",0);   //W3C
    }else if(typeof sheet.addRule!="undefined"){
        sheet.addRule(selectorText,"cssText",position);  //IE9一下
    }
    return this;
};
//删除link或style的CSS规则
Base.prototype.removeRule=function(num,index){
    var sheet=document.styleSheets[num];        //获得样式表
    if(typeof sheet.deleteRule!="undefined"){
        sheet.deleteRule(index);   //W3C
    }else if(typeof sheet.removeRule!="undefined"){
        sheet.removeRule(index);  //IE9一下
    }
    return this;
};
