import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import { album, artist } from '@prisma/client';
import axios from 'axios';
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { inverseColors } from './crud-home';

type InitVals = {
  artist: Partial<artist>[];
  album: Partial<album[]>;
};

const initVals: InitVals = {
  artist: [],
  album: [],
};

interface SearchProps {
  open: boolean;
}

const Search = ({ open }: SearchProps) => {
  const [artAlbVals, setArtVals] = useState(initVals);
  const [searchParam, setSearchParam] = useState<string>('artist');

  return (
    <Box component={'div'} key={'search-box-wrapper'} id="search-box-wrapper">
      <Container key={'search-box-container'} id="search-box-container" sx={{}}>
        <Collapse appear={open} in={open} collapsedSize={0} component={'div'}>
          <Card
            square
            component={'section'}
            key={'search-box-container'}
            sx={{
              ...inverseColors,
              padding: 2,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              border: '5px solid purple',
              borderRadius: 1,
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
                onChange={debounce(e => handleSearchParams(e, setArtVals, searchParam), 560)}
                slotProps={{ formHelperText: { sx: { fontFamily: 'monospace' } } }}
              />
            </Box>
          </Card>
          <Container>
            <List component={'ul'} sx={{}}>
              {artAlbVals.artist.length > 0 ? (
                <>
                  {artAlbVals.artist.map(e => (
                    <ListItem component={'li'} key={e.artist_id} sx={{ fontWeight: 'bold' }}>
                      {e.name}
                    </ListItem>
                  ))}
                </>
              ) : null}
              {artAlbVals.album.length > 0 ? (
                <>
                  {artAlbVals.album.map(e => (
                    <ListItem component={'li'} key={e?.album_id} sx={{ fontWeight: 'bold' }}>
                      {e?.title}
                    </ListItem>
                  ))}
                </>
              ) : null}
            </List>
          </Container>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Search;

const handleSearchParams = async (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setArtVals: Dispatch<SetStateAction<InitVals>>,
  searchParam: string,
) => {
  const searchParams = e.target.value;

  if (searchParams.length > 0 && searchParams[searchParams.length - 1] !== ' ') {
    const resp = await searchArtistsAndAlbums(searchParams, searchParam);

    if (resp) {
      const { artist, album } = resp;
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

    return resp.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
