// import styles from './chain.module.css';
import Box from '@mui/material/Box';
import handleGetCodeFromRepo from '../../services/events/code/handle-get-code';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export function Chain() {
  const [chain, setChain] = useState<string | null>(null);
  return (
    <Box component={'div'} key={'chain-code-wrapper'} id="'chain-code-wrapper'">
      <Button
        variant="contained"
        onClick={async () => {
          const code = await handleGetCodeFromRepo(`libs/chain/src/lib/base.ts`);
          setChain(code);
        }}
        sx={{ fontSize: '5rem' }}
      >
        Get Chain
      </Button>
      <Paper>
        <pre>
          <code>{chain}</code>
        </pre>
      </Paper>
    </Box>
  );
}

export default Chain;
