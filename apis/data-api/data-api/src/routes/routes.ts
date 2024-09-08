import express, { Router } from 'express';
import getArtists from '../controllers/get-artists';
import addArtists from '../controllers/post-artists';
import deleteArtist from '../controllers/delete-artists';
import updateArtists from '../controllers/update-artists';
import getArtistCount from '../controllers/get-artist-count';
import validateArtists from '../controllers/validate-artists';
import getAlbumsTracks from '../controllers/get-albums-tracks';
import deleteArtistsAlbums from '../controllers/delete-artist-albums';
import updateAlbums from '../controllers/patch-update-albums';
import createAlbumsOnArtists from '../controllers/post-albums-on-artist';
import getArtistsAlbums from '../controllers/get-artist-albums';
import validateAlbums from '../controllers/validate-albums';
import updateTracks from '../controllers/patch-update-tracks';
import createTracksOnAlbum from '../controllers/post-tracks-on-album';
import validateTracks from '../controllers/validate-tracks';
import deleteTracks from '../controllers/delete-tracks';
import getAlbumsCount from '../controllers/get-albums-count';
import getAlbums from '../controllers/get-all-albums';
import createNewEntrys from '../controllers/post-create-new-entry';
import searchArtistsAndAlbums from '../controllers/search-artist-or-album';

export const router: Router = Router();

export default class Routes {
  constructor() {
    router.use(express.json());

    router.get('/artists', getArtistCount, getArtists, validateArtists);
    router.post('/artists', addArtists);
    router.patch('/artists', updateArtists);
    router.delete('/artists/:id', deleteArtist);

    router.get('/albums', getAlbumsCount, getArtistsAlbums, validateAlbums, getAlbums);
    router.post('/albums', createAlbumsOnArtists);
    router.patch('/albums', updateAlbums);
    router.delete('/albums/:id', deleteArtistsAlbums);

    router.get('/tracks', getAlbumsTracks, validateTracks);
    router.post('/tracks', createTracksOnAlbum);
    router.patch('/tracks', updateTracks);
    router.delete('/tracks/:id', deleteTracks);

    router.post('/new-entry', createNewEntrys);

    router.get('/search', searchArtistsAndAlbums);
  }
}

