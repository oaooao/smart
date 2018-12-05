import blobToBase64 from './blobToBase64'

class Recorder {
  stream = null
  recorder = null
  input = null
  audioContext = null
  blobData = null

  start() {
    return new Promise(async resolve => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })

      this.stream = mediaStream

      this.recorder = new MediaRecorder(mediaStream)

      this.recorder.ondataavailable = async e => {
        console.log('编码完成')

        const blob_oggData = e.data

        const blob_pcmData = blob_oggData.slice(0, -1, 'audio/pcm')

        const base64_pcmData = await blobToBase64(blob_pcmData)

        console.log('blob_pcmData =', blob_pcmData)
        console.log('base64_pcmData =', base64_pcmData)

        resolve({
          len: blob_pcmData.size,
          speech: base64_pcmData
        })
      }

      this.recorder.start()
      console.log('开始录音...')
    })
  }

  stop() {
    // 停止麦克风访问
    this.stream.getAudioTracks()[0].stop()

    // 停止录音和编码
    this.recorder.stop()

    console.log('录音结束!')
  }
}

export default Recorder
