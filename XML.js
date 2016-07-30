/**
 * Created by Administrator on 2016/7/30.
 */

var xmlDOM=null;
try {
    if (window.ActiveXObject !== undefined) {
        xmlDOM = new ActiveXObject("MSXML2.DOMDocument.6.0");
    } else if (document.implementation && document.implementation.createDocument) {
        try {
            xmlDOM = document.implementation.createDocument(", ", null);
        } catch (e) {
            xmlDOM = new window.XMLHttpRequest();
        }
    } else {
        alert("load data error");
    }
}catch(e){
    alert(e.message);
}
alert(xmlDOM);





// var xmlObjects=["Msxml2.DOMDocument.6.0"];
// try{
//     var xmlDom=new ActiveXObject("MSXML2.DOMDocument.6.0");
//     alert(xmlDom);
// }catch(e){
//     var xmlDom=new XMLHttpRequest("");
// }