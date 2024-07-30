import { Router } from 'express';
import getArtisis from '../controllers/artists';

export default class Routes {
  constructor(router: Router) {
    router.get('/artists', getArtisis);
  }
}
