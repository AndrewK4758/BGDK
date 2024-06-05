import { instanceOfGame } from './instance-of-game';

describe('instanceOfGame', () => {
  it('should work', () => {
    expect(instanceOfGame()).toEqual('instance-of-game');
  });
});
