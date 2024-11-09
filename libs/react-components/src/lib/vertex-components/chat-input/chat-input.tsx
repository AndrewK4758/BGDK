// import styles from './chat-input.module.css';
import { Box, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import { FormActionProps } from '../../../interfaces/form-action-props';
import FormikTextInput from '../../games-ui/text-input/formik-text-input';

interface ChatInputProps extends FormActionProps {
  breakpointsChatInputButton?: SxProps;
  breakpointsChatInputText?: SxProps;
  breakpointsChatInputLabel?: SxProps;
  labelText: string;
}

const chatInitialValues = {
  promptInput: '',
};

const validationSchema = Yup.object({
  promptInput: Yup.string()
    .min(2, 'Must be a valid question or statement')
    .max(255, 'Must be less than 255 characters'),
});

export function ChatInput({
  method,
  action,
  name,
  labelText,
  type,
  variant,
  buttonText,
  buttonType,
  breakpointsChatInputText,
  breakpointsChatInputLabel,
  breakpointsChatInputButton,
}: ChatInputProps) {
  const submit = useSubmit();
  return (
    <Box component={'div'} key={`${name}-gen-ai-text-input`} id={`${name}-gen-ai-text-input`} sx={{}}>
      <Formik
        initialValues={chatInitialValues}
        validationSchema={validationSchema}
        onSubmit={values =>
          submit(values, {
            encType: 'application/json',
            method: `${method}`,
            action: `${action}`,
            replace: true,
          })
        }
      >
        <Form method={method} action={`${action}`}>
          <FormikTextInput
            autoComplete="off"
            placeholder="Enter prompt here"
            type={type}
            name={name}
            id="promptInput"
            textSx={breakpointsChatInputText}
            label={labelText}
            labelComponent={'h2'}
            labelSx={breakpointsChatInputLabel}
          />
          <br />
          <Button variant={variant} type={buttonType} sx={breakpointsChatInputButton} title="Ask Astro">
            {buttonText}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

export default ChatInput;
