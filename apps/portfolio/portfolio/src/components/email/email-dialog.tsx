import { TabLabel, Waiting } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { type SxProps } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { type Dispatch, lazy, type SetStateAction, Suspense, useState } from 'react';
import Theme from '../../styles/theme';
import GoogleUserContextProvider from '../../contexts/contact-context';

const EmailForm = lazy(() => import('./email-form/email-form'));
const GoogleCalendar = lazy(() => import('./google-calendar/google-calendar'));

const subSx: SxProps = { fontSize: '1.25rem', color: Theme.palette.text.primary };
const mainSx: SxProps = { fontSize: '2.2rem', color: Theme.palette.primary.dark };

interface EmailDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EmailDialog = ({ open, setOpen }: EmailDialogProps) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <GoogleUserContextProvider>
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
            width: 'fit-content',
            height: '90%',
          },
        }}
      >
        <Box
          component={'section'}
          id="email-me-title-box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
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
            sx={{ height: 'fit-content' }}
          >
            <Tab
              key={'google-calendar-appointment'}
              id="google-calendar-appointment"
              label={
                <TabLabel
                  mainVariant="h3"
                  mainText="Appointment Request"
                  mainSx={mainSx}
                  subVariant="caption"
                  subText="Sync with your Google Calendar"
                  subSx={subSx}
                />
              }
            />
            <Tab
              key={'send-direct-message'}
              id="send-direct-message"
              label={
                <TabLabel
                  mainVariant="h3"
                  mainText="Email Me"
                  mainSx={mainSx}
                  subVariant="caption"
                  subText="Send Email / Include appointment details"
                  subSx={subSx}
                />
              }
            />
          </Tabs>
          <Box
            component={'section'}
            key={'calendar-and-email-section'}
            id="calendar-and-email-section"
            sx={{ flex: 4, display: 'flex', flexDirection: 'column' }}
          >
            <Suspense fallback={<Waiting />}>
              {tab === 0 && <GoogleCalendar />}
              {tab === 1 && <EmailForm />}
            </Suspense>
          </Box>
          <DialogActions
            key={'email-me-button-box'}
            id="email-me-button-box"
            sx={{ paddingX: 4, height: 'fit-content' }}
          >
            <Button type="button" id="close-email-me-button" onClick={() => setOpen(false)} sx={{ fontSize: '2rem' }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </GoogleUserContextProvider>
  );
};

export default EmailDialog;
