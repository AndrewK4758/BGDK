import createArtists from '../src/services/prisma/artist/create-artists';
import deleteArtists from '../src/services/prisma/artist/delete-artist';
import findArtists from '../src/services/prisma/artist/find-artists';

let name: string;

describe('Test createArtists service', () => {
  beforeAll(async () => {
    name = 'CREATED ARTIST IN SERVICE';
    const artist = await findArtists({ where: { name: { equals: name } } });

    if (artist && artist.length) {
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
