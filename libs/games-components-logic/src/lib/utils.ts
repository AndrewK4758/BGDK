import { IDie } from '../interfaces/die';
import { ISummedRoll } from '../interfaces/summed-roll';

export const generateRandomNumber = (upperBound: number): number => {
  return Math.floor(Math.random() * upperBound) + 1;
};

export const rollDice = (dice: IDie[]): number[] => {
  return dice.map(shake => shake.roll());
};

export const rollSingleDiceMultipleTimes = (count: number, die: IDie, rolls: Array<number> = []): number[] => {
  if (count > 0) {
    rolls.push(die.roll());
    rollSingleDiceMultipleTimes(count - 1, die, rolls);
  }
  return rolls;
};

export const rollMultipleDiceMultipleTimes = (totalRolls: number, dice: IDie[], rolls: number[][] = []): number[][] => {
  if (totalRolls > 0) {
    rolls.push(rollDice(dice));
    rollMultipleDiceMultipleTimes(totalRolls - 1, dice, rolls);
  }
  return rolls;
};

export const rollSingleDiceMultipleTimesAndSum = (count: number, dice: IDie, rolls: number[] = []): ISummedRoll => {
  if (count > 0) {
    rolls.push(dice.roll());
    rollSingleDiceMultipleTimesAndSum(count - 1, dice, rolls);
  }
  return {
    rollValues: rolls,
    sum: rolls.reduce((a, b) => a + b, 0),
  } as ISummedRoll;
};

export const rollMultipleDiceAndSum = (dice: IDie[]): ISummedRoll => {
  const rolls = dice.map(shake => shake.roll());
  return {
    rollValues: rolls,
    sum: rolls.reduce((a, b) => a + b, 0),
  } as ISummedRoll;
};

export const rangeSelector = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

export const rowFinder = (indexOfSpace: number, totalSpaces: number): number =>
  Math.floor(indexOfSpace / Math.ceil(rowMaker(totalSpaces)));


export const rowMaker = (totalSpaces: number): number => Math.ceil(Math.sqrt(totalSpaces));
