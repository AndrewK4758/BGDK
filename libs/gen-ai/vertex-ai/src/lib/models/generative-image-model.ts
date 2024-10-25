import aiplatform from '@google-cloud/aiplatform';

const clientOptions = {
  aiEndpoint: `us-central1-aiplatform.googleapis.com`,
  projectId: 'games-424800',
};

const { PredictionServiceClient } = aiplatform.v1beta1;

const predictionServiceClient = new PredictionServiceClient(clientOptions);

// console.log(predictionServiceClient);

export default predictionServiceClient;
