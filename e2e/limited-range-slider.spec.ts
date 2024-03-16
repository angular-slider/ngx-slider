import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/limited-range-slider?testMode=true');
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



test('limited range slider initial state displays starting values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('100');
  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('limited range slider dragging low pointer within the min range limit moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 66, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('49');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('limited range slider dragging low pointer exceeding the min range limit stops the movement at the limit', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: 100, offsetY: 0});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('limited range slider dragging low pointer within the max range limit moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: -212, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('11');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('limited range slider dragging low pointer exceeding the max range limit stops the movement at the limit', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -300, offsetY: 0});

  await expect(getSliderLowPointerLabel(page)).toHaveText('10');
  await expect(getSliderHighPointerLabel(page)).toHaveText('60');
});

test('limited range slider dragging high pointer within the min range limit moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -66, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getSliderHighPointerLabel(page)).toHaveText('51');
});

test('limited range slider dragging high pointer exceeding the min range limit stops the movement at the limit', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: -100, offsetY: 0});

  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getSliderHighPointerLabel(page)).toHaveText('50');
});

test('limited range slider dragging high pointer within the max range limit moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: 212, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getSliderHighPointerLabel(page)).toHaveText('89');
});

test('limited range slider dragging high pointer exceeding the max range limit stops the movement at the limit', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 300, offsetY: 0});

  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getSliderHighPointerLabel(page)).toHaveText('90');
});
