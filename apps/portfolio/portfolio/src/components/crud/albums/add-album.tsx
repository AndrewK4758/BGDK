import { FormikValidationError } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios from 'axios';
import { FormikProps, useFormik } from 'formik';
import type { RefObject } from 'react';
import { Form } from 'react-router-dom';
import * as Yup from 'yup';
import handleSubmitNewAlbum from '../../../services/actions/crud-actions//submit-album-to-artist-id-action';
import { crudAddButtonStyles, crudAddErrorTextStyles, inverseColors } from '../../../styles/crud-styles';
import { flexColumnStyles } from '../../../styles/prompt-builder-styles';
import type { ArtistAndAlbum } from './add-album-on-artist';

interface AddAlbumProps {
  apiRef: RefObject<GridApiCommunity>;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Must have title to album'),
  artist_id: Yup.number().positive('Must be greater than 0').required('Need artist ID to add the album on'),
});

const AddAlbum = ({ apiRef }: AddAlbumProps) => {
  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 1 } as ArtistAndAlbum,
    validationSchema: validationSchema,
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
        <Box component={'div'} sx={flexColumnStyles}>
          <Box key={'add-album-input-divs-box'} component={'div'} onBlur={formik.handleBlur} sx={flexColumnStyles}>
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
            />
            <FormikValidationError<ArtistAndAlbum>
              formik={formik}
              elementName={'title'}
              helperTextSx={crudAddErrorTextStyles}
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
              value={formik.values.artist_id}
              onChange={e => formik.setFieldValue('artist_id', e.target.value)}
            />

            <FormikValidationError<ArtistAndAlbum>
              formik={formik}
              elementName={'artist_id'}
              helperTextSx={crudAddErrorTextStyles}
            />
          </Box>
        </Box>

        <Box display={'flex'} justifyItems={'center'}>
          <Button type="submit" variant="contained" color="primary" sx={crudAddButtonStyles}>
            Submit
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={crudAddButtonStyles}>
            Clear
          </Button>
        </Box>
      </Form>
    </Container>
  );
};

export default AddAlbum;

const baseURL = import.meta.env.VITE_DATA_API_URL;

const handleNewAlbumBlur = async (formik: FormikProps<album>) => {
  try {
    const { title, artist_id } = formik.values;
    const resp = await axios.get(`${baseURL}/albums?title=${title}&artistID=${artist_id}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    formik.setTouched({ title: resp.data.message, artist_id: true }, true);
    return resp.data.message;
  } catch (error) {
    formik.setErrors({ title: (error as Error).message });
    console.error(error);
  }
};
