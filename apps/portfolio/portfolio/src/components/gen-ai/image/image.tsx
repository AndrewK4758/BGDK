import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useState, type Dispatch, type SetStateAction } from 'react';
import axios from 'axios';
import Theme from '../../../styles/theme';

const Image = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [pic, setPic] = useState<string>('');
  return (
    <Box
      component={'div'}
      key={'gen-image-wrapper'}
      id="gen-image-wrapper"
      sx={{
        backgroundColor: Theme.palette.background.paper,
        minHeight: '30vh',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        component={'section'}
        key={'gen-image-form-wrapper'}
        id="gen-image-form-wrapper"
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          border: 5,
          flex: '1 0 80%',
        }}
      >
        <Box
          component={'section'}
          key={'gen-image-input-wrapper'}
          id="gen-image-input-wrapper"
          sx={{ flex: '0 1 80%' }}
        >
          <Input
            key={'gen-image-prompt-input'}
            onChange={e => {
              setPrompt(e.target.value);
            }}
            sx={{ width: '100%', color: Theme.palette.text.primary }}
          />
        </Box>
        <Button
          key={'gen-image-button'}
          id="gen-image-button"
          sx={{ fontSize: '3rem', textAlign: 'center', width: '100%' }}
          onClick={() => handleGenImageClick(prompt, setPic)}
        >
          Generate Image
        </Button>
      </Box>
      <Box component={'section'} key={'generated-image-wrapper'} sx={{ flex: '1 0 20%', border: 5 }}>
        {pic && <img src={`data:image/png;base64, ${pic}`} alt="generated from prompt entered" />}
      </Box>
    </Box>
  );
};

export default Image;

const baseURL = import.meta.env.VITE_SERVER_URL_VERTEX;

const handleGenImageClick = async (prompt: string, setPic: Dispatch<SetStateAction<string>>) => {
  console.log(prompt);
  try {
    const resp = await axios.post(
      `${baseURL}/images`,
      { prompt: prompt },
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(resp.data);
    setPic(resp.data);
  } catch (error) {
    console.error(error);
  }
};
