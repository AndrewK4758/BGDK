// import styles from './login.module.css';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { MouseEvent, useContext, useState } from 'react';
import { IActionError } from '../../../interfaces/action-error';
import { ActiveUserContext } from '../context/active-user-context';
import ActionError from '../errors/action-error';
import FormikTextInput from '../text-input/formik-text-input';
import loginUserAction from './actions/login-user-action';
import verifyEmailOnBlur from './events/verify-login-email-on-blur';
import { breakpointsButtonSx, breakpointsLabelSx, breakpointsTextBoxSx } from './styles/login-sx-props';
import { initialValues, LoginDataProps, validationSchema } from './validations/login-validation-schema';

type Anchor = 'right';

interface LoginProps {
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: MouseEvent) => void;
  anchor: Anchor;
}

export const Login = ({ toggleDrawer, anchor }: LoginProps) => {
  const [loginError, setLoginError] = useState<IActionError>({ errorMessage: '' });
  const [noEmailError, setNoEmailError] = useState<string>('');
  const { setActiveUser } = useContext(ActiveUserContext);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: LoginDataProps) => loginUserAction(values, setActiveUser, setLoginError)}
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
          onBlurCB={e => verifyEmailOnBlur(e, setNoEmailError)}
        />
        <br />
        {noEmailError && <ActionError errorMessage={noEmailError} />}
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
