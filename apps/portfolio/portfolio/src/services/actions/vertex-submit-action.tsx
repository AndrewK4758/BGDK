import axios from 'axios';

import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

const vertexSubmitAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { promptInput } = await request.json();

  console.log(promptInput);

  const resp = await axios.post(
    `${baseUrl}/text`,
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
