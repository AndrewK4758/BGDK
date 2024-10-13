import type { artist } from '@prisma/client';
import createArtists from '../services/prisma/artist/create-artists.ts';
import updateArtist from '../services/prisma/artist/update-artists.ts';

let id: number, name: string, newName: string;
describe('Test updateArtist service', () => {
  beforeAll(async () => {
    name = 'ARTIST TO UPDATE';
    id = ((await createArtists(name)) as artist).artist_id;
  });
  it('Should return the updated name for the provided artist_id', async () => {
    newName = 'UPDATED IN JEST';
    const updatedArtist = await updateArtist(id, newName);

    expect(updatedArtist).toBeTruthy();
    expect((updatedArtist as artist).name).toEqual(newName);
  });
});
