import type { IPromptInputData } from '../../interfaces/prompt-input-data';

export const parseInput = (promptInput: IPromptInputData) => {
  let xmlOutput = '<?xml version="1.0" encoding="UTF-8"?>';

  const buildXML = (input: IPromptInputData, level = 0) => {
    console.log(input);
    for (const key in promptInput) {
      const indent = ' '.repeat(level * 2);

      xmlOutput += `\n${openXML(key, indent)}${input[key]}${closeXML(key)}`;
    }
  };
  xmlOutput += '\n<root>';
  buildXML(promptInput, 1);
  xmlOutput += '\n</root>';

  return xmlOutput;
};

const openXML = (elementTagText: string, indent: string): string => `${indent}<${elementTagText}>`;
const closeXML = (elementTagText: string): string => `</${elementTagText}>`;
