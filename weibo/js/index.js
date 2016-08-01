/**
 * Created by Administrator on 2016/8/1.
 */
window.onload=function(){
    $().getClass("member").hover(function(){
        // $().getClass("member").css("background","url(images/arrow2.png) no-repeat right center");
        $(this).css("background","url(images/arrow2.png) no-repeat right center");
        $().getTagName("ul").show();
    },function(){
        // $().getClass("member").css("background","url(images/arrow.png) no-repeat right center");
        $(this).css("background","url(images/arrow.png) no-repeat right center");
        $().getTagName("ul").hide();
    });
};