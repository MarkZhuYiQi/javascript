/**
 * Created by SZL4ZSY on 8/1/2016.
 */



//每次调用的时候都是新建一个对象
var $=function(args){
    return new Base(args);
};
//基础类库
function Base(args){
    //创建一个数组保存获取的节点和节点数组
    //私有属性，防止共有导致操作影响无关元素
    this.elements=[];
    if(typeof args=="string"){

        if(args.indexOf(" ")!=-1){
            //css格式模拟
            var childElements=[];       //存放临时节点对象的数组,防止父节点被覆盖
            var node=[];                //用来存放父节点
            var elements=args.split(" ");   //把节点拆开，分别保存到数组中
            for(var i=0;i<elements.length;i++){
                if(node.length==0)node.push(document);  //如果父节点为空，则赋值为全局
                switch(elements[i].charAt(0)){
                    case "#":
                        //清理临时节点，相当于上一级匹配到的节点，下一级要更精确的从中匹配，
                        // 但是数组中匹配上一级而不匹配下一级的元素依然存在，所以要清空
                        childElements=[];
                        childElements.push(this.getId(elements[i].substring(1)));
                        //保存父节点，因为childElements要清理，所以需要创建node数组
                        node=childElements;
                        break;
                    case ".":
                        childElements=[];   //清理之前匹配到的元素，为下一级精确匹配做准备
                        for(var j=0;j<node.length;j++) {    //上一级匹配到的元素，父节点
                            var temps=this.getClass(elements[i].substring(1), node[j]);    //在父节点中寻找子节点
                            for(var k=0;k<temps.length;k++){    //将结果一个个放到最终结果中
                                childElements.push(temps[k]);
                            }
                        }
                        node=childElements;
                        break;
                    default:
                        childElements=[];   //清理之前匹配到的元素，为下一级精确匹配做准备
                        for(var j=0;j<node.length;j++) {    //上一级匹配到的元素，父节点
                            var temps=this.getTagName(elements[i], node[j]);    //在父节点中寻找子节点
                            for(var k=0;k<temps.length;k++){    //将结果一个个放到最终结果中
                                childElements.push(temps[k]);
                            }
                        }
                        node=childElements;
                }
            }
            this.elements=childElements;
        }else{
            //find模拟css操作
            // alert(args.match(/^#|^\./)); //正则匹配第一个字符判断是class还是ID
            switch(args.charAt(0)){
                case "#":
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case ".":
                    this.elements=this.getClass(args.substring(1));
                    break;
                default:
                    this.elements=this.getTagName(args);
            }
        }
    }else if(typeof args=="object"){
        if(args!=undefined){
            this.elements[0]=args;
        }
    }else if(typeof args=="function"){  //$(function)
        this.ready(args);
    }
}
//addDomLoaded,ready方法
Base.prototype.ready=function(args){
    addDomLoaded(args);
};



//获取ID节点
Base.prototype.getId=function(id){
    return document.getElementById(id);
};
//获取CLASS节点
Base.prototype.getClass=function(className,parentNode){
    var node=null;
    var temps=[];           //新建一个临时数组，存放符合条件的节点
    // if(arguments.length==2){    //参数数量，如果为2，就先去获得ID所在控件
    //     node=document.getElementById(id);
    if(parentNode!=undefined){
        node=parentNode;        //如果有父节点，传入node
    }else{
        node=document;          //如果没有id参数，就把全局作为作用域
    }
    var all=node.getElementsByTagName("*"); //获得所有元素节点
    for(var i=0;i<all.length;i++){
        if(all[i].className==className){
            // this.elements.push(all[i]);     //这里已经写死了
            temps.push(all[i]);     //将符合条件的节点放入临时数组
        }
    }
    return temps;
};
//筛选出指定节点，返回出base，用于连缀
Base.prototype.getElement=function(num){
    var element=this.elements[num];
    this.elements=[];
    this.elements[0]=element;
    return this;
};
//获取某一个节点，并返回该节点的对象
Base.prototype.getElementBack=function(num){
    return this.elements[num];
};
//获取首个节点，并返回这个节点对象
Base.prototype.first=function(){
    return this.elements[0];
};
//获取最后以个节点，并返回这个节点对象
Base.prototype.last=function(){
    return this.elements[this.elements.length-1];
};



