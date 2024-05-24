// import styles from './join-game.module.css';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import TextInput from '../../text-input/text-input';

/* eslint-disable-next-line */

export function JoinGame() {
  const submit = useSubmit();

  const validationSchema = Yup.object({
    gamePath: Yup.string()
      .min(6, 'Must be at least the full game ID')
      .max(60, 'Must be at most the full link to the game'),
  });
  return (
    <Formik
      initialValues={{ gamePath: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) =>
        submit(values, {
          encType: 'application/json',
          method: 'patch',
          action: 'join-game',
        })
      }
    >
      <Form method="patch" action="join-game">
        <TextInput
          label={'Game Path'}
          id="gamePath"
          type="text"
          placeholder="Enter GameID to join"
          name="gamePath"
        />
        <br />
        <Button type="submit">Join Game</Button>
      </Form>
    </Formik>
  );
}

export default JoinGame;
