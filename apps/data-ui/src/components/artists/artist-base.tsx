import { Text } from '@bgdk/react-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailsIcon from '@mui/icons-material/Details';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import axios from 'axios';
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouteLoaderData, useNavigate, NavigateFunction } from 'react-router-dom';
import AddArtist from './add-artist';
import { initialValues } from './artist-update-comp-form';
import { artist } from '@prisma/client';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export interface ArtistWithAlbums {
  artistName: string;
  artistID: number;
}

const Artist = () => {
  const COUNT = useRouteLoaderData('artistsWithCount') as number;
  const nav = useNavigate();
  const [rows, setRows] = useState<artist[]>([initialValues]);
  const [rowCountState, setRowCountState] = useState(COUNT);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const apiRef = useGridApiRef();

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

  const loadArtists = useCallback(async () => {
    try {
      const { pageSize, skip, cursor } = queryOptions;
      const resp = await axios.get(`${baseURL}/artists?take=${pageSize}&skip=${skip}&cursor=${cursor}`);

      setRows(resp.data.allArtists);
    } catch (error) {
      console.error(error);
    }
  }, [queryOptions]);

  useEffect(() => {
    loadArtists();
  }, [loadArtists]);

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
      width: 620,
      type: 'string',
      editable: true,
      filterable: true,
      headerClassName: 'artist-name',
    },
    {
      field: 'update-delete',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            label="Update"
            icon={<UploadIcon />}
            title="Update"
            onClick={() => handleUpdateArtistName(params.row, apiRef)}
          />,
          <GridActionsCellItem
            label="Delete"
            title="Delete"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              handleDeleteArtist(params.row, apiRef);
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
            onClick={() => handleShowAlbumDetailsForArtist(params.row, nav)}
          />,
        ];
      },
    },
  ];

  const getID = (row: artist) => row.artist_id;

  return (
    <Box
      component={'div'}
      key="artists"
      sx={{
        display: 'flex',
        width: '100%',
        border: '10px solid purple',
      }}
    >
      <Box sx={{ flex: '1 0 100%' }}>
        <Box key={'artist-list-box'}>
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
        <Box component={'div'} key={'artist-datagrid-box'}>
          <Box
            component={'div'}
            key={'add-artist-box'}
            sx={{ display: 'flex', paddingY: 1, borderBottom: '2px solid purple' }}
          >
            <Text
              titleVariant="body1"
              titleText="Add New Artist"
              sx={{ flex: '1 0 40%', alignContent: 'center', paddingLeft: 5, fontSize: '18px', fontWeight: 'bold' }}
            />
            <AddArtist rowCountState={rowCountState} setRowCountState={setRowCountState} COUNT={COUNT} />
          </Box>
          <Box component={'div'} key={'artist-dataGrid'}>
            <DataGrid
              apiRef={apiRef}
              rows={rows}
              columns={columns}
              getRowId={getID}
              autoHeight={true}
              pageSizeOptions={[10, 25, 50, 100]}
              rowCount={COUNT}
              getRowHeight={() => 'auto'}
              paginationMode="server"
              onRowCountChange={newRowCount => setRowCountState(newRowCount)}
              onPaginationModelChange={handlePaginationModelChange}
              paginationModel={paginationModel}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Artist;
const handleUpdateArtistName = async (values: artist, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { artist_id, name } = values;
    const resp = await axios.patch(`${baseURL}/artists`, { artistID: artist_id, name: name });

    console.log(resp.data);
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteArtist = async (values: artist, apiRef: MutableRefObject<GridApiCommunity>) => {
  try {
    const { artist_id } = values;
    const resp = await axios.delete(`${baseURL}/artists/${artist_id}`);

    apiRef.current.updateRows([{ artist_id: artist_id, _action: 'delete' }]);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};

const handleShowAlbumDetailsForArtist = (values: artist, nav: NavigateFunction) => {
  const { artist_id, name } = values;

  const details = {
    artistName: name as string,
    artistID: artist_id,
  } as ArtistWithAlbums;

  console.log(details);
  nav('/albums', { state: details });
};