//获取元素节点
Base.prototype.getTagName=function(tag,parentNode){
    // this.elements.push(document.getElementsByTagName(tag));  //这样不行，只进去第一个
    var node=null;
    var temps=[];
    if(parentNode!=undefined){
        node=parentNode;
    }else{
        node=document;          //如果没有id参数，就把全局作为作用域
    }
    var tags=node.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
};

//设置CSS
Base.prototype.css=function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){
            return getStyle(this.elements[i],attr);    //课程疑问，这里写死了，别的属性怎么办？在写渐变时去掉了parseInt,这里就不需要+"px"了
        }
        this.elements[i].style[attr]=value;    //用数组方式
    }
    return this;
};
//设置CSS选择器子节点
Base.prototype.find=function(str){
    var childElements=[];
    for(var i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){
            case "#":
                childElements.push(this.getId(str.substring(1)));
                break;
            case ".":
/*
                var all=this.elements[i].getElementsByTagName("*"); //获得所有元素节点
                for(var j=0;j<all.length;j++){
                    if(all[j].className==str.substring(1)){
                        childElements.push(all[j]);
                    }
                }
*/
                var temps=this.getClass(str.substring(1),this.elements[i]);
                for(var j=0;j<temps.length;j++){
                    childElements.push(temps[j]);
                }
                break;
            default:
/*
                var tags=this.elements[i].getElementsByTagName(str);
                //注意这里不能用i循环，会和上面的i冲突导致循环错误
                for(var j=0;j<tags.length;j++){
                    childElements.push(tags[j]);
                }
*/
                var temps=this.getTagName(str,this.elements[i]);
                for(var j=0;j<temps.length;j++){
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements=childElements;    //把循环出来的目标及节点全部交给elements，这样就可以操作了
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
    // alert(this.elements);
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=func;    //用数组方式
    }
    return this;
};

//添加Class
Base.prototype.addClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        if(!hasClass(this.elements[i],className)){   //必须双\\
            this.elements[i].className+=" "+className;
        }
    }
    return this;
};
//移除CLASS
Base.prototype.removeClass=function(className){
    for(var i=0;i<this.elements.length;i++){
        if(hasClass(this.elements[i],className)){    //因为不在\\模式匹配中，需要加一个\转义\
            this.elements[i].className=this.elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"),'');
        }
    }
    return this;
};
//添加link或style的CSS规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
    var sheet=document.styleSheets[num];        //获得样式表
    insertRule(sheet,selectorText,cssText,position);
    return this;
};
//删除link或style的CSS规则
Base.prototype.removeRule=function(num,index){
    var sheet=document.styleSheets[num];        //获得样式表
    removeRule(sheet);
    return this;
};
//hover方法，设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
    for(var i=0;i<this.elements.length;i++){
/*
        //传统方法绑定函数
        this.elements[i].onmouseover=over;
        this.elements[i].onmouseout=out;
*/
        //现代方法绑定函数
        addEvent(this.elements[i],"mouseover",over);
        addEvent(this.elements[i],"mouseout",out);
    }
    return this;
};
//设置显示
Base.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display="block";
    }
};
Base.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display="none";
    }
};

//设置模块居中
Base.prototype.center=function(width,height){
    var left=(getInner().width-width)/2;
    var top=(getInner().height-height)/2;
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.top=top+"px";
        this.elements[i].style.left=left+"px";
    }
    return this;        //fuck！！！不返回就无法连缀就会报错！
};
//触发浏览器窗口改变事件
Base.prototype.resize=function(func){
    for(var i=0;i<this.elements.length;i++) {
        var element=this.elements[i];
/*
        window.onresize = function(){
            func();
            if(element.offsetLeft>getInner().width-element.offsetWidth){
                element.style.left=getInner().width-element.offsetWidth+"px";
            }
            if(element.offsetTop>getInner().height-element.offsetHeight){
                element.style.top=getInner().height-element.offsetHeight+"px";
            }
        };
*/
        addEvent(window,"resize",function(){
            func();
            if(element.offsetLeft>getInner().width-element.offsetWidth){
                element.style.left=getInner().width-element.offsetWidth+"px";
            }
            if(element.offsetTop>getInner().height-element.offsetHeight){
                element.style.top=getInner().height-element.offsetHeight+"px";
            }
        });
    }
    return this;
};
//锁屏功能
Base.prototype.lock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.width=getInner().width+"px";
        this.elements[i].style.height=getInner().height+"px";
        this.elements[i].style.display="block";

        addEvent(window,"scroll",scrollTop);
