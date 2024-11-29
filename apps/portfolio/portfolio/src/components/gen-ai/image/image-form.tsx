import { Text } from '@bgdk/react-components';
import { Label, Waiting, FormikValidationError } from '@bgdk/shared-react-components';
import { AspectRatio } from '@bgdk/types-ai';
import { type ImagenConfig } from '@bgdk/vertex-ai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import type { SxProps } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik, type FormikProps } from 'formik';
import { type ChangeEvent } from 'react';
import { Form, useActionData, useNavigation, useOutletContext, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import Theme from '../../../styles/theme';
import type { OutletContextProps } from '../../../pages/gen-ai/gen-ai';

const imageGenDescription =
  "Imagen 3 is Google's latest text-to-image AI model, generating high-quality images from detailed text descriptions. Trained on an extensive dataset of text-image pairs, Imagen 3 excels at creating photorealistic images with accurate details and composition. This model can be used for various applications, including creative visualization, design prototyping, and generating visual content for marketing and advertising. Access Imagen 3 through Google's Vertex AI platform or the Gemini API to explore its capabilities.";

const helperTextSx: SxProps = {
  color: Theme.palette.error.main,
  fontSize: '1.25rem',
};

const labelSx: SxProps = {
  fontSize: '2rem',
  color: Theme.palette.primary.main,
  width: 'fit-content',
  '&:hover': { cursor: 'pointer' },
};

const tooltipSx: SxProps = {
  maxWidth: '80vw',
  fontSize: '1rem',
  color: Theme.palette.text.primary,
  backgroundColor: Theme.palette.background.default,
  border: `2px solid ${Theme.palette.primary.main}`,
};

const textInputSx: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.background.default,
  borderRadius: 1,
};

const validationSchema = Yup.object({
  prompt: Yup.string().required('The prompt is required'),
  sampleCount: Yup.number().required('Sample Count is required'),
  seed: Yup.number().required('Seed is required'),
  aspectRatio: Yup.string().oneOf(Object.values(AspectRatio)),
});

