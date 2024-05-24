// import styles from './text-input.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import { Theme } from '../theme/theme';
/* eslint-disable-next-line */

export interface TextInputProps {
  name: string;
  type: string;
  label: string;
  id?: string;
  placeholder?: string;
}

export function TextInput({ label, ...props }: TextInputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <InputLabel component={'h2'} variant="filled" sx={{ m: 0 }}>
        {label}
      </InputLabel>
      <TextField
        autoComplete="off"
        multiline={false}
        variant="filled"
        {...field}
        {...props}
        sx={{ backgroundColor: Theme.palette.info.main, width: '50%' }}
      />
      {meta.touched && meta.error ? (
        <Box className="error" sx={{ color: Theme.palette.primary.contrastText }}>
          {meta.error}
        </Box>
      ) : null}
    </>
  );
}

export default TextInput;
