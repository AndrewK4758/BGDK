import axios from 'axios';
import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';

const vertexSubmitAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { promptInput } = await request.json();

  const resp = await axios.post('http://localhost:5555/api/v1/vertex', { input: promptInput });
  return resp.data;
};

export default vertexSubmitAction;
