import { Label } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { ElementType, FocusEvent } from 'react';
import { Theme } from '../../theme/theme';
import Text from '../text/text';

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
    <Box key={`${label}-wrapper`}>
      <Label tooltipTitle={label} labelVariant={'h2'} labelText={label} sx={{ ...labelSx }} placement={'top'} />
      <TextField
        autoComplete={autoComplete}
        multiline={true}
        variant="outlined"
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
    </Box>
  );
}

export default FormikTextInput;
