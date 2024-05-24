import { AvatarTotem } from '@aklapper/chutes-and-ladders';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useField } from 'formik';
import { Theme } from '../../theme/theme';

interface IAvatarColorSelectValues {
  name: string;
  label: string;
  id?: string;
  data: string[] | AvatarTotem[];
  mapCallback(v: unknown, i: number, arr: unknown[]): JSX.Element;
}

export function SelectMenu({ label, mapCallback, ...props }: IAvatarColorSelectValues) {
  const [field, meta] = useField(props);

  const data = props.data;

  return (
    <>
      <InputLabel component={'h2'} variant="filled" sx={{ m: 0 }}>
        {label}
      </InputLabel>

      <Select
        {...field}
        {...props}
        autoWidth
        variant="filled"
        sx={{
          width: '20%',
          textAlign: 'center',
          backgroundColor: Theme.palette.info.main,
        }}
      >
        {data.map(mapCallback)}
      </Select>
      {meta.touched && meta.error ? <Box sx={{ color: Theme.palette.primary.contrastText }}>{meta.error}</Box> : null}
    </>
  );
}
