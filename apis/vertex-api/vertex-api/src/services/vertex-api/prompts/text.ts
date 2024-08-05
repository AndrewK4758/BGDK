import { GenerateContentResponse } from '@google-cloud/vertexai';
import generativeTextModel from '../models/text-model';

const generateContentServiceCall = async (input: string): Promise<GenerateContentResponse> => {
  const chat = generativeTextModel.startChat();
  const { response } = await chat.sendMessage(input);
  console.log(response.candidates[0].content.parts[0].text);
  console.log(response.candidates[0].content.parts[0].fileData);
  console.log(response.candidates[0].content.parts[0].functionCall);
  console.log(response.candidates[0].content.parts[0].functionResponse);
  console.log(response.candidates[0].content.parts[0].inlineData);
  return response;
};

export default generateContentServiceCall;
