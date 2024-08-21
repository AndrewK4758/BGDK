import { Storage } from '@google-cloud/storage';

const storage = new Storage();

const BUCKET_NAME = 'bgdk-build-for-deploy';
const bucket = storage.bucket(BUCKET_NAME);

// console.log(await storage.getBuckets())
export default bucket;
