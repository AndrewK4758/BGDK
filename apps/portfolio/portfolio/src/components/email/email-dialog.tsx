import { type SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';
import { Form, type SubmitFunction, useActionData, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import 'yup-phone-lite';
import Theme from '../../styles/theme';
import AppointmentMaker from '../date-picker/date-picker';
import FormikValidationError from './formik-validation-error';

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
  date: '',
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

const textFieldSlotProps = {
  inputLabel: { sx: { fontSize: '1.5rem', color: Theme.palette.primary.dark } as SxProps },
  htmlInput: {
    sx: {
      borderRadius: 2,
      fontSize: '1.5rem',
      paddingTop: 2,
      backgroundColor: Theme.palette.background.default,
      color: Theme.palette.background.paper,
    } as SxProps,
  },
  input: {
    inputProps: {
      style: {
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.background.default,
      },
    },
  },
};

interface EmailDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const handleSubmitMessageMe = (values: MessageMeFormValues, submit: SubmitFunction) => {
  console.log(values);
  const { name, email, phone, subject, body, date, attachment } = values;

  const form = new FormData();

  form.append('name', name);
  form.append('email', email);
  form.append('phone', phone);
  form.append('subject', subject);
  form.append('body', body);
  form.append('date', date);
  if (attachment) form.append('attachment', attachment);

  submit(form, { action: '/', method: 'post', encType: 'multipart/form-data' });
};

const EmailDialog = ({ open, setOpen }: EmailDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const action = useActionData() as { message: string };
  const submit = useSubmit();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      handleSubmitMessageMe(values, submit);
    },
  });

  const handleFileSubmit = () => {
    fileInputRef.current?.click();
  };
  /*TRIAL COMMPONENT*/
  useEffect(() => {
    if (action) setTimeout(() => setOpen(false), 2500);
  }, [action, setOpen]);
  /*TRIAL COMMPONENT*/

  return (
    <Dialog
      open={open}
      id="email-dialog"
      fullWidth
      scroll="body"
      PaperProps={{ sx: { borderRadius: 5, maxWidth: '40%' } }}
    >
      {/*TRIAL COMMPONENT*/}
      {action && (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignContent={'center'}>
          <Box sx={{ fontSize: '5rem', textAlign: 'center' }}>{`\u{1F44D}`}</Box>
          <Box sx={{ fontSize: '3rem', textAlign: 'center' }}>{` Got it, Thanks!! `}</Box>
          <Box sx={{ fontSize: '5rem', textAlign: 'center' }}>{`\u{1F44D}`}</Box>
        </Box>
      )}
      {/*TRIAL COMMPONENT*/}
      <Box component={'section'} id="email-me-title-box" sx={{ filter: action ? 'blur(10px)' : null }}>
        <DialogTitle id="email-me-title" gutterBottom={false} variant="h1" sx={{ paddingY: '0' }}>
          Reach Out
        </DialogTitle>
        <DialogTitle id="email-me-subtitle" variant="h4" align="right" sx={{ paddingY: '0' }}>
          I look forward to hearing from you
        </DialogTitle>

        <Form action="/" method="post" encType="multipart/form-data" onSubmit={formik.handleSubmit}>
          <Container component={'section'} key={'inputs-container'} id="inputs-container">
            <Stack component={'section'} id="email-me-inputs-stack" gap={1.5}>
              <Box component={'span'} key={'name-wrapper'} id="name-wrapper">
                <TextField
                  fullWidth
                  autoComplete="on"
                  focused
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  slotProps={textFieldSlotProps}
                />

                <FormikValidationError formik={formik} elementName="name" />
              </Box>
              <Box component={'span'} key={'email-wrapper'} id="email-wrapper">
                <TextField
                  fullWidth
                  autoComplete="on"
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  slotProps={textFieldSlotProps}
                />

                <FormikValidationError formik={formik} elementName="email" />
              </Box>
              <Box component={'span'} key={'phone-wrapper'} id="phone-wrapper">
                <TextField
                  fullWidth
                  autoComplete="on"
                  type="number"
                  id="phone"
                  name="phone"
                  label="Phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  slotProps={textFieldSlotProps}
                />
                <FormikValidationError formik={formik} elementName="phone" />
              </Box>
              <Box component={'span'} key={'subject-wrapper'} id="subject-wrapper">
                <TextField
                  fullWidth
                  type="text"
                  id="subject"
                  name="subject"
                  label="Subject"
                  defaultValue={'I saw your website and wanted to reach out...'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  slotProps={textFieldSlotProps}
                />

                <FormikValidationError formik={formik} elementName="subject" />
              </Box>
              <Box component={'span'} key={'body-wrapper'} id="body-wrapper" p={0}>
                <TextField
                  fullWidth
                  multiline
                  type="text"
                  id="body"
                  name="body"
                  maxRows={4}
                  minRows={4}
                  label="Body"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    inputLabel: { sx: { fontSize: '1.5rem', color: Theme.palette.primary.dark } },
                    input: { sx: { p: 0 } },
                    htmlInput: {
                      sx: {
                        padding: 2,
                        paddingTop: 3,
                        fontSize: '1.5rem',
                        borderRadius: 2,
                        backgroundColor: Theme.palette.background.default,
                        color: Theme.palette.background.paper,
                      },
                    },
                  }}
                />

                <FormikValidationError formik={formik} elementName="body" />
              </Box>
              <Box component={'span'} key={'appointment-maker-wrapper'} id="appointment-maker-wrapper">
                <AppointmentMaker formik={formik} />
                <FormikValidationError formik={formik} elementName="date" />
              </Box>
              <Box component={'span'} key={'attachment-wrapper'} id="attachment-wrapper">
                <Button
                  id="upload-file-button"
                  sx={{ fontSize: '1.5rem', width: '35%', alignSelf: 'left' }}
                  onClick={handleFileSubmit}
                >
                  Upload File
                </Button>
                <input
                  ref={fileInputRef}
                  accept="*/*"
                  id="attchment"
                  name="attchment"
                  type="file"
                  style={{ display: 'none' }}
                  onBlur={formik.handleBlur}
                  onChange={async e => {
                    if (e.target.files) await formik.setFieldValue('attachment', e.target.files[0], false);
                  }}
                />
                {formik.values.attachment ? (
                  <Box component={'span'} sx={{ fontSize: '1.5rem' }}>
                    {(formik.values.attachment as File).name}
                  </Box>
                ) : null}
              </Box>
            </Stack>
          </Container>
          <DialogActions key={'email-me-button-box'} id="email-me-button-box">
            <Button type="submit" id="submit-email-me-button" sx={{ fontSize: '1.5rem' }}>
              Submit
            </Button>
            <Button type="reset" id="reset-email-me-button" onReset={formik.handleReset} sx={{ fontSize: '1.5rem' }}>
              Reset
            </Button>
            <Button type="button" id="close-email-me-button" onClick={() => setOpen(false)} sx={{ fontSize: '1.5rem' }}>
              Close
            </Button>
          </DialogActions>
        </Form>
      </Box>
    </Dialog>
  );
};

export default EmailDialog;