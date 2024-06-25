import { SocketBuilder } from '../lib/socket-manager';

describe('gamesApiSockets', () => {
  it('should work', () => {
    expect(SocketBuilder.getSocket()).toBeTruthy();
  });
});
