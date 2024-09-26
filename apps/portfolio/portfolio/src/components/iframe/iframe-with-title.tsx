import Box from '@mui/material/Box';
import { IFrameWithTitleProps } from '../interfaces/interfaces';
import Title from '../pages-titles/title';
import Card from '@mui/material/Card';
import Theme from '../../styles/theme';

const IFrameWithTitle = ({ name, title, body, titleSx, bodySx, url, scrollFunc }: IFrameWithTitleProps) => {
  return (
    <Box
      component={'div'}
      key={`${name}-wrapper`}
      id={`${name}-wrapper`}
      onLoad={e => scrollFunc(e)}
      sx={{
        height: 'fit-content',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10vh',
        scrollMarginTop: '12vh',
      }}
    >
      <Title name={name} title={title} body={body} titleSx={titleSx} bodySx={titleSx} />
      <Card
        elevation={24}
        component={'div'}
        key={`${name}-app-wrapper`}
        id={`${name}-app-wrapper`}
        sx={{
          width: '80%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Theme.palette.background.paper,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            width: '95%',
            height: '95%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component={'iframe'}
            loading="lazy"
            src={url}
            id={`${name}-iframe`}
            about={`${name} iframe`}
            key={`${name}-iframe`}
            sx={{
              height: '100%',
              width: '100%',
              border: 0,
              zIndex: 5,
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default IFrameWithTitle;
