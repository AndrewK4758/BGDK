import { SelectMenu, TextInput, Theme } from '@bgdk/react-components';
import { AvatarTotem, Color, ILoadRegisterData } from '@bgdk/types-game';
import { MenuItem, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Form, Formik } from 'formik';
import { useParams, useRouteLoaderData, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';

const breakpointsSelectMenuSxProps: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
  },
};

const breakpointsRegisterPlayerButton: SxProps = {
  flex: '1 0 15%',
  alignSelf: 'end',
  justifySelf: 'center',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
    width: 130,
    height: 35,
  },
};

const breakpointsRegisterPlayerLabel: SxProps = {
  m: 1,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
  },
};

const breakpointsRegisterPlayerTextInput: SxProps = {
  width: '35%',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '20px',
    height: 45,
    width: 200,
  },
};

const breakpointsRegisterPlayerSelectInput: SxProps = {
  width: '25%',
  textAlign: 'center',
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '19px',
    height: 45,
    width: 200,
  },
};

const breakpointsFormContianer: SxProps = {
  textAlign: 'start',
  flexDirection: 'column',
  paddingX: '1rem',
  [Theme.breakpoints.down('laptop')]: {
    alignContent: 'center',
  },
};

const avatarColorMap = (e: Color, i: number, arr: string[]) => (
  <MenuItem key={e} value={e} divider={true} sx={breakpointsSelectMenuSxProps}>
    {e}
  </MenuItem>
);

const avatarListMap = (e: AvatarTotem, i: number, arr: AvatarTotem[]) => (
  <MenuItem key={e.name} value={e.name} divider={true} sx={breakpointsSelectMenuSxProps}>
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
      onSubmit={values =>
        submit(values, {
          method: 'patch',
          action: `/games/${id}/play`,
          encType: 'application/json',
        })
      }
    >
      <Form>
        <Container component={'section'} sx={breakpointsFormContianer}>
          <TextInput
            type="text"
            name="playerName"
            label="Player Name"
            textSx={breakpointsRegisterPlayerTextInput}
            labelSx={breakpointsRegisterPlayerLabel}
          />
          <SelectMenu
            name="avatarName"
            label="Avatar Name"
            data={avatars}
            mapCallback={avatarListMap}
            labelSx={breakpointsRegisterPlayerLabel}
            selectSx={breakpointsRegisterPlayerSelectInput}
          />
          <SelectMenu
            name="avatarColor"
            label="Avatar Color"
            data={colors}
            mapCallback={avatarColorMap}
            labelSx={breakpointsRegisterPlayerLabel}
            selectSx={breakpointsRegisterPlayerSelectInput}
          />
        </Container>
        <Button type="submit" variant="outlined" sx={breakpointsRegisterPlayerButton}>
          Register
        </Button>
      </Form>
    </Formik>
  );
}
