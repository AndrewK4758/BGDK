import Box from '@mui/material/Box';
import { Form } from 'react-router-dom';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Label } from '@bgdk/shared-react-components';
import {
  labelSx,
  textInputSx,
  tooltipSx,
} from '../../../../../../portfolio/portfolio/src/components/gen-ai/gen-ai-modes-styles';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FormikValidationError from '../../../../../../portfolio/portfolio/src/components/email/email-form/formik-validation-error';
import { useContext } from 'react';
import { WebsocketContext } from '../../../../../../portfolio/portfolio/src/contexts/websocket-context';

const initialValues = {
  modelTextQuery: '',
};

const validationSchema = Yup.object({
  modelTextQuery: Yup.string().required('You must provide a query to iteract with the model'),
});

const ModelQuery = () => {
  const { socket } = useContext(WebsocketContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: ({ modelTextQuery }) => {
      socket.emit('modelQuery', { modelTextQuery: modelTextQuery });
      formik.resetForm({ isSubmitting: true });
    },
  });

  return (
    <Box component={'div'} key={'model-query-wrapper'} id="model-query-wrapper">
      <Box>
        <Label
          placement="top"
          tooltipTitle=""
          labelVariant="h2"
          labelText={'Local Model'}
          sx={{ ...labelSx, textAlign: 'center', width: '100%' }}
        />
      </Box>
      <Form key={'model-query-form'} id="model-query-form" onSubmit={formik.handleSubmit}>
        <Box component={'section'} key={'model-query-input-section'} id="model-query-input-section">
          <Label
            placement="top"
            tooltipTitle={'Input to query local llm'}
            labelVariant={'h4'}
            labelText={'Query Model'}
            sx={labelSx}
            tooltipSx={tooltipSx}
          />
          <TextField
            component={'span'}
            key={'model-query-input'}
            id="model-query-input"
            multiline={true}
            focused={true}
            fullWidth={true}
            rows={2}
            placeholder="Query the LLM here"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onReset={formik.handleReset}
            name={'modelTextQuery'}
            sx={textInputSx}
            value={formik.values.modelTextQuery}
          />
          <FormikValidationError elementName={'modelTextQuery'} formik={formik} />
        </Box>
        <Box key={'model-query-submit-box'} id="model-query-submit-box">
          <Button
            variant="text"
            type="reset"
            key={'model-query-start'}
            id="model-query-start"
            sx={{ fontSize: '2rem', float: 'left' }}
            onClick={() => formik.resetForm()}
          >
            Start Queries
          </Button>
          <Button
            variant="text"
            type="submit"
            key={'model-query-submit'}
            id="model-query-submit"
            sx={{ fontSize: '2rem', float: 'right' }}
          >
            Submit Query
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default ModelQuery;
