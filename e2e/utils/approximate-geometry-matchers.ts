import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import { ElementLocation } from './element-location';
import { ElementSize } from './element-size';

class BaseMatcher {
  constructor(private util: MatchersUtil, private customEqualityTesters: CustomEqualityTester[]) {}

  isWithinTolerance(actual: number, expected: number, tolerance: number): boolean {
    return Math.abs(actual - expected) <= tolerance;
  }
}

class ApproximateLocationMatcher extends BaseMatcher {
  constructor(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]) {
    super(util, customEqualityTesters);
  }

  compare(actual: ElementLocation, expected: ElementLocation, tolerance: number = 1): CustomMatcherResult {
    const pass: boolean =
      this.isWithinTolerance(actual.x, expected.x, tolerance) &&
      this.isWithinTolerance(actual.y, expected.y, tolerance);

    const message: string = `Expected {x: ${actual.x}, y: ${actual.y}}` +
      ` ${pass ? 'not ' : ''}to be within` +
      ` {x: ${expected.x - tolerance}..${expected.x + tolerance},` +
      ` y: ${expected.y - tolerance}..${expected.y + tolerance}}`;

    return {
      pass: pass,
      message
    };
  }
}

class ApproximateSizeMatcher extends BaseMatcher {
  constructor(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]) {
    super(util, customEqualityTesters);
  }

  compare(actual: ElementSize, expected: ElementSize, tolerance: number = 1): CustomMatcherResult {
    const pass: boolean =
      this.isWithinTolerance(actual.width, expected.width, tolerance) &&
      this.isWithinTolerance(actual.height, expected.height, tolerance);

    const message: string = `Expected {width: ${actual.width}, height: ${actual.height}}` +
      ` ${pass ? 'not ' : ''}to be within` +
      ` {width: ${expected.width - tolerance}..${expected.width + tolerance},` +
      ` height: ${expected.height - tolerance}..${expected.height + tolerance}}`;

    return {
      pass: pass,
      message
    };
  }
}

export const approximateGeometryMatchers: CustomMatcherFactories = {
  toBeApproximateLocation(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher {
    const matcher: ApproximateLocationMatcher = new ApproximateLocationMatcher(util, customEqualityTesters);
    return {
      compare: (actual: ElementLocation, expected: ElementLocation, tolerance: number = 1): CustomMatcherResult => {
        return matcher.compare(actual, expected, tolerance);
      }
    };
  },

  toBeApproximateSize(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher {
    const matcher: ApproximateSizeMatcher = new ApproximateSizeMatcher(util, customEqualityTesters);
    return {
      compare: (actual: ElementSize, expected: ElementSize, tolerance: number = 1): CustomMatcherResult => {
        return matcher.compare(actual, expected, tolerance);
      }
    };
  }
};

// HACK: typescript compiler as invoked in e2e tests is getting quite confused about types,
// even if it is fed the right type declarations in .d.ts file.
// As a workaround, this module re-exports the global expect object, extending it with interface defining our custom matchers
// It may be stupid, but it hey, it works
export interface ApproximateGeometryMatchersInterface<T> extends jasmine.Matchers<T> {
  toBeApproximateLocation(expected: any, expectationFailOutput?: any): boolean;
  toBeApproximateSize(expected: any, expectationFailOutput?: any): boolean;
}

const _global: any = <any>(typeof window === 'undefined' ? global : window);
export const expect: (actual: any) => ApproximateGeometryMatchersInterface<any> = <any>_global.expect;

