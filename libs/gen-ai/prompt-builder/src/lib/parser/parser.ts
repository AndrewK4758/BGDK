import type { IPromptInputData } from '../../interfaces/prompt-input-data';

export const parseInput = (promptInput: IPromptInputData) => {
  let output = '';
  for (const key in promptInput) {
    if (key in promptInput) {
      const open = openXML(key);
      const close = closeXML(key);
      const val = promptInput[key];
      const section = `${open}\r\n${val}\r\n${close}\r\n`;

      output += section;
    }
  }
  return output;
};

const openXML = (elementTagText: string): string => `<${elementTagText}>`;
const closeXML = (elementTagText: string): string => `</${elementTagText}>`;
