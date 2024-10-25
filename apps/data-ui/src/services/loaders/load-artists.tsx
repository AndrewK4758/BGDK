import axios from 'axios';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const loadArtists = async (pageSize: number, skip: number, cursor: number) => {
  try {
    const resp = await axios.get(`${baseURL}/artists?take=${pageSize}&skip=${skip}&cursor=${cursor}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

export default loadArtists;
