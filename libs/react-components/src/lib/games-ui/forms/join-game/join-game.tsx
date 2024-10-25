// import styles from './join-game.module.css';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormActionProps } from '../../../../interfaces/form-action-props';
import FormikTextInput from '../../text-input/formik-text-input';
import { GamePlayerValidation } from '@bgdk/types-game';


export interface JoinGameProps extends FormActionProps {
  breakpointsJoinGameButton?: SxProps;
  breakpointsJoinGameText?: SxProps;
  breakpointsJoinGameLabel?: SxProps;
}

type JoinGamePath = { gamePath: string };

const validationSchema = Yup.object({
  gamePath: Yup.string()
    .min(6, 'Must be at least the full game ID')
    .max(60, 'Must be at most the full link to the game')
    .required(),
});

export const JoinGame = ({
  breakpointsJoinGameText,
  breakpointsJoinGameButton,
  breakpointsJoinGameLabel,
  method,
  type,
  name,
  variant,
  buttonType,
  buttonText,
}: JoinGameProps) => {
  const nav = useNavigate();

  const handleSubmit = (values: JoinGamePath) => {
    const path = values.gamePath;
    const parts = path.split('/');

    const gameID = parts[parts.length - 1];
    const gameName = parts[parts.length - 2];
    const __current_game__ =
      (JSON.parse(sessionStorage.getItem('__current_game__') as string) as GamePlayerValidation) ??
      ({ gameInstanceID: '', playerID: '' } as GamePlayerValidation);

    __current_game__.gameInstanceID = gameID;
    sessionStorage.setItem('__current_game__', JSON.stringify(__current_game__));

    nav(`/games/${gameName}/register`);
  };
  return (
    <Formik
      initialValues={{ gamePath: '' }}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values)}
    >
      <Form method={method}>
        <FormikTextInput
          autoComplete="off"
          labelComponent={'h2'}
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
