<template>
	<!-- 信息展示板组件 -->
	<div class="q-pa-md row justify-center">
		<q-virtual-scroll ref="VScroll" style="max-height: 100%;" :items="messages" separator v-slot="{ item, index }">
			<q-chat-message :key="index" :sent="item.user.nickName===userInfo.nickName">
				<template v-slot:avatar>
					<q-avatar :class="{'avatar-self': item.user.nickName===userInfo.nickName}" :color="item.user.color"
						font-size="13px" text-color="white">
						{{item.user.nickName?.split('的')[1]}}
					</q-avatar>
				</template>
				<template v-slot:name v-if="item.showName!==false">
					<div v-if="item.user.nickName===userInfo.nickName">{{item.user.nickName}} <span
							style="color: gray;">[我]</span></div>
					<div v-else>{{item.user.nickName}}</div>
				</template>

				<q-intersection>
					<MessageItem :message="item.text[0]" />
					<!-- <div v-html="messageFilter(item.text[0],index)">
					</div> -->
				</q-intersection>
			</q-chat-message>
		</q-virtual-scroll>
	</div>
</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'
	import MessageItem from '@/components/MessageItem.vue';
	
	const userInfoStore = getUserInfoStore();
	const currentInstance = getCurrentInstance();
	const userInfo = userInfoStore.userInfo;
	let messages = ref([]);
	
	//展示消息
	const showMessage = (data) => {
		const lastMessage = messages.value.slice(-1)[0];
	
		if (lastMessage && lastMessage.user.nickName === data.user.nickName) {
			data.showName = false;
		}
		messages.value.push(data);
	
		/* const lastMessage = messages.value.slice(-1)[0];
	
		if (lastMessage && lastMessage.user.nickName === data.user.nickName) {
			messages.value[messages.value.length - 1].text.push(data.text[0]);
		} else {
			messages.value.push(data);
		} */
	
		//滚动到底部
		setTimeout(() => {
			currentInstance.ctx.$refs.VScroll.scrollTo(messages.value.length);
		}, 100);
	}
	
	//接收消息
	socket.on('message', (data) => {
		showMessage(data);
	});
</script>

<style type="text/css" lang="scss" scoped>
	.q-pa-md {
		height: 100%;
		overflow: auto;

		&>div {
			width: 100%;
		}
	}

	.q-avatar {
		margin-right: 8px;

		&.avatar-self {
			margin-right: 0;
			margin-left: 8px;
		}
	}
</style>
<style type="text/css" lang="scss">
	.q-message-text {
		display: inline-block;
		float: right;
		clear: both;

		&.q-message-text--received {
			float: left;
		}

	}
	.q-message-text:last-child {
		min-height: 35px;
	}
</style>
