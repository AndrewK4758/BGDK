import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import FormikValidationError from '../formik-validation-error';
import AppointmentMaker from '../appointment-maker/appointment-maker';
import Button from '@mui/material/Button';
import type { FormikProps } from 'formik';
import type { MessageMeFormValues } from '../email-dialog';
import type { SxProps } from '@mui/material/styles';
import Theme from '../../../styles/theme';
import { useRef } from 'react';
import axios from 'axios';

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

interface EmaiFormProps {
  formik: FormikProps<MessageMeFormValues>;
}

const EmaiForm = ({ formik }: EmaiFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSubmit = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
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
                      borderRadius: 1,
                      padding: 2,
                      paddingTop: 3,
                      fontSize: '1.5rem',
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
        <Button type="submit" id="submit-email-me-button" sx={{ fontSize: '1.5rem' }}>
          Submit
        </Button>
        <Button
          type="button"
          onClick={async () => {
            try {
              const resp = await axios.get(`${baseURL}/auth`);
              console.log(resp);
              window.open(resp.data);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          AUTH
        </Button>
      </Form>
    </Box>
  );
};
const baseURL = import.meta.env.VITE_PORTFOLIO_API_URL;
export default EmaiForm;
