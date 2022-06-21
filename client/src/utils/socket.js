import io from 'socket.io-client'
// 链接 服务端
const socket = io('http://192.168.1.3:3000', {
	query: {},
	transports: ['websocket', 'polling'],

});
export default socket;
