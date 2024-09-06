import axios from 'axios';
import { NewEntry } from '../../components/add-entry/add-entry';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleSubmitNewEntry = async (
  values: NewEntry,
  setSubmitting: (isSubmitting: boolean) => void,
  setOpen: (open: boolean) => void,
  open: boolean,
) => {
  try {
    setSubmitting(true);
    const { artist, album, track } = values;
    const resp = await axios.post(
      `${baseURL}/new-entry`,
      { artist: artist, album: album, track: track },
      { headers: { 'Content-Type': 'application/json' } },
    );
    setOpen(open);
    console.log(resp.data);

    return resp.data.newEntry;
  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};

export default handleSubmitNewEntry;
