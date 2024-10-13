import { track } from '@prisma/client';
import axios from 'axios';
import { LoaderFunctionArgs, LoaderFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export type AlbumTracks = {
  tracks: track[];
};

const loadAlbumTracks: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  // if (params.album_id) {
  try {
    const { albumID } = params;
    const resp = await axios.get(`${baseURL}/tracks?albumID=${albumID}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    const { tracks } = resp.data as AlbumTracks;

    return { tracks };
  } catch (error) {
    console.error(error);
    return null;
  }
  // } else return null;
};

export default loadAlbumTracks;
