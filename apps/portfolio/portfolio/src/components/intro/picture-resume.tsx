import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import self from '../../assets/self.webp';
import ResumeIcon from '../../components/icons/resume-icon';
import Theme from '../../styles/theme';

const PicutreAndResume = () => (
  <Paper
    elevation={24}
    sx={{
      paddingTop: 3,
      flex: '0 1 35%',
      position: 'relative',
      alignSelf: 'center',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyItems: 'space-evenly',
    }}
  >
    <CardMedia
      component={'img'}
      src={self}
      loading="lazy"
      alt="andrew"
      sx={{
        flex: '0 1 80%',
        width: '80%',
        borderRadius: 1,
        border: `5px solid ${Theme.palette.primary.dark}`,
      }}
    />
    <CardActions
      sx={{
        flex: '0 1 20%',
      }}
    >
      <Button
        LinkComponent={'a'}
        href={'/Resume.pdf'}
        download={`andrew-klapper-resume-${new Date().toLocaleDateString()}`}
        sx={{
          fontSize: '1.5rem',
          height: 'fit-content',
        }}
        endIcon={<ResumeIcon />}
      >
        Resume
      </Button>
    </CardActions>
  </Paper>
);

export default PicutreAndResume;
