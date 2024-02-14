import { test, Page, Locator } from '@playwright/test';
import { expect } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/custom-ticks-legend-slider?testMode=true');
}

function getSlider(page: Page): Locator {
  return page.locator('ngx-slider');
}

function getSliderFloorLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-floor');
}

function getSliderCeilLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-ceil');
}

function getSliderPointer(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-pointer-min');
}

function getSliderPointerLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-model-value');
}

function getSliderFullBar(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-full-bar');
}

function getSliderTick(page: Page, tickNumber: number): Locator {
  return getSlider(page).locator(`span.ngx-slider-tick:nth-of-type(${tickNumber})`);
}

function getSliderTickValue(page: Page, tickNumber: number): Locator {
  return getSliderTick(page, tickNumber).locator('.ngx-slider-tick-value');
}

function getSliderTickLegend(page: Page, tickNumber: number): Locator {
  return getSliderTick(page, tickNumber).locator('.ngx-slider-tick-legend');
}


test('custom ticks slider initial state hides normal labels and displays tick values and legend', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toBeHidden();
  await expect(getSliderCeilLabel(page)).toBeHidden();
  await expect(getSliderPointerLabel(page)).toBeHidden();

  await expect(getSliderTickValue(page, 1)).toHaveText('1');
  await expect(getSliderTickLegend(page, 1)).toHaveText('Very poor');

  await expect(getSliderTickValue(page, 2)).toHaveText('2');
  await expect(getSliderTickLegend(page, 2)).toHaveCount(0);

  await expect(getSliderTickValue(page, 3)).toHaveText('3');
  await expect(getSliderTickLegend(page, 3)).toHaveText('Fair');

  await expect(getSliderTickValue(page, 4)).toHaveText('4');
  await expect(getSliderTickLegend(page, 4)).toHaveCount(0);

  await expect(getSliderTickValue(page, 5)).toHaveText('5');
  await expect(getSliderTickLegend(page, 5)).toHaveText('Average');

  await expect(getSliderTickValue(page, 6)).toHaveText('6');
  await expect(getSliderTickLegend(page, 6)).toHaveCount(0);

  await expect(getSliderTickValue(page, 7)).toHaveText('7');
  await expect(getSliderTickLegend(page, 7)).toHaveText('Good');

  await expect(getSliderTickValue(page, 8)).toHaveText('8');
  await expect(getSliderTickLegend(page, 8)).toHaveCount(0);

  await expect(getSliderTickValue(page, 9)).toHaveText('9');
  await expect(getSliderTickLegend(page, 9)).toHaveText('Excellent');
});

test('custom ticks slider initial state positions the slider elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });

  await expect(getSliderTick(page, 1)).toHaveRelativeLocationWithoutMargins({ x: 22, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 1)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 1)).toHaveRelativeLocationWithoutMargins({ x: 11.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 1)).toHaveApproximateSize({ width: 9, height: 24 });
  await expect(getSliderTickLegend(page, 1)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 56 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickLegend(page, 1)).toHaveApproximateSize({ width: 32, height: 48 });

  await expect(getSliderTick(page, 2)).toHaveRelativeLocationWithoutMargins({ x: 114, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 2)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 2)).toHaveRelativeLocationWithoutMargins({ x: 103.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 2)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 3)).toHaveRelativeLocationWithoutMargins({ x: 206, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 3)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 3)).toHaveRelativeLocationWithoutMargins({ x: 195.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 3)).toHaveApproximateSize({ width: 9, height: 24 });
  await expect(getSliderTickLegend(page, 3)).toHaveRelativeLocationWithoutMargins({ x: 186, y: 56 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickLegend(page, 3)).toHaveApproximateSize({ width: 28, height: 24 });

  await expect(getSliderTick(page, 4)).toHaveRelativeLocationWithoutMargins({ x: 297, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 4)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 4)).toHaveRelativeLocationWithoutMargins({ x: 286.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 4)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 5)).toHaveRelativeLocationWithoutMargins({ x: 389, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 5)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 5)).toHaveRelativeLocationWithoutMargins({ x: 378.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 5)).toHaveApproximateSize({ width: 9, height: 24 });
  await expect(getSliderTickLegend(page, 5)).toHaveRelativeLocationWithoutMargins({ x: 358, y: 56 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickLegend(page, 5)).toHaveApproximateSize({ width: 50, height: 48 });

  await expect(getSliderTick(page, 6)).toHaveRelativeLocationWithoutMargins({ x: 481, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 6)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 6)).toHaveRelativeLocationWithoutMargins({ x: 470.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 6)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 7)).toHaveRelativeLocationWithoutMargins({ x: 573, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 7)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 7)).toHaveRelativeLocationWithoutMargins({ x: 562.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 7)).toHaveApproximateSize({ width: 9, height: 24 });
  await expect(getSliderTickLegend(page, 7)).toHaveRelativeLocationWithoutMargins({ x: 547.5, y: 56 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickLegend(page, 7)).toHaveApproximateSize({ width: 39, height: 24 });

  await expect(getSliderTick(page, 8)).toHaveRelativeLocationWithoutMargins({ x: 664, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 8)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 8)).toHaveRelativeLocationWithoutMargins({ x: 653.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 8)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 9)).toHaveRelativeLocationWithoutMargins({ x: 756, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 9)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 9)).toHaveRelativeLocationWithoutMargins({ x: 745.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 9)).toHaveApproximateSize({ width: 9, height: 24 });
  await expect(getSliderTickLegend(page, 9)).toHaveRelativeLocationWithoutMargins({ x: 725, y: 56 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickLegend(page, 9)).toHaveApproximateSize({ width: 50, height: 48 });
});
