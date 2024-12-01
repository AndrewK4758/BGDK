import { VertexAI } from '@google-cloud/vertexai';
import { configDotenv } from 'dotenv';
import { cwd } from 'process';

configDotenv({ path: `${cwd()}/libs/gen-ai/vertex-ai/env/.env` });

// MY STUFF
export const PROJECT = 'games-424800';
export const LOCATION = 'us-central1';

export const MODEL = 'gemini-1.5-pro-001';

const vertexAI = new VertexAI({
  project: PROJECT,
  location: LOCATION,
  googleAuthOptions: {
    // keyFile: process.env.KEY_FILE,
  },
});

export default vertexAI;
