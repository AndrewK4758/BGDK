import { prisma } from '@bgdk/prisma';

const deleteValuesInstanceTimeMap = async (): Promise<void> => {
  try {
    await prisma.instance_time_map.deleteMany({ where: { minute_of_day: { equals: 2000 } } });
  } catch (err) {
    console.error(err);
  }
};

export default deleteValuesInstanceTimeMap;
