import express, { Router } from 'express';
import getArtisis from '../controllers/get-artists';
import addArtists from '../controllers/post-artists';
import deleteArtist from '../controllers/delete-artists';
import updateArtist from '../controllers/update-artists';

export default class Routes {
  constructor(router: Router) {
    router.use(express.json());

    router.get('/artists', getArtisis);
    router.post('/artists', addArtists);
    router.delete('/artists/:id', deleteArtist);
    router.patch('/artists', updateArtist);
  }
}
