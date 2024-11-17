import type { GcsBucketPath } from '@bgdk/vertex-ai';
import { Storage } from '@google-cloud/storage';

const bucketName = 'portfolio-gen-ai';

const storagePath: GcsBucketPath = `gs://${bucketName}/`;

const memoryUpload = async (contextPath: string, { buffer, originalname }: Express.Multer.File) => {
  try {
    const storage = new Storage();

    await storage.bucket(bucketName).file(`${contextPath}/${originalname}`).save(buffer);

    return storagePath.concat(originalname);
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default memoryUpload;
