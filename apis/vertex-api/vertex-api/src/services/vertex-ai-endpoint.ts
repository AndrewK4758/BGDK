import { generateImageRequest, imagenConfig, predictionServiceClient, type ImagenConfig } from '@bgdk/vertex-ai';
import { configDotenv } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';

configDotenv({ path: resolve(cwd(), 'apis/vertex-api/vertex-api/env/.env') });

const generateImage = async ({ prompt, aspectRatio, sampleCount, seed }: Partial<ImagenConfig>) => {
  try {
    imagenConfig.prompt = prompt as string;
    imagenConfig.aspectRatio = aspectRatio;
    imagenConfig.sampleCount = sampleCount;
    imagenConfig.seed = seed;

    const request = generateImageRequest(imagenConfig);
    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;

    const picStrings = [];
    if (predictions.length === 0) {
      console.log('No image was generated. Check the request parameters and prompt.');
    } else {
      for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        const buff = Buffer.from(prediction.structValue.fields.bytesBase64Encoded.stringValue, 'base64');
        const pic64String = buff.toString('base64');
        picStrings.push(pic64String);
      }
    }

    return picStrings;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default generateImage;
