import {
	Loading
} from 'quasar'

let MediaUtils = {
	/**
	 * 获取用户媒体设备(处理兼容的问题)
	 * @param video {boolean||Object} - 是否启用摄像头
	 * @param audio {boolean} - 是否启用麦克风
	 */
	getUserMedia: ({
		video = false,
		audio = false,
		onstop = () => {}
	}) => {
		Loading.show();
		return new Promise((resolve, reject) => {
			const CreateMedia = (stream) => {
				let Recorder = new MediaRecorder(stream);

				let chunks = [];

				Recorder.ondataavailable = (e) => {
					chunks.push(e.data);
				}
				Recorder.onstop = (e) => {
					let mediaFile = new Blob(chunks, {
						'type': Recorder.mimeType
					});
					chunks = [];

					onstop({
						file: mediaFile,
						url: (window.URL || webkitURL).createObjectURL(mediaFile)
					});
				}
				MediaUtils.Recorder = Recorder;
				resolve(stream);
				Loading.hide();
			}
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator
				.mozGetUserMedia ||
				navigator.msGetUserMedia || window.getUserMedia;
			let constraints = {
				video: video,
				audio: audio
			}
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
					CreateMedia(stream);
				}).catch((err) => {
					reject(err);
					Loading.hide();
				});
			} else if (navigator.getUserMedia) {
				navigator.getUserMedia(constraints, (stream) => {
					CreateMedia(stream);
				}, (err) => {
					reject(err);
					Loading.hide();
				});
			} else {
				reject('Not support userMedia');
				Loading.hide();
			}
		});
	},

	//开始录制
	start() {
		MediaUtils.Recorder.state === 'inactive' && MediaUtils.Recorder.start();
	},
	//结束录制
	stop() {
		MediaUtils.Recorder.state === 'recording' && MediaUtils.Recorder.stop();
	},
	/**
	 * 关闭媒体流
	 * @param stream {MediaStream} - 需要关闭的流
	 */
	closeStream: (stream) => {
		if (typeof stream.stop === 'function') {
			stream.stop();
		} else {
			stream.getTracks().forEach((track) => {
				track.stop();
			});
			/* let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];

			for (let i = 0; i < trackList.length; i++) {
				let tracks = trackList[i];
				if (tracks && tracks.length > 0) {
					for (let j = 0; j < tracks.length; j++) {
						let track = tracks[j];
						if (typeof track.stop === 'function') {
							track.stop();
						}
					}
				}
			} */
		}
	}
}
export default MediaUtils;
