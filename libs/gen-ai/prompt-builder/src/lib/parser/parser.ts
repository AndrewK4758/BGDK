import type { IPromptInputData } from '../../interfaces/prompt-input-data.js';

// const delimeter = '|';

export const parseInput = (promptInput: IPromptInputData) => {
  let output = '';
  for (const key in promptInput) {
    console.log(key);
    console.log(promptInput[key]);
    if (Object.hasOwn(promptInput, key)) {
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

const openXML = (elementTagText: string) => `<${elementTagText}>`;
const closeXML = (elementTagText: string) => `</${elementTagText}>`;
