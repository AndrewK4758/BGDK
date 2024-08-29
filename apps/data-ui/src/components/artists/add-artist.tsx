import { TextField } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import { Dispatch, SetStateAction, FocusEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { Form } from 'react-router-dom';
import { Text } from '@bgdk/react-components';
import Button from '@mui/material/Button';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { artist } from './artist-base';

const baseURL = import.meta.env.VITE_DATA_API_URL;

interface AddArtistProps {
  submitted: number;
  setSubmitted: Dispatch<SetStateAction<number>>;
  COUNT: number;
}

const AddArtist = ({ submitted, setSubmitted, COUNT }: AddArtistProps) => {
  const formik = useFormik({
    initialValues: { name: '', artist_id: COUNT + 1 },
    onSubmit: values => {
      setSubmitted(submitted + 1);
      handleSubmitNewArtist(values, formik);
    },
    validateOnBlur: true,
  });

  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    formik.values.name = name;
  };

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleNewArtistBlur(e, formik);
  };

  return (
    <Box sx={{ flex: '1 0 60%' }}>
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <FormLabel htmlFor="name" hidden>
              Enter Artist Name
            </FormLabel>
            <TextField
              autoComplete="off"
              name="name"
              id="name"
              variant="outlined"
              color="primary"
              placeholder="Enter Artist Name"
              sx={{ flex: '1 0 50%' }}
              onChange={e => formik.handleChange(e)}
              onBlur={e => formik.handleBlur(e)}
            />
            <>
              {formik.touched.name !== true ? <Text titleVariant="body1" titleText={formik.touched.name} /> : null}
              {formik.errors.name && formik.touched.name === true ? (
                <Text titleVariant="body1" titleText={formik.errors.name} />
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

const handleSubmitNewArtist = async (values: artist, formik: FormikProps<artist>) => {
  const { name } = values;
  try {
    const resp = await axios.post(`${baseURL}/artists`, { name: name });
    console.log(resp.data);
  } catch (error) {
    console.error(error);
    const errorMessage = ((error as AxiosError).response as AxiosResponse).data.errorMessage;
    console.log(errorMessage);
    formik.setErrors({ name: errorMessage });
  }
};

const handleNewArtistBlur = async (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  formik: FormikProps<artist>,
) => {
  try {
    const resp = await axios.get(`${baseURL}/artists?name=${e.target.value}`);
    console.log(resp.data.message);
    formik.setTouched({ name: resp.data.message }, true);
    return resp.data.message;
  } catch (error) {
    formik.setErrors({ name: (error as Error).message });
    console.error(error);
  }
};

export default AddArtist;
