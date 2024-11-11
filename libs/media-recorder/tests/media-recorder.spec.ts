import { mediaRecorder } from '../src/lib/media-recorder';

describe('mediaRecorder', () => {
  it('should work', () => {
    expect(mediaRecorder()).toEqual('media-recorder');
  });
});
