import Box from '@mui/material/Box';
import Theme from '../../styles/theme';
import Paper from '@mui/material/Paper';
import { Text } from '@bgdk/react-components';
import { useFormik } from 'formik';
import { Form, useSubmit, type SubmitFunction, useActionData } from 'react-router-dom';
import FormikValidationError from '../email/email-form/formik-validation-error';
import TextField from '@mui/material/TextField';
import { IPromptInputData, ResponseType } from '@bgdk/prompt-builder';
import * as Yup from 'yup';
import { Label } from '@bgdk/shared-react-components';
import { Button, Container, FormControlLabel, InputLabel, Radio, RadioGroup } from '@mui/material';
import { useRef } from 'react';
import JsonIcon from '../icons/json-icon';
import TextIcon from '../icons/text-icon';
import '../../styles/prompt-builder.css';

const promptBuilderHeaderText = `This is designed to help you format your idea so you receive the best possible response from your generative-ai query. Using all of the available fields will give you a more desireable response, but not all are required. `;

const initialValues: IPromptInputData = {
  objective: '',
  instructions: '',
  textData: '',
  examples: '',
  constraints: '',
  tone: '',
  responseFormat: ResponseType.TEXT,
  responseInstructions: '',
  document: '',
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
  document: Yup.mixed().notRequired(),
});

