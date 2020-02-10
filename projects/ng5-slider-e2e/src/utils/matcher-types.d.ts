declare namespace jasmine {
  interface Matchers<T> {
    toBeApproximateLocation(expected: any, expectationFailOutput?: any): boolean;
    toBeApproximateSize(expected: any, expectationFailOutput?: any): boolean;
  }
}