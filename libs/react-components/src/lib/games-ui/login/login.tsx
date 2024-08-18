// import styles from './login.module.css';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit, useActionData } from 'react-router-dom';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import FormikTextInput from '../text-input/formik-text-input';
import { IActionError } from '../../../interfaces/action-error';
import ActionError from '../errors/action-error';
import { MouseEvent } from 'react';

YupPassword(Yup);

const validationSchema = Yup.object({
  email: Yup.string().email().required('Must enter valid email in the form email@email.email'),
  password: Yup.string().password().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const breakpointsLoginText: SxProps = {};
const breakpointsLoginButton: SxProps = {};

type Anchor = 'right';

interface LoginProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: MouseEvent) => void;
  anchor: Anchor;
}

export const Login = ({ toggleDrawer, anchor }: LoginProps) => {
  const submit = useSubmit();
  const action = useActionData() as IActionError;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        submit(values, { encType: 'application/json', method: 'PATCH', action: '/' });
      }}
    >
      <Form method="PATCH" action="/">
        <FormikTextInput
          autoComplete="on"
          label="Email"
          id="email"
          type="email"
          placeholder="Enter Email Here"
          name="email"
          textSx={breakpointsLoginText}
        />
        <FormikTextInput
          autoComplete="on"
          label="Password"
          id="password"
          type="password"
          placeholder="Enter Password Here"
          name="password"
          textSx={breakpointsLoginText}
        />
        <br />
        {action ? <ActionError errorMessage={action.errorMessage} /> : undefined}
        <Button type="submit" variant="outlined" sx={breakpointsLoginButton} onClick={toggleDrawer(anchor, false)}>
          {'Login'}
        </Button>
        <Button type="reset" variant="outlined" sx={breakpointsLoginButton}>
          {'Reset'}
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
