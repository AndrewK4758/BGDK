import Paper from '@mui/material/Paper';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Theme from '../../styles/theme';
import { TitleProps } from '../interfaces/interfaces';

const titlePaperSxProps: SxProps = {
  height: 'fit-content',
  minHeight: '20vh ',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '80%',
};

const Title = ({ name, title, body, titleSx, bodySx }: TitleProps) => (
  <Paper elevation={24} id={`${name}-title`} sx={titlePaperSxProps}>
    {title && (
      <Typography variant="h3" sx={titleSx} borderBottom={`3px solid ${Theme.palette.primary.dark}`}>
        {title}
      </Typography>
    )}
    <Typography variant="body1" sx={bodySx}>
      {body}
    </Typography>
  </Paper>
);

export default Title;
