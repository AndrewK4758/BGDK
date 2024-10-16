import { ChainBuilder } from '@bgdk/chain';
import { loadRegister } from '../commands/action-load-register/load-register-start.js';
import { sendLoadRegister } from '../commands/action-load-register/send-load-register-data.js';

export const loadRegisterChain = ChainBuilder.build([loadRegister, sendLoadRegister], false);
