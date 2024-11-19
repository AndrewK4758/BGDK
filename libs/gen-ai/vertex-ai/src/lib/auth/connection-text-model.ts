import { VertexAI } from '@google-cloud/vertexai';
import { configDotenv } from 'dotenv';

configDotenv({ path: 'libs/gen-ai/vertex-ai/env/.env' });

console.log(process.env.VERTEX_CRED_KEY);

// MY STUFF
export const PROJECT = 'games-424800';
export const LOCATION = 'us-central1';

export const MODEL = 'gemini-1.5-pro-001';

const vertexAI = new VertexAI({
  project: PROJECT,
  location: LOCATION,
  googleAuthOptions: {
    keyFile: process.env.VERTEX_CRED_KEY,
  },
});

export default vertexAI;
