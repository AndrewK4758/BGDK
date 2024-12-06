import { Text } from '@bgdk/shared-react-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { track } from '@prisma/client';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import handleDeleteTrack from '../../services/events/handle-delete-track';
import handleUpdateTrack from '../../services/events/handle-update-track';
import { AlbumTracks } from '../../services/loaders/load-album-tracks';
import AddTrack from './add-track';
import { Container } from '@mui/material';

const Tracks = () => {
  const { tracks } = useLoaderData() as AlbumTracks;
  const params = useParams();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const albumID = parseInt(params.albumID as string, 10);

  const apiRef = useGridApiRef();

  const columns: GridColDef[] = [
    {
      field: 'track_id',
      headerName: 'Track ID',
      type: 'number',
      width: 40,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 200,
      editable: true,
    },
    {
      field: 'unit_price',
      type: 'number',
      width: 40,
      headerName: 'Unit Price',
      editable: true,
    },
    {
      field: 'genre_id',
      type: 'number',
      width: 40,
      headerName: 'Genre ID',
      editable: true,
    },
    {
      field: 'media_type_id',
      type: 'number',
      width: 40,
      headerName: 'Media Type ID',
      editable: true,
    },
    {
      field: 'composer',
      type: 'string',
      width: 140,
      headerName: 'Composer',
      editable: true,
    },
    {
      field: 'milliseconds',
      type: 'number',
      width: 40,
      headerName: 'Milliseconds',
      editable: true,
    },
    {
      field: 'bytes',
      type: 'number',
      width: 40,
      headerName: 'Bytes',
      editable: true,
    },

    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params: GridRowParams<track>) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={() => {
              handleUpdateTrack(params.row, apiRef);
            }}
          />,

          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              handleDeleteTrack(params.row, apiRef);
            }}
          />,
        ];
      },
    },
  ];

  const getID = (row: track) => {
    return row.track_id;
  };

  return (
    <Box
      component={'div'}
      key={'track-box'}
      sx={{ borderTop: '3px solid purple', flex: '1 0 50%', maxWidth: 'fit-content' }}
    >
      <Container key={'artist-title'} component={'div'}>
        <Paper key={'title-bar'} component={'div'} elevation={6} sx={{ height: '2rem', display: 'flex' }}>
          <Text
            titleVariant="h2"
            titleText="Album Tracks"
            sx={{ flex: '1 0 100%', textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}
          />
        </Paper>
      </Container>
      <Box component={'div'} key={'add-track-box'} sx={{ marginTop: 1 }}>
        <AddTrack albumID={albumID} apiRef={apiRef} />
      </Box>

      <Box>
        <DataGrid
          autoHeight
          apiRef={apiRef}
          columns={columns}
          rows={tracks}
          getRowId={getID}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[1, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={newPageModel => setPaginationModel(newPageModel)}
        />
      </Box>
    </Box>
  );
};

export default Tracks;
