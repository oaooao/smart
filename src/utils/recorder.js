const AudioContext = window.AudioContext || window.webkitAudioContext
const WebAudioRecorder = window.WebAudioRecorder

class Recorder {
  stream = null
  recorder = null
  input = null
  audioContext = null

  async start() {
    const params = { audio: true, video: false }
    const mediaStream = await navigator.mediaDevices.getUserMedia(params)
    console.log('mediaStream =', mediaStream)
    this.stream = mediaStream
    this.audioContext = new AudioContext()
    this.input = this.audioContext.createMediaStreamSource(mediaStream)
    this.recorder = new WebAudioRecorder(this.input, {
      workerDir: 'js/',
      encoding: 'wav',
      numChannels: 2,
      onEncoderLoading: (recorder, encoding) =>
        console.log('正在加载 ' + encoding + ' 编码器'),
      onEncoderLoaded: (recorder, encoding) =>
        console.log(encoding + ' 编码器加载完毕')
    })
    this.recorder.onComplete = (recorder, blob) => {
      console.log('编码完成')
      console.log('recorder =', recorder)
      console.log('blob =', blob)
    }
    this.recorder.setOptions({
      timeLimit: 120,
      encodeAfterRecord: true,
      ogg: { quality: 0.5 },
      mp3: { bitRate: 160 }
    })
    this.recorder.startRecording()
    console.log('开始录音...')
  }

  stop() {
    // 停止麦克风访问
    this.stream.getAudioTracks()[0].stop()

    // 停止录音和编码
    this.recorder.finishRecording()

    console.log('录音结束!')
  }
}

export default Recorder
