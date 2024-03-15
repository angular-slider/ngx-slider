import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/draggable-range-only-slider?testMode=true');
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

function getSliderSelectionBar(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-selection-bar');
}


test('draggable range only slider initial state displays starting values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('10');
  await expect(getSliderLowPointerLabel(page)).toHaveText('4');
  await expect(getSliderHighPointerLabel(page)).toHaveText('6');
});

test('draggable range only slider low pointer interactions after dragging the low slider pointer to the left with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider low pointer interactions after dragging the low slider pointer to the left with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider low pointer interactions after dragging the low slider pointer to the right with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});

test('draggable range only slider low pointer interactions after dragging the low slider pointer to the right with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});

test('draggable range only slider high pointer interactions after dragging the high slider pointer to the left with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider high pointer interactions after dragging the high slider pointer to the left with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider high pointer interactions after dragging the high slider pointer to the right with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});

test('draggable range only slider high pointer interactions after dragging the high slider pointer to the right with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});

test('draggable range only slider selection bar interactions after dragging the selection bar to the left with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderSelectionBar(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider selection bar interactions after dragging the selection bar to the left with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderSelectionBar(page), {offsetX: -50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('3');
  await expect(getSliderHighPointerLabel(page)).toHaveText('5');
});

test('draggable range only slider selection bar interactions after dragging the selection bar to the right with mouse moves both pointers along', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderSelectionBar(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});

test('draggable range only slider selection bar interactions after dragging the selection bar to the right with touch gesture moves both pointers along', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderSelectionBar(page), {offsetX: 50, offsetY: -50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('5');
  await expect(getSliderHighPointerLabel(page)).toHaveText('7');
});
