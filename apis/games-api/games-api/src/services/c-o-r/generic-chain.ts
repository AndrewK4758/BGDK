import {
  activeGameDisplayChain,
  loadRegisterChain,
  logActionChain,
  outputContextResponseChain,
  registerChain,
  resetGameChain,
  startGameChain,
  turnChain,
} from '@bgdk/chains-for-games';
import { ChainBuilder } from '@bgdk/chain';

const genericChain = ChainBuilder.build(
  [
    logActionChain,
    loadRegisterChain,
    registerChain,
    turnChain,
    resetGameChain,
    startGameChain,
    activeGameDisplayChain,
    outputContextResponseChain,
  ],
  true,
);

export default genericChain;
