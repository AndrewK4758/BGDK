import type { IPromptInputData } from '../../interfaces/prompt-input-data.js';

// const delimeter = '|';

export const parseInput = (promptInput: IPromptInputData) => {
  let output = '';
  for (const key in promptInput) {
    console.log(key);
    if (key in promptInput) {
      console.log(promptInput[key]);
      const open = openXML(key);
      const close = closeXML(key);
      const val = promptInput[key];
      const section = `${open}\r\n${val}\r\n${close}\r\n`;
      console.log(section);
      output += section;
    }
  }
  return output;
};

const openXML = (elementTagText: string): string => `<${elementTagText}>`;
const closeXML = (elementTagText: string): string => `</${elementTagText}>`;
