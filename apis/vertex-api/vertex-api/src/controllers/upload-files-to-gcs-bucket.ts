import { Request, Response } from 'express';
import memoryUpload from '../services/gcs-bucket-connect';

const uploadToGcsBucket = async (req: Request, resp: Response) => {
  try {
    const file = req.file;

    console.log(file);

    const result = await memoryUpload(file);

    resp.status(201).json({ path: result });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'File upload unsucessful.' });
  }
};
export default uploadToGcsBucket;
