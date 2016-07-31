/**
 * Created by Administrator on 2016/7/31.
 */
/*
    //json简单值
        10
        "hello"
        true
        null

    //json对象表示
    {
        "name" : "Lee",
        "age" : 100
    }

    //json数组
    [100,"lee",true];

    [
        {
                "title":"a",
                "num":1
        },
        {
                "title":"b",
                "num":2
        },
        {
                "title":"c",
                "num":3
        }
    ]
*/

//模拟加载json字符串，var json=load(JSON.json),把字符串加载进来并赋值给变量
var json='[{"title":"a","num":1},{"title":"b","num":2}]';   //模拟加载字符串
// alert(json);        //是一条字符串，需要进行解析

/*
//1.eval函数,很不安全
var box=eval(json);
alert(box[0].title);
*/

//2.IE7以下要用
// alert(JSON);
var box=JSON.parse(json,function(key,value){
    if(key=="title"){
        return "Mr."+value;
    }else{
        return value;
    }
});
// alert(box);
alert(box[0].title);

//js转换成json
var box=[
    {
        title:'a',
        num:1,
        height:185,
        toJSON:function(){  //加上这个就只返回这个，别的忽略
            return this.num;
        }
    },{
        title:'b',
        num:2,
        height:165,
        toJSON:function(){
            return this.num;
        }
    }
];
// var json=JSON.stringify(box,['title','height']);    //指定需要获得的键
// alert(json);     //转换成json字符串

/*
//对结果进行一些修改
var json=JSON.stringify(box,function(key,value){
    if(key=="title"){
        return "Mr."+value;
    }else{
        return value;
    }
});
alert(json);        //根据要求转换
//火狐3.5 3.6最初支持json时stringify有bug，执行function会出错
*/

/*
var json=JSON.stringify(box,["title","height"],4);  //第三个参数设置缩进
alert(json);        //带缩进效果，看起来更清爽
*/

var json=JSON.stringify(box,null,4);
alert(json);


//json实际上是字符串
//json对象和数组，少了分号，少了变量赋值了，而且本身以字符串表示