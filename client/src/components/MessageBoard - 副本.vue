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
					<MessageItem :message="item" />
					<!-- <div v-html="messageFilter(item.text[0],index)">
					</div> -->
				</q-intersection>
			</q-chat-message>
		</q-virtual-scroll>
	</div>
	
	<!-- 图片预览 -->
	<div id="galleryID">
		<a ref="imagePreview" :href="previewImage[0]" target="_blank" :data-pswp-width="previewImage[1]"
			:data-pswp-height="previewImage[2]" rel="noreferrer">
		</a>
	</div>
</template>

<script setup>
	import socket from "@/utils/socket";
	import { format } from 'quasar'
	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
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
	
	
	//消息过滤器
	const messageFilter = (msg,index) => {
		if (typeof msg === 'string') {
			return msg;
		}
		//图片
		if (msg.type && msg.type.match('image')) {
			let blob = msg.data; //本人发送-file
	
			if (!msg.data.type) { //他人发送--arraybuffer
				blob = new Blob([msg.data], {
					type: msg.type
				});
			}
	
			const fileUrl = URL.createObjectURL(blob);
			let arr = [fileUrl, msg.width, msg.height];
	
			return `<img src="${fileUrl}" style="width: 120px;" onclick="imagePreview('${arr.join(',')}')"/>`;
		}
		
		const { humanStorageSize } = format;
		
		//语音
		if(msg.type === 'audio/webm;codecs=opus'){
			let blob = new Blob([msg.data], {
				type: msg.type
			});
			const voiceUrl = URL.createObjectURL(blob);
			
			return `
				<q-btn color="teal" onclick="playAudio('${voiceUrl}',${index})">
					<i style="display: inline-block;margin-right: 17px;" class="hidden ${msg.playing?'show':''}">
						<q-spinner-radio color="white" size="18px"/>
					</i>
					<q-icon left name="rss_feed" class="hidden ${msg.playing?'show':''}"/>
					<span>${msg.duration}s</span>
				</q-btn>
				`;
		}
		
		//文件
		// <span>${(msg.size/(1024*1024)).toFixed(2)}MB</span>
		if (msg.type) {
			const nameArr = msg.name.split('.');
			let blob = msg.data; //本人发送-file
	
			if (!msg.data.type) { //他人发送--arraybuffer
				blob = new Blob([msg.data], {
					type: msg.type
				});
			}
	
			const fileUrl = URL.createObjectURL(blob);
	
			return `
				<div class="file-item">
					<img src="/file_ext/${nameArr[nameArr.length-1]}.svg" onerror="javascript:this.src='/file_ext/file.svg'"/>
					
					<div>
						<div>${msg.name}</div>
						<span>${humanStorageSize(msg.size)}</span>
					</div>
					
					 <a href="${fileUrl}" target="_blank" download="${msg.name}">
						<img class="download" src="/file_ext/download.svg" />
					 </a>
				</div>
			`;
		}
	}
	
	let lightbox = null;
	let previewImage = ref([]);
	//图片预览
	window.imagePreview = (data) => {
		previewImage.value = data.split(',');
		if (lightbox) {
			setTimeout(() => {
				currentInstance.ctx.$refs.imagePreview.click();
			}, 100);
			return;
		}
		lightbox = new PhotoSwipeLightbox({
			gallery: '#galleryID',
			children: 'a',
			bgOpacity: 0.9,
			errorMsg: '图片加载失败',
			pswpModule: () => import('photoswipe'),
		});
		lightbox.init();
		setTimeout(() => {
			currentInstance.ctx.$refs.imagePreview.click();
		}, 100);
	}
	
	let audioPlayer = null;
	let lastAudioIndex = null;
	//语音播放
	window.playAudio = (voiceUrl,index)=>{
		console.log(voiceUrl,index)
		if(audioPlayer){
			audioPlayer.pause();
			audioPlayer = null;
			messages.value[lastAudioIndex].text[0].playing = false;
		}
		
		audioPlayer = new Audio(voiceUrl);
		audioPlayer.play();
		lastAudioIndex = index;
		messages.value[index].text[0].playing = true;
		
		console.log(audioPlayer)
		
		//播放完毕
		audioPlayer.addEventListener('ended', (e) => {
			audioPlayer = null;
			messages.value[lastAudioIndex].text[0].playing = false;
		});
	}
</script>

<style type="text/css" lang="scss" scoped>
	.q-page-container {
		height: calc(100vh - 56px);
	}
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
	#galleryID {
		display: none;
	}
	.hidden{
		display: none;
		
		&.show{
			display: inline-block;
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

	.file-item {
		padding-left: 40px;
		padding-right: 30px;
		position: relative;

		img {
			width: 30px;
			height: 30px;
			border-radius: 5px;
			position: absolute;
			left: 0;
			box-shadow: 0px 0px 4px #858585;
			background-color: #e1e5e7;
		}

		a {
			position: absolute;
			right: 24px;
			top: 0;

			img {
				width: 25px;
				background: none;
				box-shadow: none;
				opacity: .5;
			}
		}

		span {
			font-size: 12px;
			color: gray;
		}
	}
</style>
