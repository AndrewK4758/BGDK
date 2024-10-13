import { IDie } from '../interfaces/die.ts';
import { generateRandomNumber } from './utils.ts';

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
