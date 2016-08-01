/**
 * Created by SZL4ZSY on 8/1/2016.
 */
window.onload=function(){
    // $().getId("box").html("pox").css("color","red");
    // alert($().getId("box").html());
    // alert($().getId("box").css("color"));
    // alert($().getClass("red").elements.length);
    // alert($().getClass("red").css("color","red"));
    // alert($().getClass("red").getElement(2).elements.length);
    // $().getClass("red").getElement(2).css("color","red");
    // $().getClass("red").css("color","red");
    // $().getClass("red","aaa").getElement(2).css("color","green");


//下
//     $().getId("box").css("color","red");
//     $().getId("pox").css("color","green");

    $().getId("box").addClass("a").addClass("b").removeClass("b");
    $().addRule(0,"body","background:green",0);
    $().removeRule(0);
};
