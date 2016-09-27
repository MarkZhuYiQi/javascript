/**
 * Created by Administrator on 2016/9/27.
 */
/*
function learn(something){
    console.log(something);
}
function we(callback,something){
    something+=' is cool';
    callback(something);
}
we(learn,'nodejs');
*/

/*
function we(callback,something){
    something+=' is cool';
    callback(something);
}

we((something)=>{
    console.log(something);
},'nodejs');
*/
var c=0;
function printIt(c){
    console.log(c);
}
function plus(callback){
    setTimeout(function(){
        c+=1;
        callback(c);
    },1000);
};

plus(printIt);