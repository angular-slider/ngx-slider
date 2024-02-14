import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/ticks-values-slider?testMode=true');
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


test('ticks slider initial state hides normal labels and displays tick values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toBeHidden();
  await expect(getSliderCeilLabel(page)).toBeHidden();
  await expect(getSliderPointerLabel(page)).toBeHidden();

  await expect(getSliderTickValue(page, 1)).toHaveText('0');
  await expect(getSliderTickValue(page, 2)).toHaveText('1');
  await expect(getSliderTickValue(page, 3)).toHaveText('2');
  await expect(getSliderTickValue(page, 4)).toHaveText('3');
  await expect(getSliderTickValue(page, 5)).toHaveText('4');
  await expect(getSliderTickValue(page, 6)).toHaveText('5');
  await expect(getSliderTickValue(page, 7)).toHaveText('6');
  await expect(getSliderTickValue(page, 8)).toHaveText('7');
  await expect(getSliderTickValue(page, 9)).toHaveText('8');
  await expect(getSliderTickValue(page, 10)).toHaveText('9');
  await expect(getSliderTickValue(page, 11)).toHaveText('10');
});

test('ticks slider initial state positions the slider elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });

  await expect(getSliderTick(page, 1)).toHaveRelativeLocationWithoutMargins({ x: 22, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 1)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 1)).toHaveRelativeLocationWithoutMargins({ x: 11.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 1)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 2)).toHaveRelativeLocationWithoutMargins({ x: 95, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 2)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 2)).toHaveRelativeLocationWithoutMargins({ x: 84.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 2)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 3)).toHaveRelativeLocationWithoutMargins({ x: 169, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 3)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 3)).toHaveRelativeLocationWithoutMargins({ x: 158.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 3)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 4)).toHaveRelativeLocationWithoutMargins({ x: 242, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 4)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 4)).toHaveRelativeLocationWithoutMargins({ x: 231.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 4)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 5)).toHaveRelativeLocationWithoutMargins({ x: 316, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 5)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 5)).toHaveRelativeLocationWithoutMargins({ x: 305.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 5)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 6)).toHaveRelativeLocationWithoutMargins({ x: 389, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 6)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 6)).toHaveRelativeLocationWithoutMargins({ x: 378.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 6)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 7)).toHaveRelativeLocationWithoutMargins({ x: 462, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 7)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 7)).toHaveRelativeLocationWithoutMargins({ x: 451.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 7)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 8)).toHaveRelativeLocationWithoutMargins({ x: 536, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 8)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 8)).toHaveRelativeLocationWithoutMargins({ x: 525.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 8)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 9)).toHaveRelativeLocationWithoutMargins({ x: 609, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 9)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 9)).toHaveRelativeLocationWithoutMargins({ x: 598.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 9)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 10)).toHaveRelativeLocationWithoutMargins({ x: 683, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 10)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 10)).toHaveRelativeLocationWithoutMargins({ x: 672.5, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 10)).toHaveApproximateSize({ width: 9, height: 24 });

  await expect(getSliderTick(page, 11)).toHaveRelativeLocationWithoutMargins({ x: 756, y: 32 }, { relativeTo: getSlider(page) });
  await expect(getSliderTick(page, 11)).toHaveApproximateSize({ width: 10, height: 10 });
  await expect(getSliderTickValue(page, 11)).toHaveRelativeLocationWithoutMargins({ x: 741, y: -2 }, { relativeTo: getSlider(page) });
  await expect(getSliderTickValue(page, 11)).toHaveApproximateSize({ width: 18, height: 24 });
});

test('ticks slider after dragging the slider pointer left with mouse moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: -100, offsetY: -50});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after dragging the slider pointer left with touch gesture moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderPointer(page), {offsetX: -100, offsetY: -50});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after dragging the slider pointer right with mouse moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: 200, offsetY: -50});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after dragging the slider pointer right with touch gesture moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderPointer(page), {offsetX: 200, offsetY: -50});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after clicking on another tick element moves the pointer element to that tick', async ({ page }) => {
  await setUp(page);

  await getSliderTick(page, 3).click();

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after tapping on another tick element moves the pointer element to that tick', async ({ page }) => {
  await setUp(page);

  await getSliderTick(page, 3).tap();

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after clicking on slider bar moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({position: {x: 500, y: 0}});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 514, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider after tapping on slider bar moves the pointer element to the nearest tick', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).tap({position: {x: 500, y: 0}});

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 514, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing right arrow moves the slider up one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowRight');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing up arrow moves the slider up one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowUp');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing left arrow moves the slider down one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowLeft');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing down arrow moves the slider down one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowDown');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing page up moves the slider up one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageUp');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing page down moves the slider down one tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageDown');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing home moves the slider to the first tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('Home');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
});

test('ticks slider keyboard input after pressing end moves the slider to the last tick', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('End');

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
});
