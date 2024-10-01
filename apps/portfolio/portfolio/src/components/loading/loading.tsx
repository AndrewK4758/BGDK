import { Text } from '@bgdk/react-components';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import handleScrollIntoView from '../../services/events/handle-scroll-into-view';
import Theme from '../../styles/theme';

const loadingValues = [
  'Creating Instance',
  'Saving to Maps & DB',
  'Creating Players',
  'Registering on Game Instance',
  'Verify Ready to Play Status',
  'Set Players on Start',
];

const GameLoading = () => {
  const [loadingValueIdx, setLoadingValueIdx] = useState<number>(0);

  const loadingValue = loadingValues[loadingValueIdx];
  console.log(loadingValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingValueIdx(prev => (prev === 5 ? 0 : prev + 1));
    }, 500);

    return () => clearInterval(timer);
  });

  return (
    <Paper
      component={'div'}
      key={'game-loading-wrapper'}
      id="game-loading"
      onLoad={e => handleScrollIntoView(e)}
      sx={{
        width: '100%',
        height: '20vh',
        maxHeight: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          flex: '1 0 75%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={(loadingValueIdx + 1) * 16.67}
          sx={{
            border: 5,
            height: '50%',
            flex: '1 0 80%',
            borderRadius: 0.6,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              background: `linear-gradient(to right, ${Theme.palette.secondary.light},${Theme.palette.primary.light})`,
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 0.6,
              background: `linear-gradient(to right, ${Theme.palette.primary.light},${Theme.palette.secondary.light})`,
            },
          }}
          //
        />
      </Box>
      <Box
        sx={{
          flex: '1 0 25%',
          width: '100%',
          paddingX: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          border: '5px solid purple',
        }}
      >
        <Text titleVariant="body1" titleText={loadingValue} sx={{ fontSize: '2rem' }} />
      </Box>
    </Paper>
  );
};

export default GameLoading;
