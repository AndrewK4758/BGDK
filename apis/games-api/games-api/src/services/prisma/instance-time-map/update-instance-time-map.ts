import { GameInstanceID, Minute } from '@bgdk/types-game';
import prisma from '../client/prisma-client';

const updateInstanceTimeMap = async (minute: Minute, gameID: GameInstanceID): Promise<void> => {
  try {
    const resp = await prisma.instance_time_map.update({
      where: {
        minute_of_day: minute,
      },
      data: {
        games_in_minute: { push: gameID },
      },
    });

    console.log(resp);
  } catch (err) {
    console.error(err);
  }
};

export default updateInstanceTimeMap;
