import axios from 'axios';

import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_VERTEX_API_SERVER_URL;

const vertexSubmitAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { promptInput } = await request.json();

  const resp = await axios.post(
    `${baseUrl}/vertex`,
    { input: promptInput },
    { headers: { 'Content-Type': `application/json` } },
  );

  const { vertexResponse } = resp.data;

  return vertexResponse;
};

export default vertexSubmitAction;

// const readChunks = async (reader: ReadableStreamDefaultReader<any>) => {
//   const { done, value } = await reader.read();

//   return {
//     done,
//     value,
//   };
// };
