import { Text } from '@bgdk/react-components';
import { SxProps } from '@mui/material';
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
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { useFormik } from 'formik';
import { Dispatch, FocusEvent, Fragment, SetStateAction, useState } from 'react';
import { Form } from 'react-router-dom';
import * as Yup from 'yup';
import handleSubmitNewEntry from '../../services/actions/submit.new-entry-action';
import handleNewArtistBlur from '../../services/events/handle-validate-artist-on-blur';

const AddEntryStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50vw',
  maxWidth: '800px',
  minHeight: '50vh',
  maxHeight: 'fit-content',
  bgcolor: 'background.paper',
  border: '10px solid purple',
  boxShadow: 24,
  p: 4,
};

const steps = ['Artist', 'Album', 'Track'];

const initialValues: NewEntry = {
  artist: {
    name: '',
  },
  album: { title: '' },
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

const validationSchema = Yup.object().shape({
  artist: Yup.object({
    name: Yup.string().max(200, 'Must be less than 200 characters').required('Required'),
  }),
  album: Yup.object({
    title: Yup.string().max(160, 'Must be less than 160 characters').required('Required'),
  }),
  track: Yup.object({
    name: Yup.string().max(160, 'Must be less than 160 characters').required('Required'),
    composer: Yup.string().max(220, 'Must be less than 160 characters').required('Required'),
    bytes: Yup.number()
      .positive()
      .lessThan(2147483647, 'must be less than 32bit signed integer 2147483647')
      .required('Enter size of file in bytes'),
    milliseconds: Yup.number()
      .positive()
      .lessThan(2147483647, 'must be less than 32bit signed integer 2147483647')
      .required('Enter length of track in milliseconds'),
    media_type_id: Yup.number().positive().required('Enter media type number'),
    genre_id: Yup.number().required('Enter genre ID number').positive(),
    unit_price: Yup.number().positive().required('Enter unit price in form 0.00'),
  }),
});

interface AddEntryProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export type NewEntry = {
  artist: {
    name: string;
  };
  album: { title: string };
  track: {
    name: string;
    composer: string;
    bytes: number;
    milliseconds: number;
    media_type_id: number;
    genre_id: number;
    unit_price: Decimal;
  };
};

const AddEntry = ({ open, setOpen }: AddEntryProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => handleSubmitNewEntry(values, setSubmitting, setOpen, open),
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
    return steps.length;
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
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
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
    <Modal id="DIALOG WRAPPER ID" open={open} component={'div'}>
      <DialogContent id="DIALOG CONTENT ID" sx={AddEntryStyle}>
        <DialogTitle component={'h1'} sx={{ fontSize: 'xx-large', textAlign: 'center' }}>
          Add New Entry
        </DialogTitle>
        <Form
          method="post"
          encType="text/plain"
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <>
            <DialogTitle>
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
                  value={formik.values.artist.name}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.artist?.name && formik.errors.artist?.name && formik.values.artist.name.length > 0 ? (
                  <Text titleVariant="body1" titleText={formik.errors.artist.name} />
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
                  value={formik.values.album.title}
                  onChange={formik.handleChange}
                  onBlur={e => formik.handleBlur(e)}
                />
                {formik.touched.album?.title && formik.errors.album?.title ? (
                  <Text titleVariant="body1" titleText={formik.errors.album.title} />
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
                    value={formik.values.track.name}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.name && formik.errors.track?.name ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.name} />
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
                    value={formik.values.track.media_type_id}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.media_type_id && formik.errors.track?.media_type_id ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.media_type_id} />
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
                    value={formik.values.track.genre_id}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.genre_id && formik.errors.track?.genre_id ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.genre_id} />
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
                    value={formik.values.track.composer}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.composer && formik.errors.track?.composer ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.composer} />
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
                    value={formik.values.track.milliseconds}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.milliseconds && formik.errors.track?.milliseconds ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.milliseconds} />
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
                    value={formik.values.track.bytes}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.bytes && formik.errors.track?.bytes ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.bytes} />
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
                    placeholder="Enter price in X.XX format"
                    value={formik.values.track.unit_price}
                    onChange={formik.handleChange}
                    onBlur={e => formik.handleBlur(e)}
                  />
                  {formik.touched.track?.unit_price && formik.errors.track?.unit_price ? (
                    <Text titleVariant="body1" titleText={formik.errors.track.unit_price as number} />
                  ) : null}
                </>
              </>
            )}
          </>
          <br />
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((step, index) => (
              <Step key={step} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {step}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div>
            {allStepsCompleted() ? (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - Please Submit Entry to save</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
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
              <Button type="reset" onClick={() => formik.resetForm()}>
                Reset
              </Button>
              <Button type="button" onClick={() => setOpen(!open)}>
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
