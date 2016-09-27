/**
 * Created by SZL4ZSY on 8/3/2016.
 */

/**
 * ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015
 */
/* 最常用的ES6特性 */

    /* let,const */

    //var只针对全局作用域和函数作用域，所以局部变量会覆盖全局变量
    /*
    var name='mark';
    while(true){
        var name='obama';
        console.log(name);  //obama
        break;
    }
    console.log(name);      //obama
    */

    //let为javascript增加了块级作用域，用它声明变量，只在let命令所在的代码块内有效
    let name="mark";

