// import styles from './login.module.css';
import { Theme } from '../../theme/theme';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import FormikTextInput from '../text-input/formik-text-input';
import { IActionError } from '../../../interfaces/action-error';
import ActionError from '../errors/action-error';
import { MouseEvent, useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { GamePlayerValidation } from '@bgdk/types-game';
import { ActiveUserContext } from '../context/active-user-context';

YupPassword(Yup);

const validationSchema = Yup.object({
  email: Yup.string().email().required('Must enter valid email in the form email@email.email'),
  password: Yup.string().password().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};
const breakpointsTextBoxSx: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '30vw',
  height: '5vw',
  justifySelf: 'center',
  alignSelf: 'center',
  p: 0,
  m: 0,
  fontSize: '2rem',
  borderRadius: '5px',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230,
  },
};

const breakpointsButtonSx: SxProps = {
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 25,
  },
};

const breakpointsLabelSx: SxProps = {
  color: Theme.palette.primary.main,
  textShadow: `1px 1px 1px #800080`,
};

type Anchor = 'right';

interface LoginDataProps {
  email: string;
  password: string;
}

interface LoginProps {
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: MouseEvent) => void;
  anchor: Anchor;
}

export const Login = ({ toggleDrawer, anchor }: LoginProps) => {
  const [loginError, setLoginError] = useState<IActionError>({ errorMessage: '' });
  const { setActiveUser } = useContext(ActiveUserContext);

  const handleSubmit = async (values: LoginDataProps) => {
    const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
    try {
      const resp = await axios.patch(`${baseURL}/login`, { email: values.email, password: values.password });

      const gameID = sessionStorage.getItem('__current_game__')
        ? (JSON.parse(sessionStorage.getItem('__current_game__') as string) as GamePlayerValidation).gameInstanceID
        : '';
      setActiveUser(resp.data);
      const __current_game__ = { gameInstanceID: gameID, playerID: resp.data.id } as GamePlayerValidation;
      sessionStorage.setItem('__current_game__', JSON.stringify(__current_game__));
    } catch (err) {
      console.error(err);
      const { response } = err as AxiosError;
      setLoginError(response?.data as IActionError);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: LoginDataProps) => handleSubmit(values)}
    >
      <Form method="PATCH">
        <FormikTextInput
          autoComplete="on"
          labelComponent={'h2'}
          label="Email"
          id="email"
          type="email"
          placeholder="Enter Email Here"
          name="email"
          textSx={breakpointsTextBoxSx}
          labelSx={breakpointsLabelSx}
        />
        <FormikTextInput
          autoComplete="on"
          labelComponent={'h2'}
          label="Password"
          id="password"
          type="password"
          placeholder="Enter Password Here"
          name="password"
          textSx={breakpointsTextBoxSx}
          labelSx={breakpointsLabelSx}
        />
        <br />
        {loginError && <ActionError errorMessage={loginError.errorMessage} />}
        <br />
        <Button type="submit" variant="outlined" sx={breakpointsButtonSx} onClick={toggleDrawer(anchor, false)}>
          {'Login'}
        </Button>
        <Button type="reset" variant="outlined" sx={breakpointsButtonSx}>
          {'Reset'}
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
