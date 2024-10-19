import { readFileSync } from 'fs';

import type { IPromptInputData } from '../../interfaces/prompt-input-data.js';
import { ResponseType } from '../../types/prompt-input-data-types.js';

const products = readFileSync(`/home/ak475826/Projects/BGDK/libs/gen-ai/prompt-builder/data/products.json`, 'utf8');

// const testData = `0,1,2,3,4,5 | a, b, c, d, e, f`;

const trialInputData: IPromptInputData = {
  objective: 'organize the list items by value from the data provided',
  instructions:
    'use the numbers as keys and the letters as values to the keys. The order of the numbers will coorespond with the order of the letters. the remaining text will be discarded.',

  responseFormat: ResponseType.JSON,
  responseInstructions: 'add a key title with a value Response Title',

  textData: products,

  [Symbol.iterator]: function (): Iterator<string | string[] | ResponseType | Express.Multer.File> {
    return promptInputDataIterator(this);
  },
};

const promptInputDataIterator = (
  data: IPromptInputData,
): Iterator<string | string[] | ResponseType | Express.Multer.File> => {
  let index = 0;
  const promptInputDataValues = [
    data.objective,
    data.instructions,
    data.document,
    data.textData,
    data.examples,
    data.constraints,
    data.tone,
    data.responseFormat,
    data.responseInstructions,
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
  let output = '';

  for (const key in promptInput) {
    console.log(key);
    console.log(promptInput[key]);
    if (Object.hasOwn(promptInput, key)) {
      const open = openXML(key);
      const close = closeXML(key);
      const val = promptInput[key];
      const section = `${open}${val}${close}\r\n`;
      console.log(section);
      output += section;
    }
  }

  console.log(output);
};

const openXML = (elementTagText: string) => `<${elementTagText}>`;
const closeXML = (elementTagText: string) => `</${elementTagText}>`;

parseInput(trialInputData);
