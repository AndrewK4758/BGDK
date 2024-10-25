import * as bcrypt from 'bcrypt';

export const checkPassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err: unknown) {
    console.error(err);
    throw (err as Error).message;
  }
};
