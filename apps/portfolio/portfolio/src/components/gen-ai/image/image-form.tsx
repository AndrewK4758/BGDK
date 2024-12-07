import {
  FormikValidationError,
  helperTextSx,
  Label,
  labelSx,
  Text,
  textInputSx,
  tooltipSx,
  Waiting,
} from '@bgdk/shared-react-components';
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
import TextField from '@mui/material/TextField';
import { useFormik, type FormikProps } from 'formik';
import { type ChangeEvent } from 'react';
import { Form, useActionData, useNavigation, useOutletContext, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import type { OutletContextProps } from '../../../pages/gen-ai/gen-ai';
import { forrmControlLabelStyles, radioGroupStyles, sampleCountRadioTextStyles } from '../../../styles/gen-ai-styles';
import { centerFlex } from '../../../styles/pages-styles';
import { coloredTitleStyles, flexColumnStyles } from '../../../styles/prompt-builder-styles';
import Theme from '../../../styles/theme';
import { imageGenDescription, promptTooltipText, sampleCountTooltipText, seedTooltipText } from '../static/image-text';
import suspenseImg from '../../../assets/swirly-dots-to-chrome.webp';

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
    <Box component={'div'} key={'image-gen-wrapper'} id="image-gen-wrapper" height={'fit-content'} minHeight={'50vh'}>
      <Container component={'section'} key={'image-gen'} id="image-gen" sx={{ ...flexColumnStyles, gap: 4 }}>
        <Box component={'div'} key={'image-gen-header-wrapper'} id="image-gen-header-wrapper" sx={{ gap: 4 }}>
          <Text component={'h2'} titleVariant="h2" titleText="Image Generator" sx={coloredTitleStyles} />
          <Text component={'p'} titleVariant="body1" titleText={imageGenDescription} />
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
              tooltipTitle={promptTooltipText}
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
            sx={{ ...centerFlex, justifyContent: 'space-around' }}
          >
            <Box component={'section'} key={'image-form-sample-count-box'} id="image-form-sample-count-box">
              <Label
                placement="top"
                labelText="Sample Count"
                labelVariant="h5"
                tooltipTitle={sampleCountTooltipText}
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
                sx={radioGroupStyles}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={
                    <Box sx={sampleCountRadioTextStyles}>
                      <Text component={'h4'} titleVariant="h4" titleText={1} />
                    </Box>
                  }
                  sx={forrmControlLabelStyles}
                />

                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={
                    <Box sx={sampleCountRadioTextStyles}>
                      <Text component={'h4'} titleVariant="h4" titleText={2} />
                    </Box>
                  }
                  sx={forrmControlLabelStyles}
                />

                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={
                    <Box sx={sampleCountRadioTextStyles}>
                      <Text component={'h4'} titleVariant="h4" titleText={3} />
                    </Box>
                  }
                  sx={forrmControlLabelStyles}
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label={
                    <Box sx={sampleCountRadioTextStyles}>
                      <Text component={'h4'} titleVariant="h4" titleText={4} />
                    </Box>
                  }
                  sx={forrmControlLabelStyles}
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
              tooltipTitle={seedTooltipText}
              tooltipSx={tooltipSx}
              sx={labelSx}
            />
            <Box
              component={'section'}
              key={'slider-and-input-box'}
              id="slider-and-input-box"
              display={'flex'}
              gap={4}
              alignItems={'center'}
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
            sx={centerFlex}
          >
            {state !== 'submitting' ? (
              <Box
                component={'span'}
                key={'image-gen-button-box'}
                id="image-gen-button-box"
                sx={{
                  ...centerFlex,
                  flex: '0 1 50%',
                  height: 'fit-content',
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
                  ...centerFlex,
                  flex: '0 1 50%',
                  height: 'fit-content',
                }}
              >
                <Text component={'h4'} titleVariant="h4" titleText={'Generating'} sx={{ textAlign: 'center' }} />
                <Waiting src={suspenseImg} />
              </Box>
            )}
          </Box>
        </Form>
      </Container>
      <Box
        component={'section'}
        key={'generated-image-wrapper'}
        sx={{
          ...centerFlex,
          flex: '1 0 20%',
          flexWrap: 'wrap',
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
