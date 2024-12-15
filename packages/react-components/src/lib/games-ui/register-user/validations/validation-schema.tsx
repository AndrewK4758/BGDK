import { EmailAddress, IRegisterUserClient } from '@bgdk/types-api';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const initialValues: IRegisterUserClient = {
  firstName: '',
  lastName: '',
  email: '' as EmailAddress,
  playerName: '',
  password: '',
  thumbnail: '',
};

export const supportedFormat = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

export const validationSchema = Yup.object({
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
  thumbnail: Yup.mixed().test('thumbnail', 'Only jpg, png, or svg are accepted', value => {
    if (value) {
      const splitValue = (value as File).name.split('.');
      return supportedFormat.includes(splitValue[splitValue.length - 1]);
    } else return false;
  }),
});
