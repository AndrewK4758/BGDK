import {
  // type InputDataConstraints,
  // type InputDataResponseType,
  // type InputDataContext,
  // type InputDataExamples,
  // type InputDataTask,
  // type InputDataTone,
  type ResponseType,
} from '../types/prompt-input-data-types.js';

export interface IPromptInputData {
  // task: InputDataTask;
  // context: InputDataContext;
  // examples?: InputDataExamples;
  // constraints?: InputDataConstraints;
  // tone?: InputDataTone;
  // response: InputDataResponseType;
  objective: string;
  instructions?: string | string[];
  document?: Express.Multer.File;
  textData?: string | string[];
  examples?: string | string[] | Express.Multer.File;
  constraints?: string | string[];
  tone?: string | string[];
  responseFormat: ResponseType;
  responseInstructions?: string | string[];

  [Symbol.iterator](): Iterator<string | string[] | ResponseType | Express.Multer.File>;
}
