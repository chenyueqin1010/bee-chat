<template>
	<h1 class="title">{{title}}</h1>
	
	 <q-btn color="primary" label="Primary" />
</template>

<script setup>
	import {
		useDemoStore
	} from '@/store/modules/demo'

	const props = defineProps({
		title: String
	});

	const demoStore = useDemoStore();
	const router = useRouter();

	const setText = () => {
		demoStore.text = 'Welcome To Use Pinia';
	}
	
	const request = ()=>{
		$http({
			url: '/mock/871b3e736e653b99374b7713e4011f9f/boss/user/list',
			method: 'get',
			withCredentials: false
		}).then(res => {
			console.log('请求数据',res)
		});
	}
	
	const goPage1 = ()=>{
		router.push({
			path: '/page1'
		});
	}
	
	onMounted(_ => {
	});
</script>

<style scoped>
	/* @color: #FFFFFF;

	div {
		button {
			color: @color;
		}
	} */
	.title{
		font-size: 28px;
	}
</style>
