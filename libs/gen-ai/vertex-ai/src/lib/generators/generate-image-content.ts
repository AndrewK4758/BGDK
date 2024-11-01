import { helpers } from '@google-cloud/aiplatform';
import predictionServiceClient from '../models/generative-image-model';

const projectId = 'games-424800';
const location = 'us-central1';

interface ImagenConfig {
  projectId: string;
  location: string;
  endpoint: string;
  prompt: string;
  sampleCount?: number; // Optional: Number of images to generate
  seed?: number; // Optional: Seed for random number generator
  aspectRatio?: string; // Optional: Aspect ratio of the generated image (e.g., '1:1', '16:9')
  safetyFilterLevel?: 'block_some' | 'block_all'; // Optional: Safety filter level
  personGeneration?: 'allow_adult' | 'allow_all' | 'disallow'; // Optional: Person generation setting
}

const imagenConfig: ImagenConfig = {
  projectId: projectId,
  location: location,
  endpoint: `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`,
  prompt: '',
  sampleCount: 1,
  aspectRatio: '4:3',
  safetyFilterLevel: 'block_some',
  personGeneration: 'allow_adult',
};

const generateImageRequest = (config: ImagenConfig) => {
  const { endpoint, prompt } = config;
  const promptText = { prompt };

  const instanceValue = helpers.toValue(promptText);

  const instances = [instanceValue];

  const parameters = helpers.toValue({});

  const request = {
    endpoint,
    parameters,
    instances,
  };

  return request;
};

export { imagenConfig, predictionServiceClient, generateImageRequest, type ImagenConfig };
