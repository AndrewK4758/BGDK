import { Request, Response } from 'express';
import generateImage from '../services/vertex-ai-endpoint';
import type { ImagenConfig } from '@bgdk/vertex-ai';

const generateImages = async (req: Request, resp: Response) => {
  try {
    const { prompt, sampleCount, seed, aspectRatio } = req.body as Partial<ImagenConfig>;

    const rawImageDataArray = await generateImage({ prompt, sampleCount, seed, aspectRatio });

    resp.status(201).send(rawImageDataArray);
  } catch (error) {
    console.error(error);
    resp.sendStatus(500);
  }
};

export default generateImages;
