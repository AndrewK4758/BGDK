import axios from 'axios';
import { NewEntry } from '../../components/add-entry/add-entry';
import { track } from '@prisma/client';

export type NewEntryReturn = {
  artist_id: number;
  name: string;
  album: { album_id: number; artist_id: number; title: string; track: track[] }[];
};

interface INewEntryReturn {
  newEntry: NewEntryReturn;
}

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleSubmitNewEntry = async (values: NewEntry, setSubmitting: (isSubmitting: boolean) => void) => {
  try {
    setSubmitting(true);
    const { artist, album, track } = values;
    const resp = await axios.post(
      `${baseURL}/new-entry`,
      { artist: artist, album: album, track: track },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { newEntry } = resp.data as INewEntryReturn;
    console.log(newEntry);

    return newEntry;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    setSubmitting(false);
  }
};

export default handleSubmitNewEntry;
