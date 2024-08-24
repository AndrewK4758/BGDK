import { List, ListItemButton } from '@mui/material';
import { album } from '@prisma/client';
import { ArtistWithAlbum } from './artist-base';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface ArtistWithAlbumsProps {
  artist: ArtistWithAlbum;
}

const ArtistWithAlbums = ({ artist }: ArtistWithAlbumsProps) => {
  const nav = useNavigate();

  const handleAlbumClick = (
    e: MouseEvent<HTMLElement, globalThis.Event>,
    albumID: number,
    artistName: string,
    artistID: number,
  ) => {
    console.log(e.currentTarget);
    nav('/album', {
      state: { albumTitle: e.currentTarget.textContent, albumID: albumID, artistID: artistID, artistName: artistName },
    });
  };

  const Albums = () =>
    artist.album.map((album: album) => (
      <ListItemButton
        key={album.album_id}
        sx={{ fontWeight: 'normal' }}
        onClick={e => handleAlbumClick(e, album.album_id, artist.name, artist.artist_id)}
      >
        {album.title}
      </ListItemButton>
    ));

  return (
    <List key={artist.artist_id + 1000} sx={{ fontWeight: 'bold' }}>
      {artist.name}
      <Albums />
    </List>
  );
};

export default ArtistWithAlbums;
