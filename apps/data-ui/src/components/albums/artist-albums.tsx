import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { album } from '@prisma/client';
import { useState } from 'react';
import { Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom';
import handleDeleteAlbum from '../../services/events/handle-delete-album';
import handleUpdateAlbumTitle from '../../services/events/handle-update-album-title';
import { ArtistAlbums } from '../../services/loaders/load-artist-albums';
import AddAlbumOnArtist from './add-album-on-artist';

export interface AlbumState {
  albumTitle: string;
  albumID: number;
}

const AlbumsOnArtist = () => {
  const { albums } = useRouteLoaderData('artist-albums') as ArtistAlbums;
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const nav = useNavigate();

  const apiRef = useGridApiRef();

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
      width: 369,
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
      headerName: 'Update / Delete',
      width: 100,
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
    <Box
      component={'div'}
      key={'album-with-tracks-box'}
      sx={{ borderTop: '3px solid purple', borderRight: '3px solid purple' }}
    >
      <Container component={'div'} id="album-title" sx={{ width: '100%' }}>
        <Paper elevation={6} key={'title-bar'} sx={{ height: '2rem' }}>
          <Typography
            aria-label="albums"
            component={'h2'}
            variant="h2"
            sx={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}
          >
            {'Artist Albums'}
          </Typography>
        </Paper>
      </Container>
      <Box component={'div'} key={'album-data-grid'} id="album-data-grid">
        <Box component={'div'} key={'add-album-box'} sx={{ paddingY: 1, flex: '0 1 100%' }}>
          <AddAlbumOnArtist apiRef={apiRef} />
        </Box>
        <Box>
          <DataGrid
            autoHeight
            apiRef={apiRef}
            columns={columns}
            rows={albums}
            getRowId={getID}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[1, 5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={newPageModel => setPaginationModel(newPageModel)}
          />
        </Box>

        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AlbumsOnArtist;
