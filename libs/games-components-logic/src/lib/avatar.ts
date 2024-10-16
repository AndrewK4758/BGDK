import { Color } from '@bgdk/types-game';
import { IAvatar } from '../interfaces/avatar.js';
import { Space } from './space.js';

export class Avatar implements IAvatar {
  Name: string;
  Color: Color;
  Location!: Space;
  constructor(name: string, color: Color) {
    this.Name = name;
    this.Color = color;
  }

  get name() {
    return this.Name;
  }

  get color() {
    return this.Color;
  }

  get location() {
    return this.Location;
  }

  set location(location: Space) {
    this.Location = location;
  }

  _moveForward(numberOfSpaces: number): Space | null {
    let avatarCurLocation: Space = this.location;
    while (numberOfSpaces > 0) {
      if (!avatarCurLocation.next) return null;
      else avatarCurLocation = avatarCurLocation.next;
      numberOfSpaces--;
    }
    return avatarCurLocation;
  }

  _moveBackward(numberOfSpaces: number): Space | null {
    let avatarCurLocation: Space = this.location;
    while (numberOfSpaces > 0) {
      if (!avatarCurLocation.previous) return null;
      else avatarCurLocation = avatarCurLocation.previous;
      numberOfSpaces--;
    }
    return avatarCurLocation;
  }

  move(numberOfSpaces: number): void {
    const locBeforeMove: Space = this.location;
    const locAfterMove: Space | null =
      numberOfSpaces > 0 ? this._moveForward(numberOfSpaces) : this._moveBackward(Math.abs(numberOfSpaces));

    if (locAfterMove) {
      locBeforeMove.leave();
      locAfterMove.land(this);
    }
  }
}
