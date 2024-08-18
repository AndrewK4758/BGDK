import { socketIo } from './socket-io';

describe('socketIo', () => {
  it('should work', () => {
    expect(socketIo()).toEqual('socket-io');
  });
});
