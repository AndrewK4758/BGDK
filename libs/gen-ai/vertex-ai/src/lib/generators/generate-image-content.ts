import { helpers } from '@google-cloud/aiplatform';
import {
  type AspectRatios,
  type PersonGenerations,
  type SafetyFilterLevels,
  AspectRatio,
  SafetyFilterLevel,
  PersonGeneration,
} from '@bgdk/types-ai';

const projectId = 'games-424800';
const location = 'us-central1';

export interface ImagenConfig {
  projectId: string;
  location: string;
  endpoint: string;
  prompt: string;
  sampleCount?: number;
  seed?: number;
  aspectRatio?: AspectRatios;
  safetyFilterLevel?: SafetyFilterLevels;
  personGeneration?: PersonGenerations;
}

export const imagenConfig: ImagenConfig = {
  projectId: projectId,
  location: location,
  endpoint: `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`,
  prompt: '',
  sampleCount: 0,
  aspectRatio: AspectRatio['1:1'],
  safetyFilterLevel: SafetyFilterLevel.block_some,
  personGeneration: PersonGeneration.allow_adult,
};

export const generateImageRequest = (config: ImagenConfig) => {
  const { endpoint, prompt, aspectRatio, seed, sampleCount } = config;
  const promptText = { prompt };

  const instanceValue = helpers.toValue(promptText);

  const instances = [instanceValue];

  const parameters = helpers.toValue({
    addWatermark: false,
    aspectRatio: aspectRatio,
    seed: seed,
    sampleCount: sampleCount,
  });

  const request = {
    endpoint,
    parameters,
    instances,
  };

  return request;
};
