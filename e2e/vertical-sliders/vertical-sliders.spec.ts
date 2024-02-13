import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from '../utils';

// There are multiple sliders on the vertical sliders page
// These constants refer to the number of slider that they appear in the page left to right
const SIMPLE_SLIDER = 1;
const RANGE_SLIDER = 2;

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/vertical-sliders?testMode=true');
}

function getSlider(page: Page, sliderNumber: number): Locator {
  return page.locator(`.row .col-2:nth-of-type(${sliderNumber}) ngx-slider`);
}

function getSliderFloorLabel(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-floor');
}

function getSliderCeilLabel(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-ceil');
}

function getSliderLowPointer(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-pointer-min');
}

function getSliderHighPointer(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-pointer-max');
}

function getSliderLowPointerLabel(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-model-value');
}

function getSliderHighPointerLabel(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-model-high');
}

function getSliderFullBar(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-full-bar');
}

function getSliderSelectionBar(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-selection-bar');
}

function getSliderCombinedLabel(page: Page, sliderNumber: number): Locator {
  return getSlider(page, sliderNumber).locator('span.ngx-slider-combined');
}


test('simple vertical slider initial state displays starting values and position elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page, SIMPLE_SLIDER)).toHaveText('0');
  await expect(getSliderCeilLabel(page, SIMPLE_SLIDER)).toHaveText('10');
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('5');

  await expect(getSliderFullBar(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 0 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderFullBar(page, SIMPLE_SLIDER)).toHaveApproximateSize({ width: 32, height: 300 });

  await expect(getSliderFloorLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 274 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderCeilLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 0 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 134 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 137 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

test('simple vertical slider after dragging the slider pointer with mouse moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page, SIMPLE_SLIDER), {offsetX: 0, offsetY: -65});

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('7');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 80 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 83 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

test('simple vertical slider after dragging the slider pointer with touch gesture moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page, SIMPLE_SLIDER), {offsetX: 0, offsetY: 65});

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('3');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 188 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 191 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

async function expectSimpleSliderPointerIncrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('6');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 107 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 110 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
}

test('simple vertical slider keyboard input after pressing up arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('ArrowUp');

  await expectSimpleSliderPointerIncrementByOneStep(page);
});

test('simple vertical slider keyboard input after pressing right arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('ArrowRight');

  await expectSimpleSliderPointerIncrementByOneStep(page);
});

async function expectSimpleSliderPointerDecrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('4');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 161 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 164 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
}

test('simple vertical slider keyboard input after pressing down arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('ArrowDown');

  await expectSimpleSliderPointerDecrementByOneStep(page);
});

test('simple vertical slider keyboard input after pressing left arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('ArrowLeft');

  await expectSimpleSliderPointerDecrementByOneStep(page);
});

test('simple vertical slider keyboard input after pressing page up increases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('PageUp');

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('6');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 107 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 110 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

test('simple vertical slider keyboard input after pressing page down decreases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('PageDown');

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('4');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 161 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 164 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

test('simple vertical slider keyboard input after pressing home sets the value to minimum and hides the floor label', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('Home');

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('0');

  await expect(getSliderFloorLabel(page, SIMPLE_SLIDER)).toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, SIMPLE_SLIDER)).not.toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 268 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 271 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});

test('simple vertical slider keyboard input after pressing end sets the value to maximum and hides the ceil label', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, SIMPLE_SLIDER).press('End');

  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveText('10');

  await expect(getSliderFloorLabel(page, SIMPLE_SLIDER)).not.toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, SIMPLE_SLIDER)).toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 0 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, SIMPLE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 3 }, { relativeTo: getSlider(page, SIMPLE_SLIDER) });
});


test('range vertical slider initial state displays starting values and position elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).toHaveText('0');
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).toHaveText('100');
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderFullBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 0 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderFullBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 300 });

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 274 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 0 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 69 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 161 });
});

test('range vertical slider after dragging the low slider pointer with mouse moves the low pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page, RANGE_SLIDER), {offsetX: -50, offsetY: -80});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 134 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 137 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 80 });
});

test('range vertical slider after dragging the low slider pointer with touch gesture moves the low pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page, RANGE_SLIDER), {offsetX: 50, offsetY: 40});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 255 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 258 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 201 });
});

test('range vertical slider after dragging the high slider pointer with mouse moves the high pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page, RANGE_SLIDER), {offsetX: -50, offsetY: 80});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('50');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 134 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 137 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 150 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 80 });
});

test('range vertical slider after dragging the high slider pointer with touch gesture moves the high pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page, RANGE_SLIDER), {offsetX: 50, offsetY: -40});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('95');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 13 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 16 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 29 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 201 });
});

