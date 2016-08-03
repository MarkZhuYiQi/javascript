/**
 * Created by SZL4ZSY on 8/3/2016.
 */
window.onload=function(){

};

var name="window";
var object={
    name:"my object",
    getName:function(){
        var that=this;
        return function(){
            return that.name;
        }
    }
};
alert(object.getName()());