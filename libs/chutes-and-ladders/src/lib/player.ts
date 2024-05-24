import { IAvatar, IPlayer } from './interfaces';

export class Player implements IPlayer {
  Id: string;
  Name: string;
  Order!: number;
  Avatar!: IAvatar;
  constructor(name: string, id: string) {
    this.Name = name;
    this.Order;
    this.Avatar;
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

  get avatar(): IAvatar {
    return this.Avatar;
  }

  set avatar(avatar) {
    this.Avatar = avatar;
  }
}
