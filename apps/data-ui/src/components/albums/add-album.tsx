import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { FormikProps, useFormik } from 'formik';
import { ChangeEvent, MutableRefObject } from 'react';
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
  apiRef: MutableRefObject<GridApiCommunity>;
}

const AddAlbum = ({ apiRef }: AddAlbumProps) => {
  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 0 },
    onSubmit: values => {
      handleSubmitNewAlbum(values, formik, apiRef);
    },
    validateOnBlur: true,
  });

  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      const title = e.target.value;
      formik.values.title = title;
    }
    if (e.target.type === 'number') {
      const artistID = e.target.value;
      formik.values.artist_id = parseInt(artistID, 10);
    }
  };

  formik.handleBlur = () => {
    handleNewAlbumBlur(formik);
  };

  return (
    <Container>
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box component={'div'}>
          <Box
            key={'add-album-input-divs-box'}
            component={'div'}
            onBlur={formik.handleBlur}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormLabel htmlFor="name">Album Name</FormLabel>
            <TextField
              autoComplete="off"
              name="name"
              id="name"
              variant="outlined"
              color="primary"
              placeholder="Enter Album Name"
              onChange={e => formik.handleChange(e)}
            />
            <FormLabel htmlFor="artist_id">Artist ID</FormLabel>
            <TextField
              type="number"
              autoComplete="off"
              name="artist_id"
              id="artist_id"
              variant="outlined"
              color="primary"
              placeholder="Enter Artist ID"
              onChange={e => formik.handleChange(e)}
            />
            <>
              {typeof formik.touched.title === 'string' && formik.touched.artist_id ? (
                <Text titleVariant="body1" titleText={formik.touched.title} />
              ) : null}
              {typeof formik.errors.title === 'string' && formik.touched.title === true ? (
                <Text titleVariant="body1" titleText={formik.errors.title} />
              ) : null}
            </>
          </Box>
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
    </Container>
  );
};

const handleSubmitNewAlbum = async (
  values: album,
  formik: FormikProps<album>,
  apiRef: MutableRefObject<GridApiCommunity>,
) => {
  try {
    const albumTitle = values.title;
    const artistID = values.artist_id;

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
    const errorMessage = await((error as AxiosError).response as AxiosResponse).data.errorMessage;
    console.log(errorMessage);
    formik.setErrors({ title: errorMessage });
  }
};

const handleNewAlbumBlur = async (formik: FormikProps<album>) => {
  try {
    const { title, artist_id } = formik.values;
    const resp = await axios.get(`${baseURL}/albums?title=${title}&artistID=${artist_id}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
    console.log(resp.data.message);
    formik.setTouched({ title: resp.data.message, artist_id: true }, true);
    return resp.data.message;
  } catch (error) {
    formik.setErrors({ title: (error as Error).message });
    console.error(error);
  }
};

export default AddAlbum;
