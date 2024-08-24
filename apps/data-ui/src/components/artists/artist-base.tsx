/* eslint-disable react-hooks/exhaustive-deps */

import Box from '@mui/material/Box';
import { album } from '@prisma/client';
import { useEffect, useState, Fragment } from 'react';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { Divider, FormLabel, List, ListItem, ListItemText } from '@mui/material';
import UpdateArtist, { initialValues, artist } from './artist-update-comp-form';

const baseURL = import.meta.env.VITE_DATA_API_URL;

export type ArtistWithAlbum = {
  artist_id: number;
  name: string;
  album: album[];
};

const TAKE = 10;
const COUNT = await axios.get(`${baseURL}/artist-count`);

const Artist = () => {
  const [artists, setArtists] = useState<artist[]>([initialValues]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TAKE);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, TAKE));
    setPage(0);
  };

  const loadArtists = async () => {
    const skip = page === 0 ? 0 : 1;
    const cursor = page === 0 ? 1 : rowsPerPage * page;

    try {
      const resp = await axios.get(`${baseURL}/artists?take=${TAKE}&skip=${skip}&cursor=${cursor}`);
      console.log(resp.data);
      setArtists(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadArtists();
  }, [page]);

  return (
    <Fragment key="artists">
      <FormLabel component={'label'} sx={{ fontSize: '22px', fontWeight: 'bold' }}>
        {'Artists'}
      </FormLabel>
      <DisplayArtists artists={artists} />
      <TablePagination
        component="div"
        count={parseInt(COUNT.data)}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default Artist;

interface DisplayArtistProps {
  artists: artist[];
}

const DisplayArtists = ({ artists }: DisplayArtistProps) => {
  const [selectedArtist, setSelectedArtist] = useState<artist>(initialValues);
  return (
    <List key={'list'}>
      {artists.map(artist => (
        <Fragment key={`Artist List Fragment ${artist.artist_id}`}>
          <ListItem key={artist.artist_id}>
            <ListItemText key={`List item ${artist.artist_id}`} primary={artist.name} secondary={artist.artist_id} />
            <UpdateArtist key={`${artist.artist_id} + 1000`} artist={selectedArtist} />
          </ListItem>
          <Divider component={'li'} />
        </Fragment>
      ))}
    </List>
  );
};
