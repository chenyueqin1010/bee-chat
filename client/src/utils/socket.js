import io from 'socket.io-client'
// 链接 服务端
const socket = io(import.meta.env.VITE_SOCKET_URL, {
	query: {},
	transports: ['websocket', 'polling'],

});
export default socket;
