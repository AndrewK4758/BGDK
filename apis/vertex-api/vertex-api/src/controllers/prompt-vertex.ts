import { Request, Response } from 'express';
import generateContentServiceCall from '../services/vertex-api/prompts/text';

const promptVertex = async (req: Request, resp: Response): Promise<void> => {
  const { input } = req.body;
  const ans = await generateContentServiceCall(input);
  const outputFromVertex = { vertexOutput: ans.candidates[0].content.parts[0].text };
  resp.status(200).json(outputFromVertex);
};

export default promptVertex;
