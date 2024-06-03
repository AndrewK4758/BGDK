import { GameBoard } from '@aklapper/chutes-and-ladders';
import { IPlayersAndBoard } from '@aklapper/model';
import { GameBoardMap, RenderList, Theme } from '@aklapper/react-components';
import Box from '@mui/material/Box';
import { Fragment, useMemo } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import useRevalidateBoard from '../../hooks/revalidator';
import { SxProps } from '@mui/material';

const breakpointsGameBoardBox: SxProps = {
  border: `5px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.up('laptop')]: {
    boxShadow: `0px 7px 8px -4px ${Theme.palette.success.main}, 0px 12px 17px 2px ${Theme.palette.primary.light}, 0px 5px 22px 4px ${Theme.palette.primary.dark}, 0px -7px 8px -4px ${Theme.palette.success.main}, 0px -12px 17px 2px ${Theme.palette.primary.light}, 0px -5px 22px 4px ${Theme.palette.primary.dark}`,
  },
};

const gameBoardMap = (e: string[], i: number, arr: GameBoard) => (
  <Fragment key={`row ${i}`}>
    <GameBoardMap
      row={e}
      columns={10}
      container={true}
      direction="row"
      wrap="wrap"
      id={`Row ${i}`}
    />
  </Fragment>
);

export default function ShowGameBoard() {
  const loader = useRouteLoaderData('gameBoard') as IPlayersAndBoard;

  const board = loader.gameBoard as GameBoard;
  useMemo(() => board, [board]);

  useRevalidateBoard();
  return (
    <Box component={'section'} sx={breakpointsGameBoardBox}>
      <RenderList data={board} listMapCallback={gameBoardMap} />
    </Box>
  );
}
