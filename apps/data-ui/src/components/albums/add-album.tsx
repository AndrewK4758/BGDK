import { TextField } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import { FocusEvent, ChangeEvent, MutableRefObject } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { Form } from 'react-router-dom';
import { Text } from '@bgdk/react-components';
import Button from '@mui/material/Button';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { album } from '@prisma/client';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

const baseURL = import.meta.env.VITE_DATA_API_URL;

interface AddAlbumProps {
  artistID: number;
  apiRef: MutableRefObject<GridApiCommunity>;
}

const AddAlbum = ({ artistID, apiRef }: AddAlbumProps) => {
  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 0 },
    onSubmit: values => {
      handleSubmitNewAlbum(values, formik, artistID, apiRef);
    },
    validateOnBlur: true,
  });

  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    formik.values.title = title;
  };

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleNewAlbumBlur(e, formik, artistID);
  };

  return (
    <Box sx={{ flex: '1 0 60%' }}>
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <FormLabel htmlFor="name" hidden>
              Enter Album Name
            </FormLabel>
            <TextField
              autoComplete="off"
              name="name"
              id="name"
              variant="outlined"
              color="primary"
              placeholder="Enter Album Name"
              sx={{ flex: '1 0 50%' }}
              onChange={e => formik.handleChange(e)}
              onBlur={e => formik.handleBlur(e)}
            />
            <>
              {formik.touched.title !== true ? <Text titleVariant="body1" titleText={formik.touched.title} /> : null}
              {formik.errors.title && formik.touched.title === true ? (
                <Text titleVariant="body1" titleText={formik.errors.title} />
              ) : null}
            </>
          </>
        </Box>

        <Box sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ m: 1, flex: '1 0 30%' }}>
            Submit
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={{ m: 1, flex: '1 0 30%' }}>
            Clear
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

const handleSubmitNewAlbum = async (
  values: album,
  formik: FormikProps<album>,
  artistID: number,
  apiRef: MutableRefObject<GridApiCommunity>,
) => {
  try {
    const albumTitle = values.title;
    console.log(albumTitle, artistID);
    const resp = await axios.post(`${baseURL}/albums`, { title: albumTitle, artistID: artistID });
    console.log(resp.data);

    if (resp.data.newAlbum) {
      const { title, album_id } = resp.data.newAlbum;
      apiRef.current.updateRows([{ album_id: album_id, title: title }]);
    }
  } catch (error) {
    console.error(error);
    const errorMessage = ((error as AxiosError).response as AxiosResponse).data.errorMessage;
    console.log(errorMessage);
    formik.setErrors({ title: errorMessage });
  }
};

const handleNewAlbumBlur = async (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  formik: FormikProps<album>,
  artistID: number,
) => {
  try {
    const resp = await axios.get(`${baseURL}/albums?title=${e.target.value}&artistID=${artistID}`);
    console.log(resp.data.message);
    formik.setTouched({ title: resp.data.message }, true);
    return resp.data.message;
  } catch (error) {
    formik.setErrors({ title: (error as Error).message });
    console.error(error);
  }
};

export default AddAlbum;
