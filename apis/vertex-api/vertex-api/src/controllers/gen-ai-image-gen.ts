import { Request, Response } from 'express';
import { generateImage } from '@bgdk/vertex-ai';

const generateImages = async (req: Request, resp: Response) => {
  try {
    const { prompt } = req.body;

    await generateImage(prompt as string);

    resp.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
};

export default generateImages;