/*
        //遮罩状态下禁用滚动条，无法逃出遮罩区域，掩耳盗铃的感觉
        document.documentElement.style.overflow="hidden";
*/
    }
    return this;
};
//解锁
Base.prototype.unlock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display="none";
        document.documentElement.style.overflow="auto";
        removeEvent(window,"scroll",scrollTop);
    }
    return this;
};
//插件入口，继承的方法
Base.prototype.extend =function(name,plugin){
    Base.prototype[name]=plugin;
};


//删除左右空格
function trim(str){
    return str.replace(/(^\s*)(\s*$)/g,'');
}

Base.prototype.animation=function(obj){
    for(var i = 0;i < this.elements.length;i++){
        var element = this.elements[i];
        var effect = obj["effect"]!=undefined?obj["effect"]:"gradient";   //效果，默认由快到慢，可选normal

        var attr = obj["attr"] == "x" ? "left":obj["attr"] == "y" ? "top" :
            obj["attr"] == "w" ? "width" : obj["attr"] == "h" ? "height" :
            obj["attr"]=="o" ? "opacity":"left";            //可选，不传递用默认值

        var start = obj["start"]!=undefined?obj["start"]:
            attr=="opacity" ? parseFloat(getStyle(element,attr))*100 :
                parseInt(getStyle(element,attr));
        var interval = obj["interval"]?obj["interval"]:30;//如果没有值就使用30
        var step = obj["step"]?obj["step"]:5;
        var alter = obj["alter"];    //必须有
        var final = obj["final"];
        var speed = obj["speed"]!=undefined?obj["speed"]:10;

        if(alter != undefined && final == undefined) {
            final = alter;
        }else if(alter!=undefined && final != undefined) {
            final = final + alter;
        }else if(alter == undefined && final == undefined){
            throw new Error("alter or final must transmit at least one!");
        }

        if(attr=="opacity"){
            element.style.opacity=parseInt(start)/100;
            element.style.filter="alpha(opacity="+parseInt(start)+")";
        }else{
            element.style[attr]=start+"px";     //每次点击都从start处开始
        }


        clearInterval(window.timer);                //防止多次点击后，速度会累加
        timer = setInterval(function() {
            if(attr=="opacity"){
                var xpos=parseInt(parseFloat(getStyle(element,attr))*100);
            }else{
                var xpos = parseInt(getStyle(element, attr));
            }
            switch(effect) {
                case "gradient":
                    if (attr == "opacity") {

                        if(xpos<final){
                            var dist=parseInt(Math.ceil((final - xpos) / speed));
                            xpos+=dist;
                        }
                        if(xpos>final){
                            var dist=parseInt(Math.ceil((xpos - final) / speed));
                            xpos-=dist;
                        }
                        element.style.opacity=parseInt(xpos)/100;
                        element.style.filter="alpha(opacity="+parseInt(xpos)+")";
                    } else {
                        if (xpos < final) {
                            var dist = Math.ceil((final - xpos) / speed);
                            xpos += dist;
                        }
                        if (xpos > final) {
                            var dist = Math.ceil((xpos - final) / speed);
                            xpos -= dist;
                        }
                        element.style[attr] = xpos + "px";
                    }
                    break;
                case "normal":
                    if(attr=="opacity"){
                        var temp=parseFloat(getStyle(element,attr))*100;
                        element.style.opacity=parseInt(temp+step)/100;
                        element.style.filter="alpha(opacity="+parseInt(temp+step)+")";
                    }else{
                        if(step > 0 && Math.abs(xpos - final) < step){
                            step = Math.abs(xpos - final);
                        }
                        if(xpos < final){
                            xpos += step;
                        }
                        if(xpos > final){
                            xpos -= step;
                        }
                        element.style[attr] = xpos+"px";
                    }
            }
            if(attr=="opacity"){
                if(parseInt(getStyle(element,attr)*100)==final){
                    clearInterval(timer);
                }
            }else{
                if(parseInt(getStyle(element,attr))==final)clearInterval(timer);
            }
        },interval);
    }
    return this;
};