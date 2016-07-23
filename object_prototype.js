/**
 * Created by Administrator on 2016/7/23.
 */
//面向对象与原型

/*
var box=new Object();
box.name="Lee";
box.age=100;
box.run=function(){
    return this.name+this.age+"running!";
};
alert(box.run());
*/
/*
//工厂模式,解决重复实例化的问题，但是无法搞清楚他们到底是哪个对象的实例
function createObject(name,age){
    var obj=new Object();
    obj.name=name;
    obj.age=age;
    obj.run=function(){
        return this.name+this.age+"running";
    };
    return obj;
}
var box1=createObject('lee',100);
var box2=createObject("mark",200);
alert(box1.run());
alert(box2.run());
*/
/*
//采用构造函数创建特定的对象
function Box(name,age){
    this.name=name;
    this.age=age;
    this.run=function(){
        return this.name+this.age+"running!";
    }
}
var box1=new Box("lee",100);
var box2=new Box("jack",200);
// alert(box1.run());
// alert(box1 instanceof Box);
/!*
构造函数方法没有显示的创建对象（new），后台执行new Object();
直接将属性和方法复制给this对象
没有return语句
 *!/
var o=new Object();
// Box.call(o,"Jack",200);     //对象冒充调用，冒充o的作用域
// alert(o.run());
alert(box1.name==box2.name);    //true，属性值相等
alert(box1.run==box2.run);      //false，方法引用地址,作用域不一样
alert(box1.run()==box2.run());  //true，方法值相等，因为传参一致
*/
/*
//把构造函数里的方法用new Function()方法来代替，得到一样的效果。
function Box(name,age) {
    this.name=name;
    this.age=age;
    this.run=new Function("return this.name+this.age+'running...'");
}
//但是没有必要，只是证明引用地址一致。
function Box(name,age){
    this.name=name;
    this.age=age;
    this.run=run;
}
function run(){
    return this.name+this.age+"running";
}
//通过全局函数run()来解决保证引用地址一致的问题，但在全局的this在对象中调用是Box本身，而当做普通函数调用时，this代表window。
*/

/*
//创建原型对象
function Box(){}    //声明一个构造函数
Box.prototype.name='Lee';
Box.prototype.age=100;
Box.prototype.run=function(){
    return this.name+this.age+"运行中";
};
var box1=new Box();
var box2=new Box();
alert(box1.run===box2.run);     //true，引用地址一致
alert(box1.__proto__);  //指向Object
alert(Box.prototype.isPrototypeOf(box1));    //只要实例化对象，即都会指向。
//判断属性是存在实例中，还是原型中
function isProperty(object,property){
    return !object.hasOwnProperty(property)&&(property in object);
}
//hasOwnProperty检测属性是否存在实例中，in检测属性是否存在实例或原型中。
var box=new Box();
alert(isProperty(box,'name'));
*/
/*
function Box(){};
Box.prototype={
    name:"Lee",
    age:100,
    run:function(){
        return this.name+this.age+"running";
    }
};
//使用字面量方式创建 constructor会指向Object而不是实例，构造方式则相反
var box = new Box();
alert(box instanceof Box);
alert(box instanceof Object);
alert(box.constructor==Box);        //字面量方式返回false
alert(box.constructor==Object);     //字面量方式返回true
*/

/*
//原型模式创建的对象，初始化的值全部一致，共享
function Box(){};
Box.prototype={
    constructor:Box,
    name:'Lee',
    age:'100',
    run:function(){
        return this.name+this.age+"running";
    }
};
Box.prototype.age=200;

var box=new Box();
alert(box.run());*/

/*
//动态原型模式,原型值初始化一次
function Box(name,age){
    this.name=name;
    this.age=age;
    if(typeof this.run!='function'){
        Box.prototype.run=function(){
            return this.name+this.age+'running';
        };
    }
}
var box=new Box('Lee',100);
alert(box.run());*/

/*
//继承
function Box(){
    this.name='Lee';
}
function Desk(){
    this.age=100;
}
Desk.prototype=new Box();   //Desk继承了Box，通过原型，形成链条
var desk=new Desk();
alert(desk.name);       //获得继承的属性
function Table(){
    this.level='aaaaa';
}
Table.prototype=new Desk();
var table=new Table();
alert(table.name);      //爷爷的属性
*/

/*
//原型链+借用构造函数，组合继承
function Box(age){
    this.name=['lee','mark'];
    this.age=age;
}
Box.prototype.run=function(){
    return this.name+this.age;
}
function Desk(age){
    Box.call(this,age);     //冒充Box作用域
}
Desk.prototype=new Box();   //原型链继承
var desk=new Desk(100);
alert(desk.run());
*/

/*
//原型式继承
function obj(o){
    function F(){};     //创建一个构造函数
    F.prototype=o;      //字面量赋给构造函数的原型，相当于Desk.prototype=new Box();
    return new F();     //最终返回出实例化的构造函数
}
var box={
    name:'Lee',
    arr:['gege','meimei']
};
//box1就是new F();
var box1=obj(box);
alert(box1.name);
box1.name='Jack';
alert(box1.name);
box1.arr.push("parents");       //这是引用类型，修改的是原型
alert(box1.arr);
var box2=obj(box);
alert(box2.name);
alert(box2.arr);        //这个数组被共享了
*/

//寄生组合继承
//将o的原型交给F的原型
function obj(o){
    function F(){};
    F.prototype=o;
    return new F();
}
function create(box,desk){
    var f=obj(box.prototype);   //这个f对象存着box的原型
    f.constructor=desk;         //将指针调回到desk
    desk.prototype=f;           //将包含box原型的对象交给desk的原型
}
function Box(name){
    this.name=name;
    this.arr=["gege","meimei","parents"];
}
Box.prototype.run=function(){
    return this.name;
};
function Desk(name,age){
    Box.call(this,name);
    this.age=age;
}
create(Box,Desk);       //这句话用来替代Desk.prototype=new Box();
var desk=new Desk('Lee',100);
desk.arr.push('jiejie');
alert(desk.arr);
alert(desk.run());
alert(desk.constructor);
var desk2=new Desk('jack',200);
alert(desk2.arr);           //引用类型共享解决