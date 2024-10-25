import * as bcrypt from 'bcrypt';

const saltRounds = 10;

const generateSalt = async (): Promise<string> => await bcrypt.genSalt(saltRounds);

export default generateSalt;
