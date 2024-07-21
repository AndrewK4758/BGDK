import { Avatar } from '../lib/avatar';

export interface IPlayer {
  Name: string;
  Id: string;
  Order: number;
  Avatar: Avatar;
  get name(): string;
  get id(): string;
  get order(): number;
  set order(order: number);
  get avatar(): Avatar;
  set avatar(avatar: Avatar);
}
