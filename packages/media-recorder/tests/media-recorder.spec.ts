import MRC from '../src/lib/mrc';
import MediaRecorderMock from './__mocks__/media-recorder-mock';

let stream: MediaStream, options: MediaRecorderOptions;

describe('Test MRC class', () => {
  beforeAll(() => {
    global.MediaStream = jest.fn();
    new MediaRecorderMock(stream, options);
    stream = new MediaStream();
    options = { mimeType: 'audio/webm' };
  });
  it('Should create everything needed to make basic media recordings', () => {
    const mrc = new MRC(stream, options);

    expect(mrc.mediaRecorder).toBeInstanceOf(MediaRecorder);
  });
});
