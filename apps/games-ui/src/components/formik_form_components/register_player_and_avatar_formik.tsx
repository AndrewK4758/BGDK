import { AvatarTotem, Color } from '@aklapper/chutes-and-ladders';
import { ILoadRegisterData } from '@aklapper/model';
import { SelectMenu, TextInput, Theme } from '@aklapper/react-components';
import { MenuItem, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Form, Formik } from 'formik';
import { useParams, useRouteLoaderData, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';

const selectMenuSxProps: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.info.main,
};

const avatarColorMap = (e: Color, i: number, arr: string[]) => (
  <MenuItem key={e} value={e} divider={true} sx={selectMenuSxProps}>
    {e}
  </MenuItem>
);

const avatarListMap = (e: AvatarTotem, i: number, arr: AvatarTotem[]) => (
  <MenuItem key={e.name} value={e.name} divider={true} sx={selectMenuSxProps}>
    {e.name}
  </MenuItem>
);

export default function RegisterPlayerAndAvatarForm() {
  const params = useParams();
  const submit = useSubmit();
  const data = useRouteLoaderData('registerData') as ILoadRegisterData;

  const colors = Object.values(data.avatarColorList) as Color[];
  const avatars = data.avatarList as AvatarTotem[];
  const id = params.id;

  const validationSchema = Yup.object({
    playerName: Yup.string()
      .min(2, 'Must be min of 2 characters')
      .max(20, 'Must be 20 characters or less')
      .required('Required, please enter player name'),
    avatarName: Yup.string().required('Required, please select avatar name'),
    avatarColor: Yup.string().required('Required, please select avatar color'),
  });

  return (
    <Formik
      initialValues={{ playerName: '', avatarName: '', avatarColor: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) =>
        submit(values, {
          method: 'patch',
          action: `/games/${id}/play`,
          encType: 'application/json',
        })
      }
    >
      <Form style={{ width: '100%' }}>
        <Container component={'div'} sx={{ textAlign: 'start', flexDirection: 'column' }}>
          <TextInput type="text" name="playerName" placeholder="Enter Player Name" label="Player Name" />
          <SelectMenu name="avatarName" label="Avatar Name" data={avatars} mapCallback={avatarListMap} />
          <SelectMenu name="avatarColor" label="Avatar Color" data={colors} mapCallback={avatarColorMap} />
          <Button type="submit" sx={{ alignSelf: 'end' }}>
            Register
          </Button>
        </Container>
      </Form>
    </Formik>
  );
}
