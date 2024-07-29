import { ChainBuilder } from '@bgdk/chain';
import { registerAction } from '../commands/action-register-player/register-player-start';
import { createPlayerID } from '../commands/action-register-player/create-player-id';
import { registerOnGameInstance } from '../commands/action-register-player/register-game-instance';
import { filterSelectedAvatar } from '../commands/action-register-player/filter-selected-avatar';
import { playerCreated } from '../commands/action-register-player/player-created';

export const registerChain = ChainBuilder.build(
  [registerAction, createPlayerID, registerOnGameInstance, filterSelectedAvatar, playerCreated],
  false,
);
