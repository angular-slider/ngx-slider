import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/push-range-slider?testMode=true');
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

function getSliderLowPointer(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-pointer-min');
}

function getSliderHighPointer(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-pointer-max');
}

function getSliderLowPointerLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-model-value');
}

function getSliderHighPointerLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-model-high');
}


test('push range slider initial state displays starting values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('100');
  await expect(getSliderLowPointerLabel(page)).toHaveText('60');
  await expect(getSliderHighPointerLabel(page)).toHaveText('70');
});

test('push range slider low pointer interactions after dragging the low pointer to the left within changeable range with mouse moves the low pointer to the new value and leaves the high pointer unchanged', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: -73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page)).toHaveText('70');
});

test('push range slider low pointer interactions after dragging the low pointer to the left within changeable range with touch gesture moves the low pointer to the new value and leaves the high pointer unchanged', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page)).toHaveText('70');
});

test('push range slider low pointer interactions after dragging the low pointer to the left exceeding range limit with mouse moves the low pointer to the new value and pulls the high pointer along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: -220, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('30');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('push range slider low pointer interactions after dragging the low pointer to the left exceeding range limit with touch gesture moves the low pointer to the new value and pulls the high pointer along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -220, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('30');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('push range slider low pointer interactions after dragging the low pointer to the left below lowest value with mouse moves the low pointer to the minimum value and pulls the high pointer to the maximum range', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: -450, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page)).toHaveText('30');
});

test('push range slider low pointer interactions after dragging the low pointer to the left below lowest value with touch gesture moves the low pointer to the minimum value and pulls the high pointer to the maximum range', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -450, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page)).toHaveText('30');
});

test('push range slider low pointer interactions after dragging the low slider pointer to the right with mouse moves the low pointer to the new value and pushes the high pointer along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 37, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('65');
  await expect(getSliderHighPointerLabel(page)).toHaveText('75');
});

test('push range slider low pointer interactions after dragging the low slider pointer to the right with touch gesture moves the low pointer to the new value and pushes the high pointer along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: 37, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('65');
  await expect(getSliderHighPointerLabel(page)).toHaveText('75');
});

test('push range slider low pointer interactions after dragging the low slider pointer to the right above maximum value with mouse moves the low pointer to the maximum value minus minimum range and pushes the high pointer to the maximum value', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 300, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('90');
  await expect(getSliderHighPointerLabel(page)).toHaveText('100');
});

test('push range slider low pointer interactions after dragging the low slider pointer to the right above maximum value with touch gesture moves the low pointer to the maximum value minus minimum range and pushes the high pointer to the maximum value', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: 300, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('90');
  await expect(getSliderHighPointerLabel(page)).toHaveText('100');
});

test('push range slider high pointer interactions after dragging the high pointer to the right below maximum range with mouse moves the high pointer to the new value and leaves the low pointer unchanged', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: 73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('60');
  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
});

test('push range slider high pointer interactions after dragging the high pointer to the right below maximum range with touch gesture moves the high pointer to the new value and leaves the low pointer unchanged', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('60');
  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
});


test('push range slider high pointer interactions after dragging the high pointer to the right exceeding maximum range with mouse moves the high pointer to the new value and pulls the low pointer along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: 185, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('65');
  await expect(getSliderHighPointerLabel(page)).toHaveText('95');
});

test('push range slider high pointer interactions after dragging the high pointer to the right exceeding maximum range with touch gesture moves the high pointer to the new value and pulls the low pointer along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 185, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('65');
  await expect(getSliderHighPointerLabel(page)).toHaveText('95');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the right above highest value with mouse moves the high pointer to the maximum value and pulls the low pointer along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: 235, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('70');
  await expect(getSliderHighPointerLabel(page)).toHaveText('100');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the right above highest value with touch gesture moves the high pointer to the maximum value and pulls the low pointer along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 235, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('70');
  await expect(getSliderHighPointerLabel(page)).toHaveText('100');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the left with mouse moves the high pointer to the new value and pushes the low pointer along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the left with touch gesture moves the high pointer to the new value and pushed the low pointer along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: -73, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the left below minimum value with mouse moves the high pointer to the minimum value value plus minimum range and pushes the low pointer to the minimum value', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -450, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page)).toHaveText('10');
});

test('push range slider high pointer interactions after dragging the high slider pointer to the left below minimum value with touch gesture moves the high pointer to the minimum value value plus minimum range and pushes the low pointer to the minimum value', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: -450, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getSliderHighPointerLabel(page)).toHaveText('10');
});
