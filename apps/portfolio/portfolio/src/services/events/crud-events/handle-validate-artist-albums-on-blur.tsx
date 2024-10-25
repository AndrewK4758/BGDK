import axios from 'axios';
import { FocusEvent } from 'react';
import { FormikProps } from 'formik';
import { album } from '@prisma/client';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleNewAlbumBlur = async (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  formik: FormikProps<album>,
  artistID: number,
) => {
  try {
    const resp = await axios.get(`${baseURL}/albums?title=${e.target.value}&artistID=${artistID}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
    console.log(resp.data.message);
    formik.setTouched({ title: resp.data.message }, true);
    return resp.data.message;
  } catch (error) {
    formik.setErrors({ title: (error as Error).message });
    console.error(error);
  }
};

export default handleNewAlbumBlur;
