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
      flex: '0 1 30%',
      position: 'relative',
      alignSelf: 'end',
      paddingY: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyItems: 'space-around',
      borderRadius: 5,
    }}
  >
    <CardMedia
      component={'img'}
      src={self}
      loading="lazy"
      alt="andrew"
      sx={{
        flex: '1 0 100%',
        width: '80%',
        borderRadius: 5,
        border: `5px solid ${Theme.palette.primary.dark}`,
        zIndex: 1,
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
          zIndex: 1,
          height: 'fit-content',
          borderRadius: 5,
        }}
        endIcon={<ResumeIcon />}
      >
        Resume
      </Button>
    </CardActions>
  </Paper>
);

export default PicutreAndResume;
