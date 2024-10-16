import createArtists from '../services/prisma/artist/create-artists.js';
import deleteArtists from '../services/prisma/artist/delete-artist.js';
import findArtists from '../services/prisma/artist/find-artists.js';

let name: string;

describe('Test createArtists service', () => {
  beforeAll(async () => {
    name = 'CREATED ARTIST IN SERVICE';
    const artist = await findArtists({ where: { name: { equals: name } } });

    if (artist.length) {
      await deleteArtists(artist[0].artist_id);
    }
  });
  it('Should pass and return the value of the created artist_id and name', async () => {
    const artist = await createArtists(name);

    if (artist) {
      expect(artist.name).toEqual(name);
      expect(artist.artist_id).toBeTruthy();
    } else expect(artist).toBeNull();
  });
});
