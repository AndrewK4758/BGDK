import { Storage } from '@google-cloud/storage';

const bucketName = 'portfolio-gen-ai';

const storagePath = `gs://${bucketName}/`;

const storage = new Storage();

const memoryUpload = async ({ buffer, originalname }: Express.Multer.File) => {
  try {
    await storage.bucket(bucketName).file(originalname).save(buffer);

    return storagePath.concat(originalname);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default memoryUpload;
