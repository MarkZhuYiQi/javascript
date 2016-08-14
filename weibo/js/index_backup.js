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
        login.center(350,250).show();;
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
    });
    //需要先渐变再关闭
    $("#login .close").click(function(){
        login.hide();
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
        reg.center(600,550).show();;
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
    });
    //需要先渐变再关闭
    $("#reg .close").click(function(){
        reg.hide();
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

    //点击登陆后的动作
    $("form").getElement(1).form("sub").click(function(){
        if(/[\w]{2,20}/.test(trim($("form").getElement(1).form("user").value())) && $("form").getElement(1).form("pass").value().length>=6) {
            var _this=this;     //指向按钮
            $("#loading p").html("正在尝试登陆...");
            $("#loading").show().center("200","40");
            _this.setAttribute("disabled","disabled");
            $(_this).css("background-position","right");
            ajax({
                method: "post",
                url: "login.php",
                data: $("form").getElement(1).serialize(),
                success: function (text) {
                    $("#loading").css("display", "none");
                    // alert(text);
                    if(text==1){    //失败
                        $("#login .info").html("用户名或密码不正确！");
                    }else if(parseInt(text)==0){ //成功
                        $("#login .info").html("");
                        $("#success").css("display", "block").center(200, 40);
                        $("#success p").html("登陆成功！");
                        setCookie("user",trim($("form").getElement(1).form("user").value()));
                        setTimeout(function () {
                            $("#success").css("display", "none");
                            login.css("display", "none");
                            $("form").getElement(1).first().reset();
                            screen.animation({
                                attr: "o",
                                final: 0,
                                "fn": function () {
                                    screen.unlock();
                                }
                            });
                            $("#header .reg").hide();
                            $("#header .login").hide();
                            $("#header .info").show().html(getCookie("user")+" 您好！");
                        }, 1500);
                    }
                    $(_this).css("background-position", "left");
                    _this.removeAttribute("disabled");
                },
                async: true
            });
        }else{
            $("#login .info").html("用户名或密码不合法！");
        }
    });




//分享按钮初始化位置
    $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    $("#shared").resize(function(){
        $("#shared").css("top",getScroll().top+(getInner().height-parseInt(getStyle($("#shared").first(),"height")))/2+"px");
    });
    $(window).bind("scroll",function() {
        setTimeout(verticalCenter,100);
    });
    function verticalCenter(){
        $("#shared").animation({
            "final": getScroll().top + (getInner().height - parseInt(getStyle($("#shared").first(), "height"))) / 2,
            "target": getScroll().top + (getInner().height - parseInt(getStyle($("#shared").first(), "height"))) / 2,
            "attr": "y",
            "speed": 5
        })
    }
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
    $("form").getElement(0).first().reset();


    //鼠标验证,获得form元素节点，把输入框name付给form方法，
    // 方法将user对象给form，但是返回的是base对象，还需要用first返回对象（其实里面就一个对象）
    // $("form").getElement(0).form("user").value("888");
    // 用户名验证
    $("form").getElement(0).form("user").bind("focus",function(){
        $("#reg .info_user").show();
        $("#reg .error_user").hide();
        $("#reg .succ_user").hide();
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_user").hide();
            $("#reg .error_user").hide();
            $("#reg .succ_user").hide();
        }else if(!check_user()){
            $("#reg .info_user").hide();
            $("#reg .error_user").show();
            $("#reg .succ_user").hide();
        }else{
            $("#reg .info_user").hide();
            $("#reg .error_user").hide();
            $("#reg .succ_user").show();
        }
    });
    function check_user(){
        var flag=true;
        if(!/[\w]{2,20}/.test(trim($("form").getElement(0).form("user").value()))) {
            $("#reg .error_user").html("用户名不合法！");
            return false;
        }else if($("#reg .error_user").css("display")=="block"){
            return false;
        }else{
            $("#reg .info_user").hide();
            $("#reg .loading").show();
            ajax({
                method: "post",
                url: "is_user.php",
                data: $("form").getElement(0).serialize(),
                async: false,        //同步
                success: function (text) {
                    if(text==1){
                        $("#reg .error_user").html("用户名已被使用！");
                        flag=false;
                    }else{
                        flag=true;
                    }
                    $("#reg .loading").hide();
                }
            });
        }
        return flag;
    }

    // alert($("#reg .info_user").first());
    //密码验证
    $("form").getElement(0).form("pass").bind("focus",function(){
        $("#reg .info_pass").show();
        $("#reg .error_pass").hide();
        $("#reg .succ_pass").hide();
    }).bind("blur",function(){
        if(trim($(this).value())=="") {
            $("#reg .info_pass").css("display", "none");
        }else{
            if(check_pass()){
                $("#reg .info_pass").hide();
                $("#reg .error_pass").hide();
                $("#reg .succ_pass").show();
            }else{
                $("#reg .info_pass").hide();
                $("#reg .error_pass").show();
                $("#reg .succ_pass").hide();
            }
        }
    });

    //密码强度验证
    $("form").getElement(0).form("pass").bind("keyup",function(){
        check_pass();
    });



    //密码验证封装成函数
    function check_pass(){
        var value=trim($("form").getElement(0).form("pass").value());
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
    $("form").getElement(0).form("notpass").bind("focus",function(){
        $("#reg .info_notpass").show();
        $("#reg .error_notpass").hide();
        $("#reg .succ_notpass").hide();
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_notpass").hide();
        }else if(check_notpass()){
            $("#reg .info_notpass").hide();
            $("#reg .error_notpass").hide();
            $("#reg .succ_notpass").show();
        }else{
            $("#reg .info_notpass").hide();
            $("#reg .error_notpass").show();
            $("#reg .succ_notpass").hide();
        }
    });
    function check_notpass(){
        if(trim($("form").getElement(0).form("pass").value())==trim($("form").getElement(0).form("notpass").value())){
            return true;
        }
    }
    $("form").getElement(0).form("ques").bind("change",function(){
        if(check_ques())$("#reg .error_ques").hide();
    });
    function check_ques(){
        if($("form").getElement(0).form("ques").value()!=0)return true;
    }

    //确认回答
    $("form").getElement(0).form("ans").bind("focus",function(){
        $("#reg .info_ans").show();
        $("#reg .error_ans").hide();
        $("#reg .succ_ans").hide();
    }).bind("blur",function(){
        if(trim($(this).value())==""){
            $("#reg .info_ans").hide();
        }else if(check_ans()){
            $("#reg .info_ans").hide();
            $("#reg .error_ans").hide();
            $("#reg .succ_ans").show();
        }else{
            $("#reg .info_ans").hide();
            $("#reg .error_ans").show();
            $("#reg .succ_ans").hide();
        }
    });
    function check_ans(){
        if(trim($("form").getElement(0).form("ans").value()).length>=2 && trim($("form").getElement(0).form("ans").value()).length<=32){
            return true;
        }
    }



    //确认电子邮件
    $("form").getElement(0).form("email").bind("focus",function(){
        //补全界面
        //只有在输入框中没有补全（@）时才显示补全界面
        if($(this).value().indexOf("@")==-1) {
            $("#reg .all_email").show();
        }

        $("#reg .info_email").show();
        $("#reg .error_email").hide();
        $("#reg .succ_email").hide();
    }).bind("blur",function(){

        //补全界面
        $("#reg .all_email").hide();

        if(trim($(this).value())==""){
            $("#reg .info_email").hide();
        }else if(check_email()){
            $("#reg .info_email").hide();
            $("#reg .error_email").hide();
            $("#reg .succ_email").show();
        }else{
            $("#reg .info_email").hide();
            $("#reg .error_email").show();
            $("#reg .succ_email").hide();
        }
    });
    function check_email(){
        if(/^[\w\-_]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($("form").getElement(0).form("email").value()))){
            return true;
        }
    }

    //电子邮件键入
    $("form").getElement(0).form("email").bind("keyup",function(event){
        if($(this).value().indexOf("@")==-1) {
            $("#reg .all_email").show();
            $("#reg .all_email li span").html($(this).value());
        }else{
            $("#reg .all_email").hide();
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
            $("#reg .all_email").hide();
            this.index=undefined;
        }


    });
    //电子邮件点击获取
    $("#reg .all_email li").bind("mousedown",function(){
        $("form").getElement(0).form("email").value($(this).text());
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
    var year = $("form").getElement(0).form("year");
    var month = $("form").getElement(0).form("month");
    var day = $("form").getElement(0).form("day");
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
            $("#reg .error_birth").hide();
        }
    });
    function check_birth(){
        if(year.value()!=0 && month.value()!=0 && day.value()!=0){
            return true;
        }
    }

