/**
 * Created by SZL4ZSY on 7/28/2016.
 */
//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}

//跨浏览器移出事件
function removeEvent(obj,type,func){
    if(obj.removeEventListener){
        obj.removeEventListener(type,func,false);  //兼容W3C
    }else if(obj.detachEvent){
        obj.detachEvent("on"+type,func);    //兼容IE
    }
}
//跨浏览器获取目标对象
function getTarget(evt){
    if(evt.target){
        return evt.target;
    }else if(window.event.srcElement){
        return window.event.srcElement;
    }
}
//兼容性阻止默认行为的函数
function preventDef(evt){
    var e=evt||window.event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;    //IE的阻止默认行为方式
    }
}
addEvent(window,"load",function(){
    var sub=document.getElementById("sub");
    var fm=document.getElementById("myForm");
    var button=document.getElementById("button");
    var reset=document.getElementById("reset");
    var sexList=fm.elements["sex"];
    var user=document.getElementById("user");
    var input=document.getElementById("input");
    var len=document.getElementById("length");
    var city=fm.elements["city"];
    // var fm=document.getElementsByTagName("form")[0];
    // var fm=document.forms[0];
    // var fm=document.forms["yourForm"];
    // alert("fm");
    //阻止提交,submit按钮失效,fm.onsubmit=function(){};
/*
    addEvent(fm,"submit",function(evt){
        preventDef(evt);
    });
*/

/*
//必须把submit事件绑定到form对象上，才可以触发submit事件
    addEvent(sub,"submit",function(evt){
        preventDef(evt);
    });
*/
/*
    //必须绑定FM，如果绑定sub则无法执行
    addEvent(fm,"submit",function(evt){
        alert("lee");
    });
*/
/*
    addEvent(button,"click",function(){
        fm.submit();        //让非submit按钮提交表单
    });
*/

/*
    //ctrl+enter提交表单
    addEvent(document,"keydown",function(evt){
        var e=evt||window.event;
        if(e.ctrlKey && e.keyCode==13)fm.submit();
    });
*/
    //name和id避免使用submit

/*
    //避免重复提交表单到服务器的办法
    //第一种是讲提交按钮添加一个disabled属性，这种方法只能禁用提交按钮
    //第二种是外部定义一个变量，如果提交过了就设置为true，这样防止重复提交

    var flag=false; //第二种
    addEvent(fm,"submit",function(evt){
        preventDef(evt);

        sub.disabled=true;
        //第一次提交后就禁用按钮,这种方法只限于提交按钮防止重复提交

        //第二种
        if(flag==true)return;
        flag=true;  //表示我提交过一次了

        alert("submit");
        setTimeout(function(){
            fm.submit();
        },3000);
    });
*/
// ---------------------------------------------------------------
/*    addEvent(document,"click",function(){
        fm.reset();
    });*/

    // alert(fm.elements);     //表单控件集合 HTML DOM
    // alert(fm.elements.length||fm.length);  //推荐使用前面的
    // alert(fm[0]||fm.elements[0]);       //通过表单集合获取第一个元素，非表单控件会被忽略
    // alert(fm.elements["user"].tagName);
    // alert(sexList[1].value);
    // alert(sexList[1].disabled=true);    //修改表单控件属性
    // alert(sexList[0].form);     //得到他的父类
    // alert(sexList[0].type="checkbox");       //不推荐此方法
    // user.focus();       //焦点移入
    // user.blur();        //焦点移出

/*
    //传统模式：onfocus,移入时触发
    addEvent(user,"focus",function(){
        alert("focus");
    });
    addEvent(user,"blur",function(){
        alert("blur");
    });
    addEvent(user,"change",function(){
        alert("change");        //文字改变并失去焦点后触发
    });
*/

/*
    alert(user.value);
    alert(fm.content.value);
    alert(fm.elements["content"].value);
    //在HTML中input有value属性，textarea没有value属性
    //在js中input和textarea都有value属性
*/

    var user=fm.elements["user"];
    var content=fm.elements["content"];
    // user.select();      //选定文本

/*
    //IE9一下不支持，chrome\FF支持，选择部分文本
    user.setSelectionRange(0,1);    //选择0-1位置的文本
    user.setSelectionRange(0,user.value.length);    //选择全部
    user.focus();   //焦点移入
    //这个方法是从第N个到第M个位置。
*/

/*
    //IE文本范围的概念,仅仅支持IE！！！！
    //W3C游一个范围选择，叫做DOM范围
    var range=user.createTextRange();

    range.collapse(true);       //将文本指针移到开头
    range.moveStart("character",1); //逐字移动，0
    range.moveEnd("character",2);   //同上
    range.select();
    //这个方法是从第N个位置，往后选择M个。
 // getSelectText(user,2,4); //调用选择文本函数
*/

    //选定文本就触发函数，但是IE9以下的是只要选到就直接触发
    // addEvent(user,"select",function(){
        // alert(this.value);
        // alert(this.selectionStart);  //文本光标的位置
        // alert(this.selectionEnd);
        // alert(this.value.substring(this.selectionStart,this.selectionEnd)); //获得选中的文本
        // alert(document.selection.createRange().text);  //这个对象只支持IE,他有一个方法可以创建文本范围对象
        // input.innerHTML=getPartText(user);  //兼容获得控件文本内容
    // });
    //非IE选定文本释放鼠标后触发事件








/*
/!*
* 过滤输入模式：纯数字
* 1.禁止或拼壁非数字键的输入，组织非数字键的默认行为
* 2.验证后取消，你可以输入非法字符，然后判断后，取消你刚输入的文本
* 3.
*
* *!/
    //屏蔽非数字键的输入
    addEvent(content,"keypress",function(evt){
        var e=evt||window.event;
        var charCode=getCharCode(evt);
        // alert(getCharCode(evt));
        //判断获取的文本是否是数字
        if(!/\d/.test(String.fromCharCode(charCode))&&charCode>0){
            preventDef(evt);    //屏蔽非数字键盘的输入，但是FF的删除键也失效了
        }
        //charCode>N,N只限于放开光标键退格键和删除键。
    });
*/
/*
    /!**
     * 复制事件，触发
     *!/
    addEvent(content,"copy",function(evt){
        e=evt||window.event;
        preventDef(e);
    });
    addEvent(content,"cut",function(evt){
        e=evt||window.event;
        preventDef(e);
    });
    addEvent(content,"paste",function(evt){
        e=evt||window.event;
        preventDef(e);
    });
*/
    // content.style.imeMode="disabled";   //屏蔽输入法，谷歌无效

/*
    /!**
     * 2.验证非法数据后取消输入
     *!/
    addEvent(content,"keyup",function(evt){
        this.value=this.value.replace(/[^\d]/g,""); //将非数字键转换为空
    });
*/

/*
    /!**
     * 按序切换tab输入框
     *!/
    addEvent(fm.elements["length1"],"keyup",tabForward);    //执行事件，不需要（）
    addEvent(fm.elements["length2"],"keyup",tabForward);    //执行事件，不需要（）
    addEvent(fm.elements["length3"],"keyup",tabForward);    //执行事件，不需要（）

    function tabForward(evt){
        var e=evt||window.event;
        //判断当前长度是否和最大输入长度是否一致
        if(this.value.length==this.maxLength){
            //遍历所有控件
            for(var i=0;i<fm.elements.length;i++){
                if(fm.elements[i]==this){
                    fm.elements[i+1].focus();
                    // return ;
                }
            }
        }
    }
*/

/*
    /!**
     * 复制前触发
     *!/
    addEvent(content,"beforecopy",function(evt){
        alert();
        e=evt||window.event;
        preventDef(e);
    });
*/

    /**
     * 选择框控件
     */
    // city.multiple=true;
    // city.size=5;
    // alert(city.options.length);
    // alert(city.options[0].value);
    // alert(city.type);
    // alert(city.options[0].value+"---"+city.options[0].text); //HTML DOM
    /**
     *  使用标准DOM也可以获取
     *  但是HTML DOM的兼容性已经完全满足需求
     */
    // alert(city.options[0].firstChild.nodeValue);    //比较麻烦
    // alert(city.options[0].firstChild.nodeValue+"---"+city.options[0].getAttribute("value"));

/*
    /!**
     * 单选框的selectedIndex索引属性
     *!/
    addEvent(city,"change",function(){
        alert(this.selectedIndex);  //得到当前选项的索引，从0开始
        alert(this.options[this.selectedIndex].text);   //得到当前text
        alert(this.options[this.selectedIndex].value);  //当前value
    });
    city.selectedIndex=2;   //指定单选框中的索引值，选择text，用于获取
*/

/*
    //该定位必须在option对象上
    city.options[1].selected=true;  //设置为选定状态，可以用于判断
    addEvent(city,"change",function(){
        if(this.options[2].selected){
            alert("correct");
        }else{
            alert("wrong");
        }
    });
*/

    /**
     * 添加一个选项到select中，有HTML DOM和DOM方法，两种。
     */
/*
    //用DOM方法添加
    var option=document.createElement("option");
    var text=document.createTextNode("guangzhou");
    option.setAttribute("value","guangzhou");
    option.appendChild(text);
    city.appendChild(option);
*/
/*
    //用HTML DOM方法添加,Option构造函数
    var option=new Option("guangzhou","guangzhou");
    city.appendChild(option);   //IE低版本出现bug
    city.add(option,0);
    city.add(option,null);
    //add中两个参数是必须的，不确定索引，第二个参数设置为null即可
    //即默认移入最后一个选项，但是IE第二个参数是可选的，所以设置null代表一个不存在的位置
    //导致失踪，为了兼容可以设置为undefined。
    city.add(option,undefined); //最佳兼容方案
*/

/*
    /!**
     * 删除一个选项
     *!/
    var option=document.createElement("option");
    // city.removeChild(city.options[0]);
    // city.remove(0);
    // city.remove(0);  //索引序号会自动顶上去
    // city.options[0]=null;
*/

/*
    /!**
     * 移动选项
     *!/
    var info=fm.elements["info"];
    addEvent(city,"click",function(){
        info.appendChild(this.options[city.selectedIndex]); //点击后移动到info列表中去
    });
*/

    // alert(city.selectedIndex);
    // alert(city.options[0].index);   //index和SELECTEDINDEX类似

/*
    /!**
     * 对选项进行排序
     *!/
    var option1=city.options[2];    //beijing
    city.insertBefore(option1,city.options[option1.index-1]);
*/


    //F5只能浅刷新，缓存级别的刷新，ctrl+F5完整刷新
});


/*
//做兼容,选中控件中的部分文本。 line 144
function getSelectText(text,start,num){
    if(text.setSelectionRange){
        text.setSelectionRange(start,num);
        text.focus();
    }else if(text.createTextRange){
        var range=user.createTextRange();
        range.collapse(true);
        range.moveStart("character",start);
        range.moveEnd("character",num-start);   //最后位置减去开始位置=个数
        range.select();
    }
}
*/
/*
//获得控件中的部分文本内容
function getPartText(text){
    if(typeof text.selectionStart =="number"){
        return text.value.substring(text.selectionStart,text.selectionEnd);
    }else if(document.selection){
        return alert(document.selection.createRange().text);
    }
}
*/

//最终的兼容方案，兼容各种浏览器，返回字符编码,对应191
function getCharCode(evt){
    var e=evt||window.event;
    if(typeof e.charCode=="number"){
        return e.charCode;
    }else{
        return e.keyCode;
    }
}