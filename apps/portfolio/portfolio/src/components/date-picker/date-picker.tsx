import Theme from '../../styles/theme';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Typography from '@mui/material/Typography';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import '../../styles/styles.css';
import type { FormikProps } from 'formik';
import { MessageMeFormValues } from '../email/email-dialog';

const tomorrow = dayjs().add(1, 'day');
const nextYear = dayjs().year(new Date().getFullYear() + 1);

const Label = () => (
  <Typography variant="body1" sx={{ fontSize: '1.25rem' }}>
    Set Appointment Date & Time
  </Typography>
);

interface AppointmentMakerProps {
  formik: FormikProps<MessageMeFormValues>;
}

const AppointmentMaker = ({ formik }: AppointmentMakerProps) => (
  <DateTimePicker
    key={'appointment-maker'}
    name="appointmaker"
    formatDensity="spacious"
    viewRenderers={{
      hours: renderTimeViewClock,
      minutes: renderTimeViewClock,
    }}
    defaultValue={tomorrow}
    label={<Label />}
    minDate={tomorrow}
    maxDate={nextYear}
    disablePast={true}
    onChange={data => formik.setFieldValue('date', data?.format('MM-DD-YYYY/HH:mm'))}
    slotProps={{
      textField: {
        color: 'secondary',
        variant: 'filled',
        sx: {
          p: 1,
          width: '75%',
          backgroundColor: Theme.palette.background.default,
          borderRadius: 2,
        },
      },
      switchViewIcon: {
        sx: {
          scale: 1.5,
          color: Theme.palette.primary.light,
        },
      },
      rightArrowIcon: {
        sx: {
          scale: 1.5,
          color: Theme.palette.primary.light,
        },
      },
      leftArrowIcon: {
        sx: {
          scale: 1.5,
          color: Theme.palette.primary.light,
        },
      },
      openPickerIcon: {
        sx: { scale: 1.5, color: Theme.palette.secondary.main },
      },
      desktopPaper: {
        elevation: 12,
        sx: {
          border: `7px solid ${Theme.palette.secondary.main}`,
        },
      },
      day: {
        sx: {
          fontSize: '1.5rem',
          backgroundColor: Theme.palette.background.default,
          color: Theme.palette.primary.main,
          borderRadius: 2,
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
);

export default AppointmentMaker;
