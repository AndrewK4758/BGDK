import { Minute } from '@bgdk/types-game';
import prisma from '../client/prisma-client';

export type InstanceTimeMapValue = { minute_of_day: number; games_in_minute: string[] };

const getInstanceTimeMapValue = async (minute: Minute): Promise<InstanceTimeMapValue> => {
  try {
    return await prisma.instance_time_map.findUnique({
      where: { minute_of_day: minute },
    });
  } catch (err) {
    console.error(err);
  }
};

export default getInstanceTimeMapValue;
