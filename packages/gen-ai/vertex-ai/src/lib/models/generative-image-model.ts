import { PredictionServiceClient } from '@google-cloud/aiplatform';

const location = 'us-central1';

const clientOptions = {
  apiEndpoint: `${location}-aiplatform.googleapis.com`,
};

export const predictionServiceClient = new PredictionServiceClient(clientOptions);

export default predictionServiceClient;
