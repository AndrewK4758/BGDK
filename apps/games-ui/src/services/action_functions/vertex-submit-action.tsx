import axios from 'axios';
import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';

const vertexSubmitAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { promptInput } = await request.json();

  const baseUrl = import.meta.env.VITE_VERTEX_API_SERVER_URL;

  const resp = await axios.post(`${baseUrl}/vertex`, { input: promptInput });
  const { vertexOutput } = resp.data;
  return vertexOutput;
};

export default vertexSubmitAction;
