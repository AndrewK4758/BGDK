import { Label } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import { DateTimePicker, renderTimeViewClock, type DateTimePickerSlotProps } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';
import type { FormikProps } from 'formik';
import '../../../styles/apointment-maker.css';
import Theme from '../../../styles/theme';
import { MessageMeFormValues } from '../email-form/email-form';

const tomorrow = dayjs().add(1, 'day');
const nextYear = dayjs().year(new Date().getFullYear() + 1);

const dateTimePickerSlotProps: DateTimePickerSlotProps<Dayjs, false> = {
  textField: {
    color: 'primary',
    variant: 'filled',
    sx: {
      p: 1,
      width: '100%',
      backgroundColor: Theme.palette.background.default,
      borderRadius: 1,
    },
  },
  switchViewIcon: {
    sx: {
      scale: 1.5,
      color: Theme.palette.primary.dark,
    },
  },
  rightArrowIcon: {
    sx: {
      scale: 1.5,
      color: Theme.palette.primary.dark,
    },
  },
  leftArrowIcon: {
    sx: {
      scale: 1.5,
      color: Theme.palette.primary.dark,
    },
  },
  openPickerIcon: {
    sx: { scale: 1.5, color: Theme.palette.secondary.dark },
  },
  desktopPaper: {
    elevation: 12,
    sx: {
      border: `3px solid ${Theme.palette.primary.dark}`,
    },
  },
  day: {
    sx: {
      fontSize: '1.5rem',
      backgroundColor: Theme.palette.background.default,
      color: Theme.palette.primary.dark,
      borderRadius: 1,
    },
  },
  calendarHeader: {
    sx: {
      scale: 1.1,
    },
  },
  actionBar: {
    actions: ['accept', 'clear'],
  },
};

interface AppointmentMakerProps {
  formik: FormikProps<MessageMeFormValues>;
}

const AppointmentMaker = ({ formik }: AppointmentMakerProps) => (
  <Box component={'div'} key={'google-calendar-wrapper'} id="google-calendar-wrapper">
    <DateTimePicker
      key={'appointment-maker'}
      name="appointmaker"
      formatDensity="spacious"
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
      }}
      defaultValue={tomorrow}
      label={<Label labelVariant="body1" labelText="Set Appointment Date Time" sx={{ fontSize: '1.25rem' }} />}
      minDate={tomorrow}
      maxDate={nextYear}
      disablePast={true}
      orientation="landscape"
      onAccept={data => {
        formik.setFieldValue('date', data?.toISOString());
      }}
      slotProps={dateTimePickerSlotProps}
    />
  </Box>
);

export default AppointmentMaker;
