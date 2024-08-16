// import styles from './join-game.module.css';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import { FormActionProps } from '../../../../interfaces/form-action-props';
import FormikTextInput from '../../text-input/formik-text-input';

/* eslint-disable-next-line */
export interface JoinGameProps extends FormActionProps {
  breakpointsJoinGameButton?: SxProps;
  breakpointsJoinGameText?: SxProps;
  breakpointsJoinGameLabel?: SxProps;
}

const validationSchema = Yup.object({
  gamePath: Yup.string()
    .min(6, 'Must be at least the full game ID')
    .max(60, 'Must be at most the full link to the game'),
});

export const JoinGame = ({
  breakpointsJoinGameText,
  breakpointsJoinGameButton,
  breakpointsJoinGameLabel,
  method,
  action,
  type,
  name,
  variant,
  buttonType,
  buttonText,
}: JoinGameProps) => {
  const submit = useSubmit();

  return (
    <Formik
      initialValues={{ gamePath: '' }}
      validationSchema={validationSchema}
      onSubmit={values =>
        submit(values, {
          encType: 'application/json',
          method: 'patch',
          action: 'join-game',
        })
      }
    >
      <Form method={method} action={action}>
        <FormikTextInput
          autoComplete="off"
          label={'Game Path'}
          id="gamePath"
          type={type}
          placeholder="Enter GameID to join"
          name={name}
          textSx={breakpointsJoinGameText}
          labelSx={breakpointsJoinGameLabel}
        />
        <br />
        <Button type={buttonType} variant={variant} sx={breakpointsJoinGameButton}>
          {buttonText}
        </Button>
      </Form>
    </Formik>
  );
};

export default JoinGame;