//备注框添加文字
    $("form").getElement(0).form("ps").bind("keyup",check_ps).bind("paste",function(){
        //直接粘贴读取不到，先读取后粘贴，延后1ms，先粘贴再读取内容
        setTimeout(check_ps,1);
    });

//清尾
    $("#reg .ps .clear").click(function(){
        $("form").getElement(0).form("ps").value($("form").getElement(0).form("ps").value().substring(0,200));
        check_ps();
    });



    function check_ps(){
        var num=200-$("form").getElement(0).form("ps").value().length;
        if(num>=0){
            $("#reg .ps").getElement(0).show();
            $("#reg .ps .num").getElement(0).html(num);
            $("#reg .ps").getElement(1).hide();
            return true;
        }else{
            $("#reg .ps").getElement(0).hide();
            $("#reg .ps").getElement(1).show();
            $("#reg .ps .num").getElement(1).html(Math.abs(num)).css("color","red");
            return false;
        }
    }


    //如果什么也没有填写也要检测是否提交
    $("form").getElement(0).form('sub').click(function(){
        var flag=true;
        if(!check_user()){
            flag=false;
            $("#reg .error_user").show();
        }
        if(!check_pass()){
            flag=false;
            $("#reg .error_pass").show();
        }
        if(!check_notpass()){
            flag=false;
            $("#reg .error_pass").show();
        }
        if(!check_ans()){
            flag=false;
            $("#reg .error_ans").show();
        }
        if(!check_email()){
            flag=false;
            $("#reg .error_email").show();
        }
        if(!check_ques()){
            flag=false;
            $("#reg .error_ques").show();
        }
        if(!check_birth()){
            flag=false;
            $("#reg .error_birth").show();
        }
        if(!check_ps()){
            flag=false;
        }

        if(flag) {
            var _this=this;
            $(_this).css("backgroundPosition","right"); //让注册按钮变灰
            _this.disabled="disabled";                  //注销注册按钮功能
            $("#loading").show().center(200,40);
            $("#loading p").html("正在提交注册中...");
            ajax({
                method: "post",
                url: "add.php",
                data: $("form").getElement(0).serialize(),
                async: true,
                success: function (text) {
                    if(text==1){
                        $("#loading").hide();
                        $("#success").show().center(200,40);
                        $("#loading").html("注册成功！");
                        setTimeout(function(){
                            $("#success").hide();
                            reg.hide();
                            $("#reg .succ").css('display','none');
                            $("form").getElement(0).first().reset();
                            $(_this).css("background-position","left");
                            _this.disabled="";
                            screen.animation({
                                attr:"o",
                                final:0,
                                "fn":function(){
                                    screen.unlock();
                                }
                            });
                        },1500);
                    }
                }
            });
        }
    });


