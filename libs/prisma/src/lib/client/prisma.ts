import { PrismaClient } from '@prisma/client';
const url = () => {
  if (process.env['NODE_ENV']) {
    return process.env['NODE_ENV'] === 'production' ? process.env['DB_URL_SSL'] : process.env['DB_URL_DEV'];
  } else return process.env['DB_URL_DEV'];
};
export const prisma = new PrismaClient({
  datasourceUrl: url(),
});
