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
import { album } from '@prisma/client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';
import handleDeleteAlbum from '../../../services/events/crud-events/handle-delete-album';
import handleUpdateAlbumTitle from '../../../services/events/crud-events/handle-update-album-title';
import loadAlbums from '../../../services/loaders/crud-loaders/load-albums';
import { dataGridStyleUpdate, inverseColors } from '../../../styles/crud-styles';
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

  const fetchAlbums = useCallback(
    async (pageSize: number, skip: number, cursor: number) => await loadAlbums(pageSize, skip, cursor),
    [],
  );

  useScrollIntoView(divRef);

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
      ref={divRef}
      key={'all-albums-box'}
      id="all-albums-box"
      display={'flex'}
      flexDirection={matchesSize ? 'column' : 'row'}
      gap={0.5}
    >
      <Box
        component={'div'}
        key={'album-box'}
        id="album-box"
        sx={{
          flexWrap: 'wrap',
          flex: matchesSize ? '1 0 100%' : '1 0 50%',
          border: '3px solid purple',
          borderRadius: 1,
        }}
      >
        <Container key={'albums-title-wrapper'} component={'section'} id="album-title-wrapper" sx={{ paddingY: 2 }}>
          <Paper
            elevation={6}
            key={'album-title-bar'}
            id="album-title-bar"
            component={'div'}
            sx={{ ...inverseColors, height: 'fit-content' }}
          >
            <Text
              component={'h3'}
              titleText={'Album List'}
              titleVariant={'h3'}
              id="albums-title"
              sx={{
                textAlign: 'center',
              }}
            />
          </Paper>
        </Container>
        <Container component={'div'} key={'add-album-box'} id={'add-album-box'} sx={{ paddingY: 1 }}>
          <AddAlbum apiRef={apiRef} />
        </Container>
        <Box
          component={'div'}
          key={'all-albums-datagrid'}
          id="all-albums-datagrid"
          sx={{ ...inverseColors, borderRadius: 1 }}
        >
          <DataGrid
            logLevel="info"
            key={'album-data-grid'}
            aria-label="album-data-grid"
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
            sx={dataGridStyleUpdate}
          />
        </Box>
      </Box>
      <Box
        key={'tracks-on-album-box'}
        component={'div'}
        id="tracks-on-album-box"
        flex={matchesSize ? '0 1 100%' : '0 1 50%'}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Album;
