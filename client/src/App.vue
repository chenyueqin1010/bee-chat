<template>
	<router-view></router-view>
</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		useQuasar
	} from 'quasar';

	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'

	const router = useRouter();
	const $q = useQuasar();
	const userInfoStore = getUserInfoStore();

	//自动登录
	const user = localStorage.getItem('USER_INFO');
	
	if(user){
		userInfoStore.userInfo = JSON.parse(user);
		
		socket.emit('login', userInfoStore.userInfo, () => {
			
		});
	}
	

	/* if (!user) {
		localStorage.removeItem('USER_INFO');
		router.replace({
			path: '/login'
		});
		$q.notify({
			type: 'warning',
			message: '昵称过期了，换一个吧'
		});
	} */
</script>

<style lang="scss">
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}
</style>
