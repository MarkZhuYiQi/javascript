/**
 * Created by SZL4ZSY on 8/1/2016.
 */



//每次调用的时候都是新建一个对象
var $=function(_this){
    return new Base(_this);
};
//基础类库
function Base(_this){
    //创建一个数组保存获取的节点和节点数组
    //私有属性，防止共有导致操作影响无关元素
    this.elements=[];
    //this是一个对象，，undefined也是对象，区别于typeof返回的单引号'undefined'
    if(_this!=undefined){
        this.elements[0]=_this;     //将当前作用域对象放进数组第一位
    }
}

//获取ID节点
Base.prototype.getId=function(id){
    this.elements.push(document.getElementById(id));
    return this;
};
//获取CLASS节点
Base.prototype.getClass=function(className,id){
    var node=null;
    if(arguments.length==2){    //参数数量，如果为2，就先去获得ID所在控件
        node=document.getElementById(id);
    }else{
        node=document;          //如果没有id参数，就把全局作为作用域
    }
    var all=node.getElementsByTagName("*"); //获得所有元素节点
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
            return getStyle(this.elements[i],attr);
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
        this.elements[i].onmouseover=over;
        this.elements[i].onmouseout=out;
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
    var left=(document.documentElement.clientWidth-width)/2;
    var top=(document.documentElement.clientHeight-height)/2;
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
        window.onresize = function(){
            func();
            if(element.offsetLeft>getInner().width-element.offsetWidth){
                element.style.left=getInner().width-element.offsetWidth+"px";
            }
            if(element.offsetTop>getInner().height-element.offsetHeight){
                element.style.top=getInner().height-element.offsetHeight+"px";
            }
        };
    }
    return this;
};
//锁屏功能
Base.prototype.lock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.width=getInner().width+"px";
        this.elements[i].style.height=getInner().height+"px";
        this.elements[i].style.display="block";

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
    }
    return this;
};

//拖拽功能
Base.prototype.drag=function(){
    for(var i=0;i<this.elements.length;i++){
        //点击某个物体，用signDiv，move和up是全局区域
        this.elements[i].onmousedown=function(event){
            preDef(event);
            var e=getEvent(event);
            var _this=this;     //将signDiv区域的对象置入this，否则后面this指向的就是document了
            var diffX=e.clientX-_this.offsetLeft;   //点到边框的距离 - 控件到边框的距离
            var diffY=e.clientY-_this.offsetTop;

            //为了防止IE往下拉会出现bug，能拖出去；让鼠标离开浏览器是也能捕获事件
            if(typeof _this.setCapture!="undefined"){
                _this.setCapture();
            }
            document.onmousemove=function(e){
                var left=e.clientX-diffX;
                //这难道不是_this.offsetLeft吗？解答：该属性是只读的，不可赋值
                var top=e.clientY-diffY;
                //通过控制控件的左侧长度，或者控件距离顶部的高度，不超过控件window视窗的宽高（控件宽高+边框距离视窗边缘的宽高）
                if(left<0){
                    left=0;
                }else if(left>getInner().width-_this.offsetWidth){
                    left=getInner().width-_this.offsetWidth;
                }
                if(top<0){
                    top=0;
                }else if(top>getInner().height-_this.offsetHeight){
                    top=getInner().height-_this.offsetHeight;
                }

                _this.style.left=left+"px";
                _this.style.top=top+"px";
            };
            document.onmouseup=function(){
                this.onmousemove=null;
                this.onmouseup=null;
                if(typeof _this.releaseCapture!="undefined"){
                    _this.releaseCapture();
                }
            };
        };
    }
    return this;
};
