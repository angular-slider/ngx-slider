export class ValuePositionConverter {
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
}
