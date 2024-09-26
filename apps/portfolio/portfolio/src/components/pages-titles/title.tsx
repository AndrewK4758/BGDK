import Theme from '../../styles/theme';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TitleProps } from '../interfaces/interfaces';

const Title = ({ name, title, body, titleSx, bodySx }: TitleProps) => (
  <Paper
    elevation={24}
    id={`${name}-title`}
    sx={{
      height: 'fit-content',
      minHeight: '20vh ',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderRadius: 5,
      width: '80%',
    }}
  >
    <Typography variant="h3" sx={titleSx} borderBottom={`3px solid ${Theme.palette.primary.dark}`}>
      {title}
    </Typography>
    <Typography variant="body1" sx={bodySx}>
      {body}
    </Typography>
  </Paper>
);

export default Title;
