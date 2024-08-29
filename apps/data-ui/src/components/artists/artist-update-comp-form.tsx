import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { DetailsProps, artist } from './artist-base';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export const initialValues = {
  artist_id: 0,
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(64).required('Artist name must not be empty and not already in the artist list'),
});

interface UpdateArtistProps {
  artist: artist;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  id: string;
  setDetails: Dispatch<SetStateAction<DetailsProps | undefined>>;
}

const UpdateArtist = ({ artist, setSubmitted, submitted, id, setDetails }: UpdateArtistProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      setSubmitted(!submitted);
      handleUpdateArtistName(values);
    },
  });
  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    formik.values.name = name;
  };

  return (
    <Form name="artistForm" id="artistForm" onSubmit={formik.handleSubmit} method="patch" style={{ flex: '0 1 45%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel htmlFor={id} id={`${id} label`}>
          Update Artist
        </FormLabel>
        <TextField
          name="name"
          id={id}
          variant="outlined"
          placeholder="Enter New Name"
          onChange={e => formik.handleChange(e)}
          sx={{ flex: '1 0 50%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyItems: 'center' }}>
        <Button
          aria-label="update"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ flex: '1 0 30%', margin: 1 }}
        >
          Update
        </Button>
        <Button
          aria-label="delete"
          type="button"
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteArtist(formik.values);
            setSubmitted(!submitted);
          }}
          sx={{ flex: '1 0 30%', margin: 1 }}
        >
          Delete
        </Button>
        <Button
          aria-label="details"
          type="button"
          variant="contained"
          color="warning"
          sx={{ flex: '1 0 30%', margin: 1 }}
          onClick={e => handleViewDetailsClick(e, formik, setDetails, id)}
        >
          View Details
        </Button>
      </Box>
    </Form>
  );
};

const handleViewDetailsClick = async (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  formik: FormikProps<artist>,
  setDetails: Dispatch<SetStateAction<DetailsProps | undefined>>,
  id: string,
) => {
  try {
    const resp = await axios.get(`${baseURL}/artist/${id}`);
    const details = {
      artist: {
        artist_id: resp.data.artist_id,
        name: resp.data.name,
      } as artist,
      album: resp.data.album,
    };
    setDetails(details);
  } catch (err) {
    console.error(err);
  }
};

const handleUpdateArtistName = async (values: artist) => {
  const { artist_id, name } = values;

  const resp = await axios.patch(`${baseURL}/artists`, { artistID: artist_id, name: name });

  console.log(resp.data);
};

const handleDeleteArtist = async (values: artist) => {
  console.log(values);
  const { artist_id } = values;

  const resp = await axios.delete(`${baseURL}/artists/${artist_id}`);

  console.log(resp.data);
};
export default UpdateArtist;
