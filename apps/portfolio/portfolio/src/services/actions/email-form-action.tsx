import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_PORTFOLIO_API_URL;

const emailFormAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const file = formData.get('attachment');

    const formDataToSend = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      date: formData.get('date'),
      body: formData.get('body'),
      attachment: file instanceof File ? file : null,
    };

    await axios.postForm(`${baseUrl}/email`, formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default emailFormAction;
