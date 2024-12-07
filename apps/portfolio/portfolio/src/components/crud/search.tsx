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
import { useState, type ChangeEvent, type Dispatch, type JSX, type SetStateAction } from 'react';
import { inverseColors } from '../../styles/crud-styles';
import { pagesTitlesBoxStyles } from '../../styles/pages-styles';
import Theme from '../../styles/theme';

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

/**
 * This component renders a search modal for the CRUD section.
 * It allows users to search for artists or albums in the database.
 * The search is automatic when user pauses typing for .6 secords.
 *
 * @param {SearchProps} props - The props for the Search component.
 * @param {boolean} props.open - Whether the search modal is open.
 * @returns {JSX.Element} The rendered search modal component.
 */

const Search = ({ open }: SearchProps): JSX.Element => {
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
              border: '5px solid purple',
              borderRadius: 1,
            }}
          >
            <Box component={'div'} key={'search-radio-group-box'}>
              <RadioGroup
                defaultValue={'artist'}
                name="artist-album-select"
                sx={{
                  ...pagesTitlesBoxStyles,
                  height: '100%',
                  flexDirection: 'column',
                }}
              >
                <FormControlLabel
                  value={'artist'}
                  label="Artist"
                  control={<Radio value={'artist'} onChange={e => setSearchParam(e.target.value)} />}
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
                slotProps={{
                  formHelperText: { sx: { fontFamily: 'monospace' } },
                  input: { sx: { color: Theme.palette.text.secondary } },
                }}
              />
            </Box>
          </Card>
          <Container>
            <List component={'ul'} key={'search-list'} id="search-list">
              {artAlbVals.artist.length > 0 ? (
                <Box key={'artist-search-list-wrapper'} id={'artist-search-list-wrapper'}>
                  {artAlbVals.artist.map(e => (
                    <ListItem component={'li'} key={e.artist_id} sx={{ fontWeight: 'bold' }}>
                      {e.name}
                    </ListItem>
                  ))}
                </Box>
              ) : null}
              {artAlbVals.album.length > 0 ? (
                <Box key={'album-search-list-wrapper'} id={'album-search-list-wrapper'}>
                  {artAlbVals.album.map(e => (
                    <ListItem component={'li'} key={e?.album_id} sx={{ fontWeight: 'bold' }}>
                      {e?.title}
                    </ListItem>
                  ))}
                </Box>
              ) : null}
            </List>
          </Container>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Search;

/**
 * This function handles the search input change event.
 * It debounces the input change, fetches search results from the server, and updates the search results state.
 *
 * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
 * @param {Dispatch<SetStateAction<InitVals>>} setArtVals - A function to update the search results state.
 * @param {string} searchParam - The type of search to perform ('artist' or 'album').
 */

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

/**
 * This function fetches search results from the server based on the search query and type.
 *
 * @param {string} search - The search query.
 * @param {string} type - The type of search to perform ('artist' or 'album').
 * @returns {Promise<any>} A promise that resolves with the search results.
 */

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
