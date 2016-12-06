
var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);
app.use("/",express.static(__dirname+"/www")); //指定localhost根目录，__dirname（前面是两个下划线）表示当前位置的绝对位置
server.listen(process.env.PORT || 3000);

//socket 部分
var users = [];//保存用户列表
io.on("connection",function(socket){
    //接收浏览器发送的事件
    socket.on("login",function(nickName){console.log(nickName)
        if(users.indexOf(nickName)!= -1){
            socket.emit("Existed");
        }else{
            socket.userIndex = users.length;
            users.push(nickName);//增加新用户
            socket.nickName = nickName;
            socket.emit("notExist");//单用户发送
            io.sockets.emit("system",nickName,users,users.length,"login");//多用户发送新登陆的用户昵称
        }
    });
    //离线事件处理
    socket.on('disconnect', function() {
        //将离线用户从users中删除
        users.splice(socket.userIndex, 1);
        //通知除自己以外的所有人
        socket.broadcast.emit('system', socket.nickName, users,users.length, 'logout');
    });
    //接收新信息并发送给除自己以外的人
    socket.on("postMsg",function(uname,msg){
        if(users.indexOf(uname)!= -1){
           users = users;
        }else{
            socket.userIndex = users.length;
            users.push(uname);//增加新用户
            socket.nickName = uname;
        }
        io.sockets.emit("onceLogin",users,users.length);//用户发送消息时再次统计人数放伪掉线
        socket.broadcast.emit("newMsg",socket.nickName,msg);
    });
    //接收图片
    socket.on('img', function(imgData) {
        //通过一个newImg事件分发到除自己外的每个用户
        socket.broadcast.emit('newImg', socket.nickName, imgData);
    });
});
