import createArtists from '../services/prisma/artist/create-artists';
import deleteArtists from '../services/prisma/artist/delete-artist';

let id: number, name: string;

describe('Test createArtists service', () => {
  beforeAll(async () => {
    name = 'ARTIST TO DELETE';
    id = (await createArtists(name)).artist_id;
  });
  it('Should pass and return the value of the created artist_id and name', async () => {
    const artist = await deleteArtists(id);

    expect(artist).toBeTruthy();
    expect(artist.name).toEqual(name);
  });
});
