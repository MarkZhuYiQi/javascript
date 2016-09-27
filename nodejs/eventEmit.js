/**
 * Created by szl4zsy on 9/27/2016.
 */

/*
const events=require("events");
//创建eventEmitter对象
var eventEmitter=new events.EventEmitter();
//创建事件处理程序
var connectHandler=function connected(){
    console.log("连接成功");
};
//触发data_received事件
eventEmitter.emit('data_received');
//绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);
//使用匿名函数绑定data_received事件
eventEmitter.on('data_reveiced',()=>{
    console.log("数据接收成功");
});
//触发connection事件
eventEmitter.emit('connection');
console.log("程序执行完毕");
*/


/*
const events=require("events");
var event=new events.EventEmitter();
event.on('someEvent',()=>{
    console.log("事件触发");
});
setTimeout(()=>{
    event.emit('someEvent');
},1000);
    */
/*
const events=require("events");
var event=new events.EventEmitter();
event.on('someEvent',(arg1,arg2)=>{
    console.log("listener1",arg1,arg2);
});
event.on('someEvent',(arg1,arg2)=>{
    console.log("listener2",arg1,arg2);
});
event.emit('someEvent',"1,2");
    */
//on用于绑定，emit用于触发

var events=require("events");
var event=new events.EventEmitter();

var listener1=function listener1(){
    console.log("listener1 running");
};
var listener2=function listener2(){
    console.log("listener2 running");
};

event.addListener('connection',listener1);
event.on('connection',listener2);

var eventListeners=require("events").EventEmitter.listenerCount(event,'connection');
console.log(eventListeners+"listeners bind on the event");

event.emit('connection');

event.removeListener('connection',listener1);
console.log("listener1 is not bind on event ever");

eventListeners=require("events").EventEmitter.listenerCount(event,'connection');
console.log(eventListeners+"listeners bind on event");

console.log('finish!');