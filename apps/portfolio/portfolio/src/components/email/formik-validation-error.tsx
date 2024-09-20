import FormHelperText from '@mui/material/FormHelperText';
import type { FormikProps } from 'formik';
import Theme from '../../styles/theme';
import Box from '@mui/material/Box';

interface InitialValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  attachment: null;
}

type FormikValidationErrorProps = {
  formik: FormikProps<InitialValues>;
  elementName: keyof InitialValues;
};

const FormikValidationError = ({ formik, elementName }: FormikValidationErrorProps) => (
  <Box component={'div'} key={`form-error-${elementName}`} id={`form-error-${elementName}`}>
    {formik.touched[elementName] && formik.errors[elementName] ? (
      <FormHelperText variant="outlined" sx={{ color: Theme.palette.error.main, fontSize: '1.25rem' }}>
        {formik.errors[elementName] as string}
      </FormHelperText>
    ) : null}
  </Box>
);

export default FormikValidationError;
