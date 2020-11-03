/** Helper with mathematical functions */
export class MathHelper {
  /* Round numbers to a given number of significant digits */
  static roundToPrecisionLimit(value: number, precisionLimit: number): number {
    return +( value.toPrecision(precisionLimit) );
  }

  static isModuloWithinPrecisionLimit(value: number, modulo: number, precisionLimit: number): boolean {
    const limit: number = Math.pow(10, -precisionLimit);
    return Math.abs(value % modulo) <= limit || Math.abs(Math.abs(value % modulo) - modulo) <= limit;
  }

  static clampToRange(value: number, floor: number, ceil: number): number {
    return Math.min(Math.max(value, floor), ceil);
  }
}
