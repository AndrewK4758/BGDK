import { PrismaClient } from '@prisma/client';

console.log(process.env['NODE_ENV']);
const prisma = new PrismaClient({
  datasourceUrl: process.env['NODE_ENV'] === 'production' ? process.env['DB_URL_SSL'] : process.env['DB_URL_DEV'],
});
/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;
module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).

  console.log('\nSetting up Prisma Client\n');

  // Hint: Use `globalThis` to pass variables to global teardown.
  __TEARDOWN_MESSAGE__ = 'Deleting all data from local postgres db';
  globalThis.prisma = prisma;
  globalThis.__TEARDOWN_MESSAGE__ = __TEARDOWN_MESSAGE__;
};
