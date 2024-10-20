import { ResponseType } from '../types/prompt-input-data-types.js';

export interface IPromptInputData {
  objective: string;
  instructions?: string;
  document?: string;
  textData?: string;
  examples?: string;
  constraints?: string;
  tone?: string;
  responseFormat: ResponseType;
  responseInstructions?: string;

  // [Symbol.iterator](): Iterator<string  | ResponseType>;
}

export const promptInputDataIterator = (
  data: IPromptInputData,
): Iterator<string | ResponseType | Express.Multer.File> => {
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
