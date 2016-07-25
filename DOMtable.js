/**
 * Created by Administrator on 2016/7/25.
 */
/*
window.onload=function(){
    var table=document.createElement("table");
    table.width=300;
    table.border=1;
    var caption=document.createElement("caption");
    table.appendChild(caption);
    var captionText=document.createTextNode("人员表");
    caption.appendChild(captionText);
    var thead=document.createElement("thead");
    table.appendChild(thead);
    var tr=document.createElement("tr");
    thead.appendChild(tr);
    var th=document.createElement("th");
    thead.appendChild(th);
    var thtext=document.createTextNode("数据");
    th.appendChild(thtext);
    document.body.appendChild(table);
};
*/

/*
window.onload=function(){
    var table=document.getElementsByTagName("table")[0];
    alert(table.children[2].children[1].children[1].innerHTML); //繁琐
    var tbody=table.getElementsByTagName("tbody")[0];
    var tr=tbody.document.getElementsByTagName("tr")[1];
    var td=tr.getElementsByTagName("td")[1];
    alert(td.innerHTML);
};*/

/*
window.onload=function(){
    // var table=document.getElementsByTagName("table")[0];
    // alert(table.caption.innerHTML);
    // table.caption.innerHTML="真的是人员表";
    // alert(table.tHead);
    // alert(table.tBodies[0]);
    // alert(table.rows.length);
    // alert(table.tBodies[0].rows.length);
    // alert(table.tBodies[0].rows[0]);
    // alert(table.tBodies[0].rows[0].cells.length);   //行单元格数
    // alert(table.tBodies[0].rows[1].cells[1].innerHTML);
    // table.deleteCaption();
    // table.deleteTHead();
    // table.tBodies[0].deleteRow(0);
    // table.tBodies[0].rows[0].deleteCell(1);

};*/
//创建table
window.onload=function(){
    var table=document.createElement("table");
    table.width=300;
    table.border=1;
    table.createCaption().innerHTML="人员表";
    var thead=table.createTHead();
    var tr=thead.insertRow(0);
    tr.insertCell(0).innerHTML="data1";
    tr.insertCell(1).innerHTML="data3";
    tr.insertCell(2).innerHTML="data2";



    document.body.appendChild(table);
};