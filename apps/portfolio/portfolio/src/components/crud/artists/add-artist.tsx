import { FormikValidationError } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { artist } from '@prisma/client';
import { useFormik } from 'formik';
import { Dispatch, FocusEvent, SetStateAction } from 'react';
import { Form } from 'react-router-dom';
import handleSubmitNewArtist from '../../../services/actions/crud-actions/submit-artist-action';
import handleNewArtistBlur from '../../../services/events/crud-events/handle-validate-artist-on-blur';
import { crudAddButtonStyles, crudAddErrorTextStyles, inverseColors } from '../../../styles/crud-styles';
import { flexColumnStyles } from '../../../styles/prompt-builder-styles';

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
    validateOnMount: false,
  });

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleNewArtistBlur<artist>(e, formik);
  };

  return (
    <Container
      component={'div'}
      id="add-artist-container"
      key={'add-artist-container'}
      sx={{ ...inverseColors, borderRadius: 1, paddingY: 2 }}
    >
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box key={'add-artist-box'} id={'add-artist-box'} sx={flexColumnStyles}>
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
            onChange={formik.handleChange}
            onBlur={e => formik.handleBlur(e)}
          />
          <FormikValidationError<artist> formik={formik} elementName={'name'} helperTextSx={crudAddErrorTextStyles} />
        </Box>

        <Container sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={crudAddButtonStyles}>
            {formik.isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={crudAddButtonStyles}>
            Clear
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AddArtist;
