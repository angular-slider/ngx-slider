import { expect as baseExpect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { ElementLocation } from './element-location';
import { ElementSize } from './element-size';

function isWithinTolerance(
  actual: number,
  expected: number,
  tolerance: number
): boolean {
  return Math.abs(actual - expected) <= tolerance;
}

async function getElementRelativeLocationWithoutMargins(parentLocator: Locator, elementLocator: Locator): Promise<ElementLocation> {
  return new Promise<ElementLocation>(
    (resolve, reject): void => {

      Promise.all([
        parentLocator.boundingBox(),
        parentLocator.evaluate((element) => window.getComputedStyle(element).getPropertyValue('margin-top')),
        parentLocator.evaluate((element) => window.getComputedStyle(element).getPropertyValue('margin-left')),
        elementLocator.boundingBox(),
        elementLocator.evaluate((element) => window.getComputedStyle(element).getPropertyValue('margin-top')),
        elementLocator.evaluate((element) => window.getComputedStyle(element).getPropertyValue('margin-left')),
      ])
        .then(
          (values: any[]): void => {
            const parentLocation: ElementLocation = values[0];
            const parentMarginTop: number = +values[1].replace('px', '');
            const parentMarginLeft: number = +values[2].replace('px', '');
            const elementLocation: ElementLocation = values[3];
            const elementMarginTop: number = +values[4].replace('px', '');
            const elementMarginLeft: number = +values[5].replace('px', '');

            resolve({
              x: (elementLocation.x + elementMarginLeft) - (parentLocation.x - parentMarginLeft),
              y: (elementLocation.y + elementMarginTop) - (parentLocation.y - parentMarginTop),
            });
          },
          (error: any): void => {
            reject(error);
          }
        );
    }
  );
}


export const expect = baseExpect.extend({
  async toHaveApproximateLocation(locator: Locator, expected: ElementLocation, options?: { tolerance?: number }) {
    const assertionName = 'toHaveApproximateLocation';
    let pass: boolean;
    let actual: ElementLocation;
    const tolerance = options?.tolerance ?? 1;
    let error: any;

    try {
      const box = await locator.boundingBox();
      actual = { x: box.x, y: box.y };
      if (this.isNot) {
        pass = !isWithinTolerance(actual.x, expected.x, tolerance) ||
          !isWithinTolerance(actual.y, expected.y, tolerance);
      } else {
        pass = isWithinTolerance(actual.x, expected.x, tolerance) &&
          isWithinTolerance(actual.y, expected.y, tolerance);
      }
    } catch (e: any) {
      pass = false;
      error = e;
    }

    const expectedText = `Expected element location ${this.isNot ? 'not ' : ''}to be within ` +
      `{x: ${expected.x - tolerance}..${expected.x + tolerance},` +
      ` y: ${expected.y - tolerance}..${expected.y + tolerance}}\n`;

    const message = () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
      '\n\n' +
      `Locator: ${locator}\n` +
      expectedText +
      (actual ? `Received: {x: ${actual.x}, y: ${actual.y}}` : '') +
      (error ? `Received error: ${error}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: actual
    };
  },

  async toHaveRelativeLocationWithoutMargins(locator: Locator, expected: ElementLocation, options: { relativeTo: Locator, tolerance?: number }) {
    const assertionName = 'toHaveRelativeLocationWithoutMargins';
    let pass: boolean;
    let actual: ElementLocation;
    const tolerance = options.tolerance ?? 1;
    let error: any;

    try {
      actual = await getElementRelativeLocationWithoutMargins(options.relativeTo, locator);
      if (this.isNot) {
        pass = !isWithinTolerance(actual.x, expected.x, tolerance) ||
          !isWithinTolerance(actual.y, expected.y, tolerance);
      } else {
        pass = isWithinTolerance(actual.x, expected.x, tolerance) &&
          isWithinTolerance(actual.y, expected.y, tolerance);
      }
    } catch (e: any) {
      pass = false;
      error = e;
    }

    const expectedText = `Expected element relative location without margins ${this.isNot ? 'not ' : ''}to be within ` +
      `{x: ${expected.x - tolerance}..${expected.x + tolerance},` +
      ` y: ${expected.y - tolerance}..${expected.y + tolerance}}\n`;

    const message = () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
      '\n\n' +
      `Locator: ${locator}\n` +
      expectedText +
      (actual ? `Received: {x: ${actual.x}, y: ${actual.y}}` : '') +
      (error ? `Received error: ${error}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: actual
    };
  },

  async toHaveApproximateSize(locator: Locator, expected: ElementSize, options?: { tolerance?: number }) {
    const assertionName = 'toHaveApproximateSize';
    let pass: boolean;
    let actual: ElementSize;
    const tolerance = options?.tolerance ?? 1;
    let error: any;

    try {
      const box = await locator.boundingBox();
      actual = { width: box.width, height: box.height };
      if (this.isNot) {
        pass = !isWithinTolerance(actual.width, expected.width, tolerance) ||
          !isWithinTolerance(actual.height, expected.height, tolerance);
      } else {
        pass = isWithinTolerance(actual.width, expected.width, tolerance) &&
          isWithinTolerance(actual.height, expected.height, tolerance);
      }
    } catch (e: any) {
      pass = false;
      error = e;
    }

    const expectedText = `Expected element size ${this.isNot ? 'not ' : ''}to be within ` +
      `{width: ${expected.width - tolerance}..${expected.width + tolerance},` +
      ` height: ${expected.height - tolerance}..${expected.height + tolerance}}\n`;

    const message = () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
      '\n\n' +
      `Locator: ${locator}\n` +
      expectedText +
      (actual ? `Received: {width: ${actual.width}, height: ${actual.height}}` : '') +
      (error ? `Received error: ${error}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: actual
    };
  },
});
