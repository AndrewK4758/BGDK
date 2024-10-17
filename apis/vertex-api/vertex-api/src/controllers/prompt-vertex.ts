import { Request, Response } from 'express';
import generateContentServiceCall from '../services/vertex-api/prompts/text.ts';


const promptVertex = async (req: Request, resp: Response): Promise<void> => {
  const { input } = req.body;

  const vertexResponse = await generateContentServiceCall(input);

  resp.setHeader('content-type', 'application/json');

  resp.status(201).json({ vertexResponse });
};

export default promptVertex;
