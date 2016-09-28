/**
 * Created by szl4zsy on 9/28/2016.
 */
var EventEmitter=require("events").EventEmitter;
var life=new EventEmitter();
function water(who){

}
life.on("求安慰",function(who){
    console.log("给"+who+"倒水");
});
life.on("求安慰",function(who){
    console.log("给"+who+"做饭");
});
life.on("求安慰",function(who){
    console.log("给"+who+"洗衣服");
});

life.removeListener("求安慰",water);
life.removeAllListeners();


life.emit("求安慰","mark");

// console.log(life.listeners('求安慰').length);
// console.log(EventEmitter.listenerCount(life,"求安慰"));
