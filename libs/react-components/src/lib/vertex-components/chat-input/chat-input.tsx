// import styles from './chat-input.module.css';
import { Box, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import type { Socket } from 'socket.io-client';
import * as Yup from 'yup';
import { FormActionProps } from '../../../interfaces/form-action-props';
import FormikTextInput from '../../games-ui/text-input/formik-text-input';
import type { PromptRequest } from '@bgdk/vertex-ai';

interface ChatInputProps<T extends Yup.AnyObject> extends FormActionProps {
  breakpointsChatInputButton: SxProps;
  breakpointsChatInputText: SxProps;
  breakpointsChatInputLabel: SxProps;
  labelText: string;
  breakpointsWrapperBoxSx: SxProps;
  socket: Socket;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
}

export const ChatInput = <T extends Yup.AnyObject>({
  method,
  action,
  names,
  labelText,
  type,
  variant,
  buttonText,
  buttonType,
  socket,
  initialValues,
  validationSchema,
  breakpointsChatInputText,
  breakpointsChatInputLabel,
  breakpointsChatInputButton,
  breakpointsWrapperBoxSx,
}: ChatInputProps<T>) => {
  return (
    <Box
      component={'div'}
      key={`gen-ai-text-input-wrapper`}
      id={`gen-ai-text-input-wrapper`}
      sx={breakpointsWrapperBoxSx}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ prompt }, { resetForm }) => {
          console.log(prompt);
          const promptRequest: PromptRequest = {
            text: prompt,
            fileData: null,
          };
          socket.emit('prompt', promptRequest);
          resetForm();
        }}
      >
        <Form
          key={'chat-input-form'}
          id="chat-input-form"
          method={method}
          action={`${action}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <Box key={'chat-input-form-text-box'} id="chat-input-form-text-box" sx={{ flex: '0 1 100%' }}>
            <FormikTextInput
              autoComplete="off"
              placeholder="Enter prompt here"
              type={type}
              name={names[0]}
              key={'chat-input-form-text-input'}
              id="chat-input-form-text-input"
              textSx={breakpointsChatInputText}
              label={labelText}
              labelComponent={'h2'}
              labelSx={breakpointsChatInputLabel}
            />
          </Box>
          <Box
            key={'chat-input-form-button-box'}
            id={'chat-input-form-button-box'}
            component={'section'}
            sx={{ flex: '1 0 100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              key={'chat-input-form-button'}
              id="chat-input-form-button"
              variant={variant}
              type={buttonType}
              sx={breakpointsChatInputButton}
              title={buttonText}
            >
              {buttonText}
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default ChatInput;
