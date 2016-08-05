/**
 * Created by Administrator on 2016/8/4.
 */
/*
$(function(){
    

    // box.style.left=500+'px';
    // box.style.top=500+'px';
    // alert(box.offsetLeft);
    // alert(getStyle(box,"top"));
    // alert(box.style.left);
    var box=document.getElementById("box");
    var final_x=500;
    var final_y=500;
    setInterval(function() {
        var xpos = getStyle(box, "left");
        var ypos = getStyle(box, "top");
        if (xpos < final_x) {
            var dist = Math.ceil((final_x - xpos) / 10);
            xpos += dist;
        }
        if (xpos > final_x) {
            var dist = Math.ceil((xpos - final_x) / 10);
            xpos -= dist;
        }
        if (ypos < final_y) {
            var dist = Math.ceil((final_y - ypos) / 10);
            ypos += dist;
        }
        if (ypos > final_y) {
            var dist = Math.ceil((ypos - final_y) / 10);
            ypos -= dist;
        }
        box.style.left = xpos + "px";
        box.style.top = ypos + "px";
    },30);
});
*/

/*
    //移动动画
    $(function(){
        $("#btn").click(function(){
            $("#box").animation({
                "attr":"y",
                // "alter":200,
                "final":10,
                "start":100,
                "timestep":30,
                "step":2,
                "effect":"gradient",
                "speed":30
            });
        });
    });
    //透明度
*/
