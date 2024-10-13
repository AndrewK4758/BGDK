import { HarmBlockThreshold, HarmCategory } from '@google-cloud/vertexai';
import vertexAI from '../client/vertex-api.ts';

const textModel = 'gemini-1.5-pro-001';

const generativeTextModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED,
    },
  ],
  generationConfig: { responseMimeType: 'text/plain' },
});

export default generativeTextModel;
