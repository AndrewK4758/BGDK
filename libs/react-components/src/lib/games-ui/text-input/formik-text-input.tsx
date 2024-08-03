import { SxProps } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import Text from '../text/text';
import { Theme } from '../../theme/theme';
/* eslint-disable-next-line */

export interface FormikTextInputProps {
  name: string;
  type: string;
  label: string;
  id?: string;
  placeholder?: string;
  textSx?: SxProps;
  labelSx?: SxProps;
}

export function FormikTextInput({ label, textSx, labelSx, ...props }: FormikTextInputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <InputLabel component={'h2'} variant="filled" sx={labelSx}>
        {label}
      </InputLabel>
      <TextField
        autoComplete="off"
        multiline={false}
        variant="filled"
        {...field}
        {...props}
        InputProps={{
          sx: textSx,
        }}
      />
      {meta.touched && meta.error ? (
        <Text
          sx={{ color: Theme.palette.primary.contrastText, ...labelSx }}
          titleVariant="body1"
          titleText={meta.error}
        />
      ) : null}
    </>
  );
}

export default FormikTextInput;
