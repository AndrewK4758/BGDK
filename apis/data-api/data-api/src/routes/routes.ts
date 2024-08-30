import express, { Router } from 'express';
import getArtists from '../controllers/get-artists';
import addArtists from '../controllers/post-artists';
import deleteArtist from '../controllers/delete-artists';
import updateArtist from '../controllers/update-artists';
import getArtistCount from '../controllers/get-artist-count';
import validateArtists from '../controllers/validateArtists';
import getAlbumsTracks from '../controllers/get-albums-tracks';
import deleteArtistsAlbums from '../controllers/delete-artist-albums';
import updateAlbums from '../controllers/patch-update-albums';
import createAlbumsOnArtists from '../controllers/post-albums-on-artist';
import getArtistsAlbums from '../controllers/get-artist-albums';
import validateAlbums from '../controllers/validate-albums';
import updateTracks from '../controllers/patch-update-tracks';

export const router: Router = Router();

export default class Routes {
  constructor() {
    router.use(express.json());
    router.get('/artists-count', getArtistCount);
    router.get('/artists', getArtists, validateArtists);
    router.post('/artists', addArtists);
    router.delete('/artists/:id', deleteArtist);
    router.patch('/artists', updateArtist);

    router.get('/albums', getArtistsAlbums, validateAlbums);
    router.delete('/albums/:id', deleteArtistsAlbums);
    router.patch('/albums', updateAlbums);
    router.post('/albums', createAlbumsOnArtists);

    router.get('/tracks/:id', getAlbumsTracks);
    router.patch('/tracks', updateTracks);
  }
}

