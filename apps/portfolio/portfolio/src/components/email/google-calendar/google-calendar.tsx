import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useGoogleLogin, type CodeResponse, type TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Form } from 'react-router-dom';
import Theme from '../../../styles/theme';
import '../../../styles/styles.css';

type TimesAndDates = {
  startTime: string;
  endTime: string;
  date: Dayjs;
};

const initState: TimesAndDates = {
  startTime: '',
  endTime: '',
  date: dayjs(),
};

const tomorrow = dayjs().add(1, 'day');
const nextYear = dayjs().add(1, 'year');
const minTime = dayjs().set('hour', 8).set('minutes', 30);
const maxTime = dayjs().set('hour', 20).set('minutes', 30);
const tomorrowTimeStart = tomorrow.set('hour', 9).set('minutes', 30);
const tomorrowTimeEnd = tomorrow.set('hour', 10).set('minutes', 30);

console.log(minTime, maxTime);

interface LabelProps {
  labelText: string;
  sx: SxProps;
}

const Label = ({ labelText, sx }: LabelProps) => (
  <Typography variant="body1" sx={sx}>
    {labelText}
  </Typography>
);

const GoogleCalendar = () => {
  const [tokens, setTokens] = useState<TokenResponse | null>(null);
  // const [user, setUser] = useState<CodeResponse | null>(null);
  const [values, setValues] = useState<TimesAndDates>(initState);

  useEffect(() => {
    console.log(values);
  }, [tokens, values]);

  const login = useGoogleLogin({
    onSuccess: code => onGoogleSuccess(code, setTokens),
    onError: err => console.error(err),
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  return (
    <Box
      component={'div'}
      key={'google-calendar-wrapper'}
      id="google-calendar-wrapper"
      sx={{ display: 'flex', flexDirection: 'column', border: '5px solid blue', height: '100%' }}
    >
      <Box
        component={'section'}
        key={'google-calendar-auth-box'}
        id="google-calendar-auth-box"
        sx={{ display: 'flex', justifyContent: 'center', border: '5px solid yellow' }}
      >
        <Button
          LinkComponent={'button'}
          key={'google-auth'}
          id="google-auth"
          onClick={() => login()}
          sx={{ fontSize: '2.5rem' }}
        >
          Connect Google Calendar
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
          border: '5px solid orange',
          flex: '0 1 100%',
        }}
      >
        <Form
          onSubmit={() => handleSubmitEvent(values)}
          style={{
            border: '5px solid red',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component={'section'}
            key={'date-picker-wrapper'}
            id="date-picker-wrapper"
            sx={{ border: 5, width: '100%', flex: '1 0 60%' }}
          >
            <DateCalendar
              key={'appointment-maker'}
              minDate={tomorrow}
              maxDate={nextYear}
              disablePast={true}
              defaultValue={tomorrow}
              value={values.date}
              onChange={data => setValues({ ...values, date: data })}
              slotProps={{
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
              }}
              sx={{ scale: 1.15 }}
            />
          </Box>
          <Box
            component={'section'}
            key={'time-pickers-wrapper'}
            id="time-pickers-wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '5px solid purple',
            }}
          >
            <TimePicker
              disablePast={true}
              label={<Label labelText="Start Time" sx={{ fontSize: '1.25rem' }} />}
              minTime={minTime}
              maxTime={maxTime}
              defaultValue={tomorrowTimeStart}
              closeOnSelect={false}
              onAccept={data => setValues({ ...values, startTime: (data as Dayjs).format('HH:mm') })}
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
                    border: `7px solid ${Theme.palette.secondary.dark}`,
                  },
                },
                actionBar: {
                  actions: ['accept', 'clear'],
                },
              }}
            />

            <br />
            <TimePicker
              disablePast={true}
              label={<Label labelText="End Time" sx={{ fontSize: '1.25rem' }} />}
              minTime={minTime}
              maxTime={maxTime}
              defaultValue={tomorrowTimeEnd}
              closeOnSelect={false}
              onAccept={data => setValues({ ...values, endTime: (data as Dayjs).format('HH:mm') })}
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
                    border: `7px solid ${Theme.palette.secondary.dark}`,
                  },
                },
                actionBar: {
                  actions: ['accept', 'clear'],
                },
              }}
            />
          </Box>
          <Box
            component={'section'}
            key={'google-calendar-submit-box'}
            id="google-calendar-submit-box"
            sx={{ display: 'flex', justifyContent: 'flex-end', paddingX: 4, border: '5px solid greene    ' }}
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
    </Box>
  );
};

export default GoogleCalendar;

const baseURL = import.meta.env.VITE_PORTFOLIO_API_URL;

const onGoogleSuccess = async (code: CodeResponse, setTokens: Dispatch<SetStateAction<TokenResponse | null>>) => {
  try {
    const tokenResponse = await axios.post(
      `${baseURL}/create-tokens`,
      { code },
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(tokenResponse.data);
    setTokens(tokenResponse.data);
  } catch (error) {
    console.error(error);
  }
};

const handleSubmitEvent = async ({ date, startTime, endTime }: TimesAndDates) => {
  try {
    const tempStartDateTime = date.toDate();
    const tempEndDateTime = date.toDate();

    const splitStart = startTime.split(':');
    const splitEnd = endTime.split(':');

    tempStartDateTime.setHours(parseInt(splitStart[0], 10));
    tempStartDateTime.setMinutes(parseInt(splitStart[1], 10));

    tempEndDateTime.setHours(parseInt(splitEnd[0], 10));
    tempEndDateTime.setMinutes(parseInt(splitEnd[1], 10));

    const startDateTime = tempStartDateTime.toISOString();
    const endDateTime = tempEndDateTime.toISOString();

    const resp = await axios.post(
      `${baseURL}/create-events`,
      { start: startDateTime, end: endDateTime },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(resp.data);
  } catch (error) {}
};
