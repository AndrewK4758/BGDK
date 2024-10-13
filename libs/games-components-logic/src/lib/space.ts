import { SpaceType } from '@bgdk/types-game';
import { ISpace } from '../interfaces/space.ts';
import { Avatar } from '../lib/avatar.ts';

export class Space implements ISpace {
  Value: string;
  Type: SpaceType;
  Previous!: Space;
  Next!: Space;
  Special: Space | null;
  AvatarsInSpace: Avatar[];
  Display: string;

  constructor(spaceType: SpaceType, spaceValue: string | number) {
    this.Type = spaceType;
    this.Value = String(spaceValue) as string;
    this.Special = null;
    this.AvatarsInSpace = [];
    this.Display = String(this.Value);
  }

  get value() {
    return this.Value;
  }

  get type() {
    return this.Type;
  }

  get previous(): Space {
    return this.Previous;
  }

  set previous(previous: Space) {
    this.Previous = previous;
  }

  get next(): Space {
    return this.Next;
  }

  set next(next: Space) {
    this.Next = next;
  }

  get special(): Space | null {
    return this.Special;
  }

  set special(special: Space) {
    this.Special = special;
  }

  get avatarsInSpace() {
    return this.AvatarsInSpace;
  }

  get occupied() {
    return this.avatarsInSpace.length > 0;
  }

  get display() {
    return this.Display;
  }

  set display(displayToken: string) {
    this.Display = displayToken;
  }

  land(avatar: Avatar): void {
    this.ifOccupied();
    if (this.special) {
      this.special.land(avatar);
    } else {
      this.avatarsInSpace.push(avatar);
      avatar.location = this;
    }
  }

  leave(): void {
    if (this.type === SpaceType.START) this.avatarsInSpace.shift();
    else this.avatarsInSpace.pop();
  }

  ifOccupied(): void {
    if (this.occupied && this.type !== SpaceType.START) {
      this.avatarsInSpace[0].move(1);
    }
  }
}
