import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-router-dom';
import axios from 'axios';
import { FormLabel, TextField } from '@mui/material';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export const initialValues: artist = {
  artist_id: 0,
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(64).required('Artist name must not be empty and not already in the artist list'),
});

interface UpdateArtistProps {
  artist: artist;
}

export type artist = { artist_id: number; name: string };

const UpdateArtist = ({ artist }: UpdateArtistProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmitNewArtist(values),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormLabel htmlFor="artistName">
        <TextField name="artistName" variant="outlined" />
      </FormLabel>
    </Form>
  );
};

const handleSubmitNewArtist = async (values: artist) => {
  const { name } = values;

  const resp = await axios.patch(`${baseURL}/artists`, { name: name });

  console.log(resp.data);
};
export default UpdateArtist;
