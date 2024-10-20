/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error: error is incorrect, type is used
import type { Express } from 'express';
// @ts-expect-error: error is incorrect, type is used
import type { Multer } from 'multer';

export enum ResponseType {
  TEXT = 'text',
  JSON = 'json',
}

