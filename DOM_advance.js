/**
 * Created by szl4zsy on 7/25/2016.
 */
/*
window.onload=function(){
    // alert(Node);    //object Node,IE不支持
    alert(Node.ELEMENT_NODE);
    alert(Node.TEXT_NODE);
};

if(typeof Node=="undefined"){
    //创建一个全局node
    window.Node={
        ELEMENT_NODE:1,
        TEXT_NODE:3
    };
}
*/

/*
//document类型
window.onload=function(){
    alert(document);
    alert(document.nodeType);       //文档根 9；
    alert(document.nodeValue);      //null
    alert(document.nodeName);       //#document
    alert(document.childNodes[0]);  //DocumentType  DOCTYPE
    alert(document.childNodes[0].nodeName); //html
    alert(document.documentElement)     //直接获取HTMLELEMENT
    alert(document.body);           //获取body标签
    alert(document.doctype);        //获取头
    alert(document.title);      //文件标题
    document.title="DOM_ADVANCE";
    alert(document.domain);     //域名
    alert(document.referrer);   //获取上一个URL，服务器端
};
*/

/*
//text类型
window.onload=function(){
    var div=document.getElementById("test");
    var text1=document.createTextNode("Mr.");
    var text2=document.createTextNode("Lee");
    div.appendChild(text1);
    div.appendChild(text2);
    alert(div.childNodes.length);
    div.normalize();                    //合并文本节点
    alert(div.childNodes[0].nodeValue);
    box.childNodes[0].deleteData(0,3);
    div.childNodes[0].insertData(0,"Hello");
    div.childNodes[0].replaceData(6,1,"World");
    div.childNodes[0].substringData(0,2);
    div.childNodes[0].splitText(2);     //切分节点
    alert(div.childNodes.length);
};*/

/*
//呈现模式
window.onload=function(){
    if(document.compatMode=="CSS1Compat"){
        alert(document.documentElement.clientWidth);
    }else{
        alert(document.body.clientWidth);
    }
};*/

/*
//滚动
window.onload=function(){
    document.getElementById("test").scrollIntoView();   //打开页面时显示可见
};*/

/*
//children属性，显示有效节点，忽略空白节点（空格，换行）
window.onload=function(){
    var div=document.getElementById("test");
    alert(div.childNodes.length);
    alert(div.children.length);     //打印出有效节点
    alert(box.children[0].nodeName);
}*/

/*
//contain方法,判断一个节点是否为另一个节点的后代，火狐不支持,高版本都不支持了
window.onload=function() {
    var div = document.getElementById("test");
    var p = div.firstChild;
    // alert(div.compareDocumentPosition(p)>16);//包含关系
    alert(contains(div,p));
};
function contains(refNode,otherNode){
    if(typeof refNode.contains!="undefined"){
        return refNode.contains(otherNode);
    }else if(typeof refNode.document.compareDocumentPosition=="function"){
        return refNode.document.compareDocumentPosition(otherNode)>16;
    }else{
        var node=otherNode.parentNode;
        do{
            if(node===refNode){
                return true;
            }else{
                node=otherNode.parentNode;
            }
        }while(node!=null)
        return false;
    }
}*/

