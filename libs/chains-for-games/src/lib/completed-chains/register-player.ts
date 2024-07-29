import { ChainBuilder } from '@bgdk/chain';
import { createPlayerID } from '../commands/action-register-player/create-player-id';
import { filterSelectedAvatar } from '../commands/action-register-player/filter-selected-avatar';
import { playerCreated } from '../commands/action-register-player/player-created';
import { registerOnGameInstance } from '../commands/action-register-player/register-game-instance';
import { registerAction } from '../commands/action-register-player/register-player-start';

export const registerChain = ChainBuilder.build(
  [registerAction, createPlayerID, registerOnGameInstance, filterSelectedAvatar, playerCreated],
  false,
);
