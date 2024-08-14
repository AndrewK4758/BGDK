import * as bcrypt from 'bcrypt';

export const checkPassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
