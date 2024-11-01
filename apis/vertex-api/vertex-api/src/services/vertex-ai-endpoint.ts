import { generateImageRequest, imagenConfig, predictionServiceClient } from '@bgdk/vertex-ai';
import { configDotenv } from 'dotenv';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

configDotenv({ path: resolve(cwd(), 'apis/vertex-api/vertex-api/env/.env') });

const generateImage = async (prompt: string) => {
  try {
    imagenConfig.prompt = prompt;

    const request = generateImageRequest(imagenConfig);
    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;

    if (predictions.length === 0) {
      console.log('No image was generated. Check the request parameters and prompt.');
    } else {
      for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        const buff = Buffer.from(prediction.structValue.fields.bytesBase64Encoded.stringValue, 'base64');
        await writeFile(`${process.env.PIC_SAVE_PATH}/pic${i}.txt`, buff.toString('base64'));
      }
    }
    return predictions;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default generateImage;
