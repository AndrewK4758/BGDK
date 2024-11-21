import { Label } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DateCalendar, type DateCalendarSlotProps } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker, type TimePickerSlotProps } from '@mui/x-date-pickers/TimePicker';
import { useGoogleLogin, type CodeResponse } from '@react-oauth/google';
import axios from 'axios';
import dayjs, { type Dayjs } from 'dayjs';
import { useContext, useState, type Dispatch, type SetStateAction } from 'react';
import { Form } from 'react-router-dom';
import '../../../styles/google-calendar.css';
import Theme from '../../../styles/theme';
import {
  GoogleUserContext,
  type GoogleUserContextInfo,
  type GoogleUserContextProps,
} from '../../../contexts/contact-context';
import { jwtDecode } from 'jwt-decode';

const tomorrow = dayjs().add(1, 'day').set('hour', 8).set('minutes', 30);
const nextYear = dayjs().add(1, 'year').set('hour', 8).set('minutes', 30);
const minTime = dayjs().set('hour', 8).set('minutes', 30);
const maxTime = dayjs().set('hour', 20).set('minutes', 30);

const dateCalendarSlotProps: DateCalendarSlotProps<Dayjs> = {
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
};

const timePickerSlotProps: TimePickerSlotProps<Dayjs, false> = {
  digitalClockSectionItem: {
    sx: {
      border: `2px solid ${Theme.palette.primary.dark}`,
      borderRadius: 1,
      backgroundColor: Theme.palette.background.default,
    },
  },
  actionBar: {
    sx: {
      borderTop: `2px solid ${Theme.palette.primary.dark}`,
    },
  },
  textField: {
    variant: 'filled',
    sx: {
      p: 1,
      width: '80%',
      backgroundColor: Theme.palette.background.default,
      borderRadius: 1,
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
    sx: { scale: 1.5, color: Theme.palette.primary.dark },
  },
  desktopPaper: {
    elevation: 12,
    sx: {
      border: `3px solid ${Theme.palette.primary.dark}`,
    },
  },
};

type TimesAndDates = {
  startTime: Dayjs;
  endTime: Dayjs;
  date: Dayjs;
};

const initState: TimesAndDates = {
  startTime: tomorrow,
  endTime: tomorrow.add(1, 'hour'),
  date: tomorrow,
};

const GoogleCalendar = () => {
  const [values, setValues] = useState<TimesAndDates>(initState);
  const { setUser } = useContext<GoogleUserContextProps>(GoogleUserContext);

  const login = useGoogleLogin({
    onSuccess: code => onGoogleSuccess(code, setUser),
    onError: err => console.error(err),
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  return (
    <Container
      component={'div'}
      key={'google-calendar-wrapper'}
      id="google-calendar-wrapper"
      sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <Box
        component={'section'}
        key={'google-calendar-auth-box'}
        id="google-calendar-auth-box"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button
          LinkComponent={'button'}
          key={'google-auth'}
          id="google-auth"
          onClick={() => login()}
          sx={{ fontSize: '2.5rem' }}
        >
          Connect Your Google Calendar
        </Button>
      </Box>
      <Box
        component={'section'}
        key={'google-calendar-components-box'}
        id="google-calendar-components-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Form
          onSubmit={() => handleSubmitEvent(values)}
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component={'section'}
            key={'date-picker-wrapper'}
            id="date-picker-wrapper"
            sx={{
              width: '100%',
              flex: '3 1 auto',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <DateCalendar
              key={'appointment-maker'}
              minDate={tomorrow}
              maxDate={nextYear}
              disablePast={true}
              defaultValue={tomorrow}
              value={values.date}
              onChange={data => setValues({ ...values, date: data })}
              slotProps={dateCalendarSlotProps}
              sx={{ scale: 1.4 }}
            />
          </Box>
          <Box
            component={'section'}
            key={'time-pickers-wrapper'}
            id="time-pickers-wrapper"
            sx={{
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Label
              tooltipTitle={
                'Time must be between 8:30am and 8:00pm EST. Start & End time must be minimun of 1 hour range'
              }
              labelVariant={'h4'}
              labelText={'Suggested Meeting Time'}
              placement={'top'}
              sx={{ color: Theme.palette.primary.main }}
              tooltipSx={{ fontSize: '1.4rem' }}
            />
            <TimePicker
              label={
                <Label
                  placement="top"
                  tooltipTitle=""
                  labelVariant="body1"
                  labelText="Start Time"
                  sx={{ fontSize: '1.25rem' }}
                />
              }
              minTime={minTime}
              maxTime={maxTime}
              defaultValue={tomorrow}
              closeOnSelect={false}
              value={values.startTime}
              onAccept={data => setValues({ ...values, startTime: data as Dayjs })}
              slotProps={timePickerSlotProps}
              disablePast={true}
            />
            <TimePicker
              label={
                <Label
                  placement="top"
                  tooltipTitle=""
                  labelVariant="body1"
                  labelText="End Time"
                  sx={{ fontSize: '1.25rem' }}
                />
              }
              minTime={values.startTime.add(1, 'hour')}
              maxTime={values.startTime.add(3, 'hours')}
              closeOnSelect={false}
              value={values.endTime}
              onAccept={data => setValues({ ...values, endTime: data as Dayjs })}
              slotProps={timePickerSlotProps}
              disablePast={true}
            />
          </Box>
          <Box
            component={'section'}
            key={'google-calendar-submit-box'}
            id="google-calendar-submit-box"
            sx={{
              height: 'fit-content',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingX: 4,
            }}
          >
            <Button
              type="submit"
              LinkComponent={'button'}
              key={'calendar-submit-button'}
              id="calendar-submit-buttom"
              sx={{ fontSize: '2rem' }}
            >
              Submit Event
            </Button>
          </Box>
        </Form>
      </Box>
    </Container>
  );
};

export default GoogleCalendar;

const baseURL = import.meta.env.VITE_PORTFOLIO_API_URL;

const onGoogleSuccess = async (code: CodeResponse, setUser: Dispatch<SetStateAction<GoogleUserContextInfo>>) => {
  try {
    const resp = await axios.post(`${baseURL}/create-tokens`, { code }, { withCredentials: true });

    let { idToken } = resp.data;

    let { email, name }: GoogleUserContextInfo = jwtDecode(idToken);

    setUser({ email: email, name: name });

    idToken = null;
    email = '';
    name = '';

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handleSubmitEvent = async ({ date, startTime, endTime }: TimesAndDates) => {
  try {
    const tempStartDateTime = date.toDate();
    const tempEndDateTime = date.toDate();

    const startHours = startTime.get('hours');
    const startMinutes = startTime.get('minutes');

    const endHours = endTime.get('hours');
    const endMinutes = endTime.get('minutes');

    tempStartDateTime.setHours(startHours);
    tempStartDateTime.setMinutes(startMinutes);

    tempEndDateTime.setHours(endHours);
    tempEndDateTime.setMinutes(endMinutes);

    const startDateTime = tempStartDateTime.toISOString();
    const endDateTime = tempEndDateTime.toISOString();

    await axios.post(
      `${baseURL}/create-events`,
      { start: startDateTime, end: endDateTime },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
