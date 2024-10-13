import { ChainBuilder } from '@bgdk/chain';
import { outputContextResponse } from '../commands/action-output/output-context-response.ts';

export const outputContextResponseChain = ChainBuilder.build([outputContextResponse], false);
