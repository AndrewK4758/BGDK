import type { Request, Response } from 'express';
import type { IPromptInputData } from '@bgdk/prompt-builder';
import { parseInput } from '@bgdk/prompt-builder';

const promptBuilder = (req: Request, resp: Response) => {
  const { objective, instructions, textData, examples, constraints, tone, responseFormat, responseInstructions } =
    req.body as IPromptInputData;

  const document = req.file;

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
  if (document) {
    if (document.mimetype === 'application/json') {
      const jsonString = document.buffer.toString('utf-8');
      const xmlJsonTemplate = `<![CDATA[${jsonString}]]>`;
      promptData['document'] = xmlJsonTemplate;
    } else promptData['document'] = document.buffer.toString('utf-8');
  }

  const finalPrompt = parseInput(promptData);

  console.log(finalPrompt, 'FINAL PROMPT');

  resp.status(201).json({ finalPrompt });
};

export default promptBuilder;
