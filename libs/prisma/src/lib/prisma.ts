import { PrismaClient } from '@prisma/client';

process.env['NODE_ENV'] = 'production';

export const prisma = new PrismaClient({
  datasourceUrl: process.env['NODE_ENV'] === 'development' ? process.env['DB_URL_SSL'] : process.env['PG_AE_URL'],
});

