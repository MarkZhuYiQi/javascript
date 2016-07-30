/**
 * Created by Administrator on 2016/7/30.
 */

// alert(document.implementation.hasFeature("XML","2.0"));     //IE9以下不支持

/*
    //DOMParser类型
    //本来是FF引入，后来IE9，chrome都支持这个类型
    var parser=new DOMParser();
    var xmlDOM=parser.parseFromString("<root><user>Lee</user></root>","text/xml");
    alert(xmlDOM.documentElement.tagName);
    alert(xmlDOM.documentElement.firstChild.tagName);
    var anotherChild=xmlDOM.createElement("user");
    xmlDOM.documentElement.appendChild(anotherChild);
    var children=xmlDOM.getElementsByTagName("user");
    alert(children.length);
*/
    addEvent(window,"load",function(){
        var p=document.getElementById("info");
        // alert(document.getElementById("info").innerHTML);
        p.innerHTML=1;
    });

    var parser=new DOMParser(),
        xmlDOM,
        errors;
    try{
        xmlDOM=parser.parseFromString("<root","text/xml");
        alert(xmlDOM.documentElement.childElementCount);
        errors=xmlDOM.getElementsByTagName("parsererror");  //查找是否有这个元素，有的话说明有错误
        if(errors.length>0){
            throw new Error(errors[0].innerHTML);
        }
    }catch(e){
        alert(p.tagName);
    }

    var serializer=new XMLSerializer();
    var xml=serializer.serializeToString(xmlDOM);
    alert(xml);


function createXMLDOM(){
    var xmlDOM=null;
    var version=[
        "MSXML2.DOMDocument.6.0",
        "MSXML2.DOMDocument.3.0",
        "MSXML2.DOMDocument"
    ];
    try {
        if (typeof window.ActiveXObject !="undefined") {
            try{
                for(var i=0;i<version.length;i++){
                    xmlDOM=new ActiveXObject(version[i]);
                    if(typeof xmlDOM ==Object)break;
                }
            }catch(e){
                alert("error");
            }
        } else if (document.implementation && document.implementation.createDocument) {
            try {
                xmlDOM = document.implementation.createDocument("","", null);   //DOM2创建空白XML文档
            } catch (e) {
                xmlDOM = new window.XMLHttpRequest();
            }
        } else {
            alert("load data error");
        }
    }catch(e){
        alert(e.message);
    }
    return xmlDOM;
    // alert(XMLHttpRequest());
    // alert(typeof window.ActiveXObject!="undefined");
}
//载入XML文件，两种方式，1.加载XML字符loadXML();2.加载XML外部文件load();
var xmlDOM=createXMLDOM();
console.log(typeof xmlDOM);
xmlDOM.loadXML("<root><user>Lee</user></root>");   //加载XML字符串
console.log(xmlDOM.xml);      //序列化xml，打印字符串






//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}