test('range vertical slider after dragging the low and high pointers to the same position shows the combined pointer and label instead of low and high pointers and labels', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page, RANGE_SLIDER), {offsetX: 0, offsetY: -108});
  await mouseDragRelative(getSliderHighPointer(page, RANGE_SLIDER), {offsetX: 0, offsetY: 54});

  await expect(getSliderCombinedLabel(page, RANGE_SLIDER)).not.toHaveCSS('opacity', '0');
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');

  await expect(getSliderCombinedLabel(page, RANGE_SLIDER)).toHaveText('60 - 60');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 107 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 107 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderCombinedLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 110 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 123 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 0 });
});

test('range vertical slider after dragging the low pointer past the high pointer switches the low and high pointers and moves the high pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page, RANGE_SLIDER), {offsetX: 0, offsetY: -200});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('80');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('95');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 13 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 16 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 30 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 40 });
});

test('range vertical slider after dragging the high pointer past the low pointer switches the low and high pointers and moves the low pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page, RANGE_SLIDER), {offsetX: 0, offsetY: 200});

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('20');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 255 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 258 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 231 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 40 });
});

async function expectRangeSliderLowPointerIncrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('21');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 212 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 215 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 158 });
}

test('range vertical slider keyboard input on the low pointer element after pressing right arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('ArrowRight');

  await expectRangeSliderLowPointerIncrementByOneStep(page);
});

test('range vertical slider keyboard input on the low pointer element after pressing up arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('ArrowUp');

  await expectRangeSliderLowPointerIncrementByOneStep(page);
});

async function expectRangeSliderLowPointerDecrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('19');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 220 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 163 });
}

test('range vertical slider keyboard input on the low pointer element after pressing left arrow decreases the low value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('ArrowLeft');

  await expectRangeSliderLowPointerDecrementByOneStep(page);
});

test('range vertical slider keyboard input on the low pointer element after pressing down arrow decreases the low value by step', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('ArrowDown');

  await expectRangeSliderLowPointerDecrementByOneStep(page);
});

test('range vertical slider keyboard input on the low pointer element after pressing page up increases the low value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('PageUp');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('30');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 188 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 191 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 134 });
});

test('range vertical slider keyboard input on the low pointer element after pressing page down decreases the low value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('PageDown');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('10');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 241 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 244 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 69 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 188 });
});

test('range vertical slider keyboard input on the low pointer element after pressing home sets the value to minimum and hides the floor label', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('Home');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('80');

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).not.toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 268 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 271 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 70 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 214 });
});

test('range vertical slider keyboard input on the low pointer element after pressing end sets the value to maximum, switches pointers and hides the ceil label', async ({ page }) => {
  await setUp(page);

  await getSliderLowPointer(page, RANGE_SLIDER).press('End');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('80');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('100');

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).not.toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 57 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 0 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 3 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 16 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 54 });
});
////////////////////////////////////////////////

async function expectRangeSliderHighPointerIncrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('81');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 51 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 54 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 67 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 163 });
}

test('range vertical slider keyboard input on the high pointer element after pressing right arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('ArrowRight');

  await expectRangeSliderHighPointerIncrementByOneStep(page);
});

test('range vertical slider keyboard input on the high pointer element after pressing up arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('ArrowUp');

  await expectRangeSliderHighPointerIncrementByOneStep(page);
});

async function expectRangeSliderHighPointerDecrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('79');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 56 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 59 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 72 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 158 });
}

test('range vertical slider keyboard input on the high pointer element after pressing left arrow decreases the high value by step', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('ArrowLeft');

  await expectRangeSliderHighPointerDecrementByOneStep(page);
});

test('range vertical slider keyboard input on the high pointer element after pressing down arrow decreases the high value by step', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('ArrowDown');

  await expectRangeSliderHighPointerDecrementByOneStep(page);
});

test('range vertical slider keyboard input on the high pointer element after pressing page up increases the high value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('PageUp');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('90');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 27 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 30 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 42 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 188 });
});

test('range vertical slider keyboard input on the high pointer element after pressing page down decreases the high value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('PageDown');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('70');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 80 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 83 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 96 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 134 });
});

test('range vertical slider keyboard input on the high pointer element after pressing home sets the value to minimum, switches pointers and hides the floor label', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('Home');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('20');

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).not.toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 268 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 271 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 230 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 54 });
});

test('range vertical slider keyboard input on the high pointer element after pressing end sets the value to maximum and hides the ceil label', async ({ page }) => {
  await setUp(page);

  await getSliderHighPointer(page, RANGE_SLIDER).press('End');

  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveText('20');
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveText('100');

  await expect(getSliderFloorLabel(page, RANGE_SLIDER)).not.toHaveCSS('opacity', '0');
  await expect(getSliderCeilLabel(page, RANGE_SLIDER)).toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 214 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderLowPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 217 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderHighPointer(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 6, y: 0 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderHighPointerLabel(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: 36, y: 3 }, { relativeTo: getSlider(page, RANGE_SLIDER) });

  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveRelativeLocationWithoutMargins({ x: -12, y: 16 }, { relativeTo: getSlider(page, RANGE_SLIDER) });
  await expect(getSliderSelectionBar(page, RANGE_SLIDER)).toHaveApproximateSize({ width: 32, height: 214 });
});
