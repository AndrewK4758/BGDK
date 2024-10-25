import { Die } from '../src/lib/die';

let D1: Die, D2: Die, D1_Sides: number, D2_Sides: number, minSideValue: number, max: number, min: number;
describe('Test funcntionality of Die Class', () => {
  beforeEach(() => {
    D1 = new Die(6);
    D2 = new Die(4);
    D1_Sides = D1.sides;
    D2_Sides = D2.sides;
    minSideValue = 1;
    max = 100;
    min = 0;
  });

  it('Test side generation', () => {
    expect(D1.sides).toBe(D1_Sides);
    expect(D2.sides).toBe(D2_Sides);
  });

  it('Test roll function with 100 rolls for each die', () => {
    while (min < max) {
      const D1_Roll = D1.roll();
      const D2_Roll = D2.roll();
      expect(D1_Roll).toBeGreaterThanOrEqual(minSideValue);
      expect(D1_Roll).toBeLessThanOrEqual(D1_Sides);

      expect(D2_Roll).toBeGreaterThanOrEqual(minSideValue);
      expect(D2_Roll).toBeLessThanOrEqual(D2_Sides);
      min++;
    }
  });
});
