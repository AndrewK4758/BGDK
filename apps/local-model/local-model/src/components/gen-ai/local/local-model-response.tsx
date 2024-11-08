import Box from '@mui/material/Box';

interface ModelResponseProps {
  promptResponse: string;
}

const ModelResponse = ({ promptResponse }: ModelResponseProps) => {
  return (
    <Box>
      <pre
        style={{
          width: '100%',
          height: 'fit-content',
          minHeight: '30vh',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          fontWeight: 'bolder',
        }}
      >
        {promptResponse}
      </pre>
    </Box>
  );
};

export default ModelResponse;
