import * as Yup from 'yup';
import YupPassword from 'yup-password';

export interface LoginDataProps {
  email: string;
  password: string;
}

YupPassword(Yup);

export const validationSchema = Yup.object({
  email: Yup.string().email().required('Must enter valid email in the form email@email.email'),
  password: Yup.string().password().required('Password is required'),
});

export const initialValues: LoginDataProps = {
  email: '',
  password: '',
};
