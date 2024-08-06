import axios from 'axios';

describe('POST /vertex', () => {
  it('should return a message', async () => {
    const resp = await axios.post(`/vertex`, { input: 'test' });

    expect(resp.status).toBe(200);
    expect(resp.data.vertexOutput).toBeTruthy();
  });
});
