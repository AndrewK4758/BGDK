import { artist } from '@prisma/client';
// import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { DataGrid, GridColDef, GridRowModel, GridRowParams, GridRowId } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Input, InputLabel } from '@mui/material';

// const initialValues: artist = {
//   artist_id: 0,
//   name: '',
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().max(64).required('Artist name must not be empty and not already in the artist list'),
// });

const Artist2 = () => {
  const [artists, setArtists] = useState<artist[] | undefined>(undefined);

  const handleUpdateArtist = async (artistID: GridRowId, artistName: string) => {
    try {
      const baseURL = import.meta.env.VITE_DATA_API_URL;

      const resp = await axios.patch(`${baseURL}/artists`, { artistID: artistID, name: artistName });

      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitNewArtist = async (values: artist) => {
    const baseURL = import.meta.env.DEV;
    console.log(baseURL);

    const { name } = values;
    try {
      const resp = await axios.post(`${baseURL}/artists`, { name: name });
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadArtists = async () => {
    const baseURL = import.meta.env.VITE_DATA_API_URL;

    try {
      const resp = await axios.get(`${baseURL}/artists`);

      setArtists(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  interface ArtistListProps {
    artists: artist[] | undefined;
  }

  const ArtistList = ({ artists }: ArtistListProps) => {
    if (artists) {
      const columns: GridColDef[] = [
        {
          field: 'artist_id',
          headerName: 'Artist ID',
          width: 200,
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 350,
        },
        {
          field: 'actions',
          type: 'actions',
          width: 350,
          getActions: (params: GridRowParams) => [
            <>
              <Input type="text" />

              <Button type="submit">{'Submit'}</Button>
            </>,
          ],
        },
      ];

      const getRowID = (row: GridRowModel) => {
        return row.artist_id;
      };

      return (
        <Box>
          <DataGrid
            columns={columns}
            rows={artists}
            getRowId={getRowID}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            pageSizeOptions={[10]}
          />
        </Box>
      );
    }
  };

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: handleSubmitNewArtist,
  // });

  return (
    // <Form action="/artist" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
    <ArtistList artists={artists} />
    // <Button type="reset">Reset</Button>
    // </Form>
  );
};

export default Artist2;
/**

interface UpdateArtistActionItemProps {
  artistID: GridRowId;
  handleUpdateArtist: (artistID: GridRowId, artistName: string) => void;
}
 *
 * @param param0
 * @returns
function UpdateArtistActionItem({
  artistID,
  handleUpdateArtist,
  ...props
}: GridActionsCellItemProps & UpdateArtistActionItemProps) {
  console.log(props);
  const [open, setOpen] = useState(false);
  const [artistName, setArtistName] = useState<string | undefined>(undefined);

  return (
    <React.Fragment key={'update dialog'}>
    <InputLabel focused required>
    {'Enter New Artist Name '}
    <br />
    <Input
    type="text"
    autoFocus
    tabIndex={0}
    id="artistName"
    name="artistName"
    onChange={e => setArtistName(e.target.value)}
    />
    </InputLabel>

    <Button
    onClick={() => {
      setOpen(false);
      handleUpdateArtist(artistID, artistName as string);
    }}
    color="warning"
    >
    Submit
    </Button>
    </React.Fragment>
  );
}

*/
