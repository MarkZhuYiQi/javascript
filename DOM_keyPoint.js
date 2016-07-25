/**
 * Created by szl4zsy on 7/25/2016.
 */
window.onload=function(){
    var input=document.getElementById("user");
    var div=document.getElementById("test");
    // alert(input.className);                 //这个全兼容
    // alert(input.getAttribute("class"));     //IE7,8找不到

/*
    alert(div.nodeName);        //DIV，元素节点的标签名，与tagName等价
    alert(div.nodeType);        //元素节点类型值为1
    alert(div.nodeValue);       //元素节点没有内容
    alert(div.innerHTML);       //获取元素节点内部内容
*/

/*
    alert(div.childNodes);      //返回当前元素节点所有子节点列表
    alert(div.childNodes.length);   //第一个节点为文本节点，第二个为em元素节点
    alert(div.childNodes[0].nodeType);  //返回3，文本节点
    alert(div.childNodes[0].nodeValue); //test
    alert(div.childNodes[0].innerHTML); //文本节点下面里面的内容，无效
    alert(div.childNodes[0].nodeName); //文本节点名字
*/

/*    //通过判断节点类型，输出
    for(var i=0;i<div.childNodes.length;i++){
        if(div.childNodes[i].nodeType===1){
            alert("element tag:"+div.childNodes[i].nodeName);
        }else if(div.childNodes[i].nodeType===3){
            alert("text tag:"+div.childNodes[i].nodeValue);
        }
    }*/

/*
    alert(input.attributes);  //保存的是属性列表集合数组
    alert(input.attributes.length);
    alert(input.attributes[0]); //属性节点
    alert(input.attributes[0].nodeType); //属性节点类型值2
    alert(input.attributes[0].nodeValue); //属性值
    alert(input.attributes[0].nodeName); //属性名称
    //不同浏览器遍历顺序不同，获取的也不一样
    alert(input.attributes["type"].nodeValue);
*/

//忽略空白字符
//     alert(div.childNodes.length);
//     alert(filterWhiteNode(div.childNodes).length);


/*
    var p=document.createElement("p");
    var text=document.createTextNode("test div4");
    p.appendChild(text);
    div.appendChild(p);         //新节点P放到DIV里子节点列表末尾
*/

};

/*
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
*/

/*
function filterWhiteNode(node){
    var ret=[];
    for(var i=0;i<node.length;i++){
        if(node[i].nodeType==3&&/^\s+$/.test(node[i].nodeValue)){
            continue;
        }else{
            ret.push(node[i]);
        }
    }
    return ret;
}
*/
//推荐用下面这个移除空白字符
/*
function filterWhiteNode(node){
    for(var i=0;i<node.length;i++){
        if(node[i].nodeType===3&&/^\s+/.test(node[i].nodeValue)){
            node[i].parentNode.removeChild(node[i]);
        }
    }
    return node;
}*/
