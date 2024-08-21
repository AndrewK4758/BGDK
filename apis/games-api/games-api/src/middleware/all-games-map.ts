import { AllGamesMap } from '@bgdk/all-games-map';

export const allGamesMap = new AllGamesMap();

const useAllGamesMap = (): AllGamesMap => allGamesMap;

export default useAllGamesMap;
