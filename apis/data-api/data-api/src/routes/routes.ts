import express, { Router } from 'express';
import getArtists from '../controllers/get-artists.js';
import addArtists from '../controllers/post-artists.js';
import deleteArtist from '../controllers/delete-artists.js';
import updateArtists from '../controllers/update-artists.js';
import getArtistCount from '../controllers/get-artist-count.js';
import validateArtists from '../controllers/validate-artists.js';
import getAlbumsTracks from '../controllers/get-albums-tracks.js';
import deleteArtistsAlbums from '../controllers/delete-artist-albums.js';
import updateAlbums from '../controllers/patch-update-albums.js';
import createAlbumsOnArtists from '../controllers/post-albums-on-artist.js';
import getArtistsAlbums from '../controllers/get-artist-albums.js';
import validateAlbums from '../controllers/validate-albums.js';
import updateTracks from '../controllers/patch-update-tracks.js';
import createTracksOnAlbum from '../controllers/post-tracks-on-album.js';
import validateTracks from '../controllers/validate-tracks.js';
import deleteTracks from '../controllers/delete-tracks.js';
import getAlbumsCount from '../controllers/get-albums-count.js';
import getAlbums from '../controllers/get-all-albums.js';
import createNewEntrys from '../controllers/post-create-new-entry.js';
import searchArtistsAndAlbums from '../controllers/search-artist-or-album.js';

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
