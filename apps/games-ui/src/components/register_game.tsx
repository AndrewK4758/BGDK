import { ButtonFormAction, Theme } from '@aklapper/react-components';
import { useParams } from 'react-router-dom';

export default function RegisterGame() {
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
      sx={{
        animation: 'blink 3s infinite',
        '@keyframes blink': {
          '50%': {
            color: Theme.palette.secondary.main,
            backgroundColor: Theme.palette.primary.contrastText,
          },
        },
      }}
      buttonText="REGISTER"
    />
  );
}
