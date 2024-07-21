import axios from 'axios';

describe('test', () => {
  it('should pass', async () => {
    const resp = await axios.get(`http://localhost:4444`);

    expect(resp.data).toEqual({ message: 'Welcome to data-api!' });
  });
});
