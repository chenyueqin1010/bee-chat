<template>
	<!-- 输入框组件 -->
	<div class="input-filed">
		<q-input ref="inputRef" v-model="text" placeholder="请输入内容" filled autogrow
			@keypress.enter.prevent="sendMessage">
			<template v-slot:prepend>
				<q-icon name="mic" @click.prevent="openRecorder" />
			</template>
			<template v-slot:append>
				<q-icon v-show="!!text.trim()" name="send" size="26px" @click.prevent="sendMessage" />

				<q-icon v-show="!text.trim()" name="add_circle_outline" size="26px">
					<q-menu transition-show="flip-right" transition-hide="fade" auto-close>
						<q-item clickable @click="VideoRecorderFef.openRecorder()">
							<q-item-section avatar>
								<q-icon color="primary" name="camera_alt" />
							</q-item-section>
							<q-item-section>拍摄</q-item-section>
						</q-item>
						<q-list style="min-width: 100px" bordered separator>
							<q-item clickable @click="imageChooseRef.click()">
								<q-item-section avatar>
									<q-icon color="primary" name="image" />
								</q-item-section>
								<q-item-section>图片</q-item-section>
							</q-item>
							<q-item clickable @click="fileChooseRef.click()">
								<q-item-section avatar>
									<q-icon color="primary" name="folder" />
								</q-item-section>
								<q-item-section>文件</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-icon>
			</template>
		</q-input>
	</div>
	<AudioRecorder ref="AudioRecorderRef" @showMessage="showMessage" />
	<VideoRecorder ref="VideoRecorderFef" @showMessage="showMessage" />

	<input class="file-chooser" ref="imageChooseRef" type="file" cap accept=".jpg,.jpeg,.png,.gif,.webp"
		@change="chooseImage" />
	<input class="file-chooser" ref="fileChooseRef" type="file" @change="chooseFile" />
</template>

<script setup>
	import socket from "@/utils/socket";
	import {
		getUserInfoStore
	} from '@/store/modules/userInfo'
	import {
		useQuasar
	} from 'quasar'
	import {
		AudioPlay
	} from '@/utils/global'
	import AudioRecorder from '@/components/AudioRecorder.vue'
	import VideoRecorder from '@/components/VideoRecorder.vue'

	const userInfoStore = getUserInfoStore();
	const userInfo = userInfoStore.userInfo;
	const $q = useQuasar();

	let text = ref('');
	const inputRef = ref(null);
	const imageChooseRef = ref(null);
	const fileChooseRef = ref(null);
	const AudioRecorderRef = ref(null);
	const VideoRecorderFef = ref(null);

	//发送消息
	const sendMessage = () => {
		inputRef.value.focus();

		if (!text.value.trim()) {
			text.value = '';
			return;
		}
		const messageData = {
			id: userInfo.nickName + new Date().getTime(),
			user: userInfo,
			text: [text.value]
		}
		text.value = '';

		showMessage(messageData);
	}

	//录音
	const openRecorder = () => {
		AudioRecorderRef.value.openRecorder();
	}

	//发送文件
	const sendFile = (file) => {
		//file转arrayBuffer
		/* const reader = new FileReader();
	
		reader.onload = res => {
			res.target.result
		}
		reader.readAsArrayBuffer(file); */

		const messageData = {
			id: userInfo.nickName + new Date().getTime(),
			user: userInfo,
			text: [{
				type: file.type ? file.type : file.name.split('.').pop(),
				data: file,
				name: file.name,
				size: file.size,
				width: file.width,
				height: file.height
			}]
		}

		showMessage(messageData);
	}

	const emit = defineEmits(['showMessage']);
	//自己发送、展示消息
	const showMessage = (messageData) => {
		AudioPlay('/audio/message_send.mp3');
		emit('showMessage', {
			...messageData,
			...{
				uploading: messageData.text[0].data ? true : false
			}
		});

		messageData.text[0].data && socket.emit('message', {
			id: messageData.id,
			user: messageData.user
		});

		socket.emit('message', messageData, data => {
			messageData.text[0].data && emit('showMessage', messageData);
		});
	}

	//图片压缩
	const imageCompress = (base64, file) => {
		return new Promise((resolve, reject) => {
			let image = new Image();
			let canvas = document.createElement('canvas');

			image.src = base64;
			image.onload = () => {
				canvas.width = image.width;
				canvas.height = image.height;

				const ctx = canvas.getContext("2d");

				ctx.drawImage(image, 0, 0);
				canvas.toBlob(f => {
					f.width = image.width;
					f.height = image.height;
					f.name = file.name;
					resolve(f);
				}, 'image/webp', 0.5);

				canvas = null;
			}
		});
	}

	//选择图片
	const chooseImage = (data) => {
		const file = data.target ? data.target.files[0] : data;

		imageChooseRef.value.value = "";

		if (file.size > 10 * 1024 * 1024) {
			$q.notify({
				type: 'warning',
				message: '图片最大支持10MB'
			});
			return;
		}

		const reader = new FileReader();

		reader.onload = async (res) => {
			const imageMin = await imageCompress(res.target.result, file);

			sendFile(imageMin);
		}
		reader.readAsDataURL(file);
	}

	//选择文件
	const chooseFile = (data) => {
		const file = data.target.files[0];

		fileChooseRef.value.value = "";

		if (file.size > 100 * 1024 * 1024) {
			$q.notify({
				type: 'warning',
				message: '文件最大支持100MB'
			});
			return;
		}

		if (file.type.match('image')) {
			chooseImage(file);
			return;
		}

		sendFile(file);
	}
</script>

<style lang="scss" scoped>
	.input-filed {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;

		.q-icon:not(.disabled) {
			color: var(--q-primary);
		}
	}

	.file-chooser {
		display: none;
	}
</style>
<style>
	.q-field--filled .q-field__control {
		border-radius: 0;
		align-items: end;
	}

	.q-field--highlighted .q-field__control:before {
		background: none !important;
	}
</style>
