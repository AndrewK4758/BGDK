import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { loadingBarStyles, loadingBarTextStyles, loadingPaperStyles } from '../../styles/loading-styles';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingValueIdx(prev => (prev === 5 ? 0 : prev + 1));
    }, 500);

    return () => clearInterval(timer);
  });

  return (
    <Paper component={'div'} id="game-loading" sx={loadingPaperStyles}>
      <Box sx={loadingBarStyles}>
        <LinearProgress variant="determinate" value={(loadingValueIdx + 1) * 16.67} sx={loadingBarStyles} />
      </Box>
      <Box sx={loadingBarTextStyles}>
        <Text component={'p'} titleVariant="body1" titleText={loadingValue} sx={{ fontSize: '2rem' }} />
      </Box>
    </Paper>
  );
};

export default GameLoading;
