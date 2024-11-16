import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Theme from '../../../styles/theme';

import type { SxProps } from '@mui/material/styles';

export const FILE_SIZE = 1024 * 1024 * 5;

/**
 * THESE ARE VALUES THAT I FOUND FROM LOOKING AT THE TYPE PROPERTY AS I UPLOADED THEM TO MY LOCAL MACHINE.
 * I AM NOT SURE THEY WILL WORK FOR TYPESCRIPT AND OTHER FILE TYPES OUTSIDE OF MY LOCAL DEV SETTING.
 */
export const SUPPORTED_FORMATS = [
  '.json',
  '.pdf',
  '.txt',
  '.csv',
  '.docx',
  '.doc',
  '.xml',
  '.js',
  '.py',
  '.ts',
  '.xlsx',
  '.ppt',
  '.ogg',
  '.mpeg',
  '.mp4',
  '.webm',
  '.mp3',
  '.wav',
  '.png',
  '.jpeg',
  '.webp',
  '.mov',
  '.mpg',
  '.avi',
  '.wmv',
  '.mpegps',
  '.flv',
];

const listHeader: SxProps = {
  color: Theme.palette.secondary.light,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  borderBottom: `1px solid ${Theme.palette.primary.contrastText}`,
};

export const objective = (
  <List key={'objective-list'} id="objective-list">
    <Typography sx={listHeader}>
      Objective is the overall goal/purpose or main task you want executed. Some objective categories include:
    </Typography>
    <ListItem>
      <Typography>
        <b>Classification -</b> Assign a label or category to input.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Summarization -</b> Condense a longer text into a shorter summary.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Extraction -</b> Identify and extract specific information from the text.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Generation -</b> Create new text based on the given input or instructions.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Question Answering -</b> Provide an answer to a question based on the context.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Translation -</b> Translate text from one language to another.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Conversation -</b> Engage in a back-and-forth dialogue with the user.
      </Typography>
    </ListItem>
  </List>
);

export const instructions = (
  <List key={'instructions-list'} id="instructions-list">
    <Typography sx={listHeader}>
      Instructions are specific directions/constraints on how the model should carry out the objective. You can provide
      detailed guidelines or rules to follow while completing the objective task.
    </Typography>
    <ListItem>
      <Typography>
        <b>Control over output -</b> Length limitations, Writing style, Included or excluded information, Output
        structure.
      </Typography>
    </ListItem>

    <ListItem>
      <Typography>
        <b>Improved accuracy -</b> Clear instructions reduce ambiguity and help the model avoid irrelevant or incorrect
        responses.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Task-specific guidance -</b> For complex tasks, instructions break down the process into steps or provide
        examples to guide the model.
      </Typography>
    </ListItem>
  </List>
);

export const textData = (
  <List key={'text-data-list'} id="text-data-list">
    <Typography sx={listHeader}>
      The text data is actual text content that you want to process. This is the core input / raw data that the model
      will analyze, understand, and use to generate a response.It can be anything from a single sentence to a whole
      documents to multiple documents
    </Typography>
  </List>
);

export const examples = (
  <List key={'examples-list'} id="examples-list">
    <Typography sx={listHeader}>
      You provide concrete illustrations of the desired input and output.It's like showing the AI a few samples of what
      you expect, so it can better understand the task and generate more accurate and relevant responses.
    </Typography>
    <ListItem>
      <Typography>
        <b>Clarity and guidance -</b> Examples demonstrate the specific format, style, and content you're looking for,
        reducing ambiguity and potential errors.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Improved generalization -</b> By seeing different examples, the model can learn to apply the same logic or
        pattern to new, unseen inputs.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Faster learning -</b> Examples act as a form of "few-shot learning," allowing the model to grasp the task
        quickly with minimal training data.
      </Typography>
    </ListItem>
  </List>
);

export const constraints = (
  <List key={'constraints-list'} id="constraints-list">
    <Typography sx={listHeader}>
      You define any limitations or restrictions that you want to impose on the output. It's like setting boundaries or
      rules to adhere to when generating responses.
    </Typography>
    <ListItem>
      <Typography>
        <b>Control over content -</b> You can prevent the model from including certain information or topics in its
        output. For example, you might want to avoid sensitive topics, biased language, or specific keywords.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Maintain consistency -</b> Constraints help ensure that the generated text aligns with your brand voice,
        style guide, or specific requirements. For example, you can enforce a particular tone, writing style, or format.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Prevent undesirable outputs -</b> You can use constraints to avoid potentially harmful, unethical, or
        inappropriate content, promoting responsible usage.
      </Typography>
    </ListItem>
  </List>
);

export const tone = (
  <List key={'tone-list'} id="tone-list">
    <Typography sx={listHeader}>
      You define the overall mood or style of communication you want to adopt in the response.It's like providing
      personality instructions, influencing how it expresses information.
    </Typography>
    <ListItem>
      <Typography>
        <b>Creates the right impression -</b> Tone helps you tailor the response to the intended audience and context. A
        formal tone might be suitable for a business report, while a friendly tone works better for a casual
        conversation.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Enhances engagement -</b>Using an appropriate tone can make the response more engaging, relatable, and
        persuasive.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Reflects your brand -</b>For businesses, tone can help ensure that the AI-generated content aligns with their
        brand voice and values.
      </Typography>
    </ListItem>
  </List>
);

export const responseInstructions = (
  <List key={'response-instructions-list'} id="response-instructions-list">
    <Typography sx={listHeader}>
      You define how to deliver the information or fulfill the objective.It's like providing formatting or presentation
      guidelines for the output.
    </Typography>
    <ListItem>
      <Typography>
        <b>Structured output -</b> You can request specific formats like lists, tables, code blocks, or JSON, making the
        information organized and easier to use. Any text based format response works.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Content filtering -</b> You can specify what to include or exclude in the response, such as avoiding certain
        words, topics, or personal information.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Length control -</b> You can set limits on the length of the response, ensuring it's concise and relevant.
      </Typography>
    </ListItem>
    <ListItem>
      <Typography>
        <b>Style guidelines -</b> You can request a specific writing style, tone, or voice, aligning the output with
        your needs.
      </Typography>
    </ListItem>
  </List>
);
