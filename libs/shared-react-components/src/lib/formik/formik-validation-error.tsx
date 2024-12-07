import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import type { SxProps } from '@mui/material/styles';
import type { FormikProps } from 'formik';

interface FormikValidationErrorProps<T> {
  formik: FormikProps<T>;
  elementName: keyof T;
  helperTextSx: SxProps;
}

export const FormikValidationError = <T,>({ formik, elementName, helperTextSx }: FormikValidationErrorProps<T>) => (
  <Box component={'div'} key={`form-error-${elementName.toString()}`} id={`form-error-${elementName.toString()}`}>
    {formik.touched[elementName] && formik.errors[elementName] ? (
      <FormHelperText variant="outlined" sx={helperTextSx}>
        {formik.errors[elementName] as string}
      </FormHelperText>
    ) : null}
  </Box>
);

export default FormikValidationError;
