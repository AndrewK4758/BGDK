// import styles from './register-user.tsx.module.css';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import {} from 'react-router-dom';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { IActionError } from '../../../interfaces/action-error';
import { Theme } from '../../theme/theme';
import ActionError from '../errors/action-error';
import FormikTextInput from '../text-input/formik-text-input';
import { EmailAddress, IRegisterUserClient } from '@bgdk/types-api';

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
  /**
  thumbnail: Yup.mixed().test('thumbnail', 'Only jpg, png, or svg are accepted', value => {
    if (value) {
      const supportedFormat = ['jpg', 'jpeg', 'png', 'svg', 'webp'];
      const splitValue = ((value as File).name as string).split('.');
      return supportedFormat.includes(splitValue[splitValue.length - 1]);
    }
  }),
  *  */
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '' as EmailAddress,
  playerName: '',
  password: '',
  thumbnail: '',
};

const breakpointsTextBoxSx: SxProps = {
  backgroundColor: Theme.palette.info.main,
  width: '30vw',
  height: '3vw',
  justifySelf: 'center',
  alignSelf: 'center',
  p: 0,
  m: 0,
  fontSize: '1.5rem',
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

interface RegisterUserProps {
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: MouseEvent) => void;
  anchor: Anchor;
}

export const RegisterUser = ({ toggleDrawer, anchor }: RegisterUserProps) => {
  const [blurString, setBlurString] = useState<string>('');
  const [registerError, setRegisterError] = useState<IActionError | null>(null);

  const onBlur = async (event: FocusEvent<unknown>) => {
    const value = (event.target as HTMLInputElement).value;
    const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;

    const resp = await axios.get(`${baseURL}/validate-user?email=${value}`);
    setBlurString(resp.data.message);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, formik: any) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      formik.setFieldValue('thumbnail', e.target.files[0]);
    }
  };

  const handleSubmit = async (values: IRegisterUserClient) => {
    console.log('in subimt func');
    const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
    const { firstName, lastName, email, playerName, password, thumbnail }: IRegisterUserClient = values;

    const reqHeaders: Partial<AxiosRequestConfig> = {
      headers: {
        'current-game': sessionStorage.getItem('__current_game__'),
        'Content-Type': 'multipart/form-data',
      },
    };

    const form = new FormData();

    form.append('thumbnail', thumbnail as string | Blob);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('password', password);
    form.append('playerName', playerName);
    // const userObject: IRegisterUserClient = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   password: password,
    //   playerName: playerName,
    //   thumbnail: thumbnail,
    // };
    // console.log(userObject);
    // console.log(form);
    try {
      const resp = await axios.post(`${baseURL}/register-user`, form, reqHeaders);
      console.log(resp.data);
      return resp.data;
    } catch (err) {
      console.error(err);
      const { response } = err as AxiosError;
      setRegisterError(response?.data as IActionError);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} i>
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
            onBlurCB={onBlur}
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
            textSx={{ ...breakpointsTextBoxSx, border: '3px solid blue' }}
            labelSx={breakpointsLabelSx}
          />
          <br />

          <input
            name="thumbnail"
            id="thumbnail"
            type="file"
            onChange={e => handleOnChange(e, formik as FormikProps<IRegisterUserClient>)}
          />

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
