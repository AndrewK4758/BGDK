import { VertexAI } from '@google-cloud/vertexai';

// MY STUFF
export const PROJECT = 'games-424800';
export const LOCATION = 'us-central1';

export const MODEL = 'gemini-1.5-pro-001';

const vertexAI = new VertexAI({
  project: PROJECT,
  location: LOCATION,
});

export default vertexAI;
