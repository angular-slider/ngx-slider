import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/no-switching-range-slider?testMode=true');
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

function getSliderCombinedLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-combined');
}


test('no switching range slider initial state displays starting values', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('100');
  await expect(getSliderLowPointerLabel(page)).toHaveText('10');
  await expect(getSliderHighPointerLabel(page)).toHaveText('90');
});

test('no switching range slider dragging low pointer below high pointer moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 366, offsetY: 0});

  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderLowPointerLabel(page)).not.toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page)).not.toHaveCSS('opacity', '0');
  await expect(getSliderCombinedLabel(page)).toHaveCSS('opacity', '0');
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('60');
  await expect(getSliderHighPointerLabel(page)).toHaveText('90');
});

test('no switching range slider dragging low pointer beyond high pointer stops the movement at the high pointer and combines labels', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: 660, offsetY: 0});

  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderLowPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderCombinedLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderCombinedLabel(page)).toHaveText('90 - 90');
});

test('no switching range slider dragging high pointer above low pointer moves it to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -366, offsetY: 0});

  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderLowPointerLabel(page)).not.toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page)).not.toHaveCSS('opacity', '0');
  await expect(getSliderCombinedLabel(page)).toHaveCSS('opacity', '0');
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('10');
  await expect(getSliderHighPointerLabel(page)).toHaveText('40');
});

test('no switching range slider dragging high pointer beyond low pointer stops the movement at the low pointer and combines labels', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: -660, offsetY: 0});

  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderLowPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderCombinedLabel(page)).not.toHaveCSS('opacity', '0');
  
  await expect(getSliderCombinedLabel(page)).toHaveText('10 - 10');
});
