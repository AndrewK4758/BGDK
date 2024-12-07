import { FormikValidationError, helperTextSx } from '@bgdk/shared-react-components';
import { DialogActions } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useContext, useRef, type Dispatch, type SetStateAction } from 'react';
import { Form, useSubmit, type SubmitFunction } from 'react-router-dom';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { GoogleUserContext, GoogleUserContextProps } from '../../../contexts/contact-context';
import { dialogActionsStyles, textFieldSlotProps } from '../../../styles/header-styles';
import { flexColumnStyles } from '../../../styles/prompt-builder-styles';
import Theme from '../../../styles/theme';
import AppointmentMaker from '../appointment-maker/appointment-maker';

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

interface EmaiFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EmaiForm = ({ setOpen }: EmaiFormProps) => {
  const submit = useSubmit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { GoogleUserContextValues } = useContext<GoogleUserContextProps>(GoogleUserContext);

  const handleFileSubmit = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmitMessage(values, submit, setOpen),
  });

  return (
    <Form
      id="email-me-form"
      data-testid="email-me-form"
      action="/"
      method="post"
      encType="multipart/form-data"
      onSubmit={formik.handleSubmit}
    >
      <Container
        component={'section'}
        key={'inputs-container'}
        id="inputs-container"
        data-testid="inputs-container"
        sx={flexColumnStyles}
      >
        <Stack
          component={'section'}
          id="email-me-inputs-stack"
          data-testid="email-me-inputs-stack"
          sx={{ flex: '1 0 100%', justifyContent: 'space-between', gap: 4, paddingTop: 4 }}
        >
          <Box component={'span'} key={'name-wrapper'} id="name-wrapper" data-testid="name-wrapper">
            <TextField
              fullWidth
              autoComplete="on"
              focused
              defaultValue={GoogleUserContextValues ? GoogleUserContextValues.name : ''}
              type="text"
              id="name"
              data-testid="name"
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
          <Box component={'span'} key={'email-wrapper'} id="email-wrapper" data-testid="email-wrapper">
            <TextField
              fullWidth
              autoComplete="on"
              type="text"
              id="email"
              data-testid="email"
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
          <Box component={'span'} key={'phone-wrapper'} id="phone-wrapper" data-testid="phone-wrapper">
            <TextField
              fullWidth
              autoComplete="on"
              type="number"
              id="phone"
              data-testid="phone"
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
          <Box component={'span'} key={'subject-wrapper'} id="subject-wrapper" data-testid="subject-wrapper">
            <TextField
              fullWidth
              type="text"
              id="subject"
              data-testid="subject"
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
          <Box component={'span'} key={'body-wrapper'} id="body-wrapper" data-testid="body-wrapper" p={0}>
            <TextField
              fullWidth
              multiline
              type="text"
              id="body"
              data-testid="body"
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
          <Box
            component={'span'}
            key={'appointment-maker-wrapper'}
            id="appointment-maker-wrapper"
            data-testid="appointment-maker-wrapper"
          >
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
            data-testid="attachment-wrapper"
            sx={flexColumnStyles}
          >
            <input
              ref={fileInputRef}
              accept="*/*"
              id="attchment"
              data-testid="attchment"
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

          <DialogActions sx={dialogActionsStyles}>
            <Button id="upload-file-button" data-testid="upload-file-button" onClick={handleFileSubmit}>
              Upload File
            </Button>
            <Button type="submit" id="submit-email-me-button" data-testid="submit-email-me-button">
              Submit
            </Button>
            <Button
              type="reset"
              id="reset-email-me-button"
              data-testid="reset-email-me-button"
              onReset={formik.handleReset}
            >
              Reset
            </Button>
          </DialogActions>
        </Stack>
      </Container>
    </Form>
  );
};

export default EmaiForm;

const handleSubmitMessage = async (
  values: MessageMeFormValues,
  submit: SubmitFunction,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const { name, email, phone, subject, body, date, attachment } = values;

    const form = new FormData();

    form.append('name', name);
    form.append('email', email);
    form.append('phone', phone);
    form.append('subject', subject);
    form.append('body', body);
    form.append('date', date);
    if (attachment) form.append('attachment', attachment);

    await submit(form, { action: '/', method: 'post', encType: 'multipart/form-data' });
  } catch (error) {
    console.error(error);
  } finally {
    setOpen(false);
  }
};
