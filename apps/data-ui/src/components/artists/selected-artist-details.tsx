import { AlbumWithTrack, DetailsProps } from './artist-base';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { album, track } from '@prisma/client';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState } from 'react';

interface SelectedArtistDetailsProps {
  details: DetailsProps | undefined;
}

const SelectedArtistDetails = ({ details }: SelectedArtistDetailsProps) => {
  if (details) {
    const { artist, album } = details;
    console.log(details);

    const columns: GridColDef[] = [
      {
        field: 'album_id',
        headerName: 'Album ID',
        type: 'number',
        width: 75,
      },
      {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        width: 300,
      },
      {
        field: 'tracks',
        headerName: 'Tracks',
        type: 'custom',
        width: 500,
        renderCell: row => {
          console.log(row);
          return Tracks({ tracks: row.row.track });
        },
      },
    ];

    const rows = album as AlbumWithTrack[];

    const getID = (row: album) => {
      return row.album_id;
    };

    console.log(rows, 'rows');
    return (
      <>
        <Box key={'header'} component={'header'}>
          <Paper elevation={12} sx={{ height: '80px', display: 'flex' }}>
            <Box sx={{ flex: '1 0 100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Typography variant="h1" component={'h1'}>
                {artist.name}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ height: '100vw' }}>
          <DataGrid columns={columns} rows={album} getRowId={getID} getRowHeight={() => 'auto'} />
        </Box>
      </>
    );
  }
};

export default SelectedArtistDetails;

interface TrackProps {
  tracks: track[];
}

export const Tracks = ({ tracks }: TrackProps) => {
  const [action, setAction] = useState<{
    itemId: string;
    isExpanded: boolean;
  } | null>(null);

  const handleItemExpansionToggle = (event: React.SyntheticEvent, itemId: string, isExpanded: boolean) => {
    setAction({ itemId, isExpanded });
  };

  console.log(tracks);
  const trackDetails = (): TreeViewBaseItem[] => [
    {
      id: `tracks`,
      label: 'Tracks',
      children: tracks.map(track => ({ id: `${track.track_id}`, label: `${track.name}` })),
    },
  ];

  // const getTrackID = (row: TreeViewBaseItem) => {
  //   console.log(row);
  //   return `${row.children.id + 1000}`;
  // };
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <RichTreeView items={trackDetails()} onItemExpansionToggle={handleItemExpansionToggle} />
    </Box>
  );
};
