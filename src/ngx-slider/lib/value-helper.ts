import { CustomStepDefinition } from './options';

/**
 *  Collection of functions to handle conversions/lookups of values
 */
export class ValueHelper {
  static isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
  }

  static areArraysEqual(array1: any[], array2: any[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i: number = 0; i < array1.length; ++i) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }

  static linearValueToPosition(val: number, minVal: number, maxVal: number): number {
    const range: number = maxVal - minVal;
    return (val - minVal) / range;
  }

  static logValueToPosition(val: number, minVal: number, maxVal: number): number {
    val = Math.log(val);
    minVal = Math.log(minVal);
    maxVal = Math.log(maxVal);
    const range: number = maxVal - minVal;
    return (val - minVal) / range;
  }

  static linearPositionToValue(percent: number, minVal: number, maxVal: number): number {
    return percent * (maxVal - minVal) + minVal;
  }

  static logPositionToValue(percent: number, minVal: number, maxVal: number): number {
    minVal = Math.log(minVal);
    maxVal = Math.log(maxVal);
    const value: number = percent * (maxVal - minVal) + minVal;
    return Math.exp(value);
  }

  static findStepIndex(modelValue: number, stepsArray: CustomStepDefinition[]): number {
    const differences: number[] = stepsArray.map((step: CustomStepDefinition): number => Math.abs(modelValue - step.value));

    let minDifferenceIndex: number = 0;
    for (let index: number = 0; index < stepsArray.length; index++) {
      if (differences[index] !== differences[minDifferenceIndex] && differences[index] < differences[minDifferenceIndex]) {
        minDifferenceIndex = index;
      }
    }

    return minDifferenceIndex;
  }
}
