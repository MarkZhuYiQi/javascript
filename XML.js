/**
 * Created by Administrator on 2016/7/30.
 */

// alert(document.implementation.hasFeature("XML","2.0"));     //IE9以下不支持

/*
    //DOMParser类型
    //本来是FF引入，后来IE9，chrome都支持这个类型。
    //模拟loadXML()方法，可以创建建议的XML字符串，如果要载入文件，需要用document.implementation.createElement("","",null);(FF)
    var parser=new DOMParser();
    var xmlDOM=parser.parseFromString("<root><user>Lee</user></root>","text/xml");
    alert(xmlDOM.documentElement.tagName);
    alert(xmlDOM.documentElement.firstChild.tagName);
    var anotherChild=xmlDOM.createElement("user");
    xmlDOM.documentElement.appendChild(anotherChild);
    var children=xmlDOM.getElementsByTagName("user");
    alert(children.length);
*/

/*
    //DOMParser类型
    addEvent(window,"load",function(){
        var p=document.getElementById("info");      //这句话必须在html页面加载完以后才能读取到，否则会保存返回p is null
        var parser=new DOMParser(),
            xmlDOM,
            errors;
        //查错，如果有错误就抛出到HTML页面上
        try{
            //返回一个document的实例，参数为要解析的xml字符串和内容类型（始终为TEXT/XML）
            // xmlDOM=parser.parseFromString("<root","text/xml");
            xmlDOM=parser.parseFromString("<root><user>Lee</user></root>","text/xml");
            alert(xmlDOM.documentElement.childElementCount);
            errors=xmlDOM.getElementsByTagName("parsererror");
            //查找是否有这个元素，有的话说明有错误
            if(errors.length>0){
                throw new Error(errors[0].innerHTML);   //这个throw扔到了e对象中
            }
        }catch(e){
            p.innerHTML=e;
        }

        //FF引入的XMLSerializer类型，将DOM文档序列化为XML字符串，IE9 OPERA CHROME 都支持
        var serializer=new XMLSerializer();
        var xml=serializer.serializeToString(xmlDOM);
        alert(xml);
    });
*/


/*
    //DOM2级别，document.implementation.createElement，IE不支持
    var xmlDOM=document.implementation.createDocument("","root",null);  //匿名空间、根标签，文档声明
    // alert(xmlDOM);
    alert(xmlDOM.documentElement.tagName);  //标准dom获得根标签
    alert(xmlDOM.getElementsByTagName("root")[0].tagName);  //获得根标签
    //使用标准dom去创建节点
    var user=xmlDOM.createElement("user");
    var userName=xmlDOM.createTextNode("mark");
    user.appendChild(userName);
    xmlDOM.documentElement.appendChild(user);
    alert(xmlDOM.getElementsByTagName("user")[0].firstChild.nodeValue);
    //DOM2级别XML DOM对象不支持loadXML方法，无法直接以字符串形式写出xml，这时候需要用到DOMParser
    //load()方法支持，但除了FF别的浏览器不支持
*/


/*
    //火狐的同步加载
    var xmlDOM=document.implementation.createDocument("","root",null);
    xmlDOM.async=false;
    xmlDOM.load("test.xml");        //载入外部XML文件
    alert(xmlDOM.getElementsByTagName("user")[0].firstChild.nodeValue);
    alert(xmlDOM.getElementsByTagName("user")[0].textContent);  //W3C的innerHTML
    alert(xmlDOM.getElementsByTagName("user")[0].innerHTML);
*/

