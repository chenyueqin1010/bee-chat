import io from 'socket.io-client'
// 链接 服务端
const socket = io('/', {
	query: {},
	transports: ['websocket', 'polling'],

});
export default socket;
