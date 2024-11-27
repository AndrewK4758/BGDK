import { Request, Response } from 'express';
import memoryUpload from '../services/upload-to-gcs-bucket';

const uploadToGcsBucket = async (req: Request, resp: Response) => {
  try {
    const { contextPath } = req.body;

    console.log(contextPath);

    const file = req.file;

    const result = await memoryUpload(contextPath as string, file);

    resp.status(201).json({ path: result });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'File upload unsucessful.' });
  }
};
export default uploadToGcsBucket;
