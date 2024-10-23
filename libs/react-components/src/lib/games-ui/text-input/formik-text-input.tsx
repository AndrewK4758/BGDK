import { SxProps } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { Theme } from '../../theme/theme';
import Text from '../text/text.tsx';
import { ElementType, FocusEvent, Fragment } from 'react';

export interface FormikTextInputProps {
  name: string;
  type: string;
  label: string;
  labelComponent: ElementType;
  size?: string;
  autoComplete: string;
  id?: string;
  placeholder?: string;
  textSx?: SxProps;
  labelSx?: SxProps;
  onBlurCB?: (event: FocusEvent<unknown>) => void;
  value?: string;
}

export function FormikTextInput({
  label,
  textSx,
  labelSx,
  autoComplete,
  labelComponent,
  size,
  value,
  onBlurCB,
  ...props
}: FormikTextInputProps) {
  const [field, meta] = useField(props);
  if (onBlurCB) field.onBlur = onBlurCB;

  return (
    <Fragment key={label}>
      <InputLabel component={labelComponent} variant="filled" sx={labelSx}>
        {label}
      </InputLabel>
      <TextField
        autoComplete={autoComplete}
        multiline={false}
        variant="filled"
        {...props}
        {...field}
        slotProps={{
          inputLabel: { sx: textSx },
        }}
        sx={textSx}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error ? (
        <Text
          sx={{ color: Theme.palette.primary.contrastText, ...labelSx }}
          titleVariant="body1"
          titleText={meta.error}
        />
      ) : null}
    </Fragment>
  );
}

export default FormikTextInput;
