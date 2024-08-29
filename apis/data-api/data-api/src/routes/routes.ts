import express, { Router } from 'express';
import getArtists from '../controllers/get-artists';
import addArtists from '../controllers/post-artists';
import deleteArtist from '../controllers/delete-artists';
import updateArtist from '../controllers/update-artists';
import getArtistsAlbums from '../controllers/get-artist-albums';
import getArtist from '../controllers/get-artist';
import getArtistCount from '../controllers/get-artist-count';
import validateArtists from '../controllers/validateArtists';
export const router: Router = Router();

export default class Routes {
  constructor() {
    router.use(express.json());
    router.get('/artists-count', getArtistCount);
    router.get('/artists', getArtists, validateArtists);
    router.post('/artists', addArtists);
    router.delete('/artists/:id', deleteArtist);
    router.patch('/artists', updateArtist);
    router.get('/artist/:id', getArtistsAlbums);
    router.get('/artist/:id', getArtist);
  }
}
