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
    login.drag($("#login h2").first(),$(".other").first());

    //注册框
    var reg=$("#reg");
    //想要实现改变大小，控件不出视野范围，就要使用连缀，否则获取不到elements里面没有login控件，无法控制！！！！！
    login.center(600,550).resize(function(){
        // login.center(350,250);   //窗口改变大小，控件始终居中
        if(reg.css("display")=="block"){  //如果注册框显示才锁屏
            screen.lock();
        }
    });
    $("#header .reg").click(function(){
        //锁屏遮罩
        reg.center(600,550).css("display","block");;
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
    });
    //需要先渐变再关闭
    $("#reg .close").click(function(){
        reg.css("display","none");
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
    reg.drag($("#reg h2").first());

//分享按钮初始化位置
    $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    $("#shared").resize(function(){
        $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    });
    $(window).bind("scroll",function(){
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
    });

    //鼠标验证,获得form元素节点，把输入框name付给form方法，
    // 方法将user对象给form，但是返回的是base对象，还需要用first返回对象（其实里面就一个对象）
    // $("form").form("user").value("888");
    $("form").form("user").bind("focus",function(){
        $("#reg .info_user").css("display","block");
        $("#reg .error_user").css("display","none");
        $("#reg .succ_user").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","none");
            $("#reg .succ_user").css("display","none");
        }else if(!/[\w]{2,20}/.test(trim($(this).value()))){
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","block");
            $("#reg .succ_user").css("display","none");
        }else{
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","none");
            $("#reg .succ_user").css("display","block");
        }
    });
    // alert($("#reg .info_user").first());
    //密码验证
    $("form").form("pass").bind("focus",function(){
        $("#reg .info_pass").css("display","block");
        $("#reg .error_pass").css("display","none");
        $("#reg .succ_pass").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())=="") {
            $("#reg .info_pass").css("display", "none");
        }else{
            if(check_pass(this)){
                $("#reg .info_pass").css("display","none");
                $("#reg .error_pass").css("display","none");
                $("#reg .succ_pass").css("display","block");
            }else{
                $("#reg .info_pass").css("display","none");
                $("#reg .error_pass").css("display","block");
                $("#reg .succ_pass").css("display","none");
            }
        }
    });

    //密码强度验证
    $("form").form("pass").bind("keyup",function(){
        check_pass(this);
    });



    //封装成函数
    function check_pass(_this){
        var value=trim($(_this).value());
        var value_length=value.length;
        var code_length=0;
        var flag=false;
        //第一个条件验证，6-20字符之间
        if(value_length>=6 && value_length<=20){
            $("#reg .info_pass .q1").html("●").css("color","green");
        }else{
            $("#reg .info_pass .q1").html("○").css("color","#666");
        }
        //第二个条件验证，祖母或数字或非空字符，任意一个即可满足
        if(value_length>0&&!/\s/.test(value)){
            $("#reg .info_pass .q2").html("●").css("color","green");
        }else{
            $("#reg .info_pass .q2").html("○").css("color","#666");
        }
        //第三个条件，任意两种混拼
        if(/[\d]/.test(value)){
            code_length++;
        }
        if(/[a-z]/.test(value)){
            code_length++;
        }
        if(/[A-Z]/.test(value)){
            code_length++;
        }
        if(/[^\w]/.test(value)){
            code_length++;
        }
        if(code_length>=2){
            $("#reg .info_pass .q3").html("●").css("color","green");
        }else{
            $("#reg .info_pass .q3").html("○").css("color","#666");
        }
        if(value_length>=10 && code_length>=3){
            $("#reg .info_pass .s1").css("color","green");
            $("#reg .info_pass .s2").css("color","green");
            $("#reg .info_pass .s3").css("color","green");
            $("#reg .info_pass .s4").css("color","green").html("高");
        }else if(value_length>=8 && code_length>=2){
            $("#reg .info_pass .s1").css("color","#f60");
            $("#reg .info_pass .s2").css("color","#f60");
            $("#reg .info_pass .s3").css("color","#ccc");
            $("#reg .info_pass .s4").css("color","#f60").html("中");
        }else if(value_length>=1){
            $("#reg .info_pass .s1").css("color","maroon");
            $("#reg .info_pass .s2").css("color","#ccc");
            $("#reg .info_pass .s3").css("color","#ccc");
            $("#reg .info_pass .s4").css("color","maroon").html("低");
        }else{
            $("#reg .info_pass .s1").css("color","#ccc");
            $("#reg .info_pass .s2").css("color","#ccc");
            $("#reg .info_pass .s3").css("color","#ccc");
            $("#reg .info_pass .s4").html("");
        }
        if(value_length>=6 && value_length<=20 && value_length>0&&!/\s/.test(value) && code_length>=2){
            return flag=true;
        }
    }
    //确认密码验证
    $("form").form("notpass").bind("focus",function(){
        $("#reg .info_notpass").css("display","block");
        $("#reg .error_notpass").css("display","none");
        $("#reg .succ_notpass").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_notpass").css("display","none");
        }else if(trim($("form").form("pass").value())==trim($("form").form("notpass").value())){
            $("#reg .info_notpass").css("display","none");
            $("#reg .error_notpass").css("display","none");
            $("#reg .succ_notpass").css("display","block");
        }else{
            $("#reg .info_notpass").css("display","none");
            $("#reg .error_notpass").css("display","block");
            $("#reg .succ_notpass").css("display","none");
        }
    });
    //确认回答
    $("form").form("ans").bind("focus",function(){
        $("#reg .info_ans").css("display","block");
        $("#reg .error_ans").css("display","none");
        $("#reg .succ_ans").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_ans").css("display","none");
        }else if(trim($("form").form("ans").value()).length>=2 && trim($("form").form("ans").value()).length<=32){
            $("#reg .info_ans").css("display","none");
            $("#reg .error_ans").css("display","none");
            $("#reg .succ_ans").css("display","block");
        }else{
            $("#reg .info_ans").css("display","none");
            $("#reg .error_ans").css("display","block");
            $("#reg .succ_ans").css("display","none");
        }
    });
    //确认电子邮件
    $("form").form("email").bind("focus",function(){
        //补全界面
        //只有在输入框中没有补全（@）时才显示补全界面
        if($(this).value().indexOf("@")==-1) {
            $("#reg .all_email").css("display","block");
        }

        $("#reg .info_email").css("display","block");
        $("#reg .error_email").css("display","none");
        $("#reg .succ_email").css("display","none");
    }).bind("blur",function(){

        //补全界面
        $("#reg .all_email").css("display","none");

        if(trim($(this).value())==""){
            $("#reg .info_email").css("display","none");
        }else if(/^[\w\-_]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))){
            $("#reg .info_email").css("display","none");
            $("#reg .error_email").css("display","none");
            $("#reg .succ_email").css("display","block");
        }else{
            $("#reg .info_email").css("display","none");
            $("#reg .error_email").css("display","block");
            $("#reg .succ_email").css("display","none");
        }
    });
    //电子邮件键入
    $("form").form("email").bind("keyup",function(){
        if($(this).value().indexOf("@")==-1) {
            $("#reg .all_email").css("display","block");
            $("#reg .all_email li span").html($(this).value());
        }else{
            $("#reg .all_email").css("display","none");
        }
    });
    //电子邮件点击获取





    $("#reg .all_email li").bind("mousedown",function(){
        alert($(this).first().textContent);innerText
    });








    //电子邮件补全系统
    $("#reg .all_email li").hover(function(){
        $(this).css("background","#e5edf2");
        $(this).css("color","#369");
    },function(){
        $(this).css("background","#fff");
        $(this).css("color","#666");
    })
});

