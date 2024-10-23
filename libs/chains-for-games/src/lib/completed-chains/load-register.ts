import { ChainBuilder } from '@bgdk/chain';
import loadRegister from '../commands/action-load-register/load-register-start';
import sendLoadRegister from '../commands/action-load-register/send-load-register-data';

export const loadRegisterChain = ChainBuilder.build([loadRegister, sendLoadRegister], false);
