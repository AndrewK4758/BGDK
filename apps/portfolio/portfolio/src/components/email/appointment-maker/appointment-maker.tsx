import { Label } from '@bgdk/shared-react-components';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import type { FormikProps } from 'formik';
import '../../../styles/email-form.css';
import Theme from '../../../styles/theme';
import { MessageMeFormValues } from '../email-form/email-form';
import Box from '@mui/material/Box';

const tomorrow = dayjs().add(1, 'day');
const nextYear = dayjs().year(new Date().getFullYear() + 1);

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
      timeSteps={{ minutes: 15 }}
      orientation="landscape"
      onAccept={data => {
        console.log(data);
        formik.setFieldValue('date', data?.toISOString());
        console.log(formik.values.date);
      }}
      slotProps={{
        textField: {
          color: 'secondary',
          variant: 'filled',
          sx: {
            p: 1,
            width: '75%',
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
            border: `7px solid ${Theme.palette.primary.dark}`,
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
      }}
    />
  </Box>
);

export default AppointmentMaker;
