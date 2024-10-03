import { Text } from '@bgdk/react-components';
import {
  Card,
  Container,
  debounce,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import { album, artist } from '@prisma/client';
import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';

type InitVals = {
  artist: Partial<artist>[];
  album: Partial<album[]>;
};
const initVals: InitVals = {
  artist: [],
  album: [],
};

const CrudHome = () => {
  const [artAlbVals, setArtVals] = useState(initVals);
  const [searchParam, setSearchParam] = useState<string>('artist');

  return (
    <Box
      component={'div'}
      id="crud-home-container"
      flex={'1 0 100%'}
      bgcolor={'#ffffff'}
      borderRadius={5}
      onLoad={e => console.log(e)}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Box component={'div'} id="title-crud-home" onLoad={e => console.log(e)}>
        <Container component={'div'} sx={{ paddingY: 1 }}>
          <Text titleVariant="h2" titleText={'Media Data Manager'} sx={{ textAlign: 'center', color: '#1f1f1f' }} />
          <Text
            titleVariant="h5"
            titleText="Example of MUI-X DataGrid"
            sx={{ textAlign: 'center', color: '#1f1f1f' }}
          />
          <Text
            titleVariant="body1"
            titleText={
              'Columns have sorting & filtering, cells can be updated and changes can be sent to the back end, rows can be deleted, each catagory has the ability to create an entry, ADD ENTRY provides the opportunity to add all fields at once'
            }
            sx={{ color: '#1f1f1f' }}
          />
        </Container>
      </Box>

      <Box sx={{ height: 'fit-content', display: 'flex' }}>
        <Box component={'div'} id="data-grid-grids" flex={3}>
          <Outlet />
        </Box>
        <Box flex={1}>
          <Card
            elevation={6}
            square
            component={'section'}
            key={'search-box-container'}
            sx={{
              padding: 2,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              borderTop: '3px solid purple',
              borderBottom: '3px solid purple',
            }}
          >
            <Box component={'div'} key={'search-radio-group-box'}>
              <RadioGroup
                defaultValue={'artist'}
                name="artist-album-select"
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  value={'artist'}
                  label="Artist"
                  control={<Radio value={'artist'} onChange={e => setSearchParam(e.target.value)} />}
                  slotProps={{ typography: { sx: { fontSize: '1rem' } } }}
                  sx={{ width: '100%', paddingLeft: 1 }}
                />
                <FormControlLabel
                  value={'album'}
                  label="Album"
                  control={
                    <Radio
                      onChange={e => {
                        setSearchParam(e.target.value);
                      }}
                    />
                  }
                  slotProps={{ typography: { sx: { fontSize: '1 rem' } } }}
                  sx={{ width: '100%', paddingLeft: 1 }}
                />
              </RadioGroup>
            </Box>

            <Box component={'div'} key={'search-input-box'} sx={{ paddingY: 1 }}>
              <TextField
                component={'search'}
                label="Search"
                variant="outlined"
                type="text"
                name="artist-search"
                helperText="Search is performed automatically. Case is insensitive"
                onChange={debounce(e => handleSearchParams(e, setArtVals, searchParam), 500)}
              />
            </Box>
          </Card>
          <Container>
            <List component={'ul'}>
              {artAlbVals.artist.length > 0 ? (
                <>
                  {artAlbVals.artist.map(e => (
                    <ListItem component={'li'} key={e.artist_id} sx={{ color: '#1f1f1f' }}>
                      {e.name}
                    </ListItem>
                  ))}
                </>
              ) : null}
              {artAlbVals.album.length > 0 ? (
                <>
                  {artAlbVals.album.map(e => (
                    <ListItem component={'li'} key={e?.album_id} sx={{ color: '#1f1f1f' }}>
                      {e?.title}
                    </ListItem>
                  ))}
                </>
              ) : null}
            </List>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default CrudHome;

const handleSearchParams = async (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setArtVals: Dispatch<SetStateAction<InitVals>>,
  searchParam: string,
) => {
  const searchParams = e.target.value;

  if (searchParams.length > 0 && searchParams[searchParams.length - 1] !== ' ') {
    const resp = await searchArtistsAndAlbums(searchParams, searchParam);

    if (resp) {
      const { artist, album } = resp.data;
      setArtVals({ artist: artist, album: album });
    }
  }
};

const baseURL = import.meta.env.VITE_DATA_API_URL;

const searchArtistsAndAlbums = async (search: string, type: string) => {
  try {
    const resp = await axios.get(`${baseURL}/search?search=${search}&type=${type}`, {
      headers: { 'Content-Type': 'text/plain' },
    });

    console.log(resp.data);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
