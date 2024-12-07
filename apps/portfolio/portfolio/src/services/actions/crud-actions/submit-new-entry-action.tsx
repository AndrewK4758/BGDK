import { track } from '@prisma/client';
import axios from 'axios';
import { NewEntry } from '../../../components/crud/add-entry/add-entry';
import type { NavigateFunction } from 'react-router-dom';

export type NewEntryReturn = {
  artist_id: number;
  name: string;
  album: { album_id: number; artist_id: number; title: string; track: track[] }[];
};

interface INewEntryReturn {
  newEntry: NewEntryReturn;
}

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleSubmitNewEntry = async (
  values: NewEntry,
  setSubmitting: (isSubmitting: boolean) => void,
  nav: NavigateFunction,
) => {
  try {
    setSubmitting(true);

    const { artist, album, track } = values;
    const resp = await axios.post(
      `${baseURL}/new-entry`,
      { artist: artist, album: album, track: track },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { newEntry } = resp.data as INewEntryReturn;

    return newEntry;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    setSubmitting(false);
    nav('/crud', { replace: true });
  }
};

export default handleSubmitNewEntry;
