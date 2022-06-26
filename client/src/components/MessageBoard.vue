<template>
	<!-- 信息展示板组件 -->
	<div class="q-pa-md row justify-center">
		<q-virtual-scroll ref="scrollRef" style="max-height: 100%;" :items="messages" separator
			v-slot="{ item, index }">
			<q-chat-message :key="index" :sent="item.user.nickName===userInfo.nickName">
				<template v-slot:name v-if="item.showName!==false">
					<div v-if="item.user.nickName===userInfo.nickName">{{item.user.nickName}} <span
							style="color: gray;">[我]</span></div>
					<div v-else>{{item.user.nickName}}</div>
				</template>
				<template v-slot:avatar>
					<q-avatar :class="{'avatar-self': item.user.nickName===userInfo.nickName}" :color="item.user.color"
						font-size="13px" text-color="white">
						{{item.user.nickName?.split('的')[1]}}
					</q-avatar>
				</template>

				<q-intersection>
					<q-spinner-dots v-if="!item.text" size="2rem" />
					<MessageItem v-else :message="item.text[0]" />

					<q-inner-loading :showing="!!item.uploading" color="primary" />
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
	const userInfo = userInfoStore.userInfo;
	let messages = ref([]);
	let scrollRef = ref(null);

	//展示消息
	const showMessage = (data) => {
		const messageArr = Array.from(Object.values(messages.value), ({
			id
		}) => id);

		const messageIndex = messageArr.indexOf(data.id);

		messageIndex > -1 && messages.value.splice(messageIndex, 1, data);

		const lastMessage = messages.value.slice(-1)[0];

		if (lastMessage && lastMessage.user.nickName === data.user.nickName) {
			messages.value.length > 0 && (data.showName = false);
		}

		messageIndex < 0 && messages.value.push(data);

		//滚动到底部
		setTimeout(() => {
			scrollRef.value.scrollTo(messages.value.length);
		}, 300);
	}

	import {
		AudioPlay
	} from '@/utils/global'

	//接收消息
	socket.on('message', (data) => {
		showMessage(data);
		data.text && AudioPlay('/audio/message_recieve.mp3');
	});

	defineExpose({
		showMessage
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
