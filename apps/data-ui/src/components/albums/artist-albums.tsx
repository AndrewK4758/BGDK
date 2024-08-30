import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { album } from '@prisma/client';
import axios from 'axios';
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArtistWithAlbums } from '../artists/artist-base';
import AddAlbum from './add-album';
import AlbumWithTracks from '../tracks/album-tracks';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const noSelectedArtistMessage =
  ' No Artist Details selected. Please navigate to Artists page and select the artist you would like to view';

const initialState: album = {
  album_id: 0,
  artist_id: 0,
  title: '',
};

export interface AlbumState {
  albumTitle: string;
  albumID: number;
}

const AlbumsOnArtist = () => {
  const location = useLocation();
  let details = location.state as ArtistWithAlbums;
  const [albums, setAlbums] = useState<album[]>([initialState]);
  const [trackDetails, setTrackDetails] = useState<AlbumState>({ albumID: 0, albumTitle: '' });

  if (details === null) {
    details = { artistName: noSelectedArtistMessage, artistID: 0 };
  }

  const { artistName, artistID } = details;

  const apiRef = useGridApiRef();

  const loadAlbums = useCallback(async () => {
    try {
      const resp = await axios.get(`${baseURL}/albums?artistID=${artistID}`);

      setAlbums(resp.data.albums as album[]);
    } catch (error) {
      console.error(error);
    }
  }, [artistID]);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

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
              console.log(params);
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
            onClick={() => handleShowTrackDetailsForAlbum(params.row, setTrackDetails)}
          />,
        ];
      },
    },
  ];

  const getID = (row: album) => {
    return row.album_id;
  };

  return (
    <Box component={'div'} key={'album-with-tracks-box'} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box component={'div'} key={'album-box'} sx={{ width: '100%', border: '10px solid purple' }}>
        <Box key={'artist-title'} component={'header'}>
          <Paper
            key={'title-bar'}
            component={'div'}
            elevation={12}
            sx={{ height: 'fit-content', display: 'flex', borderBottom: '3px solid purple' }}
          >
            <Typography variant="h2" sx={{ flex: '1 0 100%', textAlign: 'center' }}>
              {artistName}
            </Typography>
          </Paper>
        </Box>
        <Box component={'div'} key={'add-album-box'}>
          <AddAlbum artistID={artistID as number} apiRef={apiRef} />
        </Box>
        <Box>
          <Box sx={{ borderBottom: '5px solid purple' }}>
            {details && (
              <DataGrid
                autoHeight
                apiRef={apiRef}
                columns={columns}
                rows={albums}
                getRowId={getID}
                getRowHeight={() => 'auto'}
                pageSizeOptions={[1, 5, 10, 100]}
              />
            )}
          </Box>
          <Box component={'div'} key={'tracks-box'} sx={{ width: '100%' }}>
            <AlbumWithTracks details={trackDetails} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AlbumsOnArtist;

const handleDeleteAlbum = async (values: album, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { album_id } = values;
    console.log(values);
    console.log(album_id);
    const resp = await axios.delete(`${baseURL}/albums/${album_id}`);

    console.log(resp.data);
    if (resp.data.deletedAlbum) apiRef.current.updateRows([{ album_id: album_id, _action: 'delete' }]);
  } catch (err) {
    console.error(err);
  }
};

const handleShowTrackDetailsForAlbum = (values: album, setTrackDetails: Dispatch<SetStateAction<AlbumState>>) => {
  const { album_id, title } = values;
  const details = { albumTitle: title, albumID: album_id };

  console.log(details);
  setTrackDetails(details);
};

const handleUpdateAlbumTitle = async (values: album, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { album_id, title } = values;
    const resp = await axios.patch(`${baseURL}/albums`, { albumID: album_id, title: title });

    console.log(resp.data);

    if (resp.data.updatedAlbum) {
      console.log(apiRef);
    }
  } catch (error) {
    console.error(error);
  }
};
