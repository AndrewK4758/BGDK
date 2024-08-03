import createArtists from '../services/prisma/artist/create-artists';
import updateArtist from '../services/prisma/artist/update-artists';

let id: number, name: string, newName: string;
describe('Test updateArtist service', () => {
  beforeAll(async () => {
    name = 'ARTIST TO UPDATE';
    id = (await createArtists(name)).artist_id;
  });
  it('Should return the updated name for the provided artist_id', async () => {
    newName = 'UPDATED IN JEST';
    const updatedArtist = await updateArtist(id, newName);

    expect(updatedArtist).toBeTruthy();
    expect(updatedArtist.name).toEqual(newName);
  });
});
