import { IRule } from './rule';
import { Chain } from './chain';

export interface IBuiltGame {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  rules: IRule[];
  chain: Chain | null;
  instance(): unknown;
}
