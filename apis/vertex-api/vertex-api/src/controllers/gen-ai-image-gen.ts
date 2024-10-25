import { Request, Response } from 'express';
import { generateImage } from '@bgdk/vertex-ai';

const generateImages = async (req: Request, resp: Response) => {
    try {
      const { prompt } = req.body;

      console.log(prompt);

      await generateImage(prompt as string);

      resp.sendStatus(201);
    } catch (error) {
      console.log('IN CATCH BLOCK');
      console.error(error);
      resp.sendStatus(500);
    }
};

export default generateImages;
