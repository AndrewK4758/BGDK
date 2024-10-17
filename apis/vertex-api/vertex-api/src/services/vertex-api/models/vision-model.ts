import vertexAI from '../client/vertex-api.ts';

const visionModel = 'gemini-1.0-pro-vision';

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: visionModel,
});

export default generativeVisionModel;
