/**
 * Created by 陈岳钦 on 2016/12/4.
 */

$(function(){
    //页面加载后开始初始化
    var chat = new Chat();
    chat.init();
});
var Chat = function(){
    this.socket = null;
};
//清屏
$("#clearBtn").click(function(){
    $(".showBox ul").empty();
});
//退出
$("#quit").click(function(){
    var confirms=confirm("您将退出聊天？")
    if(confirms){
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
            window.location.href="about:blank";
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    }return false;
});
//声音
var sound=[],volumes = 1;
sound[0]=new Audio("sounds/online.wav");
sound[1]=new Audio("sounds/message.wav");
$("#silent").click(function(){//静音功能
    if($(this).hasClass("glyphicon-volume-up")){
        $(this).removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off");
        volumes = 0;
    }else{
        $(this).removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
        volumes = 1;
    }
});
Chat.prototype = {
    //初始化函数
    init: function(){
            var that = this; //以下的this指向init的this
            this.socket = io.connect();//与webSocket服务器连接
            this.socket.on("connect",function(){
                //登陆页面 start
                touming = function(){
                    $(".show1").css("display","block");
                    $(".xiaoshi").css("display","none");
                    $(".touming").css("visibility","hidden");
                };
                $(".glyphicon-remove").click(function(){
                    $("#nickName").focus().val("");
                });
                $(".glyphicon-arrow-right").click(function(){
                    var nickName = $("#nickName").val();
                    if(nickName.trim().length == 0){    //昵称验证-》不能为空 trim()为去除前后空格后的字符
                        $("#notice").text("请输入昵称");
                    }else{
                        that.socket.emit("login",nickName);
                        that.socket.on("Existed",function(){ //昵称验证->不可用
                            $("#notice").text("昵称已占用");
                        });
                        that.socket.on("notExist",function(){//昵称验证->可用
                            sessionStorage.setItem("nickName",nickName);
                            $("#notice").text("");
                            $(".index").css("display","none");
                            $(".chatRoom").css("display","block");
                        });
                    }
                });
                //登陆页面 end
            });
            //聊天页面
            this.socket.on("system",function(nickName,users,userCount,type){  //检测用户行为
                var msg = nickName + (type == "login"?"加入":"离开");
                var userType = '<li class="list-group-item" style="color:red;"> '+msg+'</li>';
                var all = [];
                for(var i = 0;i<users.length;i++){
                    var user = '<li class="list-group-item">'+users[i]+'</li>';
                    all.push(user);
                }
                $(".showBox ul").append(userType); //广播用户行为
                $(".showUser span").text(userCount);//显示在线人数
                $(".showUser ul").html(all.join(""));//显示在线用户列表
                var uname = sessionStorage.getItem("nickName");
                if(type == "login" && nickName != uname && uname != null){
                    sound[0].volume = volumes;
                    sound[0].play();
                }
            });
            //消息发送
            /*发送信息 start*/
            $("#send").click(function(){
                var uname = sessionStorage.getItem("nickName");
                var msg = $("#text").val();
                if(msg.trim().length != 0){
                    that.socket.emit('postMsg', uname, msg); //消息发送到服务器
                    that.showMsg('我', msg); //把自己的消息显示到自己的窗口中
                }
                $("#text").val("");
            });
                // 回车发送
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    $("#send").trigger("click");
                }
            });
            /* 发送信息 end*/

            //消息展示
            this.socket.on("onceLogin",function(users,userCount){
                var all = [];
                for(var i = 0;i<users.length;i++){
                    var user = '<li class="list-group-item">'+users[i]+'</li>';
                    all.push(user);
                }
                $(".showUser span").text(userCount);//显示在线人数
                $(".showUser ul").html(all.join(""));//显示在线用户列表
            });
            this.socket.on("newMsg",function(user,msg){
                 that.showMsg(user,msg);
                sound[1].volume = volumes;
                sound[1].play();
            });
            //发送图片
            $("#sendImage1").change(function(){
                if (this.files.length != 0) {
                    var file = this.files[0],
                        reader = new FileReader();
                    reader.onload = function(e) {
                        //读取成功，显示到页面并发送到服务器
                        this.value = '';
                        that.socket.emit('img', e.target.result);
                        that.showImg('我', e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        //接收图片
            this.socket.on('newImg', function(user, img) {
                that.showImg(user, img);
                sound[1].volume = volumes;
                sound[1].play();
            },false);
        //发送表情
           $("#emoji").click(function(){
                that.emoji();
               $(".emoji-container").css("display","block");
           });
        $(document).click(function(){
            $(".emoji-container").hide();
            $("#emoji").click(function(event) {
                event.stopPropagation();
            });
            $(".emoji-container").click(function(event) {
                event.stopPropagation();
            })
        });
        $(".emoji-container").delegate("img","click",function(){
            var emoji_title = $(this).attr("title");
            $("#text").focus();
            var ntext = $("#text").val() + '[emoji:' + emoji_title + ']';
            $("#text").val(ntext);
        });


    },
    showMsg:function(user,msg){
        msg = this.showEmoji(msg);
        var newMsg = '<li class="list-group-item"> <span class="uname text-danger">'+user+'</span>：<span class="content">'+msg+'</span> </li>';
        $(".showBox ul").append(newMsg);
        $(".showBox .list-group").scrollTop = $(".showBox .list-group")[0].scrollHeight;
    },
    showImg:function(user,img){
        var newImg = '<li class="list-group-item">'+user+'：<br/><img class="img-responsive" style="max-width: 80%;"src="'+img+'"></li>';
        $(".showBox ul").append(newImg);
        $(".showBox .list-group").scrollTop = $(".showBox .list-group")[0].scrollHeight;
    },
    emoji:function(){
        var emojis = [];
        for(var i = 1;i<70;i++){
            var emoji = '<img src = "../images/emoji/'+i+'.gif" title="'+i+'"/>';
            emojis.push(emoji);
        }
        $(".emoji-container").html(emojis.join(""));
    },
    showEmoji:function(emoji){
        var match,reg = /\[emoji:\d+\]/g,emojiIndex,totalEmoji = $(".emoji-container img").length;
        while(match = reg.exec(emoji)){
            emojiIndex = match[0].slice(7,-1);
            emoji = emoji.replace(match[0],'<img class="emoji" src="images/emoji/'+emojiIndex+'.gif">');
        }
        return emoji;
    }

};
