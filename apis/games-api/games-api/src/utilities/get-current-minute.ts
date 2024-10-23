import { Minute } from '@bgdk/types-game';

const getCurrentMinute = (): Minute => {
  const currentTime = new Date();
  return currentTime.getHours() * 60 + currentTime.getMinutes();
};

export default getCurrentMinute;
