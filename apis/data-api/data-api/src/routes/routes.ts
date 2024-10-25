import express, { Router } from 'express';
import deleteArtistsAlbums from '../controllers/delete-artist-albums';
import deleteArtist from '../controllers/delete-artists';
import deleteTracks from '../controllers/delete-tracks';
import getAlbumsCount from '../controllers/get-albums-count';
import getAlbumsTracks from '../controllers/get-albums-tracks';
import getAlbums from '../controllers/get-all-albums';
import getArtistsAlbums from '../controllers/get-artist-albums';
import getArtistCount from '../controllers/get-artist-count';
import getArtists from '../controllers/get-artists';
import updateAlbums from '../controllers/patch-update-albums';
import updateTracks from '../controllers/patch-update-tracks';
import createAlbumsOnArtists from '../controllers/post-albums-on-artist';
import addArtists from '../controllers/post-artists';
import createNewEntrys from '../controllers/post-create-new-entry';
import createTracksOnAlbum from '../controllers/post-tracks-on-album';
import searchArtistsAndAlbums from '../controllers/search-artist-or-album';
import updateArtists from '../controllers/update-artists';
import validateAlbums from '../controllers/validate-albums';
import validateArtists from '../controllers/validate-artists';
import validateTracks from '../controllers/validate-tracks';

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
