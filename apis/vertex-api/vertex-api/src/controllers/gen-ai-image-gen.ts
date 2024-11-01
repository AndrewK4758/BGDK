import { Request, Response } from 'express';
import generateImage from '../services/vertex-ai-endpoint';

const generateImages = async (req: Request, resp: Response) => {
  try {
    const { prompt } = req.body as { prompt: string };

    const rawImageDataArray = await generateImage(prompt);
    const rawImage = Buffer.from(rawImageDataArray[0].structValue.fields.bytesBase64Encoded.stringValue, 'base64');

    resp.status(201).send(rawImage.toString('base64'));
  } catch (error) {
    console.error(error);
    resp.sendStatus(500);
  }
};

export default generateImages;
