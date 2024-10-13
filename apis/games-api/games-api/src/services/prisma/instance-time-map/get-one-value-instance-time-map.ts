import { Minute } from '@bgdk/types-game';
import { prisma } from '@bgdk/prisma';
import { instance_time_map } from '@prisma/client';

const getInstanceTimeMapValue = async (minute: Minute): Promise<instance_time_map> => {
  try {
    return await prisma.instance_time_map.findUnique({
      where: { minute_of_day: minute },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getInstanceTimeMapValue;
