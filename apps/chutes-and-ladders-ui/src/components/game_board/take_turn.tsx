import { ButtonFormAction, Theme } from '@bgdk/react-components';
import { useParams } from 'react-router-dom';
import { SxProps } from '@mui/material';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

export default function TakeTurn() {
  const params = useParams();
  const id = params.id;

  return (
    <ButtonFormAction
      method="patch"
      action={`/games/${id}/play?index`}
      variant="outlined"
      name="Take Turn"
      value={'take-turn'}
      type="submit"
      sx={breakpointsTakeTurnButton}
      buttonText="Take Turn"
    />
  );
}
