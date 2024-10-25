import axios from 'axios';
import { artist } from '@prisma/client';

let dataPost: { name: string }, dataUpdate: artist, artist_id: number;
describe('Test all endpoints for artist CRUD', () => {
  beforeAll(() => {
    dataPost = { name: 'POSTED IN JEST' };
  });

  beforeEach(() => {
    dataUpdate = { artist_id: Number(artist_id), name: 'UPDATED IN JEST' };
  });
  describe('GET /artists', () => {
    it('should return a list of artists', async () => {
      const resp = await axios.get(`/artists`);

      expect(resp.data.length).toBeGreaterThan(1);
    });
  });

  describe('POST /artists', () => {
    it('should return the value of the posted artist', async () => {
      const resp = await axios.post('/artists', dataPost);

      artist_id = Number(resp.data.newArtist.artist_id);
      expect(resp.data.newArtist.name).toEqual(dataPost.name);
    });
  });

  describe('UPDATE /artists', () => {
    it('Should return the value of the updatedArtist', async () => {
      const resp = await axios.patch('/artists', dataUpdate);

      expect(resp.data.updatedArtist.name).toEqual(dataUpdate.name);
    });
  });

  describe('DELETE /artists/:id', () => {
    it('Should return the value of deletedArtist', async () => {
      const resp = await axios.delete(`/artists/${artist_id}`);

      expect(resp.data.deletedArtist).toEqual(dataUpdate);
    });
  });
});
