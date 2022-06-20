<template>
	<div class="bee-chat-login">
		<h4>bee-chat</h4>
		<h5>彼聊·匿名聊天室</h5>

		<div class="nick-name">
			<q-chip size="18px" :color="themeColor" text-color="white">
				昵称：{{nickName}}
			</q-chip>

			<q-btn icon="refresh" color="primary" outline rounded label="换一个" @click="getName" stlye="float:right;" />
		</div>

		<div style="text-align: right;margin-top: 3em;">
			<q-btn icon-right="send" color="primary" size="lg" class="full-width" label="开始聊天" @click="submit" />
		</div>

	</div>

</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		useQuasar
	} from 'quasar'
	import RandomNickname from '@/utils/randomName'

	const router = useRouter();
	const $q = useQuasar();
	
	//断开后重连
	onMounted(()=>{
		socket.disconnected && socket.connect();
	});

	// 设置随机昵称和颜色
	let nickName = ref('');
	let themeColor = ref('primary');

	const Nickname = RandomNickname();

	const Colors = [
		'primary',
		'secondary',
		'accent',
		'dark',
		'positive',
		'negative',
		'info',
		'warning',
		'red',
		'pink',
		'purple',
		'deep-purple',
		'indigo',
		'blue',
		'light-blue',
		'cyan',
		'teal',
		'green',
		'light-green',
		'lime',
		'amber',
		'orange',
		'deep-orange',
		'brown',
		'blue-grey'
	];
	const getName = () => {
		const index = Math.floor(Math.random() * Colors.length);

		themeColor.value = Colors[index];
		nickName.value = RandomNickname();

		//检查用户名是否被占用
		/* socket.emit('checkName', nickName.value, (isUsed) => {
			isUsed && getName();
		}); */
	}

	getName();


	//开始聊天
	const submit = () => {
		const info = {
			nickName: nickName.value,
			color: themeColor.value
		}
		
		//检查用户名是否被占用
		socket.emit('checkName', nickName.value, (isUsed) => {
			//用户信息加密储存
			if (isUsed) {
				$q.notify({
					type: 'warning',
					message: '手慢了，换一个吧'
				});
			} else {
				socket.emit('encryptData', info, data => {
					localStorage.setItem('USER_INFO', data);
					socket.emit('login', data, (data) => {
						router.replace('/');
					});
				});
			}
		});
	}
</script>

<style type="text/css" lang="scss" scoped>
	.bee-chat-login {
		padding: 30px 20px;
	}

	h4,
	h5 {
		margin: 0;
	}

	h5 {
		margin-top: 10px;
		margin-bottom: 50px;
	}

	.nick-name {
		background: #e8e8e8;
		padding: 15px 0;
		display: flex;
		justify-content: space-around;
	}
</style>
