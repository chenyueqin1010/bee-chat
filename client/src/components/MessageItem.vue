<template>
	<div v-if="messageType==='text'">{{message}}</div>

	<img v-if="messageType==='image'" :src="imageData.url" @click="imagePreview(imageData)" style="width: 120px;" />

	<q-btn v-if="messageType==='audio'" color="teal" @click="playAudio()">
		<i style="display: inline-block;margin-right: 17px;" v-show="audioData.playing">
			<q-spinner-radio color="white" size="18px" />
		</i>
		<q-icon left name="rss_feed" v-show="!audioData.playing" />
		<span>{{audioData.duration}}s</span>
	</q-btn>

	<div class="videos" v-if="messageType==='video'" @click="playVideo(videoData.url)">
		<video :src="videoData.url" webkit-playsinline></video>
		<q-btn class="video-play-btn" flat round size="22px" color="white" icon="play_circle_outline" />
		<div class="video-duration">00:{{videoData.duration}}</div>
	</div>

	<div v-if="messageType==='file'" class="file-item">
		<img :src="`/file_ext/${fileData.type}.svg`" onerror="javascript:this.src='/file_ext/file.svg'" />
		<div>
			<div>{{fileData.name}}</div>
			<span>{{fileData.size}}</span>
		</div>

		<a :href="fileData.url" target="_blank" :download="fileData.name">
			<img class="download" src="/file_ext/download.svg" />
		</a>
	</div>

	<!-- 图片预览 -->
	<div id="galleryID">
		<a ref="imageBox" :href="imageData.url" target="_blank" :data-pswp-width="imageData.width"
			:data-pswp-height="imageData.height" rel="noreferrer">
		</a>
	</div>
	<!-- 视频预览 -->
	<q-dialog v-model="videoDialog" persistent :maximized="true" transition-show="slide-up"
		transition-hide="slide-down">
		<q-card class="videoCard">
			<q-btn class="close-btn" flat round color="white" icon="reply"
				@click="videoDialog=false,videoRef.src=null" />

			<video ref="videoRef" autoplay controls webkit-playsinline controlslist="nofullscreen" disablepictureinpicture></video>
		</q-card>
	</q-dialog>
</template>

<script setup>
	const props = defineProps({
		message: [Object, String]
	});

	import {
		format
	} from 'quasar';

	const currentInstance = getCurrentInstance();

	let messageType = ref(''); //信息类型
	let imageData = ref({});
	let fileData = ref({});
	let audioData = ref({});
	let videoData = ref({});
	let videoDialog = ref(false);
	let videoRef = ref(null);

	//消息过滤器
	const messageFilter = () => {
		const msg = props.message;
		//图片
		if (msg.type && msg.type.match('image')) {
			let blob = msg.data; //本人发送-file

			if (!msg.data.type) { //他人发送--arraybuffer
				blob = new Blob([msg.data], {
					type: msg.type
				});
			}

			const fileUrl = URL.createObjectURL(blob);

			imageData.value = {
				url: fileUrl,
				width: msg.width,
				height: msg.height
			}
			messageType.value = 'image';
			return;
		}


		//语音
		if (msg.type === 'audio') {
			let blob = new Blob([msg.data], {
				type: msg.type
			});
			const voiceUrl = URL.createObjectURL(blob);

			audioData.value = {
				url: voiceUrl,
				duration: msg.duration,
				playing: false
			}

			messageType.value = 'audio';
			return;
		}

		const {
			humanStorageSize
		} = format;
		const { pad } = format;
		//小视频
		if (msg.type === 'video') {
			let blob = new Blob([msg.data], {
				type: msg.type
			});
			const videoUrl = URL.createObjectURL(blob);
			
			videoData.value = {
				url: videoUrl,
				duration: pad(msg.duration<1?1:msg.duration,2)
			}

			messageType.value = 'video';
			return;
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

			fileData.value = {
				url: fileUrl,
				name: msg.name,
				type: nameArr[nameArr.length - 1],
				size: humanStorageSize(msg.size)
			}
			messageType.value = 'file';
			return;
		}

		messageType.value = 'text';
	}

	onMounted(() => {
		messageFilter();
	});

	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	let lightbox = null;
	//图片预览
	const imagePreview = (data) => {
		if (lightbox) {
			setTimeout(() => {
				currentInstance.ctx.$refs.imageBox.click();
			}, 100);
			return;
		}
		lightbox = new PhotoSwipeLightbox({
			gallery: '#galleryID',
			children: 'a',
			bgOpacity: 0.9,
			errormessage: '图片加载失败',
			pswpModule: () => import('photoswipe'),
		});
		lightbox.init();
		setTimeout(() => {
			currentInstance.ctx.$refs.imageBox.click();
		}, 100);
	}
	
	//视频播放
	const playVideo = (url) => {
		videoDialog.value = true;
		nextTick(() => {
			videoRef.value.src = url;
		});
	}

	let audioPlayer = null;
	//语音播放
	const playAudio = () => {
		if (audioPlayer) {
			audioPlayer.pause();
			audioPlayer = null;
			audioData.value.playing = false;
		}

		audioPlayer = new Audio(audioData.value.url);
		audioPlayer.play();
		audioData.value.playing = true;

		//播放完毕
		audioPlayer.addEventListener('ended', (e) => {
			audioPlayer = null;
			audioData.value.playing = false;
		});
	}
</script>

<style type="text/css" lang="scss" scoped>
	#galleryID {
		display: none;
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

	.videos {
		position: relative;

		video {
			width: 120px;
		}

		.video-play-btn {
			position: absolute;
			z-index: 1;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.video-duration {
			position: absolute;
			right: 8px;
			bottom: 8px;
			color: white;
			text-shadow: 1px 1px black;
		}
	}

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
	}
</style>
