import { ButtonFormAction } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
import { useParams } from 'react-router-dom';

export interface RegisterGameProps {
  registerGameButtonSx: SxProps;
}

export default function RegisterGame({
  registerGameButtonSx,
}: RegisterGameProps) {
  const params = useParams();
  const id = params.id;

  return (
    <ButtonFormAction
      method="post"
      action={`/games/${id}`}
      variant="outlined"
      name="name"
      value={id}
      type="submit"
      sx={registerGameButtonSx}
      buttonText="REGISTER"
    />
  );
}
