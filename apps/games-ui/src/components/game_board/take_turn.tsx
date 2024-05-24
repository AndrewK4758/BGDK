import { ButtonFormAction } from '@aklapper/react-components';
import { useParams } from 'react-router-dom';

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
      sx={{ marginRight: '.5rem' }}
      buttonText="Take Turn"
    />
  );
}
