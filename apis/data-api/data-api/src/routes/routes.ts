import express, { Router } from 'express';
import deleteArtistsAlbums from '../controllers/delete-artist-albums.ts';
import deleteArtist from '../controllers/delete-artists.ts';
import deleteTracks from '../controllers/delete-tracks.ts';
import getAlbumsCount from '../controllers/get-albums-count.ts';
import getAlbumsTracks from '../controllers/get-albums-tracks.ts';
import getAlbums from '../controllers/get-all-albums.ts';
import getArtistsAlbums from '../controllers/get-artist-albums.ts';
import getArtistCount from '../controllers/get-artist-count.ts';
import getArtists from '../controllers/get-artists.ts';
import updateAlbums from '../controllers/patch-update-albums.ts';
import updateTracks from '../controllers/patch-update-tracks.ts';
import createAlbumsOnArtists from '../controllers/post-albums-on-artist.ts';
import addArtists from '../controllers/post-artists.ts';
import createNewEntrys from '../controllers/post-create-new-entry.ts';
import createTracksOnAlbum from '../controllers/post-tracks-on-album.ts';
import searchArtistsAndAlbums from '../controllers/search-artist-or-album.ts';
import updateArtists from '../controllers/update-artists.ts';
import validateAlbums from '../controllers/validate-albums.ts';
import validateArtists from '../controllers/validate-artists.ts';
import validateTracks from '../controllers/validate-tracks.ts';

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
