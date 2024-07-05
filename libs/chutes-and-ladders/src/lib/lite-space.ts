import { IAvatar, ILiteSpace } from '@bgdk/types-game';

export class LiteSpace implements ILiteSpace {
  display: string;
  avatarsInSpace: IAvatar[];

  constructor(display: string, avatarsInSpace: IAvatar[]) {
    this.display = display;
    this.avatarsInSpace = avatarsInSpace;
  }

  static MakeSpace = (display: string, avatarsInSpace: IAvatar[]) => new LiteSpace(display, avatarsInSpace);
}
