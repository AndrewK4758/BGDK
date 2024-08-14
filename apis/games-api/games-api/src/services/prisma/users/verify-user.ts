import { checkPassword } from '@bgdk/password';

const verifyUser = async (password: string, hashPassword: string) => {
  try {
    return await checkPassword(password, hashPassword);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default verifyUser;
