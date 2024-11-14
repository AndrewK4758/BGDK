import { Request, Response } from 'express';
import memoryUpload from '../services/upload-to-gcs-bucket';
import { getCookie } from '@bgdk/utils';

const uploadToGcsBucket = async (req: Request, resp: Response) => {
  try {
    const file = req.file;

    const contextPath = getCookie('context-id', req.headers.cookie);

    console.log(file);

    const result = await memoryUpload(contextPath, file);

    resp.status(201).json({ path: result });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'File upload unsucessful.' });
  }
};
export default uploadToGcsBucket;
