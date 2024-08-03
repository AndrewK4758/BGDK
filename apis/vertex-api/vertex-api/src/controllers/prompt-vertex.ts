import { Request, Response } from 'express';
import generateContentServiceCall from '../services/vertex-api/prompts/trial';

const promptVertex = async (req: Request, resp: Response): Promise<void> => {
  const { input } = req.body;
  const ans = await generateContentServiceCall(input);
  const disp = ans.candidates[0].content.parts[0].text;
  console.log(disp);
  resp.status(200).json(disp);
};

export default promptVertex;
