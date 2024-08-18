import { useState, MouseEvent, KeyboardEvent, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import RegisterUser from './register-user';

type Anchor = 'right';

export const RegisterDrawer = () => {
  const anchor = 'right';
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 'auto' }} role="presentation">
      <List>
        <RegisterUser toggleDrawer={toggleDrawer} anchor={anchor} />
      </List>
    </Box>
  );

  return (
    <Fragment key={anchor}>
      <Button
        variant="text"
        fullWidth={false}
        onClick={toggleDrawer(anchor, true)}
        sx={{
          fontSize: '2rem',
          p: 0,
          m: 0,
          flex: '1 0 auto',
        }}
      >
        {'Register'}
      </Button>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </Fragment>
  );
};

export default RegisterDrawer;
