import { ILiteSpace } from '../interfaces/lite-space.js';

export class LiteSpace implements ILiteSpace {
  display: string;

  constructor(display: string) {
    this.display = display;
  }

  static MakeSpace = (display: string) => new LiteSpace(display);
}
