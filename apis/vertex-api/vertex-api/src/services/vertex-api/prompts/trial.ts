import { GenerateContentResponse } from '@google-cloud/vertexai';
import generativeTextModel from '../models/text-model';

// const prompt: GenerateContentRequest = {
//   contents: [{ role: 'user', parts: [{ text: 'How do you function?' }] }],
// };

const generateContentServiceCall = async (input: string): Promise<GenerateContentResponse> => {
  const chat = generativeTextModel.startChat();
  const result = await chat.sendMessage(input);
  const { response } = result;
  return response;
};

export default generateContentServiceCall;
