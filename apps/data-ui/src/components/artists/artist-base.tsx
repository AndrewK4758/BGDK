/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, FormLabel, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, Fragment, SetStateAction, useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import UpdateArtist, { initialValues } from './artist-update-comp-form';
import { Form, useRouteLoaderData, useRevalidator } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import { track } from '@prisma/client';
import SelectedArtistDetails from './selected-artist-details';
import { Text } from '@bgdk/react-components';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const baseURL = import.meta.env.VITE_DATA_API_URL;

export type artist = {
  artist_id: number;
  name: string;
};

export interface AlbumWithTrack {
  album_id: number;
  artist_id: number;
  title: string;
  track: track[];
}

export interface DetailsProps {
  artist: artist;
  album: AlbumWithTrack[];
}

const Artist = () => {
  const COUNT = useRouteLoaderData('artistsWithCount') as number;
  const revalidated = useRevalidator().revalidate;
  const [artists, setArtists] = useState<artist[]>([initialValues]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(25);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [details, setDetails] = useState<DetailsProps | undefined>(undefined);

  //
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  //

  // const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  const skip = paginationModel.page === 0 ? 0 : 1;
  const cursor = paginationModel.page === 0 ? 1 : paginationModel.pageSize * paginationModel.page;

  // console.log(paginationModel.page, 'page', skip, 'skip', cursor, 'cursor', paginationModel.pageSize, 'pageSize');
  const loadArtists = async () => {
    try {
      const resp = await axios.get(`${baseURL}/artists?take=${paginationModel.pageSize}&skip=${skip}&cursor=${cursor}`);

      setArtists(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadArtists();
    revalidated();
  }, [/*page, rowsPerPage,*/ submitted, paginationModel, COUNT]);
  //----------------------------------------------------------------------

  const columns: GridColDef[] = [
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 220,
      type: 'string',
      editable: true,
      filterable: true,
      headerClassName: 'artist-name',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      type: 'custom',
      renderCell: row => (
        <UpdateArtist
          artist={row.row.name}
          setDetails={setDetails}
          setSubmitted={setSubmitted}
          submitted={submitted}
          id={`${row.row.artist_id}`}
        />
      ),
      width: 450,
    },
  ];

  const getID = (row: artist) => row.artist_id;

  //----------------------------------------------------------------------

  return (
    <Box
      key="artists"
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <Box sx={{ border: '5px solid purple', flex: '1 0 30%' }}>
        <Box>
          <Typography
            aria-label="artists"
            component={'h1'}
            id="artistsLabel"
            sx={{
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
              borderBottom: '3px solid purple',
            }}
          >
            {'Artist List'}
          </Typography>
        </Box>
        <Box component={'div'}>
          <Box component={'div'} sx={{ display: 'flex', paddingY: 1, borderBottom: '2px solid purple' }}>
            <Text
              titleVariant="body1"
              titleText="Add New Artist"
              sx={{ flex: '1 0 40%', alignContent: 'center', paddingLeft: 5, fontSize: '18px', fontWeight: 'bold' }}
            />
            <AddArtist submitted={submitted} setSubmitted={setSubmitted} COUNT={COUNT} />
          </Box>

          <Box component={'div'} sx={{}}>
            <DataGrid
              rows={artists}
              columns={columns}
              getRowId={getID}
              autoHeight={false}
              pageSizeOptions={[10, 25, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              rowCount={COUNT}
              paginationMode="server"
              rowHeight={150}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: '1 0 65%' }}>
        <Box id="Details" component={'div'} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {details && <SelectedArtistDetails details={details} />}
        </Box>
      </Box>
    </Box>
  );
};
export default Artist;

interface DataGridArtistProps {
  artists: artist[];
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  COUNT: number;
  setDetails: Dispatch<SetStateAction<DetailsProps | undefined>>;
}

const DataGridArtist = ({ artists, submitted, setSubmitted, COUNT, setDetails }: DataGridArtistProps) => {
  console.log(artists);
  const columns: GridColDef[] = [
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      type: 'string',
    },
  ];

  const getID = (row: artist) => row.artist_id;
  return (
    <DataGrid
      rows={artists}
      columns={columns}
      getRowId={getID}
      autoHeight={false}
      pageSizeOptions={[10, 25, 50, 100]}
      // rowModesModel={rowModesModel}
      // onRowModesModelChange={handleRowModesModelChange}
      // onRowEditStop={handleRowEditStop}
      // processRowUpdate={processRowUpdate}
      // slots={{
      //   toolbar: EditToolbar as GridSlots['toolbar'],
      // }}
      // slotProps={{
      //   toolbar: { setRows, setRowModesModel },
      // }}
    />
  );
};
/*----------------------------------------------------------------------------*/

interface DisplayArtistProps {
  artists: artist[];
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  COUNT: number;
  setDetails: Dispatch<SetStateAction<DetailsProps | undefined>>;
}

const DisplayArtists = ({ artists, submitted, setSubmitted, COUNT, setDetails }: DisplayArtistProps) => {
  return (
    <List key={'list'} sx={{}}>
      <ListItem key={'addNewArtist'} component={'li'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ListItemText
          key={'addNewArtistText'}
          primary="New Artist"
          primaryTypographyProps={{ sx: { fontSize: '20px' } }}
          sx={{ flex: '0 1 45%' }}
        />
        <AddArtist submitted={submitted} setSubmitted={setSubmitted} COUNT={COUNT} />
      </ListItem>
      <Divider component={'li'} />
      {artists.map(artist => (
        <Fragment key={`Artist List Fragment ${artist.artist_id}`}>
          <ListItem key={artist.artist_id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText
              key={`List item ${artist.artist_id}`}
              primary={artist.name}
              secondary={artist.artist_id}
              sx={{ flex: '0 1 45%' }}
              primaryTypographyProps={{ sx: { fontSize: '20px' } }}
            />
            <UpdateArtist
              key={`${artist.artist_id} + 1000`}
              id={artist.name}
              artist={{ artist_id: artist.artist_id, name: artist.name }}
              submitted={submitted}
              setSubmitted={setSubmitted}
              setDetails={setDetails}
            />
          </ListItem>
          <Divider component={'li'} />
        </Fragment>
      ))}
    </List>
  );
};

interface AddArtistProps {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  COUNT: number;
}

const AddArtist = ({ submitted, setSubmitted, COUNT }: AddArtistProps) => {
  const formik = useFormik({
    initialValues: { name: '', artist_id: COUNT + 1 },
    onSubmit: values => {
      setSubmitted(!submitted);
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
/* <DisplayArtists
          artists={artists}
          submitted={submitted}
          setSubmitted={setSubmitted}
          COUNT={COUNT}
          setDetails={setDetails}
        />
        <TablePagination
          component="div"
          id="artists-pagination"
          aria-label="artists-pagination"
          count={COUNT}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */
