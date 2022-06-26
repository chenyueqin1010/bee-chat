<template>
	<q-layout view="hHh Lpr lff" container>
		<!-- 头部 -->
		<q-header elevated>
			<q-toolbar>
				<q-btn flat round dense icon="people" class="q-mr-sm" @click="drawer=!drawer" />
				<q-toolbar-title>
					匿名聊天室
					<span style="font-size: 13px;">（{{userOnline.length}}人）</span>
					<!-- <q-badge outline rounded :label="`${userOnline.length}人`"  style="transform: translateY(-2px);"/> -->
				</q-toolbar-title>
				<q-btn flat round dense icon="logout" @click="logout" />
			</q-toolbar>
		</q-header>

		<!-- 在线人员 -->
		<q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered>
			<div class="drawer-header">
				<q-icon name="whatshot" size="22px" color="primary" style="margin-top: -5px;"></q-icon>
				在线人数：{{userOnline.length}}人
			</div>
			<q-scroll-area style="height: calc(100% - 50px);">
				<q-list separator>
					<template v-for="(item,index) in userOnline" :key="index">
						<q-item clickable v-ripple>
							<q-item-section avatar>
								<q-avatar :color="item.color" font-size="12px" text-color="white">
									{{item.nickName?.split('的')[1]}}
								</q-avatar>
							</q-item-section>
							<q-item-section>
								{{ item.nickName }}
								<q-badge v-if="item.nickName===userInfo.nickName" rounded color="grey-5" label="我"
									style="position:absolute;right:5px;" />
							</q-item-section>
						</q-item>
					</template>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<!-- 信息展示板 -->
			<MessageBoard ref="msgRef" />
		</q-page-container>
	</q-layout>

	<!-- 输入区域 -->
	<InputField @showMessage="showMessage" />
</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		useQuasar
	} from 'quasar';
	import MessageBoard from '@/components/MessageBoard.vue'
	import InputField from '@/components/InputField.vue'
	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'

	const router = useRouter();
	const $q = useQuasar();
	const userInfoStore = getUserInfoStore();

	const userInfo = userInfoStore.userInfo;
	let userOnline = ref([]);
	let drawer = ref(false);

	//退出登录
	const logout = () => {
		$q.dialog({
			title: '提示',
			message: '确定退出聊天室吗？',
			cancel: true
		}).onOk(() => {
			localStorage.removeItem('USER_INFO');
			socket.disconnect();
			router.replace({
				path: '/login'
			});
		});
	}

	let notifyNames = [];
	//获取在线用户
	socket.emit('getOnlineUser', (data) => {
		data.map((item, index) => {
			if (item.nickName === userInfo.nickName) {
				data.unshift(data.splice(index, 1)[0]);
			}
		});
		userOnline.value = data;
	});
	//监听在线用户
	socket.on('onlineUser', (data) => {
		if (!data[0]) {
			userOnline.value = data;
			return;
		}

		data.map((item, index) => {
			if (item.nickName === userInfo.nickName) {
				data.unshift(data.splice(index, 1)[0]);
			}
		});
		const lastUser = data[data.length - 1];

		if (lastUser.nickName !== userInfo.nickName) {
			const nameArr = Array.from(Object.values(userOnline.value), ({
				nickName
			}) => nickName);

			if ([...notifyNames, ...nameArr].indexOf(lastUser.nickName) < 0) {
				$q.notify({
					position: 'top',
					color: 'purple',
					message: `${lastUser.nickName} 加入`
				});
				notifyNames.push(lastUser.nickName);
			}
		}
		userOnline.value = data;
	});

	const msgRef = ref(null);
	//本人发送消息展示
	const showMessage = (data) => {
		msgRef.value.showMessage(data);
	}
</script>

<style type="text/css" lang="scss" scoped>
	.q-page-container {
		height: calc(100vh - 56px);
	}

	.drawer-header {
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
		box-shadow: 0 0 7px #c5c5c5;
	}
</style>
