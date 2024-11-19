import { GenerateContentRequest } from '@google-cloud/vertexai';
import type { PromptRequest } from '../../types/prompt-request-types';
import generativeTextModel from '../models/generative-text-model';

export const generateTextContent = async ({ text, fileData }: PromptRequest) => {
  console.log(text, fileData);
  const request: GenerateContentRequest = {
    contents: [
      {
        role: 'user',
        parts: [{ text: 'Respond without any unnecessary text or format characters' }],
      },
    ],
  };

  if (text && text.length) {
    request.contents[0].parts.push({ text: text });
  }

  if (fileData) {
    const { fileUri, mimeType } = fileData;
    request.contents[0].parts.push({ fileData: { fileUri: fileUri, mimeType: mimeType } });
  }

  return await generativeTextModel.generateContentStream(request);
};

export default generateTextContent;
