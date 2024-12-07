import { FormikValidationError } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useFormik } from 'formik';
import { FocusEvent, RefObject, type JSX } from 'react';
import { Form, useParams } from 'react-router-dom';
import handleSubmitNewAlbum from '../../../services/actions/crud-actions/submit-album-on-artist-action';
import handleNewAlbumBlur from '../../../services/events/crud-events/handle-validate-artist-albums-on-blur';
import { crudAddButtonStyles, inverseColors } from '../../../styles/crud-styles';

interface AddAlbumOnArtistProps {
  apiRef: RefObject<GridApiCommunity>;
}

export type ArtistAndAlbum = { title: string; album_id: number; artist_id: number };

/**
 * This component renders a form for adding a new album to a specific artist.
 * It allows users to input the album title and then submits the data to the server.
 *
 * @param {AddAlbumOnArtistProps} props - The props for the AddAlbumOnArtist component.
 * @param {RefObject<GridApiCommunity>} props.apiRef - A ref to the DataGrid API object.
 * @returns {JSX.Element} The rendered AddAlbumOnArtist component.
 */

const AddAlbumOnArtist = ({ apiRef }: AddAlbumOnArtistProps): JSX.Element => {
  const params = useParams();
  const artistID = parseInt(params.artistID as string, 10);

  const formik = useFormik({
    initialValues: { title: '', album_id: 0, artist_id: 0 } as ArtistAndAlbum,
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
      sx={{ ...inverseColors, borderRadius: 1, paddingY: 2 }}
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
            onChange={formik.handleChange}
            onBlur={e => formik.handleBlur(e)}
          />

          <FormikValidationError<ArtistAndAlbum>
            formik={formik}
            elementName={'title'}
            helperTextSx={{ fontSize: '1.25rem' }}
          />
        </Box>

        <Container sx={{ display: 'flex', justifyItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={crudAddButtonStyles}>
            Submit
          </Button>
          <Button type="reset" variant="contained" color="secondary" sx={crudAddButtonStyles}>
            Clear
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AddAlbumOnArtist;
