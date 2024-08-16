// import styles from './register-user.tsx.module.css';
import { Box, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useActionData, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { Theme } from '../../theme/theme';
import FormikTextInput from '../text-input/formik-text-input';

YupPassword(Yup);
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(1, 'Must have a character value')
    .max(255, 'Cannot exceed 255 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(1, 'Must have a character value')
    .max(255, 'Cannot exceed 255 characters')
    .required('Last Name is required'),
  email: Yup.string().email().max(255, 'Cannot exceed 255 characters').required('Email is required'),
  playerName: Yup.string()
    .min(1, 'Must have character value')
    .max(255, 'Cannot exceed 255 characters')
    .required('Player Name is required'),
  password: Yup.string().password().required('Password is required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  playerName: '',
  password: '',
};

const breakpointsTextBoxSx: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '30vw',
  justifySelf: 'center',
  alignSelf: 'center',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    textAlign: 'center',
    height: 35,
    width: 230,
  },
};

const breakpointsButtonSx: SxProps = {
  backgroundColor: Theme.palette.info.main,
  marginTop: '1rem',
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

interface IActionError {
  errorMessage: string;
}

export const RegisterUser = () => {
  const submit = useSubmit();
  const action = useActionData() as IActionError;

  const ActionError = () => (action ? action.errorMessage : undefined);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        submit(values, { encType: 'application/json', method: 'POST', action: '/register-user' });
      }}
    >
      <Form method={'POST'} action={'/register-user'}>
        <FormikTextInput
          autoComplete="on"
          label="First Name"
          id="firstName"
          type={'text'}
          placeholder="Enter First Name Here"
          name={'firstName'}
          textSx={breakpointsTextBoxSx}
        />
        <FormikTextInput
          autoComplete="on"
          label="Last Name"
          id="lastName"
          type={'text'}
          placeholder="Enter Last Name Here"
          name={'lastName'}
          textSx={breakpointsTextBoxSx}
        />
        <FormikTextInput
          autoComplete="new-email"
          label="Email"
          id="email"
          type={'text'}
          placeholder="Enter Email Here"
          name={'email'}
          textSx={breakpointsTextBoxSx}
        />
        <FormikTextInput
          autoComplete="on"
          label="Player Name"
          id="playerName"
          type={'text'}
          placeholder="Enter Player Name Here"
          name={'playerName'}
          textSx={breakpointsTextBoxSx}
        />
        <FormikTextInput
          autoComplete="on"
          label="Password"
          id="password"
          type="password"
          placeholder="Enter Password Here"
          name="password"
          textSx={breakpointsTextBoxSx}
        />
        <br />
        <Box component={'div'} style={{ whiteSpace: 'balance' }}>
          <ActionError />
        </Box>
        <br />
        <Button type={'submit'} variant={'outlined'} sx={breakpointsButtonSx}>
          {'Register'}
        </Button>
        <Button type="reset" variant="outlined" sx={breakpointsButtonSx}>
          {'Reset'}
        </Button>
      </Form>
    </Formik>
  );
};

export default RegisterUser;
