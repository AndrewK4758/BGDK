
class MediaRecorderMock extends EventTarget {
  constructor(stream, options) {
    super();
    this.stream = stream;
    this.options = options;
    this.state = 'inactive';
    this.ondataavailable = null;
    this.onerror = null;
    this.onstart = null;
    this.onstop = null;
    this.recordedBlobs = [];
  }

  start(_timeslice) {
    this.state = 'recording';
    if (this.onstart) {
      this.onstart();
    }
  }

  stop() {
    this.state = 'inactive';
    if (this.onstop) {
      this.onstop();
    }

    if (this.ondataavailable) {
      const blob = new Blob(['mock data'], { type: 'video/webm' });
      this.ondataavailable({ data: blob });
    }
  }

  pause() {
    this.state = 'paused';
  }

  resume() {
    this.state = 'recording';
  }

  requestData() {
    return this.recordedBlobs;
  }

  isTypeSupported(mimeType) {
    const supportedTypes = ['video/webm', 'audio/webm'];
    return supportedTypes.includes(mimeType);
  }
}

global.MediaRecorder = MediaRecorderMock;
export default MediaRecorderMock;
