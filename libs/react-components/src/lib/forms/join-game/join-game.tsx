// import styles from './join-game.module.css';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import TextInput from '../../text-input/text-input';
import { SxProps } from '@mui/material';

/* eslint-disable-next-line */
export interface JoinGameProps extends FormActionProps {
  breakpointsJoinGameButton?: SxProps;
  breakpointsJoinGameText?: SxProps;
  breakpointsJoinGameLabel?: SxProps;
}
export type httpMethod = 'get' | 'options' | 'post' | 'put' | 'patch' | 'delete' | 'undefined';

export interface FormActionProps {
  method: httpMethod;
  action: string | undefined;
  handleSubmit?: () => unknown;
  name: string;
  value?: string | number | readonly string[] | undefined;
  type: 'text' | 'file';
  variant: 'outlined' | 'text' | 'contained';
  sx?: SxProps;
  buttonText: string;
  buttonType: 'button' | 'submit' | undefined;
}

export function JoinGame({
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
}: JoinGameProps) {
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
      onSubmit={values =>
        submit(values, {
          encType: 'application/json',
          method: 'patch',
          action: 'join-game',
        })
      }
    >
      <Form method={method} action={action}>
        <TextInput
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
}

export default JoinGame;
