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

    //初始化操作，刷新表单重置所有内容
    $("form").first().reset();


    //鼠标验证,获得form元素节点，把输入框name付给form方法，
    // 方法将user对象给form，但是返回的是base对象，还需要用first返回对象（其实里面就一个对象）
    // $("form").form("user").value("888");
    // 用户名验证
    $("form").form("user").bind("focus",function(){
        $("#reg .info_user").css("display","block");
        $("#reg .error_user").css("display","none");
        $("#reg .succ_user").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","none");
            $("#reg .succ_user").css("display","none");
        }else if(!check_user()){
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","block");
            $("#reg .succ_user").css("display","none");
        }else{
            $("#reg .info_user").css("display","none");
            $("#reg .error_user").css("display","none");
            $("#reg .succ_user").css("display","block");
        }
    });
    function check_user(){
        if(/[\w]{2,20}/.test(trim($("form").form("user").value())))return true;
    }

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
            if(check_pass()){
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
        check_pass();
    });



    //密码验证封装成函数
    function check_pass(){
        var value=trim($("form").form("pass").value());
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
        }else if(check_notpass()){
            $("#reg .info_notpass").css("display","none");
            $("#reg .error_notpass").css("display","none");
            $("#reg .succ_notpass").css("display","block");
        }else{
            $("#reg .info_notpass").css("display","none");
            $("#reg .error_notpass").css("display","block");
            $("#reg .succ_notpass").css("display","none");
        }
    });
    function check_notpass(){
        if(trim($("form").form("pass").value())==trim($("form").form("notpass").value())){
            return true;
        }
    }
    $("form").form("ques").bind("change",function(){
        if(check_ques())$("#reg .error_ques").css("display","none");
    });
    function check_ques(){
        if($("form").form("ques").value()!=0)return true;
    }

    //确认回答
    $("form").form("ans").bind("focus",function(){
        $("#reg .info_ans").css("display","block");
        $("#reg .error_ans").css("display","none");
        $("#reg .succ_ans").css("display","none");
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_ans").css("display","none");
        }else if(check_ans()){
            $("#reg .info_ans").css("display","none");
            $("#reg .error_ans").css("display","none");
            $("#reg .succ_ans").css("display","block");
        }else{
            $("#reg .info_ans").css("display","none");
            $("#reg .error_ans").css("display","block");
            $("#reg .succ_ans").css("display","none");
        }
    });
    function check_ans(){
        if(trim($("form").form("ans").value()).length>=2 && trim($("form").form("ans").value()).length<=32){
            return true;
        }
    }



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
        }else if(check_email()){
            $("#reg .info_email").css("display","none");
            $("#reg .error_email").css("display","none");
            $("#reg .succ_email").css("display","block");
        }else{
            $("#reg .info_email").css("display","none");
            $("#reg .error_email").css("display","block");
            $("#reg .succ_email").css("display","none");
        }
    });
    function check_email(){
        if(/^[\w\-_]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($("form").form("email").value()))){
            return true;
        }
    }

    //电子邮件键入
    $("form").form("email").bind("keyup",function(event){
        if($(this).value().indexOf("@")==-1) {
            $("#reg .all_email").css("display","block");
            $("#reg .all_email li span").html($(this).value());
        }else{
            $("#reg .all_email").css("display","none");
        }
        var length=$("#reg .all_email li").length();
        if(event.keyCode==40){
            //表示按方向键下
            // alert(length);
            if(this.index==undefined ||this.index>=length-1){
                this.index=0;
            }else{
                this.index++;
            }
            $("#reg .all_email li").css("background","#fff");
            $("#reg .all_email li").css("color","#666");
            $("#reg .all_email li").getElement(this.index).css("background","#e5edf2");
            $("#reg .all_email li").getElement(this.index).css("color","#369");
        }
        if(event.keyCode==38){
            //表示按方向键下
            // alert(length);
            if(this.index==undefined ||this.index<=0){
                this.index=length-1;
            }else{
                this.index--;
            }
            $("#reg .all_email li").css("background","#fff");
            $("#reg .all_email li").css("color","#666");
            $("#reg .all_email li").getElement(this.index).css("background","#e5edf2");
            $("#reg .all_email li").getElement(this.index).css("color","#369");
        }
        if(event.keyCode==13){
            $(this).value($("#reg .all_email li").getElement(this.index).text());
            $("#reg .all_email").css("display","none");
            this.index=undefined;
        }


    });
    //电子邮件点击获取
    $("#reg .all_email li").bind("mousedown",function(){
        $("form").form("email").value($(this).text());
    });

    //电子邮件补全系统
    $("#reg .all_email li").hover(function(){
        $(this).css("background","#e5edf2");
        $(this).css("color","#369");
    },function(){
        $(this).css("background","#fff");
        $(this).css("color","#666");
    });

    //年月日
    var year = $("form").form("year");
    var month = $("form").form("month");
    var day = $("form").form("day");
    //注入年
    for(var i=1950;i<=2016;i++){
        year.first().add(new Option(i,i),undefined);
    }
    //注入月
    for(var j=1;j<=12;j++){
        month.first().add(new Option(j,j),undefined);
    }
    //日
    var day30=[4,6,9,11];
    var day31=[1,3,5,7,8,10,12];

    year.bind("change",select_day);     //不可以加括号，直接把函数拿过来
    month.bind("change",select_day);


    function select_day(){
        if(year.value()!=0 && month.value()!=0){
            day.first().options.length=1;   //options长度可以赋值！
            var days=null;
            if(inArray(day31,parseInt(month.value()))){
                days=31;
            }else if(inArray(day30,parseInt(month.value()))){
                days=30;
            }else{
                if(parseInt(year.value())%4==0 && parseInt(year.value())%100!=0 || parseInt(year.value())%400==0){
                    days=29;
                }else{
                    days=28;
                }
            }
            for(var i=1;i<=parseInt(days);i++){
                day.first().add(new Option(i,i),undefined);
            }
        }else{
            day.first().options.length=1;
        }
    }
    day.bind("change",function(){
        if(check_birth()){
            $("#reg .error_birth").css("display","none");
        }
    });
    function check_birth(){
        if(year.value()!=0 && month.value()!=0 && day.value()!=0){
            return true;
        }
    }

