import aiplatform from '@google-cloud/aiplatform';

const clientOptions = {
  aiEndpoint: `us-central1-aiplatform.googleapis.com`,
  apiKey: 'AIzaSyBS679jiUCmJM3fWKMa3I8S_tYWhnxDfJ0',
  projectId: 'games-424800',
};

const { PredictionServiceClient } = aiplatform.v1beta1;

const predictionServiceClient = new PredictionServiceClient(clientOptions);

// console.log(predictionServiceClient);

export default predictionServiceClient;
