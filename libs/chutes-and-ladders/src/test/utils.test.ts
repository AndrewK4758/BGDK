import { Die } from '../lib/die';
import { IDie } from '../lib/interfaces';
import {
  generateRandomNumber,
  rollDice,
  rollMultipleDiceAndSum,
  rollMultipleDiceMultipleTimes,
  rollSingleDiceMultipleTimes,
  rollSingleDiceMultipleTimesAndSum,
  rangeSelector,
} from '../lib/utils';

let D1: IDie,
  D2: IDie,
  D1_Sides: number,
  D2_Sides: number,
  max: number,
  min: number,
  count: number,
  totalRolls: number,
  minSideValue: number;

describe('Test all utils functions', () => {
  beforeEach(() => {
    D1 = new Die(6);
    D2 = new Die(4);
    D1_Sides = D1.sides;
    D2_Sides = D2.sides;
    minSideValue = 1;
    max = 100;
    min = 0;
    count = 10;
    totalRolls = 10;
  });

  test('TesD1: IDie, D1: IDie, ...dice: [IDie]generation', () => {
    while (min < max) {
      const randNum1 = generateRandomNumber(D1_Sides);
      const randNum2 = generateRandomNumber(D2_Sides);

      expect(randNum1).toBeGreaterThanOrEqual(minSideValue);
      expect(randNum1).toBeLessThanOrEqual(D1_Sides);

      expect(randNum2).toBeGreaterThanOrEqual(minSideValue);
      expect(randNum2).toBeLessThanOrEqual(D2_Sides);

      min++;
    }
  });

  test('Test functionality of rollDice function', () => {
    while (min < max) {
      const rollVals = rollDice([D1, D2]);
      expect(rollVals[0]).toBeGreaterThanOrEqual(minSideValue);
      expect(rollVals[1]).toBeGreaterThanOrEqual(minSideValue);
      expect(rollVals[0]).toBeLessThanOrEqual(D1_Sides);
      expect(rollVals[1]).toBeLessThanOrEqual(D2_Sides);
      min++;
    }
  });

  test('Test rollSingleDiceMultipleTimes function', () => {
    while (min < max) {
      const singleDiceRollsD1 = rollSingleDiceMultipleTimes(count, D1);
      const singleDiceRollsD2 = rollSingleDiceMultipleTimes(count, D2);
      expect(singleDiceRollsD1.length).toBe(count);
      expect(singleDiceRollsD2.length).toBe(count);
      min++;
    }
  });

  test('Test rollMultipleDiceMultipleTimes function', () => {
    while (min < count) {
      const multDiceRolls = rollMultipleDiceMultipleTimes(totalRolls, [D1, D2]);

      expect(multDiceRolls.length).toBe(totalRolls);
      expect(multDiceRolls[min].reduce((a: number, b: number) => a + b)).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(multDiceRolls[min].reduce((a: number, b: number) => a + b)).toBeLessThanOrEqual(D1_Sides + D2_Sides);
      expect(multDiceRolls).toBeInstanceOf(Array);
      min++;
    }
  });

  test('Test rollSingleDiceMultipleTimesAndSum function', () => {
    while (min < max) {
      const singleDiceRollsD1 = rollSingleDiceMultipleTimesAndSum(count, D1);
      const singleDiceRollsD2 = rollSingleDiceMultipleTimesAndSum(count, D2);

      expect(singleDiceRollsD1.sum).toBeGreaterThanOrEqual(minSideValue * count);
      expect(singleDiceRollsD1.sum).toBeLessThanOrEqual(D1_Sides * count);

      expect(singleDiceRollsD2.sum).toBeGreaterThanOrEqual(minSideValue * count);
      expect(singleDiceRollsD2.sum).toBeLessThanOrEqual(D2_Sides * count);
      min++;
    }
  });

  test('Test rollMultipleDiceAndSum function', () => {
    while (min < max) {
      const doubleD1Roll = rollMultipleDiceAndSum([D1, D1]);
      const doubleD2Roll = rollMultipleDiceAndSum([D2, D2]);
      const doubleMixedDieRoll = rollMultipleDiceAndSum([D1, D2]);

      expect(doubleD1Roll.sum).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleD1Roll.sum).toBeLessThanOrEqual(D1_Sides * 2);

      expect(doubleD2Roll.sum).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleD2Roll.sum).toBeLessThanOrEqual(D2_Sides * 2);

      expect(doubleMixedDieRoll.sum).toBeGreaterThanOrEqual(minSideValue * 2);
      expect(doubleMixedDieRoll.sum).toBeLessThanOrEqual(D1_Sides + D2_Sides);
      min++;
    }
  });

  test('Test rangeSelector function', () => {
    while (min < max) {
      const range1 = rangeSelector(1, 100);

      expect(range1).toBeGreaterThanOrEqual(1);
      expect(range1).toBeLessThanOrEqual(100);

      min++;
    }
  });
});

console.log(
  'An 6 sided die would be optimum because it would take, at min, 19 rounds if someone were to roll an 8 at each turn and not land on any chutes or ladders spaces. \n Also, each player would have the ability to progress far enough through one row on one turn to increase the probability of landing on a chute or ladder space'
);
