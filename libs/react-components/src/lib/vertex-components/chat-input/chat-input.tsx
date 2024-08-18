// import styles from './chat-input.module.css';
import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { useSubmit } from 'react-router-dom';
import { FormActionProps } from '../../../interfaces/form-action-props';
import TextInput from '../../games-ui/text-input/formik-text-input';
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
    <Formik
      initialValues={chatInitialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        submit(values, {
          encType: 'application/json',
          method: 'post',
          action: '/?index',
          replace: true,
        });
      }}
    >
      <Form method={method} action={action}>
        <TextInput
          autoComplete="off"
          label="Prompt Input"
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
  );
}

export default ChatInput;
