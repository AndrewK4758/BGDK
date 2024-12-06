import { Text } from '@bgdk/shared-react-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { artist } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import loadArtists from '../../../services/loaders/crud-loaders/load-artists';
import AddArtist from './add-artist';
import { dataGridStyleUpdate, inverseColors } from '../crud-home';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const paginationModelInit = {
  pageSize: 25,
  page: 0,
};

const Artist = () => {
  const COUNT = useLoaderData() as number;
  const [artists, setArtists] = useState<artist[]>();
  const [rowCountState, setRowCountState] = useState(COUNT);
  const [paginationModel, setPaginationModel] = useState(paginationModelInit);
  const matchesSize = useMediaQuery('(max-width:1200px)');
  const divRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const apiRef = useGridApiRef<GridApiCommunity>();

  const queryOptions = useMemo(
    () => ({
      cursor: paginationModel.page === 0 ? 1 : paginationModel.pageSize * paginationModel.page,
      pageSize: paginationModel.pageSize,
      skip: paginationModel.page === 0 ? 0 : 1,
    }),
    [paginationModel],
  );

  const fetchArtists = useCallback(
    async (pageSize: number, skip: number, cursor: number) => await loadArtists(pageSize, skip, cursor),
    [],
  );

  useScrollIntoView(divRef);

  useEffect(() => {
    fetchArtists(queryOptions.pageSize, queryOptions.skip, queryOptions.cursor)
      .then(({ allArtists }) => setArtists(allArtists))
      .catch(err => console.error(err));
  }, [fetchArtists, queryOptions]);

  const columns: GridColDef[] = [
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      flex: 0.75,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      editable: true,
      filterable: true,
      headerClassName: 'artist-name',
      flex: 3,
    },
    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Update / Delete',
      flex: 1.5,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={() => handleUpdateArtistName(params.row, apiRef)}
          />,
          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              handleDeleteArtist(params.row, apiRef);
            }}
          />,
        ];
      },
    },
    {
      field: 'details',
      type: 'actions',
      headerName: 'Albums',
      flex: 0.75,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Albums"
            title="Albums"
            icon={<DetailsIcon />}
            onClick={() => nav(`${params.row.artist_id}/albums`)}
          />,
        ];
      },
    },
  ];

  const getID = (row: artist) => row.artist_id;

  return (
    <Box
      component={'div'}
      key={'all-data-grids-wrapper'}
      id="all-data-grids-wrapper"
      ref={divRef}
      sx={{
        display: 'flex',
        flexDirection: matchesSize ? 'column' : 'row',
        gap: 0.5,
      }}
    >
      <Box
        component={'div'}
        key="artists"
        id="artists"
        sx={{
          flexWrap: 'wrap',
          flex: matchesSize ? '0 1 100%' : '0 1 50%',
          border: '3px solid purple',
          borderRadius: 1,
        }}
      >
        <Container component={'div'} key={'artists-title-box'} id="artists-title-box" sx={{ paddingY: 2 }}>
          <Paper
            elevation={6}
            key={'artist-list-box'}
            id="artist-list-box"
            component={'div'}
            sx={{ ...inverseColors, height: 'fit-content' }}
          >
            <Text
              titleText={'Artist List'}
              titleVariant={'h3'}
              id="artists-title"
              sx={{
                textAlign: 'center',
              }}
            />
          </Paper>
        </Container>
        <Container component={'div'} key={'add-artist-box'} id={'add-artist-box'} sx={{ paddingY: 1 }}>
          <AddArtist rowCountState={rowCountState} setRowCountState={setRowCountState} COUNT={COUNT} />
        </Container>
        <Box
          component={'div'}
          key={'artist-data-grid-wrapper'}
          id="artist-data-grid-wrapper"
          sx={{ ...inverseColors, borderRadius: 1 }}
        >
          <DataGrid
            logLevel="debug"
            key={'artist-data-grid'}
            aria-label="artist-data-grid"
            apiRef={apiRef}
            columns={columns}
            rows={artists}
            getRowId={getID}
            rowCount={rowCountState}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onRowCountChange={newRowCount => setRowCountState(newRowCount)}
            onPaginationModelChange={setPaginationModel}
            paginationModel={paginationModel}
            sx={dataGridStyleUpdate}
          />
        </Box>
      </Box>
      <Box
        key={'albums-for-artist-box'}
        component={'div'}
        id="albums-for-artist-box"
        sx={{ flex: matchesSize ? '0 1 100%' : '0 1 50%' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Artist;

const handleUpdateArtistName = async (values: artist, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { artist_id, name } = values;
    const resp = await axios.patch(
      `${baseURL}/artists`,
      { artistID: artist_id, name: name },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (resp.data) {
      const { artist_id, name } = resp.data.updatedArtist;
      apiRef.current.updateRows([{ artist_id: artist_id, name: name }]);
    }
    console.log(resp.data);
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteArtist = async (values: artist, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { artist_id } = values;
    const resp = await axios.delete(`${baseURL}/artists/${artist_id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(resp.data);
    if (resp.data.deletedArtist) {
      const { artist_id } = resp.data.deletedArtist;
      apiRef.current.updateRows([{ artist_id: artist_id, _action: 'delete' }]);
    }
  } catch (err) {
    console.error(err);
  }
};
