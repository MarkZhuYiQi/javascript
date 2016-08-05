/**
 * Created by Administrator on 2016/8/1.
 */

$(function(){
    //个人中心
    $("#header .member").hover(function(){
        $(this).css("background","url(images/arrow2.png) no-repeat right center");
        $("header .member_ul").show();
    },function(){
        $(this).css("background","url(images/arrow.png) no-repeat right center");
        $("header .member_ul").hide();
    });
    //登录框
    var login=$("#login");
    var screen=$("#screen");
    //想要实现改变大小，控件不出视野范围，就要使用连缀，否则获取不到elements里面没有login控件，无法控制！！！！！
    login.center(350,250).resize(function(){
        // login.center(350,250);   //窗口改变大小，控件始终居中
        if(login.css("display")=="block"){  //如果登录框显示才锁屏
            screen.lock();
        }
    });
    $("#header .login").click(function(){
        login.css("display","block");
        //锁屏遮罩
        login.center(350,250);
        screen.lock();
    });
    $("#login .close").click(function(){
        login.css("display","none");
        //解锁
        screen.unlock();
    });
    //拖拽登录框,默认没有这个方法，加载插件后，需要通过继承调用
    // login.drag([$("h2").getElementBack(0)]);
    login.drag($("#login h2").first(),$(".other").first());

//分享按钮初始化位置
    $("#shared").css("top",(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
//分享收缩效果
    $("#shared").hover(function(){
        $(this).animation({
            "attr":"x",
            "final":0,
            "start":-211,
            "effect":"gradient"
        });
    },function(){
        $(this).animation({
            "attr":"x",
            "final":-211,
            "start":0,
            "effect":"gradient"
        });
    });
});

