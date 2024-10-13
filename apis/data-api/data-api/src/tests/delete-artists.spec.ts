import type { artist } from '@prisma/client';
import createArtists from '../services/prisma/artist/create-artists.ts';
import deleteArtists from '../services/prisma/artist/delete-artist.ts';

let id: number, name: string;

describe('Test createArtists service', () => {
  beforeAll(async () => {
    name = 'ARTIST TO DELETE';
    id = ((await createArtists(name)) as artist).artist_id;
  });
  it('Should pass and return the value of the created artist_id and name', async () => {
    const artist = await deleteArtists(id);

    expect(artist).toBeTruthy();
    expect((artist as artist).name).toEqual(name);
  });
});
