import axios from 'axios';

const baseURL = import.meta.env.VITE_PORTFOLIO_API_URL;

const handleGetCodeFromRepo = async (page: string) => {
  try {
    const resp = await axios.get(`${baseURL}/code?page=${page}`);
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default handleGetCodeFromRepo;
