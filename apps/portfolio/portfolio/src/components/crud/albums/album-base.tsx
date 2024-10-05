import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import handleDeleteAlbum from '../../../services/events/crud-events/handle-delete-album';
import handleUpdateAlbumTitle from '../../../services/events/crud-events/handle-update-album-title';
import loadAlbums from '../../../services/loaders/crud-loaders/load-albums';
import AddAlbum from './add-album';

const paginationModelInit = {
  pageSize: 25,
  page: 0,
};

const Album = () => {
  const COUNT = useLoaderData() as number;
  const [albums, setAlbums] = useState<album[]>();
  const [rowCountState, setRowCountState] = useState(COUNT);
  const [paginationModel, setPaginationModel] = useState(paginationModelInit);
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

  const fetchAlbums = useCallback(
    async (pageSize: number, skip: number, cursor: number) => await loadAlbums(pageSize, skip, cursor),
    [],
  );

  useEffect(() => {
    fetchAlbums(queryOptions.pageSize, queryOptions.skip, queryOptions.cursor)
      .then(({ albums }) => setAlbums(albums))
      .catch(err => console.error(err));
  }, [fetchAlbums, queryOptions]);

  const columns: GridColDef[] = [
    {
      field: 'album_id',
      headerName: 'Album ID',
      type: 'number',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      flex: 3,
      editable: true,
    },
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      flex: 1,
    },
    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Update / Delete',
      flex: 2,
      getActions: (params: GridRowParams<album>) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={() => {
              handleUpdateAlbumTitle(params.row, apiRef);
            }}
          />,

          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              handleDeleteAlbum(params.row, apiRef);
            }}
          />,
        ];
      },
    },
    {
      field: 'details',
      type: 'actions',
      headerName: 'Show Tracks',
      flex: 1,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Tracks"
            title="Tracks"
            icon={<DetailsIcon />}
            onClick={() => nav(`${params.row.album_id}/tracks`)}
          />,
        ];
      },
    },
  ];

  const getID = (row: album) => row.album_id;

  return (
    <Box
      component={'div'}
      key={'all-albums-box'}
      id="all-albums-box"
      sx={{ display: 'flex', minWidth: 0, width: '100%' }}
    >
      <Box component={'div'} key={'album-box'} id="album-box" sx={{ flex: 1, border: '3px solid purple' }}>
        <Container key={'albums-title-wrapper'} component={'section'} id="album-title-wrapper">
          <Paper elevation={6} key={'album-title-bar'} id="album-title-bar" component={'div'} sx={{ height: '2rem' }}>
            <Typography
              component={'h1'}
              aria-label="albums-title"
              variant="h1"
              sx={{
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              {'Album List'}
            </Typography>
          </Paper>
        </Container>
        <Box component={'div'} key={'add-album-box'} sx={{ paddingY: 1, borderBottom: '3px solid purple' }}>
          <AddAlbum apiRef={apiRef} />
        </Box>
        <Box component={'div'} key={'all-albums-datagrid'} id="all-albums-datagrid">
          <DataGrid
            logLevel="info"
            key={'album-data-grid'}
            aria-label="album-data-grid"
            autoHeight
            autosizeOnMount={true}
            apiRef={apiRef}
            columns={columns}
            rows={albums}
            getRowId={getID}
            rowCount={rowCountState}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="server"
            onRowCountChange={newRowCount => setRowCountState(newRowCount)}
            onPaginationModelChange={setPaginationModel}
            paginationModel={paginationModel}
          />
        </Box>
      </Box>
      <Box key={'tracks-on-album-box'} component={'div'} id="tracks-on-album-box" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Album;

