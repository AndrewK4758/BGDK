import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { album, artist, Prisma, track } from '@prisma/client';
import { useFormik } from 'formik';
import { FocusEvent, Fragment, useState, type CSSProperties, type JSX } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { addEntrySteps } from '../../../pages/static/crud-text';
import handleSubmitNewEntry from '../../../services/actions/crud-actions/submit-new-entry-action';
import handleNewArtistBlur from '../../../services/events/crud-events/handle-validate-artist-on-blur';
import { AddEntryModalStyle } from '../../../styles/crud-styles';
import { fullPageModalStyles } from '../../../styles/pages-styles';
import { flexColumnStyles } from '../../../styles/prompt-builder-styles';
import Theme from '../../../styles/theme';

const initialValues: NewEntry = {
  artist: {
    name: '',
  },
  album: {
    title: '',
  },
  track: {
    name: '',
    composer: '',
    bytes: 0,
    milliseconds: 0,
    media_type_id: 0,
    genre_id: 0,
    unit_price: new Prisma.Decimal(0.0),
  },
};

const artistVal = Yup.object({
  name: Yup.string().max(200, 'Must be less than 200 characters').required('Required'),
});

const albumVal = Yup.object({
  title: Yup.string().max(160, 'Must be less than 160 characters').required('Required'),
});

const trackVal = Yup.object({
  name: Yup.string().max(160, 'Must be less than 160 characters').required('Required'),
  composer: Yup.string().max(220, 'Must be less than 160 characters').required('Required'),
  bytes: Yup.number()
    .required('Enter size of file in bytes')
    .positive('Enter size of file in bytes')
    .lessThan(2147483647, 'must be less than 32bit signed integer 2147483647'),
  milliseconds: Yup.number()
    .required('Enter length of track in milliseconds')
    .positive('Enter length of track in milliseconds')
    .lessThan(2147483647, 'must be less than 32bit signed integer 2147483647')
    .required('Enter length of track in milliseconds'),
  media_type_id: Yup.number().required('Enter media type number').positive('Enter media type number'),
  genre_id: Yup.number().required('Enter genre ID number').positive('Enter genre ID number'),
  unit_price: Yup.number().required('Enter unit price in form 0.00').positive('Enter unit price in form 0.00'),
});

const validationSchema = Yup.object({
  artist: artistVal,
  album: albumVal,
  track: trackVal,
});

export type NewEntry = {
  artist: Partial<artist>;
  album: Partial<album>;
  track: Partial<track>;
};

export type NewEntryIDs = {
  artistID: number;
  albumID: number;
};

/**
 * This component renders a modal for adding new entries to the database.
 * It allows users to add new artists, albums, and tracks through a step-by-step process.
 *
 * @returns {JSX.Element} The rendered add entry modal component.
 */

