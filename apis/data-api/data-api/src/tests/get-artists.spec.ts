import findArtists from '../services/prisma/artist/find-artists';

describe('Test Prisma findArtist service', () => {
  it('Should pass and return list of Artists', async () => {
    const artistsList = await findArtists();

    console.log(artistsList);
    expect(artistsList.length).toBeGreaterThan(0);
  });
});
