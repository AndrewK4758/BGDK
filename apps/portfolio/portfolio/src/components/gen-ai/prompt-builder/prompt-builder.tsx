import { IPromptInputData, ResponseType } from '@bgdk/prompt-builder';
import { Text } from '@bgdk/react-components';
import {
  FormikValidationError,
  Label,
  labelSx,
  textInputSx,
  tooltipSx,
  helperTextSx,
} from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik, type FormikProps } from 'formik';
import { useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import { Form, useActionData, useSubmit, type SubmitFunction } from 'react-router-dom';
import * as Yup from 'yup';
import '../../../styles/prompt-builder.css';
import Theme from '../../../styles/theme';
import JsonIcon from '../../icons/json-icon';
import TextIcon from '../../icons/text-icon';
import {
  constraints,
  examples,
  instructions,
  objective,
  responseInstructions,
  textData,
  tone,
} from '../static/definitions';
import PromptBuilderResponse from './prompt-builder-response';
import axios from 'axios';

const FILE_SIZE = 1024 * 1024 * 5;
/**
 * THESE ARE VALUES THAT I FOUND FROM LOOKING AT THE TYPE PROPERTY AS I UPLOADED THEM TO MY LOCAL MACHINE.
 * I AM NOT SURE THEY WILL WORK FOR TYPESCRIPT AND OTHER FILE TYPES OUTSIDE OF MY LOCAL DEV SETTING.
 */
const SUPPORTED_FORMATS = [
  'application/json',
  'text/csv',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/xml',
  'text/javascript',
  'application/pdf',
  'application/python',
  'application/javascript',
  'text/vnd.trolltech.linguist', //typescript
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'audio/webm',
  'audio/ogg',
  'audio/mpeg',
  'audio/wav',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'application/pdf',
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'image/png',
  'image/jpeg',
  'image/webp',
  'text/plain',
  'video/mov',
  'video/mpeg',
  'video/mp4',
  'video/mpg',
  'video/avi',
  'video/wmv',
  'video/mpegps',
  'video/flv',
];

const promptBuilderHeaderText = `This is designed to helperTextSxp you structure & format your idea to increase the probability of receiving the best possible response from your query. Using all of the available fields will give you a more desireable response, but not all are required. Hover over the category label text for a more detailed explaination of the category.All uploaded files will be converted into a text format.`;

const isFile = (valueToTest: unknown) => valueToTest instanceof File;

const initialValues: IPromptInputData = {
  objective: '',
  instructions: '',
  textData: '',
  examples: '',
  constraints: '',
  tone: '',
  responseFormat: ResponseType.TEXT,
  responseInstructions: '',
  file: null,
};

const validationSchema = Yup.object({
  objective: Yup.string().required('Must have valid objective statement'),
  instructions: Yup.string(),
  textData: Yup.string(),
  examples: Yup.string(),
  constraints: Yup.string(),
  tone: Yup.string(),
  resposeFormat: Yup.string().oneOf(Object.values(ResponseType)),
  responseInstructions: Yup.string(),
  file: Yup.mixed()
    .notRequired()
    .test('fileSize', 'File too large, must be less than 5MB', value => {
      if (isFile(value)) return value.size < FILE_SIZE;
      else return true;
    })
    .test(
      'fileFormat',
      'Unsupported File Format. Supported formats are: '.concat(
        ...SUPPORTED_FORMATS.map(e => e.split('/')[1]).join(', .'),
      ),
      value => {
        if (isFile(value)) return SUPPORTED_FORMATS.includes(value.type);
        else if (value === null || value === undefined) return true;
        else return false;
      },
    ),
});

interface PromptBuilderProps {
  setPrompt: Dispatch<SetStateAction<string>>;
}

const PromptBuilder = ({ setPrompt }: PromptBuilderProps) => {
  const [openPromptResponse, setOpenPromptResponse] = useState<boolean>(false);
  const submit = useSubmit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const action = useActionData() as string;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmitMessage(values, submit),
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleFileSubmit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box component={'div'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={{ width: '100%' }}>
      <Paper key={'prompt-builder-paper'} id="prompt-builder-paper" sx={{ height: 'fit-content', minHeight: '30vh' }}>
        <Container
          component={'section'}
          key={'prompt-builder'}
          id="prompt-builder"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Box component={'section'} key={'prompt-builder-header-box'} id="prompt-builder-header-box" sx={{ gap: 4 }}>
            <Text
              titleVariant="h2"
              titleText={'Prompt Builder'}
              sx={{ width: '100%', textAlign: 'center', color: Theme.palette.secondary.light }}
            />
            <Text titleVariant="body1" titleText={promptBuilderHeaderText} />
          </Box>
          <Form key={'prompt-builder-form'} method="post" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Box
              component={'section'}
              key={'prompt-builder-input-elements-box'}
              id="prompt-builder-input-elements-box"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Box component={'section'} key={'prompt-builder-objective-box'} id="prompt-builder-objective-box">
                <Label
                  placement="top"
                  tooltipTitle={objective}
                  labelText="Objective"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-objective'}
                  id="prompt-builder-objective"
                  multiline={true}
                  focused={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="What you want the AI todo"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'objective'}
                  sx={textInputSx}
                  value={formik.values.objective}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="objective"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box component={'section'} key={'prompt-builder-instructions-box'} id="prompt-builder-instructions-box">
                <Label
                  placement="top"
                  tooltipTitle={instructions}
                  labelText="Instructions"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-instructions'}
                  id="prompt-builder-instructions"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="How you want the AI to execute the objective"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'instructions'}
                  sx={textInputSx}
                  value={formik.values.instructions}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="instructions"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box component={'section'} key={'prompt-builder-text-data-box'} id="prompt-builder-text-data-box">
                <Label
                  placement="top"
                  tooltipTitle={textData}
                  labelText="Text Data"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-text-data'}
                  id="prompt-builder-text-data"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="Copy & Paste any simple text for context or processing"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'textData'}
                  sx={textInputSx}
                  value={formik.values.textData}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="textData"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box component={'section'} key={'prompt-builder-examples-box'} id="prompt-builder-examples-box">
                <Label
                  placement="top"
                  tooltipTitle={examples}
                  labelText="Examples"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-examples'}
                  id="prompt-builder-examples"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="Show AI Example of your desired outcome"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'examples'}
                  sx={textInputSx}
                  value={formik.values.examples}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="examples"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box component={'section'} key={'prompt-builder-constraints-box'} id="prompt-builder-constraints-box">
                <Label
                  placement="top"
                  tooltipTitle={constraints}
                  labelText="Constraints"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-constraints'}
                  id="prompt-builder-constraints"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="Limits you want AI to adhere to"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'constraints'}
                  sx={textInputSx}
                  value={formik.values.constraints}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="constraints"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box component={'section'} key={'prompt-builder-tone-box'} id="prompt-builder-tone-box">
                <Label
                  placement="top"
                  tooltipTitle={tone}
                  labelText="Tone"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-tone'}
                  id="prompt-builder-tone"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="The style, voice, mood, feeling you want the AI to convey"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'tone'}
                  sx={textInputSx}
                  value={formik.values.tone}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="tone"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-response-instructions-box'}
                id="prompt-builder-response-instructions-box"
              >
                <Label
                  placement="top"
                  tooltipTitle={responseInstructions}
                  labelText="Response Instructions"
                  labelVariant="h3"
                  sx={labelSx}
                  tooltipSx={tooltipSx}
                />
                <TextField
                  component={'span'}
                  key={'prompt-builder-response-instructions'}
                  id="prompt-builder-response-instructions"
                  multiline={true}
                  fullWidth={true}
                  rows={2}
                  placeholder="The how AI will respond"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onReset={formik.handleReset}
                  name={'responseInstructions'}
                  sx={textInputSx}
                  value={formik.values.responseInstructions}
                />
                <FormikValidationError<IPromptInputData>
                  elementName="responseIsnstructions"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-response-format-box'}
                id="prompt-builder-response-format-box"
                sx={{}}
              >
                <Label
                  tooltipTitle=""
                  tooltipSx={{}}
                  labelVariant="h4"
                  sx={{ color: Theme.palette.primary.main }}
                  labelText="Response Format"
                  placement="top"
                />
                <Box
                  component={'section'}
                  key={'prompt-builder-response-format-radio-box'}
                  id="prompt-builder-response-format-radio-box"
                  sx={{
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                >
                  <RadioGroup
                    key={'prompt-builder-response-format'}
                    id="prompt-builder-response-format"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onReset={formik.handleReset}
                    value={formik.values.responseFormat}
                    name={'responseFormat'}
                    color="primary"
                    sx={{
                      fontSize: '1.5rem',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                      paddingLeft: 2,
                    }}
                  >
                    <FormControlLabel
                      value={ResponseType.TEXT}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                          <Typography variant="h4">Text</Typography>
                          <TextIcon />
                        </Box>
                      }
                      sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                    />

                    <FormControlLabel
                      value={ResponseType.JSON}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                          <Typography variant="h4">JSON</Typography>
                          <JsonIcon />
                        </Box>
                      }
                      sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                    />
                  </RadioGroup>
                  <FormikValidationError<IPromptInputData>
                    elementName="responseFormat"
                    formik={formik}
                    helperTextSx={helperTextSx}
                  />
                </Box>
              </Box>
              <Box
                component={'span'}
                key={'prompt-builder-document-wrapper'}
                id="prompt-builder-document-wrapper"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <input
                  ref={fileInputRef}
                  accept={`${SUPPORTED_FORMATS.toString()}`}
                  id="file"
                  name="file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={() => handleFileUpload(fileInputRef, formik)}
                  onBlur={formik.handleBlur}
                  onReset={formik.handleReset}
                />
                {formik.values.document ? (
                  <Box component={'span'}>
                    <Text
                      titleVariant="body1"
                      titleText={`Uploaded File: ${(formik.values.document as File).name}`}
                      sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                    />
                  </Box>
                ) : null}
                <FormikValidationError<IPromptInputData>
                  elementName="document"
                  formik={formik}
                  helperTextSx={helperTextSx}
                />
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-submit-box'}
                id="prompt-builder-submit-box"
                sx={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                {!action && (
                  <Button
                    variant="text"
                    type="button"
                    key={'prompt-builder-upload-file-button'}
                    id="prompt-builder-upload-file-button"
                    sx={{ fontSize: '2rem' }}
                    onClick={handleFileSubmit}
                  >
                    Upload File
                  </Button>
                )}
                <Button
                  variant="text"
                  type="submit"
                  key={'prompt-builder-submit-button'}
                  id="prompt-builder-submit-button"
                  sx={{ fontSize: '2rem' }}
                >
                  Build Prompt
                </Button>
                <Button
                  variant="text"
                  type="reset"
                  key={'prompt-builder-reset-button'}
                  id="prompt-builder-reset-button"
                  onReset={formik.handleReset}
                  sx={{ fontSize: '2rem' }}
                >
                  Clear Values
                </Button>
                {action && (
                  <Button
                    variant="text"
                    type="button"
                    key={'copy-and-add-to-input'}
                    id="copy-and-add-to-input"
                    onClick={() => handleCopyPromptToClipboardAndAddToInput(action, setPrompt, setOpenPromptResponse)}
                    sx={{ fontSize: '2rem' }}
                  >
                    Copy & Add to Input
                  </Button>
                )}
                {action && (
                  <Button
                    variant="text"
                    key={'open-prompt'}
                    id="open-prompt"
                    type="button"
                    sx={{ fontSize: '2rem' }}
                    onClick={() => setOpenPromptResponse(!openPromptResponse)}
                  >
                    {!openPromptResponse ? 'Open Prompt' : 'Close Prompt'}
                  </Button>
                )}
              </Box>
            </Box>
          </Form>
        </Container>
        {openPromptResponse && (
          <Container sx={{ width: '100%', height: '100%' }}>
            <PromptBuilderResponse prompt={action} />
          </Container>
        )}
      </Paper>
    </Box>
  );
};

