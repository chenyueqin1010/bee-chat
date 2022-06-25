<template>
	<q-dialog v-model="showRecorder" persistent :maximized="true" transition-show="slide-up"
		transition-hide="slide-down">
		<q-card class="videoCard">
			<q-btn class="close-btn" flat round color="white" icon="reply" v-show="!imageUrl && !videoUrl" @click="closeRecorder" />

			<video id="real_time_video" ref="real_time_video" autoplay muted webkit-playsinline loop></video>
			<img id="image_preview" :src="imageUrl" alt="拍照预览" v-show="imageUrl">

			<div class="tip-text" v-show="videoTime<1 && !imageUrl && !videoUrl">轻触拍照，长按摄像</div>
			<q-circular-progress class="touch-action" v-show="!imageUrl && !videoUrl" :max="10000" :value="videoTime" size="80px"
				center-color="white" :thickness="0.22" color="green" track-color="grey-9" @contextmenu.prevent
				@touchstart="startVideo()" @touchend.prevent="stopVideo()" />
				
			<q-btn class="send-btn" flat color="white" label="重拍" size="sm" v-show="videoUrl || imageUrl" @click="takeAgain" style="right:90px;"/>
			<q-btn class="send-btn" color="primary" label="发送" size="sm" v-show="videoUrl || imageUrl"
				@click="sendVideo()" />
		</q-card>
	</q-dialog>
</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'
	import {
		useQuasar
	} from 'quasar'
	import MediaUtils from '@/utils/getUserMedia'

	const userInfoStore = getUserInfoStore();
	const userInfo = userInfoStore.userInfo;
	const $q = useQuasar();

	let showRecorder = ref(false);
	let mediaStream = null;
	let videoFile = null;
	let videoUrl = ref(null);
	let real_time_video = ref(null);

	//录制视频
	const openRecorder = () => {
		MediaUtils.getUserMedia({
			audio: true,
			video: {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			},
			onstop: (data) => {
				videoFile = data.file;
				videoUrl.value = data.url;
				videoFile.duration = Math.floor(videoTime.value / 1000);
				videoTime.value = 0;
				real_time_video.value.src = data.url;
			}
		}).then(stream => {
			// 通过 MediaRecorder 记录获取到的媒体流
			mediaStream = stream;

			showRecorder.value = true;
			nextTick(() => {
				real_time_video.value.srcObject = stream;
			});
		}).catch(e => {
			const msg = e.toString().match('denied') ? '浏览器已禁用摄像头' : '浏览器不支持该功能';

			$q.notify({
				position: 'top',
				type: 'warning',
				message: msg
			});
		});
	}

	let recorderInterval = null;
	let videoTime = ref(0);

	//开始录制
	const startVideo = () => {
		clearInterval(recorderInterval);
		videoTime.value = 0;
		videoUrl.value = '';
		!real_time_video.value.srcObject && (real_time_video.value.srcObject = mediaStream);

		recorderInterval = setInterval(() => {
			if (videoTime.value >= 10000) {
				clearInterval(recorderInterval);
				stopVideo();
				$q.notify({
					position: 'top',
					type: 'warning',
					message: '最长支持10S哦'
				});
				return;
			}
			videoTime.value += 100;
		}, 100);
		setTimeout(() => {
			videoTime.value > 0 && MediaUtils.start();
		}, 100);
	}

	let imageUrl = ref(null);
	let imageFile = null;

	//拍照处理
	const takePhoto = () => {
		let canvas = document.createElement('canvas');

		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(document.getElementById('real_time_video'), 0, 0);

		imageUrl.value = canvas.toDataURL('image/webp', 0.5);

		canvas.toBlob(f => {
			imageFile = f;
		}, 'image/webp', 0.5);

		canvas = null;
	}

	// 停止录制视频
	const stopVideo = () => {
		//拍照
		clearInterval(recorderInterval);
		if (videoTime.value < 100) {
			takePhoto();
		}
		// 终止录制器
		MediaUtils.stop();
		real_time_video.value.srcObject = null;
		MediaUtils.closeStream(mediaStream);
	}

	//发送视频
	const sendVideo = () => {
		const sendFile = imageUrl.value ? imageFile : videoFile;
		const messageData = {
			user: userInfo,
			text: [{
				type: imageUrl.value ? sendFile.type : 'video', //audio/webm;codecs=opus
				data: sendFile,
				duration: sendFile.duration,
				size: sendFile.size
			}]
		}

		socket.emit('message', messageData, data => {

		});
		imageUrl.value = null;
		videoUrl.value = null;
		closeRecorder();
	}
	
	//重拍
	const takeAgain = ()=>{
		imageUrl.value = null;
		videoUrl.value = null;
		openRecorder();
	}

	//退出
	const closeRecorder = () => {
		showRecorder.value = false;
		real_time_video.value.src = null;
		real_time_video.value.srcObject = null;
		MediaUtils.closeStream(mediaStream);
	}

	defineExpose({
		openRecorder
	});
</script>

<style lang="scss" scoped>
	.videoCard {
		overflow: hidden;
		background-color: #000000;

		.close-btn {
			margin: 10px;
			position: absolute;
			z-index: 1;
		}

		video {
			width: 100%;
			height: 100%;
			position: absolute;
		}

		.q-circular-progress {
			position: absolute;
			z-index: 1;
			bottom: 40px;
			left: 50%;
			transform: translateX(-50%);
		}

		.tip-text {
			width: 100%;
			text-align: center;
			color: lightgray;
			position: absolute;
			bottom: 150px;
		}

		.send-btn {
			position: absolute;
			bottom: 40px;
			right: 30px;
		}
	}

	#image_preview {
		width: 100%;
		height: 100%;
	}
</style>
