import aiplatform from '@google-cloud/aiplatform';
import { LOCATION } from '../auth/connection';

const { PredictionServiceClient } = aiplatform.v1;

const clientOptions = {
  aiEndpoint: `${LOCATION}-apiplaltform.googleapis.com`,
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

export default predictionServiceClient;
