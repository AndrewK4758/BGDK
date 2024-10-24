import predictionServiceClient from '../models/generative-image-model';
import { helpers } from '@google-cloud/aiplatform';
import { LOCATION, PROJECT } from '../auth/connection';
import { writeFile } from 'fs/promises';

export const generateImage = async (prompt: string) => {
  const endpoint = `projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001`;

  const promptText = {
    prompt: prompt,
  };

  const instanceValue = helpers.toValue(promptText);
  const instances = [instanceValue];

  const parameter = {
    sampleCount: 1,
    aspectRatio: '4:3',
    safteyFilterLevel: 'block_some',
    personGeneration: 'allow_adult',
  };

  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  const [response] = await predictionServiceClient.predict(request);

  const predictions = response.predictions;

  if (predictions.length === 0) {
    console.log('No image generated, Review request, parameters, and prompt');
  } else {
    let i = 0;
    for (const prediction of predictions) {
      const buff = Buffer.from(prediction.structValue.fields.bytesBase64Encoded.stringValue, 'base64');

      const filename = `output-${i}.png`;
      await writeFile(`${__dirname}/libs/gen-ai/vertex-ai/data`, buff);
      console.log(`Image generated\r\nName: ${filename}`);
      i++;
    }
  }
};

export default generateImage;
