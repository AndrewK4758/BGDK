import { PrismaClient, Prisma } from '@prisma/client';
const url = () => {
  if (process.env['NODE_ENV']) {
    return process.env['NODE_ENV'] === 'production' ? process.env['DB_URL_SSL'] : process.env['DB_URL_DEV'];
  } else return process.env['DB_URL_DEV'];
};

const prismaClient = new PrismaClient({
  datasourceUrl: url(),
});

export const prisma = prismaClient.$extends({
  model: {
    $allModels: {
      async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
        const context = Prisma.getExtensionContext(this);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (context as any).findFirst(where);
        return result !== null;
      },
    },
  },
});
