import { Dispatch, FocusEvent, SetStateAction } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;


const verifyEmailObBlur = async (event: FocusEvent<unknown>, setBlurString: Dispatch<SetStateAction<string>>) => {
  const email = (event.target as HTMLInputElement).value;

  const resp = await axios.get(`${baseURL}/validate-user?email=${email}`);
  setBlurString(resp.data.message);
};

export default verifyEmailObBlur;
