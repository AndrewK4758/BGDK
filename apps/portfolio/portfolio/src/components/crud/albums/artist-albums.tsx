import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { album } from '@prisma/client';
import { useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import handleDeleteAlbum from '../../../services/events/crud-events/handle-delete-album';
import handleUpdateAlbumTitle from '../../../services/events/crud-events/handle-update-album-title';
import { ArtistAlbums } from '../../../services/loaders/crud-loaders/load-artist-albums';
import AddAlbumOnArtist from './add-album-on-artist';
import { baseCrudDisplayStyleSxProps, dataGridStyleUpdate, inverseColors } from '../crud-home';
import { Text } from '@bgdk/react-components';

export interface AlbumState {
  albumTitle: string;
  albumID: number;
}

const AlbumsOnArtist = () => {
  const { albums } = useLoaderData() as ArtistAlbums;
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const nav = useNavigate();

  const apiRef = useGridApiRef();

  const columns: GridColDef[] = [
    {
      field: 'album_id',
      headerName: 'Album ID',
      type: 'number',
      flex: 0.75,
    },
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      flex: 4,
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
      flex: 1.5,
      getActions: (params: GridRowParams<album>) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={async x => {
              console.log(x);
              await handleUpdateAlbumTitle(params.row, apiRef);
            }}
          />,

          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={async () => {
              await handleDeleteAlbum(params.row, apiRef);
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
    <Box
      component={'div'}
      key={'album-and-tracks-box'}
      id={'album-and-tracks-box'}
      sx={{
        ...baseCrudDisplayStyleSxProps,
        flexWrap: 'wrap',
        gap: 0.5,
        paddingY: 2,
      }}
    >
      <Box
        component={'div'}
        key={'albums-box'}
        id={'albums-box'}
        sx={{
          ...baseCrudDisplayStyleSxProps,
          flex: '1 0 100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          border: '3px solid purple',
        }}
      >
        <Container
          component={'div'}
          id="album-title"
          sx={{
            flex: '1 0 100%',
          }}
        >
          <Paper elevation={6} key={'title-bar'} sx={{ ...inverseColors, flex: '1 0 100%', height: 'fit-content' }}>
            <Text titleText={'Artist Albums'} titleVariant={'h3'} id={'artist-albums'} sx={{ textAlign: 'center' }} />
          </Paper>
        </Container>
        <Container component={'div'} key={'add-album-box'} sx={{ paddingY: 1, flex: '0 1 100%' }}>
          <AddAlbumOnArtist apiRef={apiRef} />
        </Container>
        <Box
          component={'div'}
          key={'artist-album-datagrid-wrapper'}
          id="artist-album-datagrid-wrapper"
          sx={{ ...inverseColors, borderRadius: 1, flex: 1 }}
        >
          <DataGrid
            key={'artist-albums-data-grid'}
            aria-label="artist-albums-data-grid"
            apiRef={apiRef}
            columns={columns}
            rows={albums}
            getRowId={getID}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[1, 5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={newPageModel => setPaginationModel(newPageModel)}
            sx={dataGridStyleUpdate}
          />
        </Box>
      </Box>
      <Box component={'div'} key={'tracks-outlet-wrapper'} id={'tracks-outlet-wrapper'} sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AlbumsOnArtist;
