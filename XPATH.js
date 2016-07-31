/**
 * Created by Administrator on 2016/7/31.
 */
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


//IE下的XPATH
/*
    var xmlStr="<root><user id='5'>Lee</user><user id='6'>Mark</user></root>";
    var xmldom=getXMLDOM(xmlStr);
    // alert(xmldom.xml);

    //IE中的两种方法：1.selectSingleNode()获取单一节点。2.selectNodes()获取节点集合
    //XPATH查找手段就是路径查找，结构树查找
    //selectSingleNode是获取单一节点，如果有多个，就返回查找到的第一个
    //xmldom是一个上下文节点，他的指针指向root前面那个位置
    // var node=xmldom.documentElement.selectSingleNode("user");
    // var node=xmldom.selectSingleNode("root/user");  //这两者等价
    // var node=xmldom.selectSingleNode("root/user[1]");
    //XPATH默认是从1开始的但是ie8是从0开始的
    // var node=xmldom.selectSingleNode("root/user[1]/text()");    //直接获取到第二个元素节点的文本节点
    // var node=xmldom.selectSingleNode("//user[1]");    //忽略外层直接搜索
    // var node=xmldom.selectSingleNode("root//user[1]");    //在root里忽略外层直接搜索
    var node=xmldom.selectSingleNode("root/user[@id=6]");    //指定属性查找
// 到第二个元素节点的文本节点
    if(node!==null){
        alert(node.xml);
        // alert(node.tagName);
        // alert(node.firstChild.nodeValue);
    }
    var nodes=xmldom.selectNodes("root/user");
    alert(nodes.length);
*/


//W3C下的XPATH
var xmlStr="<root><user id='5'>Lee</user><user id='6'>Mark</user></root>";
var xmldom=getXMLDOM(xmlStr);
//两种方式创建XPathResult
/*
    //单一节点，W3CXPATH下标从1开始
    var eva = new XPathEvaluator();
    var result=eva.evaluate("root/user",xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    // var result=eva.evaluate("root/user",xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if(result!==null){
        alert(serializeXML(result.singleNodeValue));
    }
    //可以直接用xml节点来操作
    var result=xmldom.evaluate("root/user",xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if(result!==null){
        alert(serializeXML(result.singleNodeValue));
    }
*/
/*
//节点集合
    var eva=new XPathEvaluator();
    var result=eva.evaluate("root/user",xmldom,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
    if(result!==null){
        var nodes=[];
        var node=result.iterateNext();
        while(node!==null){
            nodes.push(node);
            node=result.iterateNext();
        }
    }
    alert(serializeXML(nodes[0]));
    alert(serializeXML(nodes[1]));
*/

/*
//跨浏览器单一结点
function selectOneNode(xmldom,xpath){
    var node=null;
    if(typeof xmldom.evaluate!="undefined"){    //W3C
        var pattern=/\[(\d+)\]/;
        var flag=xpath.match(pattern);
        var num=0;
        if(flag!=null){
            num=parseInt(RegExp.$1)+1;
            xpath=xpath.replace(pattern,"["+num+"]");
        }
        var result=xmldom.evaluate(xpath,xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        if(result!==null){
            node=result.singleNodeValue;
        }
    }else if(typeof xmldom.selectSingleNode!="undefined"){  //IE9以下
        node=xmldom.selectSingleNode(xpath);
    }
    return node;
}
try {
    var node = selectOneNode(xmldom, "root/user[1]");
    alert(serializeXML(node));
}catch(e){
    alert("xpath error!");
}
*/

//跨浏览器结点集合
function selectNodes(xmldom,xpath){
    var nodes=[];
    if(typeof xmldom.evaluate!="undefined"){    //W3C
        var pattern=/\[(\d+)\]/;
        var flag=xpath.match(pattern);
        var num=0;
        if(flag!=null){
            num=parseInt(RegExp.$1)+1;
            xpath=xpath.replace(pattern,"["+num+"]");
        }
        var result=xmldom.evaluate(xpath,xmldom,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
        if(result!=null){
            var node=null;
            while((node=result.iterateNext())!==null){
                nodes.push(node);
            }
        }
    }else if(typeof xmldom.selectNodes!="undefined"){  //IE9以下
        nodes=xmldom.selectNodes(xpath);
    }
    return nodes;
}
try {
    var nodes = selectNodes(xmldom, "root/user");
    alert(nodes.length);
    alert(serializeXML(nodes[0]));
    alert(serializeXML(nodes[1]));
}catch(e){
    alert("xpath error!");
}

























//跨浏览器添加事件
function addEvent(obj,type,func){
    if(obj.addEventListener){
        obj.addEventListener(type,func,false);  //兼容W3C
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,func);    //兼容IE
    }
}