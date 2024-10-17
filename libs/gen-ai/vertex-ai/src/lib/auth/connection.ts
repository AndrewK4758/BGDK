import { VertexAI } from '@google-cloud/vertexai';

// MY STUFF
const project = 'games-424800';
const location = 'us-central1';

const vertexAI = new VertexAI({
  project: project,
  location: location,
});

export default vertexAI;
