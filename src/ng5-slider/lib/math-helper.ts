/** Helper with mathematical functions */
export class MathHelper {
  /* Round numbers to a given number of significant digits */
  static roundToPrecisionLimit(value: number, precisionLimit: number): number {
    return +( value.toPrecision(precisionLimit) );
  }
}
