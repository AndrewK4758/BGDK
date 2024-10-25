import predictionServiceClient from '../models/generative-image-model';
import { helpers } from '@google-cloud/aiplatform';
// import { writeFile } from 'fs/promises';

// const PROJECT = '120904484903';

export const generateImage = async (prompt: string) => {
  console.log(prompt);
  const endpoint = `projects/games-424800/locations/us-central1/models/imagen-3.0-generate-001:predict`;
  // `projects/games-424800/locations/me-central1/publishers/google/models/imagen-3.0-generate-001:predict`;

  const promptText = {
    prompt: prompt,
  };

  const instanceValue = helpers.toValue(promptText);

  const instances = [instanceValue];

  const parameter = {
    sampleCount: 1,

    addWatermark: false,

    aspectRatio: '4:3',

    safteyFilterLevel: 'block_some',

    personGeneration: 'allow_adult',
  };

  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    parameters,
    instances,
  };

  console.log(await predictionServiceClient.predict(request));

  //  const result = await predictionServiceClient.predict(request);
  // console.log(result);
  // const [response] = result;
  // const predictions = response.predictions;
  // if (predictions.length === 0) {
  //   console.log('No image generated, Review request, parameters, and prompt');
  // } else {
  //   let i = 0;
  //   for (const prediction of predictions) {
  //     const buff = Buffer.from(prediction.structValue.fields.bytesBase64Encoded.stringValue, 'base64');
  //     const filename = `output-${i}.png`;
  //     await writeFile(`${__dirname}/libs/gen-ai/vertex-ai/data`, buff);
  //     console.log(`Image generated\r\nName: ${filename}`);
  //     i++;
  //   }
  // }
};

export default generateImage;
