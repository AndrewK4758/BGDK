import axios from 'axios';
import { ActionFunctionArgs, type ActionFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_SERVER_URL_VERTEX;

const handlePromptBuilder: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const resp = await axios.post(`${baseURL}/build-prompt`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return resp.data.finalPrompt;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handlePromptBuilder;
