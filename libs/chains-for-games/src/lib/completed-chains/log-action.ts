import { ChainBuilder } from '@bgdk/chain';
import { logAction } from '../commands/action-log/log-actions-start.js';

export const logActionChain = ChainBuilder.build([logAction], false);
