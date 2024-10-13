import createArtists from '../services/prisma/artist/create-artists.ts';

let name: string;

describe('Test createArtists service', () => {
  name = 'CREATED ARTIST IN SERVICE';
  it('Should pass and return the value of the created artist_id and name', async () => {
    const artist = await createArtists(name);

    if (artist) {
      expect(artist.name).toEqual(name);
      expect(artist.artist_id).toBeTruthy();
    } else expect(artist).toBeNull();
  });
});
