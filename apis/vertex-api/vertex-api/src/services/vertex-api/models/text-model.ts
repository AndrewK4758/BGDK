import { HarmBlockThreshold, HarmCategory } from '@google-cloud/vertexai';
import vertexAI from '../vertex-api';

const textModel = 'gemini-1.0-pro';

const generativeTextModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
  generationConfig: { responseMimeType: 'application/json' },
});

export default generativeTextModel;