/*
    //火狐的同步加载
    var xmlDOM=document.implementation.createDocument("","root",null);
    xmlDOM.async=true;
    xmlDOM.onload=function(){       //火狐的异步加载，通过onload即可，类似与IE的readystate
        alert(xmlDOM.getElementsByTagName("user")[0].textContent);
    }
    xmlDOM.load("test.xml");        //载入外部XML文件
    //异步加载，test.html还没有加载完这里就输出了，所以会出错
    // alert(xmlDOM.getElementsByTagName("user")[0].textContent);

    //PS:load()方法只支持ff浏览器，和opera，其他浏览器不支持
*/



    //创建一个ActiveObject类型,只兼容IE
    function createDocument(){
        //首先判断这个函数是否运行过，如果运行过了就会存在activeXString这个对象
        if(typeof arguments.callee.activeXString!="string"){
            var versions=[
                "MSXML2.DOMDocument.6.0",
                "MSXML2.DOMDocument.3.0",
                "MSXML2.DOMDocument"
            ],i,len;
            for(i=0;i<versions.length;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString=versions[i];
                    break;
                }catch(e){
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }

/*
    //load()方法用于加载文件，loadXML()方法用于加载语句
    //服务器端默认是异步加载，load()还未加载完毕，就去打印序列化的字符串


    //同步加载XML文件
    var xmlDOM=createDocument();
    xmlDOM.loadXML("<root><user>Lee</user></root>");
    xmlDOM.async=false; //加载文档方式，分为异步和同步，现在是同步

    //parseError属性中可以找到错误信息，525页,parseError的valueOf()方法返回errorcode的值
    //在调用loadXML之后，查询XML文档之前，检查是否发生了解析错误
    if(xmlDOM.parseError != 0){
        alert("An error occurred:\nError Code: "
            +xmlDOM.parseError.errorCode+"\n"
            +"Line:"+xmlDOM.parseError.line+"/n"
            +"Line Pos:"+xmlDOM.parseError.linepos+"\n"
            +"Reason:"+xmlDOM.parseError.reason
        );
    }else{
        alert(xmlDOM.documentElement.tagName);
        alert(xmlDOM.documentElement.firstChild.tagName);
        var anotherChild=xmlDOM.createElement("user");
        var aCText=xmlDOM.createTextNode("mark");
        anotherChild.appendChild(aCText);
        xmlDOM.documentElement.appendChild(anotherChild);
        var children=xmlDOM.getElementsByTagName("user");
        alert(children.length);
        alert(xmlDOM.xml);
        //XML和html一样可以通过标准DOM操作
    }
*/

/*
    //异步加载XML文件
    var xmlDOM=createDocument();
    xmlDOM.async=true;
/!*
    onreadystatechange有4个状态
    1：DOM正在加载数据。
    2：DOM已经加载完数据。
    3：DOM已经可以使用，但部分可能还无法访问
    4：DOM已经完全可以使用。
*!/
    xmlDOM.onreadystatechange=function() {
        if (xmlDOM.readyState == 4) {
            if (xmlDOM.parseError != 0) {
                alert("An error occurred:\nError Code: "
                    + xmlDOM.parseError.errorCode + "\n"
                    + "Line:" + xmlDOM.parseError.line + "/n"
                    + "Line Pos:" + xmlDOM.parseError.linepos + "\n"
                    + "Reason:" + xmlDOM.parseError.reason
                );
            } else {
                alert(xmlDOM.documentElement.tagName);
                alert(xmlDOM.documentElement.firstChild.tagName);
                var anotherChild = xmlDOM.createElement("user");
                xmlDOM.documentElement.appendChild(anotherChild);
                var children = xmlDOM.getElementsByTagName("user");
                alert(children.length);
                alert(xmlDOM.xml);
            }
        }
    };
    //onreadystatechange事件指定语句必须放在load方法之前，这样才嫩敢保证在就绪状态变化时调用该处理程序
    xmlDOM.load("test.xml");
*/

    //跨浏览器处理XML,仅用于xml文本，不能用load外部文件
    function parseXML(xml){
        var xmlDOM=null;
        if(typeof DOMParser!="undefined"){
            xmlDOM=(new DOMParser()).parseFromString(xml,"text/xml");
            var errors=xmlDOM.getElementsByTagName("parsererror");
            if(errors.length){
                throw new Error("XML parsing error: "+errors[0].textContent);
            }
        }else if(typeof ActiveXObject!="undefined"){
            xmlDOM=createDocument();
            xmlDOM.loadXML(xml);
            if(xmlDOM.parseError!=0){
                //parseError不是W3C标准！只有IE支持这个属性
                throw new Error("XML parsing error:"+ xmlDOM.parseError.reason);
            }
        }else{
            throw new Error("no XML parser available");
        }
        return xmlDOM;
    }

    //为了跨浏览器兼容，只能放弃load外部加载文件的方法

    function getXMLDOM(xmlStr){
        var xmlDOM=null;
        if(typeof DOMParser!="undefined"){  //说明是W3C浏览器
            xmlDOM=(new DOMParser()).parseFromString(xmlStr,"text/xml");
            var errors=xmlDOM.getElementsByTagName("parsererror");
            if(errors.length){
                throw new Error("XML parsing error: "+errors[0].textContent);
            }
        }else if(typeof ActiveXObject!="undefined"){
            var versions=[
                "MSXML2.DOMDocument.6.0",
                "MSXML2.DOMDocument.3.0",
                "MSXML2.DOMDocument"
            ],i;
            for(i=0;i<versions.length;i++){
                try{
                    xmlDOM=new ActiveXObject(versions[i]);
                }catch(e){
                    //跳过
                }
                xmlDOM.loadXML(xmlStr);
                if(xmlDOM.parseError!=0){
                    throw new Error("parsing error:"+xmlDOM.parseError.reason);
                }
            }
        }else{
            throw new Error("您的系统不支持XML DOM");
        }

        return xmlDOM;
    }



//跨浏览器序列化XML
function serializeXML(xmlDOM){
    if(typeof XMLSerializer!="undefined"){
        return (new XMLSerializer()).serializeToString(xmlDOM);
    }else if(typeof xmlDOM.xml!="undefined"){
        return xmlDOM.xml;
    }else{
        throw new Error("could not serialize XML DOM");
    }
}
// alert(serializeXML(parseXML("<root><user>Lee</user></root>")));
alert(serializeXML(getXMLDOM("<root><user>Lee</user></root>")));

/*
//稚嫩的跨浏览器
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
            //这个只支持火狐
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
*/






















//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}