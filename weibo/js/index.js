/**
 * Created by Administrator on 2016/8/1.
 */

$(function(){
    //个人中心
    $("#header .member").hover(function(){
        $("#header .member").css("background","url(images/arrow2.png) no-repeat right center");
        $("header .member_ul").show().animation({
            "speed":5,
            mul:{
                o:100,
                h:110
            }
        });
    },function(){
        $("#header .member").css("background","url(images/arrow.png) no-repeat right center");
        $("header .member_ul").animation({
            "speed":5,
            mul:{
                o:0,
                h:0
            },
            "fn":function(){
                $("header .member_ul").hide();
            }
        });
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
        //锁屏遮罩
        login.center(350,250).css("display","block");;
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
    });
    //需要先渐变再关闭
    $("#login .close").click(function(){
        login.css("display","none");
        //解锁
        screen.animation({
            "attr":"o",
            "final":0,
            "speed":5,
            "fn":function(){
                screen.unlock();
            }
        });
    });
    //拖拽登录框,默认没有这个方法，加载插件后，需要通过继承调用
    // login.drag([$("h2").getElementBack(0)]);
    login.drag($("#login h2").first(),$(".other").first());

//分享按钮初始化位置
    $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    $("#shared").resize(function(){
        $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    });
    addEvent(window,"scroll",function(){
        $("#shared").animation({
            "final":getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2,
            "target":getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2,
            "attr":"y",
            "speed":5
        });
    });

//分享收缩效果
    $("#shared").hover(function(){
        $("#shared").animation({
            "attr":"x",
            "final":0,
            "start":-211,
            "speed":5,
            "effect":"gradient"
        });
    },function(){
        $("#shared").animation({
            "attr":"x",
            "final":-211,
            "start":0,
            "speed":5,
            "effect":"gradient"
        });
    });
    //滑动导航,鼠标触发事件默认在最表层
    $("#nav .about li").hover(function(){
        var target=$(this).first().offsetLeft+20;
        $("#nav .nav_bg").animation({
            speed:5,
            attr:"x",
            final:target,
            fn:function(){
                $("#nav .white").animation({
                    attr:"x",
                    final:-target+20
                });
            }
        })
    },function(){
        var target=$(this).first().offsetLeft+20;
        $("#nav .nav_bg").animation({
            speed:5,
            attr:"x",
            final:20,
            fn:function(){
                $("#nav .white").animation({
                    attr:"x",
                    final:0
                });
            }
        })
    });
    //左侧菜单
    $("#sidebar h2").toggle(function(){
        $(this).next().animation({
            mul:{
                h:0,
                o:0
            }
        });
    },function(){
        $(this).next().animation({
            mul:{
                h:150,
                o:100
            }
        });
    })

});

