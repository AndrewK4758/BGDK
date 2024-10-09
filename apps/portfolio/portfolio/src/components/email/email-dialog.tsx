import { Tab, Tabs, type SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { type Variant } from '@mui/material/styles/createTypography';
import { useFormik } from 'formik';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { SubmitFunction, useNavigation, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import 'yup-phone-lite';
import Theme from '../../styles/theme';
import dayjs from 'dayjs';
// import { useGoogleLogin, type CodeResponse, type TokenResponse } from '@react-oauth/google';
// import axios from 'axios';
import { Text } from '@bgdk/react-components';
import EmaiForm from './email-form/email-form';

export type MessageMeFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  date: string;
  attachment: null;
};

const initialValues = {
  name: '',
  email: '',
  phone: '',
  subject: 'I saw your website and wanted to reach out...',
  body: '',
  date: dayjs().add(1, 'day').format('MM-DD-YYYY/HH:mm'),
  attachment: null,
};

const validationSchema = Yup.object({
  name: Yup.string().max(60, 'Name must be less than 60 characters').required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email address'),
  phone: Yup.string().notRequired().phone('US', 'Please enter a valid US phone number'),
  subject: Yup.string().max(160, 'Must me less than 160 characters').required('Subject is required'),
  body: Yup.string().max(2000, 'Must be less than 2000 characters').required('Please enter your message'),
  attachment: Yup.mixed().notRequired(),
});

interface EmailDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const handleSubmitMessageMe = (values: MessageMeFormValues, submit: SubmitFunction) => {
  const { name, email, phone, subject, body, date, attachment } = values;

  console.log(date);
  const form = new FormData();

  form.append('name', name);
  form.append('email', email);
  form.append('phone', phone);
  form.append('subject', subject);
  form.append('body', body);
  form.append('date', date);
  if (attachment) form.append('attachment', attachment);

  console.log(form.get('date'));
  submit(form, { action: '/', method: 'post', encType: 'multipart/form-data' });
};

const EmailDialog = ({ open, setOpen }: EmailDialogProps) => {
  const [tab, setTab] = useState<number>(0);
  // const [tokens, setTokens] = useState<TokenResponse | null>(null);
  // const [user, setUser] = useState<CodeResponse | null>(null);
  const { state } = useNavigation();
  const submit = useSubmit();

  // const login = useGoogleLogin({
  //   onSuccess: code => onGoogleSuccess(code, setTokens),
  //   onError: err => console.error(err),
  //   flow: 'auth-code',
  //   scope: 'https://www.googleapis.com/auth/calendar.events',
  // });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
      handleSubmitMessageMe(values, submit);
    },
  });

  return (
    <Dialog
      open={open}
      id="email-dialog"
      fullWidth
      scroll="body"
      PaperProps={{
        elevation: 24,
        component: 'div',
        sx: {
          m: 0,
          minWidth: '40vw',
          height: '75%',
        },
      }}
      sx={{ width: '100%', height: '100%' }}
    >
      {state === 'submitting' && (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignContent={'center'}>
          <Box sx={{ fontSize: '5rem', textAlign: 'center' }}>{`\u{1F44D}`}</Box>
          <Box sx={{ fontSize: '3rem', textAlign: 'center' }}>{` Got it, Thanks!! `}</Box>
          <Box sx={{ fontSize: '5rem', textAlign: 'center' }}>{`\u{1F44D}`}</Box>
        </Box>
      )}

      <Box
        component={'section'}
        id="email-me-title-box"
        sx={{
          filter: state === 'submitting' ? 'blur(10px)' : null,
          width: '100%',
          height: '100%',
        }}
      >
        <Tabs
          variant="fullWidth"
          aria-label="contact-tabs"
          component={'nav'}
          key={'contact-tabs'}
          value={tab}
          onChange={(_e, tab) => setTab(tab)}
          TabIndicatorProps={{
            sx: {
              borderBottom: `4px solid ${Theme.palette.secondary.dark}`,
            },
          }}
        >
          <Tab
            key={'google-calendar-appointment'}
            id="google-calendar-appointment"
            label={
              <TabLabel
                mainVariant="h3"
                mainText="Google Calendar Appointment"
                mainSx={{ fontSize: '2.2rem', color: Theme.palette.primary.dark }}
                subVariant="caption"
                subText="Set time to meet through Google Meet"
                subSx={{ fontSize: '1.25rem', color: Theme.palette.text.primary }}
              />
            }
          />
          <Tab
            key={'send-direct-message'}
            id="send-direct-message"
            label={
              <TabLabel
                mainVariant="h3"
                mainText="Send Direct Message"
                mainSx={{ fontSize: '2.2rem', color: Theme.palette.primary.dark }}
                subVariant="caption"
                subText="Send Email / Context for Google Meet"
                subSx={{ fontSize: '1.25rem', color: Theme.palette.text.primary }}
              />
            }
          />
        </Tabs>

        {tab === 1 && <EmaiForm formik={formik} />}

        <DialogActions key={'email-me-button-box'} id="email-me-button-box" sx={{ paddingX: 4 }}>
          <Button type="reset" id="reset-email-me-button" onReset={formik.handleReset} sx={{ fontSize: '1.5rem' }}>
            Reset
          </Button>
          <Button type="button" id="close-email-me-button" onClick={() => setOpen(false)} sx={{ fontSize: '1.5rem' }}>
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmailDialog;

/**
 const baseURL = import.meta.env.VITE_PORTFOLIO_API_URL;
 *
 * @param code
 * @param setTokens
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

*/
interface TabLabelProps {
  mainVariant: Variant;
  subVariant: Variant;
  mainText: string;
  subText: string;
  mainSx?: SxProps;
  subSx?: SxProps;
}

const TabLabel = ({ mainVariant, mainText, mainSx, subVariant, subText, subSx }: TabLabelProps) => (
  <Box>
    <Text titleVariant={mainVariant} titleText={mainText} sx={mainSx} />
    <Text titleVariant={subVariant} titleText={subText} sx={subSx} />
  </Box>
);

/**
 *
 * Google Login button
                <br />
                <Button
                  LinkComponent={'button'}
                  key={'google-auth-button'}
                  id="google-auth-button"
                  type="button"
                  onClick={() => login()}
                  sx={{ fontSize: '1.5rem' }}
                >
                  Google Login
                </Button>
 */
