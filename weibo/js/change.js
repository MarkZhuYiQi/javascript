/**
 * Created by SZL4ZSY on 8/8/2016.
 */
$(function(){
    $("#btn").toggle(function(){
        $("#box").css("background","blue");
    },function(){
        $("#box").css("background","red");
    },function(){
        $("#box").css("background","yellow");
    },function(){
        $("#box").css("background","green");
    })
});






