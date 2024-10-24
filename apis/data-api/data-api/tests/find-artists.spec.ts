import type { artist } from '@prisma/client';
import findArtists from '../src/services/prisma/artist/find-artists';

describe('Test Prisma findArtist service', () => {
  it('Should pass and return list of Artists', async () => {
    const artistsList = await findArtists({});
    expect((artistsList as artist[]).length).toBeGreaterThan(0);
  });
});
