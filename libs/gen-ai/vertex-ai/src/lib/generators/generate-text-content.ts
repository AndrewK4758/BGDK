import { GenerateContentRequest } from '@google-cloud/vertexai';
import generativeTextModel from '../models/generative-text-model.ts';
import type { PromptRequest } from '../../types/prompt-request-types.ts';

export const generateTextContent = async ({ text, fileData }: PromptRequest) => {
  const request: GenerateContentRequest = {
    contents: [
      {
        role: 'user',
        parts: [{ text: 'Respond without any unnecessary text or format characters' }],
      },
    ],
  };

  if (text !== null) {
    request.contents[0].parts.push({ text: text });
  }

  if (fileData !== null) {
    const { fileUri, mimeType } = fileData;
    request.contents[0].parts.push({ fileData: { fileUri: fileUri, mimeType: mimeType } });
  }
  // if (filesData.inlineData !== null) {
  //   const { data, mimeType } = filesData.inlineData;

  //   request.contents[0].parts.push({
  //     inlineData: { data: data, mimeType: mimeType },
  //   });
  // }

  return await generativeTextModel.generateContentStream(request);
};

export default generateTextContent;
