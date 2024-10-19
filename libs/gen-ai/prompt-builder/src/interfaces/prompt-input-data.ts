import {
  InputDataConstraints,
  InputDataResponseType,
  InputDataContext,
  InputDataExamples,
  InputDataTask,
  InputDataTone,
} from '../types/prompt-input-data-types.js';

export interface IPromptInputData {
  task: InputDataTask;
  context?: InputDataContext;
  examples?: InputDataExamples;
  tone?: InputDataTone;
  constraints?: InputDataConstraints;
  responseType: InputDataResponseType;

  [Symbol.iterator](): Iterator<
    InputDataTask | InputDataContext | InputDataExamples | InputDataTone | InputDataConstraints | InputDataResponseType
  >;
}
