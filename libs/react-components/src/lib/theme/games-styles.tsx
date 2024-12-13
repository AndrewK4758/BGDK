import type { SxProps } from '@mui/material/styles';
import Theme from './theme';

//-----ACTIVE AVATARS------//

export const activeGameHeaderBoxStyles: SxProps = { display: 'flex', flex: '1 0 100%', justifyContent: 'space-evenly' };

export const breakpointsActiveGameTitleContainer: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 4,
  [Theme.breakpoints.down('md')]: {
    flex: '1 0 60%'
  }
};

export const breakpointsActiveGameTitleText: SxProps = {
  textAlign: 'left',
  flex: '0 1 35%',
  [Theme.breakpoints.down('md')]: {
    flex: '1 0 100%',
    fontSize: '1.5rem',
    textAlign: 'center'
  }
};

export const breakpointsPlayersInGameBox: SxProps = {
  flex: '0 1 65%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  height: '100%',
  [Theme.breakpoints.down('md')]: {}
};

export const breakpointsPlayersBox: SxProps = {
  flex: '0 1 auto',
  display: 'flex',
  flexDirection: 'row',
  [Theme.breakpoints.down('md')]: {}
};

export const breakpointsPlayersInGameText: SxProps = {
  flex: '0 1 auto',
  [Theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  }
};

//-------READY TO START BUTTON-------//

export const breakpointsStartGameButtonBox: SxProps = {
  flex: '0 1 20%',
  justifyItems: 'center',
  alignContent: 'center',
  [Theme.breakpoints.down('md')]: {}
};

export const breakpointsStartGameButtonFormButton: SxProps = {
  textAlign: 'center',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
    width: 130,
    height: 35
  }
};

//--------RESET GAME--------//

export const breakpointsResetGameButton: SxProps = {
  marginLeft: '.5rem',
  backgroundColor: Theme.palette.primary.main,
  fontSize: '1.75rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
    width: 130,
    height: 35
  }
};

//-------SHOW GAME BOARD-------//

export const breakpointsGameBoardBox: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('md')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`
  }
};

//-------SHOW GAME BOARD TIC TAC TOE-------//

export const breakpointsGameBoardBoxTicTacToe: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  border: `5px solid ${Theme.palette.success.main}`,
  minHeight: '55vh',
  maxHeight: '80vh',
  width: '50vw',
  justifySelf: 'center',
  [Theme.breakpoints.up('md')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`
  }
};

//--------TAKE TURN--------//

export const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.primary.main,
  fontSize: '1.75rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
    width: 130,
    height: 35
  }
};

//-------TAKE TURN TIC TAC TOE-------//

export const breakpointsTakeTurnButtonTTT: SxProps = {
  backgroundColor: Theme.palette.primary.main,
  fontSize: '1.75rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
    width: 130,
    height: 35
  }
};

//-------ACTIVE GAME SESSION--------//

export const breakpointsBottomMenuGameBoard: SxProps = {
  display: 'flex',
  marginTop: '2rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  [Theme.breakpoints.down('md')]: {
    marginTop: '1rem'
  }
};

export const breakpointsPlayerInTurnText: SxProps = {
  [Theme.breakpoints.down('md')]: {
    fontSize: '1em'
  }
};

export const breakpointsBottomMenuButtonsBox: SxProps = {
  flex: '0 1 30%',
  display: 'flex',
  justifyContent: 'space-evenly',
  [Theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
};
