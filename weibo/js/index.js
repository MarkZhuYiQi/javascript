/**
 * Created by Administrator on 2016/8/1.
 */




window.onload=function(){
    //header
    $().getClass("member").hover(function(){
        $(this).css("background","url(images/arrow2.png) no-repeat right center");
        $().getTagName("ul").show();
    },function(){
        $(this).css("background","url(images/arrow.png) no-repeat right center");
        $().getTagName("ul").hide();
    });

    //登录框
    var login=$().getId("login");
    var screen=$().getId("screen");
    //想要实现改变大小，控件不出视野范围，就要使用连缀，否则获取不到elements里面没有login控件，无法控制！！！！！
    login.center(350,250).resize(function(){
        // login.center(350,250);   //窗口改变大小，控件始终居中
        if(login.css("display")=="block"){  //如果登录框显示才锁屏
            screen.lock();
        }
    });
    $().getClass("login").click(function(){
        login.css("display","block");
        //锁屏遮罩
        login.center(350,250);
        $().getId("screen").lock();
    });
    $().getClass("close").click(function(){
        login.css("display","none");
        //解锁
        $().getId("screen").unlock();
    });


    //拖拽登录框,默认没有这个方法，加载插件后，需要通过继承调用
    login.drag([$().getTagName("h2").getElementBack(0)]);


};