const ImageForm = () => {
  const { prompt } = useOutletContext<OutletContextProps>();
  const submit = useSubmit();
  const { state } = useNavigation();
  const pics = useActionData() as string[];

  const initialValues: Partial<ImagenConfig> = {
    prompt: prompt.text === null ? '' : prompt.text,
    sampleCount: 1,
    seed: 100,
    aspectRatio: AspectRatio['1:1'],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => submit(values, { encType: 'application/json', relative: 'route', method: 'post' }),
  });

  return (
    <Box
      component={'div'}
      key={'image-gen-wrapper'}
      id="image-gen-wrapper"
      sx={{ height: 'fit-content', minHeight: '50vh' }}
    >
      <Container
        component={'section'}
        key={'image-gen'}
        id="image-gen"
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Box component={'div'} key={'image-gen-header-wrapper'} id="image-gen-header-wrapper" sx={{ gap: 4 }}>
          <Text
            titleVariant="h2"
            titleText="Image Generator"
            sx={{ width: '100%', textAlign: 'center', color: Theme.palette.secondary.light }}
          />
          <Text titleVariant="body1" titleText={imageGenDescription} />
        </Box>

        <Form
          method="post"
          key={'image-form'}
          id="image-form"
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <Box component={'section'} key={'image-form-prompt-box'} id="image-form-prompt-box">
            <Label
              placement="top"
              labelText="Prompt"
              labelVariant="h5"
              tooltipTitle={
                'Enter text prompt or use prompt builder to generate prompt, then copy & paste in the input bar.'
              }
              tooltipSx={tooltipSx}
              sx={labelSx}
            />
            <TextField
              key={'image-prompt-input'}
              id="image-prompt-input"
              component={'span'}
              multiline={true}
              focused={true}
              fullWidth={true}
              rows={2}
              placeholder="The picture you want the AI to create"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onReset={formik.handleReset}
              name={'prompt'}
              sx={textInputSx}
              value={formik.values.prompt}
            />
            <FormikValidationError<Partial<ImagenConfig>>
              formik={formik}
              elementName={'prompt'}
              helperTextSx={helperTextSx}
            />
          </Box>

          <Box
            component={'section'}
            key={'image-form-sample-count-aspect-ratio-box'}
            id="image-form-sample-count-aspect-ratio-box"
            sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
          >
            <Box component={'section'} key={'image-form-sample-count-box'} id="image-form-sample-count-box">
              <Label
                placement="top"
                labelText="Sample Count"
                labelVariant="h5"
                tooltipTitle={
                  'Sample count is the number of attempts you want the AI to produce for each prompt submission. The range is 1 - 4.'
                }
                tooltipSx={tooltipSx}
                sx={labelSx}
              />

              <RadioGroup
                key={'image-form-sample-count'}
                id="image-form-sample-count"
                onBlur={formik.handleBlur}
                onChange={(e, newValue) => handleFormikValueChange(e.target.name, newValue, formik)}
                onReset={formik.handleReset}
                value={formik.values.sampleCount}
                name={'sampleCount'}
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
                  value={1}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Typography variant="h4">1</Typography>
                    </Box>
                  }
                  sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                />

                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Typography variant="h4">2</Typography>
                    </Box>
                  }
                  sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                />

                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Typography variant="h4">3</Typography>
                    </Box>
                  }
                  sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Typography variant="h4">4</Typography>
                    </Box>
                  }
                  sx={{ alignContent: 'center', fontSize: '1.5rem' }}
                />
              </RadioGroup>
            </Box>
            <Box component={'section'} key={'image-form-aspect-ratio-box'} id="image-form-aspect-ratio-box">
              <Label
                placement="top"
                labelText="Aspect Ratio"
                labelVariant="h5"
                tooltipTitle={'Select the Aspect Ratio of the output image.'}
                tooltipSx={tooltipSx}
                sx={labelSx}
              />
              <Select
                key={'image-aspect-ratio-input'}
                id="image-aspect-ratio-input"
                rows={2}
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onReset={formik.handleReset}
                name={'aspectRatio'}
                sx={textInputSx}
                value={formik.values.aspectRatio}
              >
                <MenuItem value={AspectRatio['1:1']}>{AspectRatio['1:1']}</MenuItem>
                <MenuItem value={AspectRatio['3:4']}>{AspectRatio['3:4']}</MenuItem>
                <MenuItem value={AspectRatio['4:3']}>{AspectRatio['4:3']}</MenuItem>
                <MenuItem value={AspectRatio['16:9']}>{AspectRatio['16:9']}</MenuItem>
                <MenuItem value={AspectRatio['9:16']}>{AspectRatio['9:16']}</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box component={'section'} key={'image-form-seed-box'} id="image-form-seed-box">
            <Label
              placement="top"
              labelText="Seed"
              labelVariant="h5"
              tooltipTitle={
                "The seed property in Imagen 3's configuration is an optional parameter that allows you to control the randomness of the image generation process. By providing a specific seed value (an integer), you can ensure that the same prompt will consistently generate the same image. This is useful for reproducibility and for exploring variations of an image by changing other parameters while keeping the seed constant. If you don't provide a seed, Imagen 3 will use a random seed, resulting in different images each time you generate with the same prompt."
              }
              tooltipSx={tooltipSx}
              sx={labelSx}
            />
            <Box
              component={'section'}
              key={'slider-and-input-box'}
              id="slider-and-input-box"
              sx={{ display: 'flex', gap: 4, alignItems: 'center' }}
            >
              <Slider
                name="seed"
                value={formik.values.seed}
                onChange={(_, newValue) => handleFormikValueChange('seed', newValue, formik)}
                aria-labelledby="seed-slider"
                sx={{ flex: '1 0 90%' }}
              />
              <Input
                value={formik.values.seed}
                onChange={e => handleSliderInputChange(e, formik)}
                sx={{ flex: '1 0 10%' }}
                slotProps={{
                  input: {
                    'aria-labelledby': 'seed-slider',
                    sx: { textAlign: 'center', fontSize: '1.5rem', color: Theme.palette.primary.main },
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            component={'section'}
            key={'image-gen-button-or-generating-box'}
            id="image-gen-button-or-generating-box"
            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
          >
            {state !== 'submitting' ? (
              <Box
                component={'span'}
                key={'image-gen-button-box'}
                id="image-gen-button-box"
                sx={{
                  flex: '0 1 50%',
                  height: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  type="submit"
                  key={'gen-image-button'}
                  id="gen-image-button"
                  sx={{ fontSize: '3rem', flex: '0 1 65%' }}
                >
                  Generate Image
                </Button>
              </Box>
            ) : (
              <Box
                component={'span'}
                key={'image-gen-generating-box'}
                id="image-gen-generating-box"
                sx={{
                  flex: '0 1 50%',
                  height: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text titleVariant="h4" titleText={'Generating'} sx={{ textAlign: 'center' }} />
                <Waiting />
              </Box>
            )}
          </Box>
        </Form>
      </Container>
      <Box
        component={'section'}
        key={'generated-image-wrapper'}
        sx={{
          flex: '1 0 20%',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {pics &&
          state !== 'submitting' &&
          pics.map((pic, i) => (
            <img
              key={`generated-image-${i}`}
              src={`data:image/png;base64, ${pic}`}
              alt="generated from prompt entered"
              style={{ zIndex: 100 }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ImageForm;

const handleSliderInputChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formik: FormikProps<Partial<ImagenConfig>>,
) => {
  formik.setFieldValue('seed', event.target.value === '' ? 0 : Number(event.target.value));
};

const handleFormikValueChange = async (
  name: string,
  value: string | number | number[],
  formik: FormikProps<Partial<ImagenConfig>>,
) => {
  await formik.setFieldValue(name, value);
};
