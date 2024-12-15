import { ResponseType } from '../types/prompt-input-data-types';

export interface IPromptInputData {
  [key: string]: string | undefined | null | ResponseType;
  objective: string;
  responseFormat: ResponseType;
  instructions?: string | undefined;
  document?: string | null;
  textData?: string | undefined;
  examples?: string | undefined;
  constraints?: string | undefined;
  tone?: string | undefined;
  responseInstructions?: string | undefined;

  // [Symbol.iterator](): Iterator<string  | ResponseType>;
}

// export const promptInputDataIterator = (data: IPromptInputData): Iterator<string | ResponseType> => {
//   let index = 0;
//   const promptInputDataValues = [
//     data.objective,
//     data.instructions,
//     data.document,
//     data.textData,
//     data.examples,
//     data.constraints,
//     data.tone,
//     data.responseFormat,
//     data.responseInstructions,
//   ].filter(Boolean);

//   return {
//     next: () => {
//       if (index < promptInputDataValues.length) {
//         return { value: promptInputDataValues[index++], done: false };
//       } else {
//         return { value: undefined, done: true };
//       }
//     },
//   };
// };
