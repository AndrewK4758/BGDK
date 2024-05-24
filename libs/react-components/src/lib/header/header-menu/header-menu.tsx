import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Text from '../../text/text';
import { Theme } from '../../theme/theme';

export function HeaderMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="large" onClick={handleOpenMenu} edge={false} sx={{ padding: 0 }}>
        <MenuRoundedIcon color={'success'} fontSize="large" />
        <Text titleVariant="h2" titleText={'MENU'} />
      </IconButton>

      <Menu component={'ul'} open={open} anchorEl={anchorEl} onClose={handleCloseMenu} variant="menu">
        <MenuItem
          divider={true}
          component="a"
          href="/"
          sx={{ color: Theme.palette.primary.main, backgroundColor: Theme.palette.info.main }}
        >
          HOME
        </MenuItem>
        <MenuItem
          divider={true}
          component="a"
          href="games"
          sx={{ color: Theme.palette.primary.main, backgroundColor: Theme.palette.info.main }}
        >
          SHOW GAMES
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
