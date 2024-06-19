import { AvatarTotem } from '@bgdk/game-types';
import { SxProps } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useField } from 'formik';
import { Theme } from '../../theme/theme';
import Text from '../../text/text';

interface IAvatarColorSelectValues {
  name: string;
  label: string;
  id?: string;
  data: string[] | AvatarTotem[];
  mapCallback(v: unknown, i: number, arr: unknown[]): JSX.Element;
  labelSx?: SxProps;
  selectSx: SxProps;
}

export function SelectMenu({
  label,
  mapCallback,
  labelSx,
  selectSx,
  ...props
}: IAvatarColorSelectValues) {
  const [field, meta] = useField(props);

  const data = props.data;

  return (
    <>
      <InputLabel component={'h2'} variant="filled" sx={labelSx}>
        {label}
      </InputLabel>

      <Select {...field} {...props} autoWidth variant="filled" sx={selectSx}>
        {data.map(mapCallback)}
      </Select>
      {meta.touched && meta.error ? (
        <Text
          titleVariant="body1"
          titleText={meta.error}
          sx={{ color: Theme.palette.primary.contrastText, ...labelSx }}
        />
      ) : null}
    </>
  );
}
