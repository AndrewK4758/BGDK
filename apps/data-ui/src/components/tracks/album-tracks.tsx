import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { track } from '@prisma/client';
import axios from 'axios';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { AlbumState } from '../albums/artist-albums';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const noSelectedArtistMessage =
  ' No Artist & Album Details selected. Please navigate to Artists page and select the artist you would like to view';

const initialState: track = {
  track_id: 0,
  album_id: 0,
  name: '',
  media_type_id: 0,
  genre_id: 0,
  composer: '',
  milliseconds: 0,
  bytes: 0,
  unit_price: new Prisma.Decimal(0.0),
};

interface AlbumWithTracksProps {
  details: AlbumState;
}

const AlbumWithTracks = ({ details }: AlbumWithTracksProps) => {
  const [tracks, setTracks] = useState<track[]>([initialState]);

  if (details === null) {
    details = { albumTitle: noSelectedArtistMessage, albumID: 0 };
  }

  const { albumTitle, albumID } = details;

  const apiRef = useGridApiRef();

  const loadTracks = useCallback(async () => {
    try {
      const resp = await axios.get(`${baseURL}/tracks/${albumID}`);

      setTracks(resp.data.tracks as track[]);
    } catch (error) {
      console.error(error);
    }
  }, [albumID]);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

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
              console.log(params);
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
    <Box component={'div'} key={'track-box'} sx={{ width: '100%' }}>
      <Box key={'artist-title'} component={'header'}>
        <Paper
          key={'title-bar'}
          component={'div'}
          elevation={12}
          sx={{ height: 'fit-content', display: 'flex', borderBottom: '3px solid purple' }}
        >
          <Typography variant="h2" sx={{ flex: '1 0 100%', textAlign: 'center' }}>
            {albumTitle}
          </Typography>
        </Paper>
      </Box>
      <Box component={'div'} key={'add-track-box'}></Box>
      <Box>
        {details && (
          <DataGrid
            autoHeight
            apiRef={apiRef}
            columns={columns}
            rows={tracks}
            getRowId={getID}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[1, 5, 10, 25, 50, 100]}
          />
        )}
      </Box>
    </Box>
  );
};

export default AlbumWithTracks;

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
      console.log(apiRef);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteTrack = async (values: track, apiRef: MutableRefObject<GridApiCommunity>) => {
  return 2;
};
