<template>
	<!-- 录音弹窗 -->
	<q-dialog v-model="showRecorder" persistent class="recorder">
		<q-card>
			<q-card-section class="items-center">
				<div class="voice-text">
					<span v-show="!recording && recordTime===0">按住说话</span>
					<div v-show="recording">
						<q-spinner-dots color="primary" size="2em" />
						<span v-show="recordTime>0">{{recordTime}}s</span>
					</div>
					<q-btn color="teal" v-show="voiceFileUrl && recordTime>0" @click="playAudio()">
						<i style="display: inline-block;margin-right: 17px;" v-show="audioPlaying">
							<q-spinner-radio color="white" size="18px" />
						</i>
						<q-icon left name="rss_feed" v-show="!audioPlaying" />
						<span>{{recordTime}}s</span>
					</q-btn>
				</div>
				<div @contextmenu.prevent>
					<q-btn class="touch-action" round color="primary" glossy size="xl" text-color="white" icon="keyboard_voice"
						@touchstart="startRecord" @touchend="endRecord" />
				</div>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="取消" @click="closeRecorder()" />
				<q-btn flat label="发送" color="primary" @click="sendVoice()" :disabled="recordTime<1" />
			</q-card-actions>
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
	let recording = ref(false);
	let recordTime = ref(0);
	let recordTimeout = null;

	let voiceFile = null;
	let voiceFileUrl = ref('');
	let audioPlayer = null;
	let audioPlaying = ref(false);

	//播放语音
	const playAudio = () => {
		//防止重复播放
		if (audioPlaying.value) {
			return;
		}

		audioPlayer = new Audio(voiceFileUrl.value);
		audioPlayer.play();
		audioPlaying.value = true;

		//播放完毕
		audioPlayer.addEventListener('ended', (e) => {
			audioPlaying.value = false;
			audioPlayer = null;
		});
	}

	let mediaStream = null;

	//打开录音板
	const openRecorder = () => {
		voiceFileUrl.value = '';
		recordTime.value = 0;

		MediaUtils.getUserMedia({
			audio: true,
			video: false,
			onstop: (data) => {
				voiceFile = data.file;
				voiceFileUrl.value = data.url;
			}
		}).then(stream => {
			// 通过 MediaRecorder 记录获取到的媒体流
			mediaStream = stream;
			showRecorder.value = true;
		}).catch(e => {
			const msg = e.toString().match('denied') ? '浏览器已禁用麦克风' : '浏览器不支持该功能';

			$q.notify({
				position: 'top',
				type: 'warning',
				message: msg
			});
		});
	}

	//开始录音
	const startRecord = () => {
		recording.value = true;
		recordTime.value = 0;
		voiceFileUrl.value = '';

		recordTimeout = setInterval(() => {
			if (recordTime.value >= 30) {
				endRecord();
				$q.notify({
					position: 'top',
					type: 'warning',
					message: '最多录制30s哦'
				});
				return;
			}
			recordTime.value++;
		}, 1000);

		MediaUtils.start();
	}

	//结束录音
	const endRecord = () => {
		recording.value = false;
		clearInterval(recordTimeout);

		MediaUtils.stop();

		if (recordTime.value < 1) {
			recordTime.value = 0;
			$q.notify({
				position: 'top',
				type: 'warning',
				message: '说话时间太短了'
			});
		}
	}

	//关闭录音板
	const closeRecorder = () => {
		showRecorder.value = false;
		MediaUtils.stop();
		MediaUtils.closeStream(mediaStream);
	}

	//发送语音
	const sendVoice = () => {
		const messageData = {
			user: userInfo,
			text: [{
				type: 'audio', //audio/webm;codecs=opus
				data: voiceFile,
				duration: recordTime.value,
				size: voiceFile.size
			}]
		}

		socket.emit('message', messageData, data => {

		});
		closeRecorder();
	}

	defineExpose({
		openRecorder
	});
</script>

<style lang="scss" scoped>
	.recorder {
		.q-card {
			width: 90%;
			max-width: 500px;

			.items-center {
				>div {
					width: 100%;
					text-align: center;
					color: gray;
				}

				.voice-text {
					padding: 30px 0;

					>span {
						display: inline-block;
						padding: 3.5px 0;
					}

					>div {
						position: relative;
					}

					.q-spinner+span {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 25px;
					}
				}
			}
		}
	}
</style>
