import type { Request, Response } from 'express';
import type { IPromptInputData } from '@bgdk/prompt-builder';
import { parseInput } from '@bgdk/prompt-builder';

const promptBuilder = (req: Request, resp: Response) => {
  const { objective, instructions, textData, examples, constraints, tone, responseFormat, responseInstructions } =
    req.body as IPromptInputData;

  const document = req.file;

  console.log(document);
  const promptData: IPromptInputData = {
    objective: objective,
    responseFormat: responseFormat,
  };

  if (instructions) promptData['instructions'] = instructions;
  if (textData) promptData['textData'] = textData;
  if (examples) promptData['examples'] = examples;
  if (constraints) promptData['constraints'] = constraints;
  if (tone) promptData['tone'] = tone;
  if (responseInstructions) promptData['responseInstructions'] = responseInstructions;
  if (document) promptData['document'] = document.buffer.toString();
  const finalPrompt = parseInput(promptData);

  console.log(finalPrompt, 'FINAL PROMPT');

  resp.status(201).json({ finalPrompt });
};

export default promptBuilder;
