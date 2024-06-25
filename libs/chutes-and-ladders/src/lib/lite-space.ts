import { IAvatar, ILiteSpace, SpaceType } from '@bgdk/game-types';

export class LiteSpace implements ILiteSpace {
  Value!: string;
  Type!: SpaceType;
  Display!: string | number;
  AvatarsInSpace!: IAvatar[];

  get value() {
    return this.Value;
  }

  get type() {
    return this.Type;
  }

  get display() {
    return this.Display;
  }

  get avatarsInSpace() {
    return this.AvatarsInSpace;
  }

  get occupied() {
    return this.AvatarsInSpace.length > 0;
  }

  static MakeSpace = () => new LiteSpace();
}