//备注框添加文字
    $("form").form("ps").bind("keyup",check_ps).bind("paste",function(){
        //直接粘贴读取不到，先读取后粘贴，延后1ms，先粘贴再读取内容
        setTimeout(check_ps,1);
    });

//清尾
    $("#reg .ps .clear").click(function(){
        $("form").form("ps").value($("form").form("ps").value().substring(0,200));
        check_ps();
    });



    function check_ps(){
        var num=200-$("form").form("ps").value().length;
        if(num>=0){
            $("#reg .ps").getElement(0).css("display","block");
            $("#reg .ps .num").getElement(0).html(num);
            $("#reg .ps").getElement(1).css("display","none");
            return true;
        }else{
            $("#reg .ps").getElement(0).css("display","none");
            $("#reg .ps").getElement(1).css("display","block");
            $("#reg .ps .num").getElement(1).html(Math.abs(num)).css("color","red");
            return false;
        }
    }


    //如果什么也没有填写也要检测是否提交
    $("form").form('sub').click(function(){
        var flag=true;
        if(!check_user()){
            flag=false;
            $("#reg .error_user").css("display","block");
        }
        if(!check_pass()){
            flag=false;
            $("#reg .error_pass").css("display","block");
        }
        if(!check_notpass()){
            flag=false;
            $("#reg .error_pass").css("display","block");
        }
        if(!check_ans()){
            flag=false;
            $("#reg .error_ans").css("display","block");
        }
        if(!check_email()){
            flag=false;
            $("#reg .error_email").css("display","block");
        }
        if(!check_ques()){
            flag=false;
            $("#reg .error_ques").css("display","block");
        }
        if(!check_birth()){
            flag=false;
            $("#reg .error_birth").css("display","block");
        }
        if(!check_ps()){
            flag=false;
        }

        if(flag){
            $("form").first().submit();
        }
    });


    //轮播器初始化
    // $("#banner img").css("display","none");
    // $("#banner img").getElement(0).css("display","block");
    $("#banner img").opacity(0);
    $("#banner img").getElement(0).opacity(100);
    $("#banner ul li").getElement(0).css("color","#333");
    $("#banner strong").html($("#banner img").getElement(0).attr("alt"));
    // alert($("#banner img").getElement(0).first().alt);  //getElement返回的是this，无法获得目标对象，所以要用first（）

    //自动循环轮播器
    //轮播器计数器
    var banner_index=1;
    //轮播器种类
    var banner_type=2;  //1表示透明度，2表示上下滚动
    var banner_timer=setInterval(banner_fn,1000);


    //手动轮播器
    $("#banner ul li").hover(function(){
        clearInterval(banner_timer);
        if($(this).css("color")!="rgb(51,51,51)"||$(this).css("color")!="#333") {
            banner(this, banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
        }
    },function(){
        banner_index=$(this).index()+1;
        setInterval(banner_fn,1000);
    });

    function banner(obj,prev){
        // $("#banner img").css("display","none");
        // $("#banner img").getElement($(obj).index()).css("display","block");
        $("#banner ul li").css("color","#999");
        $(obj).css("color","#333");
        $("#banner strong").html($("#banner img").getElement($(obj).index()).attr("alt"));
        if(banner_type==1) {
            $("#banner img").getElement(prev).animation({
                attr: "o",
                final: 0
            }).css("z-index", 1);
            $("#banner img").getElement($(obj).index()).animation({
                attr: "o",
                final: 100
            }).css("z-index", 2);
        }else if(banner_type==2){
            $("#banner img").getElement(prev).animation({
                attr: "y",
                final: 150
            }).css("z-index", 1).opacity(100);
            $("#banner img").getElement($(obj).index()).animation({
                attr: "y",
                final: 0
            }).css("top","-150px").css("z-index", 2).opacity(100);
        }
    }
    function banner_fn(){
        if(banner_index>=$("#banner ul li").length())banner_index=0;
        // banner($("#banner ul li").getElement(banner_index)); //这里面传过去的base对象
        banner($("#banner ul li").getElement(banner_index).first(),banner_index==0?$("#banner ul li").length()-1:banner_index-1);    //这是LI对象本体
        banner_index++;
    }
});

