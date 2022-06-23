const express = require("express");
const app = express();

const httpServer = require('http').createServer(app); // 使用了node自带的http模块
const io = require('socket.io')(httpServer, {
	maxHttpBufferSize: 1e8 //限制文件传输大小100MB

});
app.use("/", express.static(__dirname + "/www")); //指定localhost根目录，__dirname（前面是两个下划线）表示当前位置的绝对位置

httpServer.listen(process.env.PORT || 3000, () => {
	console.log('listening on *:3000');
}); // 监听3000端口


const CryptoJS = require("crypto-js");
const password = 'bee&chat@2022';

//AES加密方法
const EncryptData = (data) => {
	return CryptoJS.AES.encrypt(data, password).toString();;
}
//AES解密方法
const DecryptData = (data) => {
	const decryptData = CryptoJS.AES.decrypt(data, password);

	return decryptData.toString(CryptoJS.enc.Utf8);
}

//在线用户集合
let onlineUsers = {};
let leaveTimeout = null;

//发送给指定的用户
// sockets.connected[socket.id].emit('message', data)
//发送自己以外的用户
// socket.broadcast.emit(‘message’,data)
//发送所有用户
// io.emit('message',data)
//创建房间
// io.socketsJoin("room1");
//加入房间
// socket.join('room1');
//向特定房间发送消息
// socket.to('room1').emit('system',socket.id);
//离开房间
// socket.leave('room1');

// 监听socket连接
io.on('connection', socket => {
	//AES加密数据
	socket.on('encryptData', (data, callback) => {
		typeof data === 'object' && (data = JSON.stringify(data));

		callback(EncryptData(data));
	});
	//AES解密
	socket.on('decryptData', (data, callback) => {
		callback(DecryptData(data));
	});

	//用户登录
	socket.on('login', (data, callback) => {
		let userInfo = DecryptData(data);

		if (userInfo) {
			userInfo = JSON.parse(userInfo);

			// const nameArr = Array.from(Object.values(onlineUsers), ({nickName}) => nickName);

			/* if(nameArr.indexOf(userInfo.nickName) > -1){
				callback('');
				return;
			} */
		}

		callback(userInfo);

		if (userInfo) {
			leaveTimeout && clearTimeout(leaveTimeout) && (leaveTimeout = null);
			//更新在线用户
			onlineUsers[socket.id] = userInfo;
			socket.broadcast.emit('onlineUser', Object.values(onlineUsers));
		}
	});

	//获取在线用户
	socket.on('getOnlineUser', (callback) => {
		callback(Object.values(onlineUsers));
	});

	//校验用户名是否被占用
	socket.on("checkName", (nickName, callback) => {
		const nameArr = Array.from(Object.values(onlineUsers), ({
			nickName
		}) => nickName);

		callback(nameArr.indexOf(nickName) > -1);
	});

	//接收web端传递的消息
	socket.on('message', (data, callback) => {
		io.emit('message', data);
		// socket.broadcast.emit('message', data);
		callback();
	});

	//监听
	socket.on('disconnect', data => {
		delete onlineUsers[socket.id];

		leaveTimeout = setTimeout(() => {
			io.emit('onlineUser', Object.values(onlineUsers));
		}, 10000);
	});
});
