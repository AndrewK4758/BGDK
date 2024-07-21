import { IDie } from '../interfaces/die';
import { generateRandomNumber } from './utils';

export class Die implements IDie {
  Sides: number;
  constructor(sides: number) {
    this.Sides = sides;
  }

  get sides() {
    return this.Sides;
  }

  roll(): number {
    return generateRandomNumber(this.sides);
  }
}
