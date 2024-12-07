import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import type { JSX } from 'react';
import resume from '../../assets/Resume.pdf';
import selfPic from '../../assets/self.webp';
import ResumeIcon from '../../components/icons/resume-icon';
import { introPicStyles, picAndResumeCardStyles } from '../../styles/intro-styles';

/**
 * This component renders a card containing a picture of me and a button to download my resume.
 *
 * @returns {JSX.Element} The rendered picture and resume component.
 */

const PicutreAndResume = (): JSX.Element => (
  <Paper
    key={'picture-and-resume-paper'}
    id={'picture-and-resume-paper'}
    data-testid={'picture-and-resume-paper'}
    elevation={24}
    sx={picAndResumeCardStyles}
  >
    <CardMedia
      component={'img'}
      key={'card-media-resume-image'}
      id={'card-media-resume-image'}
      data-testid={'card-media-resume-image'}
      src={selfPic}
      loading="lazy"
      alt="andrew"
      sx={introPicStyles}
    />
    <CardActions
      key={'card-actions-wrapper'}
      id={'card-actions-wrapper'}
      data-testid={'card-actions-wrapper'}
      sx={{ flex: '0 1 20%' }}
    >
      <Button
        key={'card-media-resume-button'}
        id={'card-media-resume-button'}
        data-testid={'card-media-resume-button'}
        LinkComponent={'button'}
        href={resume}
        download={`andrew-klapper-resume-${new Date().toLocaleDateString()}`}
        sx={{ fontSize: '2rem' }}
        endIcon={<ResumeIcon sx={{ width: '3rem', height: 'auto' }} />}
      >
        Resume
      </Button>
    </CardActions>
  </Paper>
);

export default PicutreAndResume;
