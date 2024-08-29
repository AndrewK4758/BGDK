import { DetailsProps } from './artist-base';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { album, track } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState } from 'react';

interface SelectedArtistDetailsProps {
  details: DetailsProps | undefined;
  // submitted: boolean;
  // setSubmitted: Dispatch<SetStateAction<boolean>>;
  // id: string;
  // setDetails: Dispatch<SetStateAction<DetailsProps | undefined>>;
}

const SelectedArtistDetails = ({ details }: SelectedArtistDetailsProps) => {
  if (details) {
    const { artist, album } = details;

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
          return row.row.track.map((track: track) => `${track.name}\n`);
        },
      },
    ];

    const getID = (row: album) => {
      return row.album_id;
    };

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
        <Box>
          <DataGrid autoHeight columns={columns} rows={album} getRowId={getID} getRowHeight={() => 'auto'} />
        </Box>
      </>
    );
  }
};

export default SelectedArtistDetails;

// interface TrackProps {
//   tracks: track[];
// }

// export const Tracks = ({ tracks }: TrackProps) => {
//   const [action, setAction] = useState<{
//     itemId: string;
//     isExpanded: boolean;
//   } | null>(null);

//   const handleItemExpansionToggle = (event: React.SyntheticEvent, itemId: string, isExpanded: boolean) => {
//     setAction({ itemId: itemId, isExpanded: isExpanded });
//   };

//   const trackDetails = (): TreeViewBaseItem[] => [
//     {
//       id: `tracks`,
//       label: 'Tracks',
//       children: tracks.map(track => ({
//         id: `${track.track_id}`,
//         label: `${track.name}`,
//       })),
//     },
//   ];

//   return (
//     <Box sx={{ minHeight: 352, minWidth: 250 }}>
//       <RichTreeView
//         items={trackDetails()}
//         onItemExpansionToggle={handleItemExpansionToggle}
//         onClick={() => console.log(action)}
//       />
//     </Box>
//   );
// };
