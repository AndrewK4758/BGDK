import { Dispatch, SetStateAction } from 'react';

export interface IMediaRecorderClient {
  mediaRecorder: MediaRecorder;
  recordedChunks: Blob[];
  options: MediaRecorderOptions;
}

export class MRC implements IMediaRecorderClient {
  recordedChunks: Blob[];
  mediaRecorder: MediaRecorder;
  options: MediaRecorderOptions;

  constructor(stream: MediaStream, options: MediaRecorderOptions) {
    this.options = options;
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream, options);
  }

  static createStream = async (constraints: MediaStreamConstraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  private setOnDataAvailable() {
    this.mediaRecorder.ondataavailable = (event: BlobEvent): void => {
      console.log(event, ' ondataavailable - EVENT');
      console.log(event.data, ' ondataavailable - EVENT.DATA');
      this.recordedChunks.push(event.data);
      console.log(this.recordedChunks, ' ondataavailable - RECORDED CHUNKS');
    };
  }
  private setOnStop(setStateFunction: Dispatch<SetStateAction<Blob | null>>) {
    this.mediaRecorder.onstop = () => {
      const blobData = new Blob(this.recordedChunks, { type: this.options.mimeType });
      setStateFunction(blobData);
    };
  }

  startRecording(setStateFunction: Dispatch<SetStateAction<Blob | null>>) {
    console.log('RECORDING STARTED');
    this.setOnDataAvailable();
    this.setOnStop(setStateFunction);

    this.mediaRecorder.start();
  }

  stopRecording() {
    console.log('RECORDING STOPPED');
    this.mediaRecorder.stop();
  }
}

export default MRC;
