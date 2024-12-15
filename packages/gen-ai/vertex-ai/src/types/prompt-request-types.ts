import type { FileData } from '@google-cloud/vertexai';

export declare type GcsBucketPath = `gs://${string}`;

export declare type PromptRequest = {
  text: string | null;
  fileData: FileData | null | undefined;
};
