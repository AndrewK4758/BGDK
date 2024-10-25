import * as bcrypt from 'bcrypt';
import generateSalt from './salt';

export const generatePassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, await generateSalt());
