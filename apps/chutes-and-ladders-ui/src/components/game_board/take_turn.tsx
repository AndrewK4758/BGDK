import { ButtonFormAction, Theme } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

const breakpointsTakeTurnButton: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface TakeTurnProps {
  buttonPress: boolean;
  setButtonPress: Dispatch<SetStateAction<boolean>>;
}

export default function TakeTurn({ buttonPress, setButtonPress }: TakeTurnProps) {
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
      handleSubmit={() => setButtonPress(!buttonPress)}
      sx={breakpointsTakeTurnButton}
      buttonText="Take Turn"
    />
  );
}