export default PromptBuilder;

const handleSubmitMessage = (values: IPromptInputData, submit: SubmitFunction) => {
  const {
    objective,
    instructions,
    document,
    textData,
    examples,
    constraints,
    tone,
    responseFormat,
    responseInstructions,
  } = values;

  const formDataToSend = new FormData();

  formDataToSend.set('objective', objective);
  formDataToSend.set('responseFormat', responseFormat);

  if (instructions) formDataToSend.set('instructions', instructions);
  if (document) formDataToSend.set('document', document);
  if (textData) formDataToSend.set('textData', textData);
  if (examples) formDataToSend.set('examples', examples);
  if (constraints) formDataToSend.set('constraints', constraints);
  if (tone) formDataToSend.set('tone', tone);
  if (responseInstructions) formDataToSend.set('responseInstructions', responseInstructions);

  submit(formDataToSend, { method: 'post', encType: 'multipart/form-data' });
};

const handleCopyPromptToClipboardAndAddToInput = async (
  prompt: string,
  setPrompt: Dispatch<SetStateAction<string>>,
  setOpenPromptResponse: Dispatch<SetStateAction<boolean>>,
) => {
  setPrompt(prompt);
  await navigator.clipboard.writeText(prompt);
  setOpenPromptResponse(false);
};

const addFilePathToFormikContext = async (path: string, formik: FormikProps<IPromptInputData>) => {
  await formik.setTouched({ document: true });

  await formik.setFieldValue('file', path, true);
};

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

export const handleFileUpload = async (
  fileInputRef: RefObject<HTMLInputElement>,
  formik: FormikProps<IPromptInputData>,
) => {
  try {
    if (fileInputRef.current) {
      if (fileInputRef.current.files) {
        const file = fileInputRef.current.files[0];
        const resp = await axios.post(
          `${baseUrl}/upload`,
          { file: file },
          { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true },
        );

        console.log(resp.data);

        const { path } = resp.data;

        await addFilePathToFormikContext(path, formik);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
