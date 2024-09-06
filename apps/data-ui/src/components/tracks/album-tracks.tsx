import { Text } from '@bgdk/react-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { track } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AlbumTracks } from '../../services/loaders/load-album-tracks';
import AddTrack from './add-track';

const baseURL = import.meta.env.VITE_DATA_API_URL;

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
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 240,
      editable: true,
    },
    {
      field: 'unit_price',
      type: 'number',
      width: 80,
      headerName: 'Unit Price',
      editable: true,
    },
    {
      field: 'genre_id',
      type: 'number',
      width: 80,
      headerName: 'Genre ID',
      editable: true,
    },
    {
      field: 'media_type_id',
      type: 'number',
      width: 110,
      headerName: 'Media Type ID',
      editable: true,
    },
    {
      field: 'composer',
      type: 'string',
      width: 180,
      headerName: 'Composer',
      editable: true,
    },
    {
      field: 'milliseconds',
      type: 'number',
      width: 90,
      headerName: 'Milliseconds',
      editable: true,
    },
    {
      field: 'bytes',
      type: 'number',
      width: 95,
      headerName: 'Bytes',
      editable: true,
    },

    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
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
    <Box component={'div'} key={'track-box'} sx={{ width: '100%', borderTop: '10px solid purple' }}>
      <Box key={'artist-title'} component={'header'}>
        <Paper
          key={'title-bar'}
          component={'div'}
          sx={{ height: 'fit-content', display: 'flex', borderBottom: '3px solid purple' }}
        >
          <Text
            titleVariant="h2"
            titleText="Album Tracks"
            sx={{ flex: '1 0 100%', textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}
          />
        </Paper>
      </Box>
      <Box component={'div'} key={'add-track-box'} sx={{ paddingY: 1 }}>
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

const handleUpdateTrack = async (values: track, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { track_id, album_id, name, unit_price, genre_id, media_type_id, composer, milliseconds, bytes } = values;

    const trackData = {
      track_id: track_id,
      album_id: album_id,
      name: name,
      unit_price: unit_price,
      genre_id: genre_id,
      media_type_id: media_type_id,
      composer: composer,
      milliseconds: milliseconds,
      bytes: bytes,
    };

    const resp = await axios.patch(
      `${baseURL}/tracks`,
      { trackData: trackData },
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(resp.data);

    if (resp.data.updatedTracks) {
      const { track_id, album_id, name, unit_price, genre_id, media_type_id, composer, milliseconds, bytes } =
        resp.data.UpdatedTracks;

      apiRef.current.updateRows([
        {
          track_id: track_id,
          album_id: album_id,
          name: name,
          unit_price: unit_price,
          genre_id: genre_id,
          media_type_id: media_type_id,
          composer: composer,
          milliseconds: milliseconds,
          bytes: bytes,
        },
      ]);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteTrack = async (values: track, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { track_id } = values;

    const resp = await axios.delete(`${baseURL}/tracks/${track_id}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    console.log(resp.data);
    if (resp.data.deletedTrack) {
      const { track_id } = resp.data.deletedTrack;
      apiRef.current.updateRows([{ track_id: track_id, _action: 'delete' }]);
    }
  } catch (error) {
    console.error(error);
  }
};
