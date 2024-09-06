import { Text } from '@bgdk/react-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject, useState } from 'react';
import { Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom';
import AddAlbumOnArtist from './add-album-on-artist';
import { ArtistAlbums } from '../../services/loaders/load-artist-albums';

const baseURL = import.meta.env.VITE_DATA_API_URL;

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
      width: 620,
      editable: true,
    },
    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
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
      sx={{ display: 'flex', flexDirection: 'column', borderTop: '5px solid purple' }}
    >
      <Box component={'div'} key={'album-box'} sx={{ width: '100%' }}>
        <Box key={'artist-title'} component={'header'}>
          <Paper
            key={'title-bar'}
            component={'div'}
            sx={{ height: 'fit-content', display: 'flex', borderBottom: '3px solid purple' }}
          >
            <Text
              titleVariant="h2"
              titleText="Artist Albums"
              sx={{ flex: '1 0 100%', textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}
            />
          </Paper>
        </Box>
        <Box component={'div'} key={'add-album-box'} sx={{ paddingY: 1 }}>
          <AddAlbumOnArtist apiRef={apiRef} />
        </Box>
        <Box>
          <Box sx={{ borderBottom: '5px solid purple' }}>
            {albums && (
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
            )}
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AlbumsOnArtist;

const handleDeleteAlbum = async (values: album, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { album_id } = values;

    const resp = await axios.delete(`${baseURL}/albums/${album_id}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    console.log(resp.data);
    if (resp.data.deletedAlbum) {
      const { album_id } = resp.data.deletedAlbum;
      apiRef.current.updateRows([{ album_id: album_id, _action: 'delete' }]);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleUpdateAlbumTitle = async (values: album, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { album_id, title } = values;
    const resp = await axios.patch(
      `${baseURL}/albums`,
      { albumID: album_id, title: title },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (resp.data.updatedAlbum) {
      const { album_id, title } = resp.data.updatedAlbum;
      apiRef.current.updateRows([{ album_id: album_id, title: title }]);
    }
  } catch (error) {
    console.error(error);
  }
};
