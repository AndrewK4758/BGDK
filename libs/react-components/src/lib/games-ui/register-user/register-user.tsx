// import styles from './register-user.tsx.module.css';
import { IRegisterUserClient } from '@bgdk/types-api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import { IActionError } from '../../../interfaces/action-error';
import ActionError from '../errors/action-error';
import FormikTextInput from '../text-input/formik-text-input';
import Text from '../text/text';
import registerUserAction from './actions/register-user-action';
import updateFormOnChange from './events/add-file-to-form-on-change';
import verifyEmailObBlur from './events/verify-email-ob-blur';
import {
  breakpointsButtonSx,
  breakpointsLabelSx,
  breakpointsTextBoxSx,
  inputStyle,
} from './styles/register-user-css-sx-props';
import { initialValues, supportedFormat, validationSchema } from './validations/validation-schema';

type Anchor = 'right';

interface RegisterUserProps {
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: MouseEvent) => void;
  anchor: Anchor;
}

export const RegisterUser = ({ toggleDrawer, anchor }: RegisterUserProps) => {
  const [blurString, setBlurString] = useState<string>('');
  const [registerError, setRegisterError] = useState<IActionError | null>(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => registerUserAction(values, setRegisterError)}
    >
      {formik => (
        <Form method={'POST'} encType="multipart/form-data">
          <FormikTextInput
            autoComplete="on"
            labelComponent={'h3'}
            label="First Name"
            id="firstName"
            type={'text'}
            placeholder="Enter First Name Here"
            name={'firstName'}
            value={formik.values.firstName}
            textSx={breakpointsTextBoxSx}
            labelSx={breakpointsLabelSx}
          />
          <FormikTextInput
            autoComplete="on"
            labelComponent={'h3'}
            label="Last Name"
            id="lastName"
            type={'text'}
            placeholder="Enter Last Name Here"
            name={'lastName'}
            value={formik.values.lastName}
            textSx={breakpointsTextBoxSx}
            labelSx={breakpointsLabelSx}
          />
          <FormikTextInput
            autoComplete="new-email"
            labelComponent={'h3'}
            label="Email"
            id="email"
            type={'text'}
            placeholder="Enter Email Here"
            name={'email'}
            value={formik.values.email}
            textSx={breakpointsTextBoxSx}
            labelSx={breakpointsLabelSx}
            onBlurCB={e => verifyEmailObBlur(e, setBlurString)}
          />
          <br />
          {blurString}
          <FormikTextInput
            autoComplete="on"
            labelComponent={'h3'}
            label="Player Name"
            id="playerName"
            type={'text'}
            placeholder="Enter Player Name Here"
            name={'playerName'}
            value={formik.values.playerName}
            textSx={breakpointsTextBoxSx}
            labelSx={breakpointsLabelSx}
          />
          <FormikTextInput
            autoComplete="on"
            labelComponent={'h3'}
            label="Password"
            id="password"
            type="password"
            placeholder="Enter Password Here"
            name="password"
            value={formik.values.password}
            textSx={breakpointsTextBoxSx}
            labelSx={breakpointsLabelSx}
          />
          <br />
          <Fragment key={'file-input'}>
            <InputLabel component={'h3'} variant="filled" sx={breakpointsLabelSx}>
              Upload Picture
            </InputLabel>
            <input
              name="thumbnail"
              id="thumbnail"
              type="file"
              accept={supportedFormat.map(type => `image/${type}, `).join(',')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateFormOnChange(e, formik as FormikProps<IRegisterUserClient>)
              }
              style={inputStyle}
            />
            <br />

            {formik.errors.thumbnail && formik.touched.thumbnail ? (
              <Text sx={breakpointsLabelSx} titleVariant="body1" titleText={formik.errors.thumbnail} />
            ) : null}
          </Fragment>

          <br />
          <Box component={'div'} style={{ whiteSpace: 'balance' }}>
            {registerError ? <ActionError errorMessage={registerError.errorMessage} /> : undefined}
          </Box>
          <br />
          <Button type={'submit'} variant={'outlined'} sx={breakpointsButtonSx} onClick={toggleDrawer(anchor, false)}>
            {'Register'}
          </Button>
          <Button type="reset" variant="outlined" sx={breakpointsButtonSx} onReset={formik.handleReset}>
            {'Reset'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterUser;
