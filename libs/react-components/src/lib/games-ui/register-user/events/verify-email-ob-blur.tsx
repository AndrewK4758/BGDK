import { Dispatch, FocusEvent, SetStateAction } from 'react';
import axios from 'axios';

const verifyEmailObBlur = async (event: FocusEvent<unknown>, setBlurString: Dispatch<SetStateAction<string>>) => {
  const value = (event.target as HTMLInputElement).value;
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;

  const resp = await axios.get(`${baseURL}/validate-user?email=${value}`);
  setBlurString(resp.data.message);
};

export default verifyEmailObBlur;
