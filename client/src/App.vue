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
	localStorage.getItem('USER_INFO') && socket.emit('login', localStorage.getItem('USER_INFO'), (data) => {
		if (!data) {
			localStorage.removeItem('USER_INFO');
			router.replace({
				path: '/login'
			});
			$q.notify({
				type: 'warning',
				message: '昵称过期了，换一个吧'
			});
			return;
		}
		userInfoStore.userInfo = data;
	});
</script>

<style lang="scss">
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}
</style>
