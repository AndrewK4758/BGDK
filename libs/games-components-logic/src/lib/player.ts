import { IPlayer } from '../interfaces/player';
import { Avatar } from './avatar';

export class Player implements IPlayer {
  Id: string;
  Name: string;
  Order!: number;
  Avatar!: Avatar;
  constructor(name: string, id: string) {
    this.Name = name;
    this.Id = id;
  }

  get id(): string {
    return this.Id;
  }

  get name(): string {
    return this.Name;
  }

  get order(): number {
    return this.Order;
  }

  set order(order) {
    this.Order = order;
  }

  get avatar(): Avatar {
    return this.Avatar;
  }

  set avatar(avatar: Avatar) {
    this.Avatar = avatar;
  }
}
