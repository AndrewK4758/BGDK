// import { readFileSync } from 'fs';

import type { IPromptInputData } from '../../interfaces/prompt-input-data.js';
import {
  ResponseType,
  type InputDataConstraints,
  type InputDataContext,
  type InputDataExamples,
  type InputDataResponseType,
  type InputDataTask,
  type InputDataTone,
} from '../../types/prompt-input-data-types.js';

// const products = readFileSync(`/home/ak475826/Projects/BGDK/libs/gen-ai/prompt-builder/data/products.json`, 'utf8');

const testText = `This is the test text for my prompt builder. This is an example of a list, 0,1,2,3,4,5. This is another example as a list - a, - b, - c, - d, - e, -f`;

const trialInputData: IPromptInputData = {
  task: {
    objective: 'organize the list items by value from the data provided',
    instructions:
      'use the numbers as keys and the letters as values to the keys. The order of the numbers will coorespond with the order of the letters. the remaining text will be discarded.',
  },
  responseType: {
    responseFormat: ResponseType.JSON,
    responseInstructions: 'add a key title with a value Response Title',
  },
  context: {
    textData: testText,
    document: undefined,
  },
  [Symbol.iterator]: function (): Iterator<
    InputDataTask | InputDataContext | InputDataExamples | InputDataTone | InputDataConstraints | InputDataResponseType
  > {
    return promptInputDataIterator(this);
  },
};

const promptInputDataIterator = (
  data: IPromptInputData,
): Iterator<
  InputDataTask | InputDataResponseType | InputDataContext | InputDataConstraints | InputDataExamples | InputDataTone
> => {
  let index = 0;
  const promptInputDataValues = [
    data.task,
    data.context,
    data.constraints,
    data.examples,
    data.responseType,
    data.tone,
  ].filter(Boolean);

  return {
    next: () => {
      if (index < promptInputDataValues.length) {
        return { value: promptInputDataValues[index++], done: false };
      } else {
        return { value: null, done: true };
      }
    },
  };
};

// const delimeter = '|';

const parseInput = (promptInput: IPromptInputData) => {
  // const xmlString = new XMLSerializer();

  for (const key of promptInput) {
    console.log(key);
  }

  console.log('done');
};

parseInput(trialInputData);
