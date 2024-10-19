/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error: error is incorrect, type is used
import type { Express } from 'express';
// @ts-expect-error: error is incorrect, type is used
import type { Multer } from 'multer';

export enum ResponseType {
  TEXT = 'text',
  JSON = 'json',
}

export type InputDataTask = {
  objective: string;
  instructions?: string | string[];
};

export type InputDataContext = {
  document?: Express.Multer.File;
  textData?: string | string[];
};

export type InputDataExamples = {
  examples: string | string[] | Express.Multer.File;
};

export type InputDataConstraints = {
  constraints: string | string[];
};

export type InputDataTone = {
  tone: string | string[];
};

// TEXT ONLY
export type InputDataResponseType = {
  responseFormat: ResponseType;
  responseInstructions?: string | string[];
};
