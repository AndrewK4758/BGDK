import { FormikValidationError } from '@bgdk/shared-react-components';
import { DialogActions } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useContext, useRef } from 'react';
import { Form, useSubmit, type SubmitFunction } from 'react-router-dom';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { GoogleUserContext, GoogleUserContextProps } from '../../../contexts/contact-context';
import Theme from '../../../styles/theme';
import { helperTextSx } from '@bgdk/shared-react-components';
import AppointmentMaker from '../appointment-maker/appointment-maker';

const textFieldSlotProps = {
  inputLabel: { sx: { fontSize: '1.5rem', color: Theme.palette.primary.dark } as SxProps },
  htmlInput: {
    sx: {
      fontSize: '1.5rem',
      paddingTop: 2,
      backgroundColor: Theme.palette.background.default,
      color: Theme.palette.background.paper,
    } as SxProps,
  },
  input: {
    inputProps: {
      sx: {
        borderRadius: 1,
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.background.default,
      },
    },
  },
};

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

const EmaiForm = () => {
  const submit = useSubmit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { GoogleUserContextValues } = useContext<GoogleUserContextProps>(GoogleUserContext);

  const handleFileSubmit = () => {
    fileInputRef.current?.click();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmitMessage(values, submit),
  });

  return (
    <Form
      action="/"
      method="post"
      encType="multipart/form-data"
      onSubmit={formik.handleSubmit}
      style={{ height: '100%' }}
    >
      <Container component={'section'} key={'inputs-container'} id="inputs-container" sx={{ height: '100%' }}>
        <Stack
          component={'section'}
          id="email-me-inputs-stack"
          sx={{ height: '100%', justifyContent: 'space-evenly', gap: 4, paddingTop: 4 }}
        >
          <Box component={'span'} key={'name-wrapper'} id="name-wrapper">
            <TextField
              fullWidth
              autoComplete="on"
              focused
              defaultValue={GoogleUserContextValues ? GoogleUserContextValues.name : ''}
              type="text"
              id="name"
              name="name"
              label="Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              slotProps={textFieldSlotProps}
            />

            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="name"
              helperTextSx={helperTextSx}
            />
          </Box>
          <Box component={'span'} key={'email-wrapper'} id="email-wrapper">
            <TextField
              fullWidth
              autoComplete="on"
              type="text"
              id="email"
              name="email"
              label="Email"
              defaultValue={GoogleUserContextValues ? GoogleUserContextValues.email : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              slotProps={textFieldSlotProps}
            />

            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="email"
              helperTextSx={helperTextSx}
            />
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
            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="phone"
              helperTextSx={helperTextSx}
            />
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

            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="subject"
              helperTextSx={helperTextSx}
            />
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
                    borderRadius: 1,
                    padding: 2,
                    paddingTop: 3,
                    fontSize: '1.5rem',
                    backgroundColor: Theme.palette.background.default,
                  },
                },
              }}
            />

            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="body"
              helperTextSx={helperTextSx}
            />
          </Box>
          <Box component={'span'} key={'appointment-maker-wrapper'} id="appointment-maker-wrapper">
            <AppointmentMaker formik={formik} />
            <FormikValidationError<MessageMeFormValues>
              formik={formik}
              elementName="date"
              helperTextSx={helperTextSx}
            />
          </Box>
          <Box
            component={'span'}
            key={'attachment-wrapper'}
            id="attachment-wrapper"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
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
              <Box component={'span'} sx={{ fontSize: '1rem', alignSelf: 'center', textAlign: 'center' }}>
                {(formik.values.attachment as File).name}
              </Box>
            ) : null}
          </Box>

          <DialogActions
            sx={{
              flex: '0 1 45%',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Button id="upload-file-button" sx={{ fontSize: '2rem' }} onClick={handleFileSubmit}>
              Upload File
            </Button>
            <Button type="submit" id="submit-email-me-button" sx={{ fontSize: '2rem' }}>
              Submit
            </Button>
            <Button type="reset" id="reset-email-me-button" onReset={formik.handleReset} sx={{ fontSize: '2rem' }}>
              Reset
            </Button>
          </DialogActions>
        </Stack>
      </Container>
    </Form>
  );
};

export default EmaiForm;

const handleSubmitMessage = (values: MessageMeFormValues, submit: SubmitFunction) => {
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
