import { Text } from '@bgdk/react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios from 'axios';
import { FormikProps, useFormik } from 'formik';
import { MutableRefObject } from 'react';
import { Form } from 'react-router-dom';
import handleSubmitNewAlbum from '../../../services/actions/crud-actions//submit-album-to-artist-id-action';
import { inverseColors } from '../crud-home';

const baseURL = import.meta.env.VITE_DATA_API_URL;

interface AddAlbumProps {
  apiRef: MutableRefObject<GridApiCommunity>;
}

const AddAlbum = ({ apiRef }: AddAlbumProps) => {
  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 1 },
    onSubmit: values => {
      handleSubmitNewAlbum(values, formik, apiRef);
    },
    validateOnBlur: true,
  });

  formik.handleBlur = () => {
    handleNewAlbumBlur(formik);
  };

  return (
    <Container
      component={'div'}
      id="add-album-container"
      key={'add-album-container'}
      sx={{ ...inverseColors, borderRadius: 1, paddingY: 2 }}
    >
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
              name="title"
              id="title"
              variant="outlined"
              color="primary"
              value={formik.values.title}
              placeholder="Enter Album Name"
              onChange={e => formik.setFieldValue('title', e.target.value)}
              slotProps={{ input: { sx: { color: '#1f1f1f' } } }}
            />
            {typeof formik.touched.title && formik.touched.artist_id ? (
              <Text titleVariant="body1" titleText={formik.touched.title} />
            ) : null}
            <FormLabel htmlFor="artist_id">Artist ID</FormLabel>
            <TextField
              type="number"
              autoComplete="off"
              name="artist_id"
              id="artist_id"
              variant="outlined"
              color="primary"
              placeholder="Enter Artist ID"
              value={formik.values.artist_id}
              onChange={e => formik.setFieldValue('artist_id', e.target.value)}
              slotProps={{ input: { sx: { color: '#1f1f1f' } } }}
            />

            {formik.errors.title && formik.touched.title === true ? (
              <Text titleVariant="body1" titleText={formik.errors.title} />
            ) : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ m: 1, flex: '1 0 30%', fontSize: '1rem' }}>
            Submit
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={{ m: 1, flex: '1 0 30%', fontSize: '1rem' }}>
            Clear
          </Button>
        </Box>
      </Form>
    </Container>
  );
};

const handleNewAlbumBlur = async (formik: FormikProps<album>) => {
  const { title, artist_id } = formik.values;
  if (typeof title === 'string' && typeof artist_id === 'number') {
    try {
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
  } else {
    console.log('artist_id needs to be entered as a positive number');
    return null;
  }
};

export default AddAlbum;
