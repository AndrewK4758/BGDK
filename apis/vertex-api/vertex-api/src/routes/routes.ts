import express, { Router } from 'express';
import promptVertex from '../controllers/prompt-vertex';

export default class VertexApiRoutes {
  constructor(router: Router) {
    router.use(express.json());
    router.post('/vertex', promptVertex);
  }
}
