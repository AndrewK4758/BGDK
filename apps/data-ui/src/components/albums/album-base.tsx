import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  useGridApiRef,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom';
import handleDeleteAlbum from '../../services/events/handle-delete-album';
import handleUpdateAlbumTitle from '../../services/events/handle-update-album-title';
import loadAlbums from '../../services/loaders/load-albums';
import AddAlbum from './add-album';

const Album = () => {
  const COUNT = useRouteLoaderData('albums-count') as number;
  const nav = useNavigate();
  const [albums, setAlbums] = useState<album[]>();
  const [rowCountState, setRowCountState] = useState(COUNT);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const apiRef = useGridApiRef<GridApiCommunity>();

  const queryOptions = useMemo(
    () => ({
      cursor: paginationModel.page === 0 ? 1 : paginationModel.pageSize * paginationModel.page,
      pageSize: paginationModel.pageSize,
      skip: paginationModel.page === 0 ? 0 : 1,
    }),
    [paginationModel],
  );

  const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

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
      width: 80,
    },
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      width: 300,
      editable: true,
    },
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      width: 80,
    },
    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
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
      headerName: 'Show Details',
      width: 120,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Details"
            title="Details"
            icon={<DetailsIcon />}
            onClick={() => nav(`${params.row.album_id}/tracks`)}
          />,
        ];
      },
    },
  ];

  const getID = (row: album) => {
    return row.album_id;
  };

  return (
    <Box component={'div'} key={'all-albums-box'} sx={{ display: 'flex', gap: 2 }}>
      <Box
        component={'div'}
        key={'album-box'}
        sx={{ flex: '1 0 50%', border: '3px solid purple', display: 'flex', flexDirection: 'column' }}
      >
        <Container key={'albums-title'} component={'header'}>
          <Paper elevation={6} key={'title-bar'} component={'div'} sx={{ height: '2rem', display: 'flex' }}>
            <Typography
              variant="h1"
              sx={{
                flex: '1 0 100%',
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              {'All Albums'}
            </Typography>
          </Paper>
        </Container>
        <Box component={'div'} key={'add-album-box'} sx={{ paddingY: 1, borderBottom: '3px solid purple' }}>
          <AddAlbum apiRef={apiRef} />
        </Box>
        <Box>
          <Box key={'all-albums-datagrid'}>
            <DataGrid
              autoHeight
              apiRef={apiRef}
              columns={columns}
              rows={albums}
              getRowId={getID}
              rowCount={rowCountState}
              getRowHeight={() => 'auto'}
              pageSizeOptions={[10, 25, 50, 100]}
              paginationMode="server"
              onRowCountChange={newRowCount => setRowCountState(newRowCount)}
              onPaginationModelChange={handlePaginationModelChange}
              paginationModel={paginationModel}
            />
          </Box>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Album;
