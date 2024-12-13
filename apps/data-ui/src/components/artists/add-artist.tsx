import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { artist } from '@prisma/client';
import { useFormik } from 'formik';
import { Dispatch, FocusEvent, SetStateAction } from 'react';
import { Form } from 'react-router-dom';
import handleSubmitNewArtist from '../../services/actions/submit-artist-action';
import handleNewArtistBlur from '../../services/events/handle-validate-artist-on-blur';

interface AddArtistProps {
  rowCountState: number;
  setRowCountState: Dispatch<SetStateAction<number>>;
  COUNT: number;
}

const AddArtist = ({ rowCountState, setRowCountState, COUNT }: AddArtistProps) => {
  const formik = useFormik({
    initialValues: { name: '', artist_id: COUNT + 1 } as artist,
    onSubmit: values => {
      setRowCountState(rowCountState + 1);
      handleSubmitNewArtist(values, formik);
    },
    validateOnBlur: true,
  });

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleNewArtistBlur<artist>(e, formik);
  };

  return (
    <Container component={'div'} id="add-artist-container" key={'add-artist-container'}>
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="name" hidden>
            Enter Artist Name
          </FormLabel>
          <TextField
            autoComplete="off"
            name="name"
            id="name"
            variant="outlined"
            color="primary"
            value={formik.values.name}
            placeholder="Enter Artist Name"
            sx={{ flex: '1 0 50%' }}
            onChange={formik.handleChange}
            onBlur={e => formik.handleBlur(e)}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text component={'p'} titleVariant="body1" titleText={formik.errors.name} />
          ) : null}
        </Box>

        <Container sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ m: 1, flex: '1 0 30%' }}>
            {formik.isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={{ m: 1, flex: '1 0 30%' }}>
            Clear
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AddArtist;