const AddEntry = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const { pathname } = useLocation();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => await handleSubmitNewEntry(values, setSubmitting, nav),
    onReset: () => handleReset(),
    validateOnMount: false,
  });

  formik.handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const field = e.currentTarget.name;

    switch (field) {
      case 'artist.name':
        handleNewArtistBlur<NewEntry>(e, formik);
        break;
      default:
        formik.setFieldTouched(field, true, true);
        break;
    }
  };

  const totalSteps = () => {
    return addEntrySteps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? addEntrySteps.findIndex((_step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Modal
      key={'add-entry-modal-wrapper'}
      id="add-entry-modal-wrapper"
      open={pathname === '/crud/add-entry'}
      component={'div'}
      sx={fullPageModalStyles}
    >
      <DialogContent key={'add-entry-dialog-content'} id={'add-entry-dialog-content'} sx={AddEntryModalStyle}>
        <DialogTitle component={'div'} color="textSecondary" sx={{ textAlign: 'center' }}>
          <Text component={'h2'} titleText={'Add New Entry'} titleVariant="h2" />
        </DialogTitle>
        <Form
          method="post"
          encType="text/plain"
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          style={{ ...(flexColumnStyles as CSSProperties), overflowY: 'auto', overflowX: 'hidden' }}
        >
          <DialogTitle color="textSecondary" sx={{ fontFamily: 'monospace', fontSize: '.875rem' }}>
            All fields are required to submit entry. Artist, Album, and Track ID's will be automatically generated and
            provided to you upon successful submission
          </DialogTitle>
          {activeStep === 0 && (
            <>
              <FormLabel htmlFor="artist.name" hidden />
              <TextField
                autoComplete="off"
                autoFocus
                name="artist.name"
                id="artist.name"
                label="Artist Name"
                type="text"
                variant="outlined"
                disabled={Object.keys(completed).length > 0}
                value={formik.values.artist.name}
                onChange={formik.handleChange}
                onBlur={e => formik.handleBlur(e)}
              />
              {formik.touched.artist?.name && formik.errors.artist?.name ? (
                <Text
                  component={'p'}
                  titleVariant="body1"
                  titleText={formik.errors.artist.name}
                  sx={{ color: Theme.palette.error.main }}
                />
              ) : null}
            </>
          )}
          {activeStep === 1 && (
            <>
              <FormLabel htmlFor="album.title" hidden />
              <TextField
                autoComplete="off"
                autoFocus
                name="album.title"
                id="album.title"
                label="Album Title"
                type="text"
                variant="outlined"
                disabled={Object.keys(completed).length > 1}
                value={formik.values.album.title}
                onChange={formik.handleChange}
                onBlur={e => formik.handleBlur(e)}
              />
              {formik.touched.album?.title && formik.errors.album?.title ? (
                <Text
                  component={'p'}
                  titleVariant="body1"
                  titleText={formik.errors.album.title}
                  sx={{ color: Theme.palette.error.main }}
                />
              ) : null}
            </>
          )}

          {activeStep === 2 && (
            <>
              <>
                <FormLabel htmlFor="track.name" hidden />
                <TextField
                  autoComplete="off"
                  autoFocus
                  name="track.name"
                  id="track.name"
                  label="Track Name"
                  type="text"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.name}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.name && formik.errors.track?.name ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.name}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.media_type_id" hidden />
                <TextField
                  autoComplete="off"
                  name="track.media_type_id"
                  id="track.media_type_id"
                  label="Media Type ID"
                  type="number"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.media_type_id}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.media_type_id && formik.errors.track?.media_type_id ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.media_type_id}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.genre_id" hidden />
                <TextField
                  autoComplete="off"
                  name="track.genre_id"
                  id="track.genre_id"
                  label="Genre ID"
                  type="number"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.genre_id}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.genre_id && formik.errors.track?.genre_id ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.genre_id}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.composer" hidden />
                <TextField
                  autoComplete="off"
                  name="track.composer"
                  id="track.composer"
                  label="Composer"
                  type="text"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.composer}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.composer && formik.errors.track?.composer ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.composer}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.milliseconds" hidden />
                <TextField
                  autoComplete="off"
                  name="track.milliseconds"
                  id="track.milliseconds"
                  label="Milliseconds"
                  type="number"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.milliseconds}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.milliseconds && formik.errors.track?.milliseconds ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.milliseconds}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.bytes" hidden />
                <TextField
                  autoComplete="off"
                  name="track.bytes"
                  id="track.bytes"
                  label="Bytes"
                  type="number"
                  variant="outlined"
                  disabled={Object.keys(completed).length > 2}
                  value={formik.values.track.bytes}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.bytes && formik.errors.track?.bytes ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.bytes}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
              <br />
              <>
                <FormLabel htmlFor="track.unit_price" hidden />
                <TextField
                  autoComplete="off"
                  name="track.unit_price"
                  id="track.unit_price"
                  label="Unit Price"
                  type="number"
                  slot="step"
                  slotProps={{ htmlInput: { step: '0.01' } }}
                  variant="outlined"
                  inputMode="decimal"
                  disabled={Object.keys(completed).length > 2}
                  placeholder="Enter price in X.XX format"
                  value={formik.values.track.unit_price}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.track?.unit_price && formik.errors.track?.unit_price ? (
                  <Text
                    component={'p'}
                    titleVariant="body1"
                    titleText={formik.errors.track.unit_price as string}
                    sx={{ color: Theme.palette.error.main }}
                  />
                ) : null}
              </>
            </>
          )}

          <br />
          <Stepper nonLinear activeStep={activeStep}>
            {addEntrySteps.map((step, index) => (
              <Step key={step} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {step}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div>
            {allStepsCompleted() ? (
              <Text
                component={'p'}
                titleVariant="body1"
                titleText={'All steps completed - Please Submit Entry to save'}
                sx={{ mt: 2, mb: 1 }}
              />
            ) : (
              <Fragment>
                <Typography color="textSecondary" sx={{ mt: 2, mb: 1, py: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button color="primary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1, color: Theme.palette.text.secondary, fontSize: '1rem' }}>
                    Next
                  </Button>
                  {activeStep !== addEntrySteps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete} sx={{ color: Theme.palette.text.secondary, fontSize: '1rem' }}>
                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                      </Button>
                    ))}
                </Box>
              </Fragment>
            )}
          </div>
          <DialogActions sx={{ marginTop: 2 }}>
            <ButtonGroup variant="contained" fullWidth>
              {allStepsCompleted() ? (
                <Button type="submit">{formik.isSubmitting ? 'Submitting' : 'Submit Entry'}</Button>
              ) : null}
              <Button type="reset">Reset</Button>
              <Button
                type="button"
                onClick={() => {
                  nav(-1);
                }}
              >
                Close
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </DialogContent>
    </Modal>
  );
};

export default AddEntry;
