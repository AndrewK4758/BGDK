import { HarmBlockThreshold, HarmCategory } from '@google-cloud/vertexai';
import vertexAI, { MODEL } from '../auth/connection-text-model';

const generativeTextModel = vertexAI.getGenerativeModel({
  model: MODEL,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
  generationConfig: { responseMimeType: 'text/plain' },
});

export default generativeTextModel;
