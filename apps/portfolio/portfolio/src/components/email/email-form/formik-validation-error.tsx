import FormHelperText from '@mui/material/FormHelperText';
import type { FormikProps } from 'formik';
import Theme from '../../../styles/theme';
import Box from '@mui/material/Box';


interface FormikValidationErrorProps<T> {
  formik: FormikProps<T>;
  elementName: keyof T;
};

const FormikValidationError = <T,>({ formik, elementName }: FormikValidationErrorProps<T>) => (
  <Box component={'div'} key={`form-error-${elementName.toString()}`} id={`form-error-${elementName.toString()}`}>
    {formik.touched[elementName] && formik.errors[elementName] ? (
      <FormHelperText variant="outlined" sx={{ color: Theme.palette.error.main, fontSize: '1.25rem' }}>
        {formik.errors[elementName] as string}
      </FormHelperText>
    ) : null}
  </Box>
);

export default FormikValidationError;
