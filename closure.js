/**
 * Created by Administrator on 2016/7/23.
 */
//匿名函数以及闭包
/*
//通过表达式自我执行
(function box(){
    alert("lee");
})();
*/
/*
 //把匿名函数赋值给变量
 var box=function(){
 return "Lee";
 };
 alert(box());
 */

/*
//函数里的匿名函数，产生闭包
function box(){
    return function(){
        return "lee";
    }
}
alert(box()());
*/

/*
//通过闭包可以返回局部变量
function box(){
    var user="Lee";
    return function (){
        return user;
    };
}
alert(box()());
var b=box();
alert(b());
*/

/*
//通过闭包实现局部变量的累加
function box(){
    var age=100;
    return function(){
        age++;
        return age;
    }
}
var b=box();        //box的方法、属性、变量、构造、原型都存在了b里面
alert(b());
alert(b());         //实现累加
*/
/*
//循环里包含匿名函数
function box(){
    var arr=[];
    for(var i=0;i<5;i++){
        arr[i]=function(){
            return i;
        };
    }
    return arr;
}
var b=box();        //这个时候已经执行完毕了
alert(b.length);
for(var i=0;i<b.length;i++){
    alert(b[i]());
}
*/

/*
//循环里包含匿名函数 改1
function box(){
    var arr=[];
    for(var i=0;i<5;i++){
        arr[i]=(function(num){
            return num;
        })(i);
    }
    return arr;
}
var b=box();        //这个时候已经执行完毕了
for(var i=0;i<b.length;i++){
    alert(b[i]);    //这时候返回的数组了，所以不用执行
}
*/

/*

//循环里包含匿名函数 改2
function box(){
    var arr=[];
    for(var i=0;i<5;i++){
        arr[i]=(function(num){
            return function(){
                return num;
            }
        })(i);
    }
    return arr;
}
var b=box();        //这个时候已经执行完毕了
for(var i=0;i<b.length;i++){
    alert(b[i]());    //这时候返回的是一个返回函数，执行才能得到结果
}
*/

/*
//this对象
//this在全局范围是window在对象内部指向对象，但在闭包中是指向window的
var user="the window";
var obj={
    user:"the object",
    getUserFunction:function(){
        return function(){          //闭包中不属于obj，里面的this指向obj
            return this.user;
        };
    }
};
alert(obj.getUserFunction()());     //默认指向
alert(obj.getUserFunction().call(obj));
*/

/*
//模仿块级作用域
function box(count){
    for(var i=0;i<count;i++){}
    var i;
    alert(i);
    return function(){
        return i;
    }
}
box(2);
alert(box(4)());
//即使重新声明，也不会报错，只会对后期声明视而不见
*/

/*
//使用块级作用域改写
function box(count){
    (function(){
        for(var i=0;i<count;i++){}
    })();
    alert(i);
}
box(2);//这时候alert报错，无法访问i
*/

/*
//私有变量
function box(){
    var age=25;     //外部无法访问到这个变量
}
function Box(){
    var age=25;
    function run(){
        return "running...";
    }
    this.get=function(){    //让外部可以获取到公共特权方法
        return age+run();
    }
}
var text=new Box();
alert(text.get());
*/

/*
//通过构造函数传参访问私有变量,但是多次调用会多次创建，需要用静态私有变量解决问题
function Person(value){
    var user=value;
    this.getUser=function(){
        return user;
    };
    this.setUser=function(value){
        user=value;
    };
}
text=new Person("Mark");
alert(text.getUser());
text.setUser("Zhu");
alert(text.getUser());
*/

/*
(function(){
var age=100;
function run(){
    return "running!";
}
//采用这种而不是function Box(){}因为如果用后面这种就变成了私有函数，无法在全局访问到。
Box=function(){};   //构造方法
Box.prototype.go=function(){    //原型方法
    return age+run();
};
})();
var box=new Box();
alert(box.go());

(function(){
    var user="";
    Person=function(value){
        user=value;
    };
    Person.prototype.getUser=function(){
        return user;
    };
    Person.prototype.setUser=function(value){
        user=value;
    };
})();
//原型导致方法共享了，user变成了静态属性，共享于不同对象之间
*/

/*
//模块模式
var box={
    age:100,
    run:function(){
        return "running...";
    }
};
*/

/*//私有化变量和函数
var box=function(){
    var age=100;
    function run(){
        return "running";
    }
    return {            //直接返回对象
        go:function(){
            return age+run();
        }
    }
}();
var box=function(){
    var age=100;
    function run(){
        return "running";
    }
    var obj={
        go:function(){
            return age+run();
        }
    };
    return obj;
}()
//两者等价*/

function Desk(){};
var box=(function(){
    var age=100;
    function run(){
        return "运行中..";
    }
    var desk=new Desk();
    desk.go=function(){
        return age+run();
    };
    return desk;
})();
alert(box.go());
