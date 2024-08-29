/* eslint-disable react-hooks/exhaustive-deps */
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { initialValues } from './artist-update-comp-form';
import { useRouteLoaderData } from 'react-router-dom';
import { track } from '@prisma/client';
import { Text } from '@bgdk/react-components';
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel, GridRowParams } from '@mui/x-data-grid';

import AddArtist from './add-artist';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export type artist = {
  artist_id: number;
  name: string;
};

export interface AlbumWithTrack {
  album_id: number;
  artist_id: number;
  title: string;
  track: track[];
}

export interface DetailsProps {
  artist: artist;
  album: AlbumWithTrack[];
}

const Artist = () => {
  const COUNT = useRouteLoaderData('artistsWithCount') as number;
  const [rows, setRows] = useState<artist[]>([initialValues]);
  const [rowCountState, setRowCountState] = useState(COUNT);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const queryOptions = useMemo(
    () => ({
      cursor: paginationModel.page === 0 ? 1 : paginationModel.pageSize * paginationModel.page,
      pageSize: paginationModel.pageSize,
      skip: paginationModel.page === 0 ? 0 : 1,
    }),
    [paginationModel],
  );

  const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
    console.log(newPaginationModel);

    setPaginationModel(newPaginationModel);
  };

  const loadArtists = async () => {
    const { pageSize, skip, cursor } = queryOptions;
    try {
      const resp = await axios.get(`${baseURL}/artists?take=${pageSize}&skip=${skip}&cursor=${cursor}`);

      setRows(resp.data.allArtists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadArtists();
  }, [paginationModel, rowCountState]);

  const columns: GridColDef[] = [
    {
      field: 'artist_id',
      headerName: 'Artist ID',
      type: 'number',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 220,
      type: 'string',
      editable: true,
      filterable: true,
      headerClassName: 'artist-name',
      cellClassName: params => `artist-name-${params.id}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={() => handleUpdateArtistName(params.row)}
          />,
          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              handleDeleteArtist(params.row);
              setRowCountState(rowCountState - 1);
            }}
          />,
        ];
      },
    },
  ];

  const getID = (row: artist) => row.artist_id;

  return (
    <Box
      key="artists"
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <Box sx={{ border: '5px solid purple', flex: '1 0 30%' }}>
        <Box>
          <Typography
            aria-label="artists"
            component={'h1'}
            id="artistsLabel"
            sx={{
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
              borderBottom: '3px solid purple',
            }}
          >
            {'Artist List'}
          </Typography>
        </Box>
        <Box component={'div'}>
          <Box component={'div'} sx={{ display: 'flex', paddingY: 1, borderBottom: '2px solid purple' }}>
            <Text
              titleVariant="body1"
              titleText="Add New Artist"
              sx={{ flex: '1 0 40%', alignContent: 'center', paddingLeft: 5, fontSize: '18px', fontWeight: 'bold' }}
            />
            <AddArtist submitted={rowCountState} setSubmitted={setRowCountState} COUNT={COUNT} />
          </Box>
          <Box component={'div'} sx={{}}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={getID}
              autoHeight={true}
              pageSizeOptions={[10, 25, 50, 100]}
              rowCount={COUNT}
              paginationMode="server"
              onRowCountChange={newRowCount => setRowCountState(newRowCount)}
              onPaginationModelChange={handlePaginationModelChange}
              paginationModel={paginationModel}
            />
          </Box>
        </Box>
      </Box>

      {/* <Box sx={{ flex: '1 0 65%' }}>
        <Box id="Details" component={'div'} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {details && <SelectedArtistDetails details={details} />}
        </Box>
      </Box> */}
    </Box>
  );
};

/**
 * (newRow, oldRow) => {
                switch (true) {
                  case newRow.name === oldRow.name:
                    return oldRow;
                  case newRow.name === '':
                    handleDeleteArtist(oldRow);
                    return { ...newRow, _action: 'delete' };
                  case newRow.name !== oldRow.name:
                    handleUpdateArtistName(newRow);
                    return newRow;
                  default:
                    return oldRow;
                }
              }
 */

export default Artist;
const handleUpdateArtistName = async (values: artist) => {
  const { artist_id, name } = values;

  const resp = await axios.patch(`${baseURL}/artists`, { artistID: artist_id, name: name });

  console.log(resp.data);
};

const handleDeleteArtist = async (values: artist) => {
  console.log(values);
  const { artist_id } = values;

  const resp = await axios.delete(`${baseURL}/artists/${artist_id}`);

  console.log(resp.data);
  return resp.data;
};
