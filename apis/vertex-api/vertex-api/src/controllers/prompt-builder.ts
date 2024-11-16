import type { IPromptInputData } from '@bgdk/prompt-builder';
import { parseInput } from '@bgdk/prompt-builder';
import type { Request, Response } from 'express';

const promptBuilder = (req: Request, resp: Response) => {
  const { objective, instructions, textData, examples, constraints, tone, responseFormat, responseInstructions } =
    req.body as IPromptInputData;

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

  const finalPrompt = parseInput(promptData);

  resp.status(201).json({ finalPrompt });
};

export default promptBuilder;
