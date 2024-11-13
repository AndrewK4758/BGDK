import { Storage } from '@google-cloud/storage';

const bucketName = 'portfolio-gen-ai';

const storage = new Storage();

const memoryUpload = async (file: Express.Multer.File) => {
  try {
    await storage.bucket(bucketName).file(file.originalname).save(file.buffer);

    return `gs://portfolio-gen-ai/${file.originalname}`;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default memoryUpload;
