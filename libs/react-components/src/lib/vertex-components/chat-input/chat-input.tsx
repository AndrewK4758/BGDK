// import styles from './chat-input.module.css';
import { Box, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import { FormActionProps } from '../../../interfaces/form-action-props.tsx';
import TextInput from '../../games-ui/text-input/formik-text-input.tsx';
import * as Yup from 'yup';


interface ChatInputProps extends FormActionProps {
  breakpointsChatInputButton?: SxProps;
  breakpointsChatInputText?: SxProps;
  breakpointsChatInputLabel?: SxProps;
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
    <Box>
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
        <Form method={method}>
          <TextInput
            autoComplete="off"
            label="Prompt Input"
            labelComponent={'h2'}
            placeholder="Enter prompt here"
            type={type}
            name={name}
            id="promptInput"
            textSx={breakpointsChatInputText}
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
