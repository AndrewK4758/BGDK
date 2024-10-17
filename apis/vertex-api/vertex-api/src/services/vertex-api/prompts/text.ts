import { GenerateContentRequest } from '@google-cloud/vertexai';
import generativeTextModel from '../models/text-model.ts';

const generateTextContent = async (input: string) => {
  const request: GenerateContentRequest = {
    contents: [
      {
        role: 'user',
        parts: [{ text: input }, { text: 'Respond without any unnecessary text or format characters' }],
      },
    ],
  };
  const result = await generativeTextModel.generateContentStream(request);

  return result;
};

export default generateTextContent;
