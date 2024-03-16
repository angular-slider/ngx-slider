import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/limited-slider?testMode=true');
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


test('limited slider initial state displays starting values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('100');
  await expect(getSliderPointerLabel(page)).toHaveText('50');
});

test('limited slider after dragging pointer to above the low limit moves the pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: -286, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('11');
});

test('limited slider after dragging pointer beyond the low limit stops the pointer at the low limit', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: -300, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('10');
});

test('limited slider after dragging pointer to above the high limit moves the pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: 286, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('89');
});

test('limited slider after dragging pointer beyond the high limit stops the pointer at the high limit', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: 300, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('90');
});
