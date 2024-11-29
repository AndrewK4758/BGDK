import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { FocusEvent, MutableRefObject } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { Form } from 'react-router-dom';
import { Text } from '@bgdk/react-components';
import Button from '@mui/material/Button';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useParams } from 'react-router-dom';
import handleSubmitNewAlbum from '../../../services/actions/crud-actions/submit-album-on-artist-action';
import handleNewAlbumBlur from '../../../services/events/crud-events/handle-validate-artist-albums-on-blur';
import { inverseColors } from '../crud-home';

interface AddAlbumOnArtistProps {
  apiRef: MutableRefObject<GridApiCommunity>;
}

const AddAlbumOnArtist = ({ apiRef }: AddAlbumOnArtistProps) => {
  const params = useParams();
  const artistID = parseInt(params.artistID as string, 10);

  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 0 },
    onSubmit: values => {
      handleSubmitNewAlbum(values, formik, artistID, apiRef);
    },
    validateOnBlur: true,
  });

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleNewAlbumBlur(e, formik, artistID);
  };

  return (
    <Container
      component={'div'}
      id="add-album-on-artist-container"
      key={'add-album-on-artist-container'}
      sx={{ ...inverseColors, borderRadius: 1, paddingY: 1 }}
    >
      <Form method="post" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="name" hidden>
            Enter Album Name
          </FormLabel>
          <TextField
            autoComplete="off"
            name="title"
            id="title"
            variant="outlined"
            color="primary"
            value={formik.values.title}
            placeholder="Enter Album Title"
            sx={{ flex: '1 0 50%' }}
            onChange={formik.handleChange}
            onBlur={e => formik.handleBlur(e)}
            slotProps={{ input: { sx: { color: '#1f1f1f' } } }}
          />

          {typeof formik.touched.title === 'string' && formik.values.title ? (
            <Text titleVariant="body1" titleText={formik.touched.title} />
          ) : null}
          {formik.errors.title && formik.touched.title === true ? (
            <Text titleVariant="body1" titleText={formik.errors.title} />
          ) : null}
        </Box>

        <Container sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1, marginRight: 1, flex: '1 0 30%', fontSize: '1rem' }}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1, marginLeft: 1, flex: '1 0 30%', fontSize: '1rem' }}
          >
            Clear
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AddAlbumOnArtist;
