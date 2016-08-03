/**
 * Created by SZL4ZSY on 8/3/2016.
 */

//将拖拽功能从base.js中分离了出来，通过继承的方式，将下面这段代码继承到了base.js中
//运行Base中的extend方法，传入函数名drag和函数代码，
//对Base的prototype操作，加入drag函数
//需要使用时载入该函数，自动执行继承，即可调用使用

$().extend("drag",function(dragArea){
    for(var i=0;i<this.elements.length;i++){
        //点击某个物体，用signDiv，move和up是全局区域
        /*
         this.elements[i].onmousedown=function(e){
         // preDef(event);       //不需要函数了，已经将IE标准绑定到W3C上
         e.preventDefault();
         // var e=getEvent(event);   //已经不需要了，直接可以获取到了
         var _this=this;     //将signDiv区域的对象置入this，否则后面this指向的就是document了
         var diffX=e.clientX-_this.offsetLeft;   //点到边框的距离 - 控件到边框的距离 = 鼠标到控件边框的距离
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
         */
        addEvent(this.elements[i],"mousedown",function(e){
            // e.preventDefault();
            if(trim(this.innerHTML).length==0)e.preventDefault();
            var _this=this;                         //控件的对象
            var diffX=e.clientX-_this.offsetLeft;   //点到边框的距离 - 控件到边框的距离 = 鼠标到控件边框的距离
            var diffY=e.clientY-_this.offsetTop;
            //自定义拖拽区
            var flag=false;
            for (var i=0;i<dragArea.length;i++){
                if(e.target==dragArea[i]){
                    flag=true;  //只要有true，立刻返回
                    break;      //立刻结束，否则后面的节点都可以拖动了
                }
            }
            if(flag){             //如果srcElement或者target获得的是标题标签
                addEvent(document,"mousemove",move);
                addEvent(document,"mouseup",up);
            }else{
                removeEvent(document,"mousemove",move);
                removeEvent(document,"mouseup",up);
            }

            function move(e){
                var left=e.clientX-diffX;       //控制左侧长度，不超过视窗宽度-控件宽度
                var top=e.clientY-diffY;
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
                //为了防止IE往下拉会出现bug，能拖出去；让鼠标离开浏览器是也能捕获事件
                if(typeof _this.setCapture!="undefined"){
                    _this.setCapture();
                }
            }
            function up(e){
                removeEvent(document,"mousemove",move);
                removeEvent(document,"mouseup",up);
                if(typeof _this.releaseCapture!="undefined"){
                    _this.releaseCapture();
                }
            }
        });
    }
    return this;
});
