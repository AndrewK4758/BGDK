import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormikProps } from 'formik';
import { MutableRefObject } from 'react';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleSubmitNewAlbum = async (
  values: album,
  formik: FormikProps<album>,
  artistID: number,
  apiRef: MutableRefObject<GridApiCommunity>,
) => {
  try {
    const albumTitle = values.title;

    const resp = await axios.post(
      `${baseURL}/albums`,
      { title: albumTitle, artistID: artistID },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(resp.data);

    if (resp.data.newAlbum) {
      const { title, album_id, artist_id } = resp.data.newAlbum;
      apiRef.current.updateRows([{ album_id: album_id, title: title, artist_id: artist_id }]);
    }
  } catch (error) {
    console.error(error);
    const errorMessage = await ((error as AxiosError).response as AxiosResponse).data.errorMessage;
    console.log(errorMessage);
    formik.setErrors({ title: errorMessage });
  }
};

export default handleSubmitNewAlbum;
