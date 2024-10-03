import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject } from 'react';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleDeleteAlbum = async (values: album, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { album_id } = values;

    const resp = await axios.delete(`${baseURL}/albums/${album_id}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    console.log(resp.data);
    if (resp.data.deletedAlbum) {
      const { album_id } = resp.data.deletedAlbum;
      apiRef.current.updateRows([{ album_id: album_id, _action: 'delete' }]);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handleDeleteAlbum;