//--------------------------------------------------------------------------------------------------------

    //轮播器初始化
    $("#banner img").opacity(0);
    $("#banner img").getElement(0).opacity(100);
    $("#banner ul li").getElement(0).css("color","#333");
    $("#banner strong").html($("#banner img").getElement(0).attr("alt"));

    //自动循环轮播器
    //轮播器计数器
    var banner_index=1;
    //轮播器种类
    var banner_type=1;  //1表示透明度，2表示上下滚动
    var banner_timer=setInterval(banner_fn,1000);
    //手动轮播器
    $("#banner ul li").hover(function(){
        clearInterval(banner_timer);
        if($(this).css("color")!="rgb(51, 51, 51)" && $(this).css("color")!="#333") {
            banner(this, banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
        }
    },function(){
        banner_index=$(this).index()+1;
        banner_timer=setInterval(banner_fn,1000);   //这里需要添加到banner_timer否则无法正确清除
    });
    function banner(obj,prev){
        $("#banner ul li").css("color","#999");
        $(obj).css("color","#333");
        $("#banner strong").html($("#banner img").getElement($(obj).index()).attr("alt"));
        if(banner_type==1) {
            $("#banner img").getElement(prev).animation({
                attr: "o",
                final: 0
            }).css("z-index", 1);
        //这个Li指向的是li，但是不能用与连缀，所以将这个li放到Base中，并返回base对象
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
        }else if(banner_type==3){
            $("#banner img").getElement(prev).animation({
                attr:"x",
                final:900
            }).css("z-index",1).opacity(100);
            $("#banner img").getElement($(obj).index()).animation({
                attr:"x",
                final:0
            }).css("left","-900px").css("z-index",2).opacity(100);
        }
    }
    function banner_fn(){
        if(banner_index>=$("#banner ul li").length())banner_index=0;
        // banner($("#banner ul li").getElement(banner_index)); //这里面传过去的base对象
        banner($("#banner ul li").getElement(banner_index).first(),banner_index==0?$("#banner ul li").length()-1:banner_index-1);    //这是LI对象本体
        banner_index++;
    }

//--------------------------------------------------------------------------------------------------------

/*
    //轮播器初始化
    $("#banner img").opacity(0);
    $("#banner img").getElement(0).opacity(100);
    $("#banner ul li").getElement(0).css("color","#333");
    $("#banner strong").html($("#banner img").getElement(0).attr("alt"));
    var banner_type=1;
    var banner_timer=setInterval(banner_fn,1000);
    var banner_index=1; //轮播器计数器
//手动轮播器
    $("#banner ul li").hover(function(){
        clearInterval(banner_timer);
        if($(this).css("color")!="rgb(51, 51, 51)" && $(this).css("color")!="#333") {
            banner($(this).getElement(0).first(),banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
        }
    },function(){
        banner_index=$(this).index()+1;
        banner_timer=setInterval(banner_fn,1000);
    });

    function banner(obj,prev){
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
            console.log(prev);
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
        console.log(banner_index);
        if(banner_index>=$("#banner ul li").length())banner_index=0;
        banner($("#banner ul li").getElement(banner_index).first(),banner_index==0?$("#banner ul li").length()-1:banner_index-1);
        banner_index++;
    }
*/

/*
    //1.当图片进入可见区域，将图片XSRC地址替换到src中
    //2.获取图片元素到最外层定点元素的距离
    //3.获取页面可视范围的最低点位置
    // alert($(".wait_load").getElement(0).attr("src",$(".wait_load").getElement(0).attr("xsrc")));
    // alert(offsetTop($(".wait_load").first()));
    // alert(getInner().height + getScroll().top);
    var wait_load=$(".wait_load");
    wait_load.opacity(0);
    $(window).bind("scroll",function(){
        setTimeout(function(){
            for(var i=0;i < wait_load.length();i++){
                var _this=wait_load.getElementBack(i);
                if((getInner().height+getScroll().top)>=offsetTop($(_this).first())){
                    $(_this).attr("src",$(_this).attr("xsrc")).animation({
                        attr:"o",
                        final:100
                    });
                }
            }
        },100);
    });
*/

    var wait_load=$(".wait_load");
    wait_load.opacity(0);
    $(window).bind("scroll",_wait_load);
    $(window).bind("resize",_wait_load);
    function _wait_load(){
        setTimeout(function(){      //延时运行，使其更平滑
            for(var i=0;i<wait_load.length();i++){
                var _this=wait_load.getElementBack(i);
                if(getInner().height+getScroll().top>=offsetTop($(_this).first())){
                    $(_this).attr("src",$(_this).attr("xsrc")).animation({
                        attr:"o",
                        final:100
                    });
                }
            }
        },100);
    }


    //大图框
    var big=$("#photo_big");
//想要实现改变大小，控件不出视野范围，就要使用连缀，否则获取不到elements里面没有login控件，无法控制！！！！！
    big.center(620,511).resize(function(){
        // login.center(350,250);   //窗口改变大小，控件始终居中
        if(big.css("display")=="block"){  //如果注册框显示才锁屏
            screen.lock();
        }
    });
    $("#photo dl dt img").click(function(){
        //锁屏遮罩
        big.center(620,511).show();
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
        var temp_img=new Image();
        $(temp_img).bind("load",function(){     //这个方法在图片完全加载后就会执行
            $("#photo_big .big img").attr("src",temp_img.src).animation({
                attr:"o",
                final:100
            }).css("width","600px").css('height',"450px").css("top",0).opacity(0);
        });
        temp_img.src=$(this).attr("bigsrc");    //开始加载到本地缓存,ie必须放在这里才能加载
        var children=this.parentNode.parentNode;    //dl
        prev_next_img(children);
    });
//需要先渐变再关闭
    $("#photo_big .close").click(function(){
        big.hide();
        //解锁
        screen.animation({
            "attr":"o",
            "final":0,
            "speed":5,
            "fn":function(){
                screen.unlock();
            }
        });
        $("#photo_big .big img").attr("src","images/loading.gif").css("width","32px").css("height","32px").css("top","190px");
    });
//拖拽登录框,默认没有这个方法，加载插件后，需要通过继承调用
    big.drag($("#photo_big h2").first());


/*
//问题，loading的样式被大图的宽高改变了，动画渐变效果未出现
//创建一个临时的图片对象，用于保存图片
//     alert($("#photo_big .big img").first());
// alert(new Image());
    var temp_img=new Image();
    $(temp_img).bind("load",function(){
        //图片加载
        $("#photo_big .big img").attr("src",temp_img.src).animation({
            attr:"o",
            final:100
        }).css("width","600px").css("height","450px").css("top",0).opacity(0);
    });
    temp_img.src="http://localhost/javascript/weibo/images/p1big.jpg";    //开始加载到本地缓存,ie必须放在这里才能加载
*/

//图片鼠标划过
    $("#photo_big .big .left").hover(function(){
        $("#photo_big .big .sl").animation({
            attr:"o",
            final:50
        })
    },function(){
        $("#photo_big .big .sl").animation({
            attr:"o",
            final:0
        })
    });
    $("#photo_big .big .right").hover(function(){
        $("#photo_big .big .sr").animation({
            attr:"o",
            final:50
        })
    },function(){
        $("#photo_big .big .sr").animation({
            attr:"o",
            final:0
        })
    });

// 思路：首先将上/下一张图片的图片地址直接赋给photo_big中，然后根据当前img标签中存的当前图片索引index取得上一张和下一张的索引
// 然后提前加载前后两张图片，将前后两张图片地址赋给两个按钮
//图片上一张
    $("#photo_big .big .left").click(function(){
        $("#photo_big .big img").attr("src","images/loading.gif").css("width","32px").css("height","32px").css("top","190px");
        var current_img=new Image();
        $(current_img).bind("load",function(){
            //将left上的的图片地址，放到img上
            $("#photo_big .big img").attr("src",current_img.src).animation({
                attr:"o",
                final:100
            }).opacity(0).css("width","600px").css("height","450px").css("top","8px");
        });

        current_img.src=$(this).attr("src");
        //将上一页的整个图片对象保存下来，然后保存上一级的上一级父节点
        var children=$("#photo dl dt img").getElementBack(prevIndex($("#photo_big .big img").attr("index"),$("#photo").first())).parentNode.parentNode;
        prev_next_img(children);
    });
//图片下一张
    $("#photo_big .big .right").click(function(){
        $("#photo_big .big img").attr("src",$(this).attr("src")).animation({
            attr:"o",
            final:100
        }).opacity(0);
        var children=$("#photo dl dt img").getElementBack(nextIndex($("#photo_big .big img").attr("index"),$("#photo").first())).parentNode.parentNode;
        prev_next_img(children);
    });
    //该函数用于接收photo下的dl，根据该dl在这个div下的索引，获得前一张，后一张的图片缓存，然后把再把当前页的索引放到显示的图片属性中
    function prev_next_img(children){
        var prev=prevIndex($(children).index(),children.parentNode);
        var next=nextIndex($(children).index(),children.parentNode);
        var prev_img=new Image();
        var next_img=new Image();
        prev_img.src=$("#photo dl dt img").getElement(prev).attr("bigsrc");
        next_img.src=$("#photo dl dt img").getElement(next).attr("bigsrc");
        $("#photo_big .big .left").attr("src",prev_img.src);
        $("#photo_big .big .right").attr("src",next_img.src);
        //将当前的图片索引值保存在img里面
        //将children的索引值给赋值到之前的
        $("#photo_big .big img").attr("index",$(children).index());
        console.log(children);
        $("#photo_big .big .index").html((parseInt($(children).index())+1)+"/"+$("#photo dl dt img").length());
    }
    //调用ajax
    // $(document).click(function(){
    //     ajax({
    //         method:     "post",
    //         url:        "add.php",
    //         data:       {
    //             "name":"Lee",
    //             "age":26
    //         },
    //         async:      true,
    //         success:    function(text){
    //             // alert(text);
    //         }
    //     });
    // });

    //发文框
    var blog=$("#blog");
    var screen=$("#screen");
    //想要实现改变大小，控件不出视野范围，就要使用连缀，否则获取不到elements里面没有login控件，无法控制！！！！！
    blog.center(580,320).resize(function(){
        // login.center(350,250);   //窗口改变大小，控件始终居中
        if(blog.css("display")=="block"){  //如果发文显示才锁屏
            screen.lock();
        }
    });
    $("#header .member a").click(function(){
        //锁屏遮罩
        blog.center(580,320).show();
        screen.lock().animation({
            "attr":"o",
            "final":80,
            "speed":5
        });
    });
    //需要先渐变再关闭
    $("#blog .close").click(function(){
        blog.hide();
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
    blog.drag($("#blog h2").first());

    $("form").getElement(2).form("sub").click(function(){
        if(trim($("form").getElement(2).form("title").value()).length<=0||trim($("form").getElement(2).form("content").value()).length<=0){
            $("#blog .info").html("发表失败！标题或内容不得为空！");
        }else{
            var _this=this;     //指向按钮
            $("#loading p").html("正在尝试发布...");
            $("#loading").show().center("200","40");
            _this.setAttribute("disabled","disabled");
            $(_this).css("background-position","right");
            ajax({
                method: "post",
                url: "add_blog.php",
                data: $("form").getElement(2).serialize(),
                success: function (text) {
                    $("#loading").css("display", "none");
                    // alert(text);
                    if(text==1){
                        $("#blog .info").html("");
                        $("#success").show().center(200, 40);
                        $("#success p").html("发布成功！");
                        setTimeout(function () {            //持续1.5秒后关闭发布窗口和发布成功提示
                            $("#success").css("display", "none");
                            blog.css("display", "none");
                            $("form").getElement(2).first().reset();
                            screen.animation({
                                attr: "o",
                                final: 0,
                                "fn": function () {
                                    screen.unlock();
                                    //获取博文列表
                                    $("#index").html("<span class='partLoading'></span>");
                                    $("#index .partloading").show();
                                    $("#index .partLoading").hide();
                                    $("#index .content .detail3").animation({
                                        mul:{
                                            "o":0
                                        },

                                        // 我的想法：在关闭发布框的同时，将第一个和第二个记录移动到第二和第三的位置
                                        // 然后给最新消息腾出位置
                                        // fn:function(){
                                        //     $("#index .content .detail1").animation({
                                        //         mul:{
                                        //             "y":193,
                                        //             "o":100
                                        //         }
                                        //     }).css("top","0");
                                        //     $("#index .content .detail2").animation({
                                        //         mul:{
                                        //             "y":386,
                                        //             "o":100
                                        //         }
                                        //     }).css("top","193px");
                                        // }

                                    });
                                    ajax({
                                        method:"post",
                                        url:"get_blog.php",
                                        data:{},
                                        // success:function(text){
                                        //     $("#index .loading").hide();
                                        //     var json=JSON.parse(text);
                                        //     var html="";
                                        //     for(var i=0;i<json.length;i++){
                                        //         html+="<div class='content'><h2><em>"+json[i].date+"</em>"+json[i].title+"</h2><p>"+json[i].content+"</p></div>";
                                        //     }
                                        //     $("#index").html(html);
                                        //     for(var i=0;i<json.length;i++) {
                                        //         $("#index .content").getElement(i).animation({
                                        //             attr: "o",
                                        //             final: 100
                                        //         });
                                        //     }
                                        // },
                                        //  以上是原版的code
                                        success:function(text){
                                            var json=JSON.parse(text);
                                            var html="";
                                            for(var i=0;i<json.length;i++){
                                                html+="<div class='content'><div class='detail"+(i+1)+"'><h2><em>"+json[i].date+"</em>"+json[i].title+"</h2><p>"+json[i].content+"</p></div></div>";
                                            }
                                            $("#index").html(html);
                                            $("#index .content .detail1").animation({
                                                mul:{
                                                    "o":100
                                                }
                                            });
                                            $("#index .content .detail2").opacity(100);
                                            $("#index .content .detail3").opacity(100);
                                        },

                                        async:true
                                    });
                                }
                            });
                            $(_this).css("background-position", "left");
                            _this.removeAttribute("disabled");
                        }, 1500);
                    }
                },
                async: true
            });
        }
    });
    //获取博文列表
    $("#index").html("<span class='loading'></span>");
    $("#index .loading").show();
    ajax({
        method:"post",
        url:"get_blog.php",
        data:{},
        success:function(text){
            $("#index .loading").hide();
            var json=JSON.parse(text);
            var html="";
            for(var i=0;i<json.length;i++){
                html+="<div class='content'><div class='detail"+(i+1)+"'><h2><em>"+json[i].date+"</em>"+json[i].title+"</h2><p>"+json[i].content+"</p></div></div>";
                // html+="<div class='content'><h2><em>"+json[i].date+"</em>"+json[i].title+"</h2><p>"+json[i].content+"</p></div>";
            }
            $("#index").html(html);
            for(var i=0;i<json.length;i++) {
                // $("#index .content").getElement(i).animation({
                //     mul:{
                //         o:100
                //     }
                // });

                $("#index .content .detail"+(i+1)).animation({
                    mul:{
                        "o":100
                    }
                });
            }
        },
        async:true
    });


















});