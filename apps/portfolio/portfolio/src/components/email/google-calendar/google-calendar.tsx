import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Label } from '@bgdk/shared-react-components';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useGoogleLogin, type CodeResponse, type TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Form } from 'react-router-dom';
import '../../../styles/google-calendar.css';
import Theme from '../../../styles/theme';

const tomorrow = dayjs().add(1, 'day');
const nextYear = dayjs().add(1, 'year');
const minTime = dayjs().add(3, 'hours');

type TimesAndDates = {
  startTime: Dayjs;
  endTime: Dayjs;
  date: Dayjs;
};

const initState: TimesAndDates = {
  startTime: minTime,
  endTime: minTime.add(1, 'hour'),
  date: dayjs(),
};

const GoogleCalendar = () => {
  const [tokens, setTokens] = useState<TokenResponse | null>(null);
  // const [user, setUser] = useState<CodeResponse | null>(null);
  const [values, setValues] = useState<TimesAndDates>(initState);

  useEffect(() => {}, [tokens, values]);

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
            <TimePicker
              disablePast={true}
              label={<Label labelVariant="body1" labelText="Start Time" sx={{ fontSize: '1.25rem' }} />}
              minTime={values.date.set('hours', 8).set('minutes', 30)}
              maxTime={values.date.set('hours', 20).set('minutes', 30)}
              disableIgnoringDatePartForTimeValidation={true}
              closeOnSelect={false}
              onAccept={data => setValues({ ...values, startTime: data as Dayjs })}
              slotProps={{
                digitalClockItem: {
                  sx: {
                    backgroundColor: 'red',
                    color: 'red',
                  },
                },
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
            <TimePicker
              disablePast={true}
              label={<Label labelVariant="body1" labelText="End Time" sx={{ fontSize: '1.25rem' }} />}
              minTime={values.startTime.add(1, 'hour')}
              maxTime={values.startTime.add(3, 'hours')}
              closeOnSelect={false}
              onAccept={data => setValues({ ...values, endTime: data as Dayjs })}
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
