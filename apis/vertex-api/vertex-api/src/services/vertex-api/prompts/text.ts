import { GenerateContentRequest, GenerateContentResponse } from '@google-cloud/vertexai';
import generativeTextModel from '../models/text-model';

const generateContentServiceCall = async (input: string): Promise<GenerateContentResponse> => {
  const request: GenerateContentRequest = {
    contents: [
      {
        role: 'user',
        parts: [{ text: input }, { text: 'Respond without any unnecessary text or format characters' }],
      },
    ],
  };

  const { response } = await generativeTextModel.generateContent(request);
  console.log(response.candidates[0].content.parts[0].text);

  return response;
};

export default generateContentServiceCall;
