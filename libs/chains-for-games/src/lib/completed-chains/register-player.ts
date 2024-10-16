import { ChainBuilder } from '@bgdk/chain';
import { createPlayerID } from '../commands/action-register-player/create-player-id.js';
import { filterSelectedAvatar } from '../commands/action-register-player/filter-selected-avatar.js';
import { playerCreated } from '../commands/action-register-player/player-created.js';
import { registerOnGameInstance } from '../commands/action-register-player/register-on-game-instance.js';
import { registerAction } from '../commands/action-register-player/register-player-start.js';

export const registerChain = ChainBuilder.build(
  [registerAction, createPlayerID, registerOnGameInstance, filterSelectedAvatar, playerCreated],
  false,
);
