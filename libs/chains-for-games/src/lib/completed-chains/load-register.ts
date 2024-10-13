import { ChainBuilder } from '@bgdk/chain';
import { loadRegister } from '../commands/action-load-register/load-register-start.ts';
import { sendLoadRegister } from '../commands/action-load-register/send-load-register-data.ts';

export const loadRegisterChain = ChainBuilder.build([loadRegister, sendLoadRegister], false);
