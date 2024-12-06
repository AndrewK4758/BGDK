import type { Dispatch, SetStateAction } from 'react';

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
    if (constraints.audio) {
      return await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 2,
          echoCancellation: true,
          facingMode: { exact: 'front', ideal: 'front' },
          noiseSuppression: true,
        },
      });
    } else return await navigator.mediaDevices.getUserMedia(constraints);
  };

  private _setOnDataAvailable() {
    this.mediaRecorder.ondataavailable = (event: BlobEvent): void => {
      this.recordedChunks.push(event.data);
    };
  }
  private _setOnStop(setStateFunction: Dispatch<SetStateAction<Blob | null>>) {
    this.mediaRecorder.onstop = () => {
      const blobData = new Blob(this.recordedChunks, { type: this.options.mimeType });
      setStateFunction(blobData);
      this.recordedChunks = [];
    };
  }

  startRecording(setStateFunction: Dispatch<SetStateAction<Blob | null>>) {
    this._setOnDataAvailable();
    this._setOnStop(setStateFunction);

    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }
}

export default MRC;
