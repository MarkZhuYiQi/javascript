/*
var pattern=/g..gle/;
var str='google';
alert(pattern.test(str));
*/
/*
var pattern=/^google$/;		//锚 指定必须以google为首并以google 结尾
var str='a dasad google adsadasd';
alert(pattern.test(str));
*/
/*
//验证邮政编码
var pattern=/^[1-9]\d{5}$/;
var str='215000';
alert(pattern.exec(str));
*/

/*
//检查文件压缩包：zip,rar,7z,gz
var pattern=/^[\w\@]+\.(rar|zip|7z|gz)/i;
var str='mark@Zhu_026.zip';
alert(pattern.exec(str));
*/
/*
//删除多余空格
var pattern=/\s/g;
var str='   g  o  o    g    l      e    ';
var result=str.replace(pattern,'');
alert('|'+result+'|');
*/
/*
//删除首尾空格
var pattern=/^\s+(.+?)\s+$/;	//没有+号会吃掉后面的空格
var str='      mark zhu zhu yi qi       ';
var result=pattern.exec(str);
alert('|'+result[1]+'|');
*/
/*
var pattern=/^\s+(.+?)\s+$/;
var str='      mark zhu zhu yi qi       ';
var result=str.replace(pattern,'$1');
alert('|'+result+'|');
*/
/*
//邮箱验证
var pattern=/(^[0-9a-zA-Z][\w\.\-]+)@([\w\-]+)\.([A-Za-z\.]{2,6})/;
var str='zhuyiqi_026@ups163.com.cn';
alert(pattern.test(str));
alert(pattern.exec(str));
*/