const PromptBuilder = () => {
  const submit = useSubmit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const action = useActionData() as string;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: values => {
      console.log(values);
      handleSubmitMessage(values, submit);
    },
  });

  const handleFileSubmit = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box component={'div'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={{ width: '100%' }}>
      <Paper
        key={'prompt-builder-paper'}
        id="prompt-builder-paper"
        sx={{ width: '100%', height: 'fit-content', minHeight: '30vh' }}
      >
        <Container
          component={'section'}
          key={'prompt-builder'}
          id="prompt-builder"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Box component={'section'} key={'prompt-builder-header-box'} id="prompt-builder-header-box" sx={{ gap: 4 }}>
            <Text titleVariant="h2" titleText={'Prompt Builder'} sx={{ width: '100%', textAlign: 'center' }} />
            <Text titleVariant="body1" titleText={promptBuilderHeaderText} sx={{}} />
          </Box>
          <Form key={'prompt-builder-form'} method="post" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Box
              component={'section'}
              key={'prompt-builder-input-elements-box'}
              id="prompt-builder-input-elements-box"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Box component={'section'} key={'prompt-builder-objective-box'} id="prompt-builder-objective-box">
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
                  name={'objective'}
                  label={
                    <Label
                      labelText="Objective"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,

                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="objective" formik={formik} />
              </Box>
              <Box component={'section'} key={'prompt-builder-instructions-box'} id="prompt-builder-instructions-box">
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
                  name={'instructions'}
                  label={
                    <Label
                      labelText="Instructions"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="instructions" formik={formik} />
              </Box>
              <Box component={'section'} key={'prompt-builder-text-data-box'} id="prompt-builder-text-data-box">
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
                  name={'textData'}
                  label={
                    <Label
                      labelText="Text Data"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="textData" formik={formik} />
              </Box>
              <Box component={'section'} key={'prompt-builder-examples-box'} id="prompt-builder-examples-box">
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
                  name={'examples'}
                  label={
                    <Label
                      labelText="Examples"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="examples" formik={formik} />
              </Box>
              <Box component={'section'} key={'prompt-builder-constraints-box'} id="prompt-builder-constraints-box">
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
                  name={'constraints'}
                  label={
                    <Label
                      labelText="Constraints"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="constraints" formik={formik} />
              </Box>
              <Box component={'section'} key={'prompt-builder-tone-box'} id="prompt-builder-tone-box">
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
                  name={'tone'}
                  label={
                    <Label
                      labelText="Tone"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="tone" formik={formik} />
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-response-instructions-box'}
                id="prompt-builder-response-instructions-box"
              >
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
                  name={'responseInstructions'}
                  label={
                    <Label
                      labelText="Response Instructions"
                      labelVariant="h3"
                      sx={{ fontSize: '2rem', color: Theme.palette.primary.main }}
                    />
                  }
                  sx={{
                    color: Theme.palette.primary.main,
                    backgroundColor: Theme.palette.background.default,
                    borderRadius: 1,
                  }}
                />
                <FormikValidationError<IPromptInputData> elementName="responseIsnstructions" formik={formik} />
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-response-format-box'}
                id="prompt-builder-response-format-box"
                sx={{
                  backgroundColor: Theme.palette.background.default,
                  borderRadius: 1.25,
                }}
              >
                <InputLabel
                  id="label"
                  variant="standard"
                  sx={{
                    fontSize: '2rem',
                    color: Theme.palette.primary.main,
                    fontFamily: 'League Gothic',
                    paddingLeft: 2,
                  }}
                >
                  Response Format
                </InputLabel>
                <RadioGroup
                  key={'prompt-builder-response-format'}
                  id="prompt-builder-response-format"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
                        <Label labelText="Text" labelVariant="h4" sx={{}} />
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
                        <Label labelText="JSON" labelVariant="h4" sx={{}} />
                        <JsonIcon />
                      </Box>
                    }
                    sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                  />
                </RadioGroup>
                <FormikValidationError<IPromptInputData> elementName="responseFormat" formik={formik} />
              </Box>
              <Box
                component={'span'}
                key={'prompt-builder-document-wrapper'}
                id="prompt-builder-document-wrapper"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <input
                  ref={fileInputRef}
                  accept="application/json, text/plain"
                  id="document"
                  name="document"
                  type="file"
                  style={{ display: 'none' }}
                  onBlur={formik.handleBlur}
                  onChange={async () => {
                    if (fileInputRef.current?.files) {

                      const fileText = fileInputRef.current.files[0];
                      if (fileText) {
                        await formik.setFieldValue('document', await fileText.text(), false);
                      }
                    }
                  }}
                />
                {formik.values.document ? (
                  <Box component={'span'} sx={{ fontSize: '1rem', alignSelf: 'center', textAlign: 'center' }}>
                    {(formik.values.document as unknown as File).name}
                  </Box>
                ) : null}
              </Box>
              <Box
                component={'section'}
                key={'prompt-builder-submit-box'}
                id="prompt-builder-submit-box"
                sx={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <Button
                  type="button"
                  key={'prompt-builder-upload-file-button'}
                  id="prompt-builder-upload-file-button"
                  sx={{ fontSize: '2rem' }}
                  onClick={handleFileSubmit}
                >
                  Upload File
                </Button>
                <Button
                  type="submit"
                  key={'prompt-builder-submit-button'}
                  id="prompt-builder-submit-button"
                  sx={{ fontSize: '2rem' }}
                >
                  Build Prompt
                </Button>
                <Button
                  type="reset"
                  key={'prompt-builder-reset-button'}
                  id="prompt-builder-reset-button"
                  onReset={formik.handleReset}
                  sx={{ fontSize: '2rem' }}
                >
                  Clear Values
                </Button>
                <Button
                  type="button"
                  key={'copy-prompt-to-clipboard'}
                  id="copy-prompt-to-clipboard"
                  onClick={() => handleCopyGameLinkToClipboard(action)}
                  sx={{ fontSize: '2rem' }}
                >
                  Copy Prompt
                </Button>
              </Box>
            </Box>
          </Form>
        </Container>
        {action && (
          <Box sx={{ width: '100%', height: '100%', fontSize: '.875rem' }}>
            <pre style={{ overflow: 'auto' }}>{action}</pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PromptBuilder;

type PromptDataToSend = {
  objective: string,
  responseFormat: string,
  instructions: string | null,
  document: string | null,
  textData: string | null,
  examples: string | null,
  constraints: string | null,
  tone: string | null,
  responseInstructions: string | null,
}

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

  const valuesToSend: PromptDataToSend = {
    objective: objective,
    responseFormat: responseFormat,
    instructions: null,
    document: null,
    textData: null,
    examples: null,
    constraints: null,
    tone: null,
    responseInstructions: null
  };

  if (instructions) valuesToSend['instructions'] = instructions;
  if (document) valuesToSend['document'] = document;
  if (textData) valuesToSend['textData'] = textData;
  if (examples) valuesToSend['examples'] = examples;
  if (constraints) valuesToSend['constraints'] = constraints;
  if (tone) valuesToSend['tone'] = tone;
  if (responseInstructions) valuesToSend['responseInstructions'] = responseInstructions;

  submit(valuesToSend, { action: '/gen-ai?index', method: 'post', encType: 'application/json' });
};

const handleCopyGameLinkToClipboard = (prompt: string): Promise<void> => navigator.clipboard.writeText(prompt);
