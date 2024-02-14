import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/reactive-form-range-slider?testMode=true');
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

function getSliderFullBar(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-full-bar');
}

function getSliderSelectionBar(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-selection-bar');
}

function getLowValueTextElement(page: Page): Locator {
  return page.locator('p:nth-child(1)');
}

function getHighValueTextElement(page: Page): Locator {
  return page.locator('p:nth-child(2)');
}

function getFormResetButton(page: Page): Locator {
  return page.locator('button');
}



test('reactive form range slider initial state displays starting values and position elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('100');

  await expect(getSliderLowPointerLabel(page)).toHaveText('20');
  await expect(getLowValueTextElement(page)).toHaveText('Low value: 20');

  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
  await expect(getHighValueTextElement(page)).toHaveText('High value: 80');

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderFloorLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });
  await expect(getSliderCeilLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 733, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 591, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 440, height: 32 });
});

test('reactive form range slider after dragging the low slider pointer moves the low pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 220, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueTextElement(page)).toHaveText('Low value: 50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
  await expect(getHighValueTextElement(page)).toHaveText('High value: 80');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 371, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 591, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 383, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 220, height: 32 });
});

test('reactive form range slider after dragging the low slider pointer and after resetting the form reverts the slider to starting state', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 220, offsetY: 50});
  await getFormResetButton(page).click();

  await expect(getSliderLowPointerLabel(page)).toHaveText('20');
  await expect(getLowValueTextElement(page)).toHaveText('Low value: 20');

  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
  await expect(getHighValueTextElement(page)).toHaveText('High value: 80');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 591, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 440, height: 32 });
});

test('reactive form range slider after dragging the high slider pointer moves the high pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -220, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('20');
  await expect(getLowValueTextElement(page)).toHaveText('Low value: 20');

  await expect(getSliderHighPointerLabel(page)).toHaveText('50');
  await expect(getHighValueTextElement(page)).toHaveText('High value: 50');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 371, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 220, height: 32 });
});

test('reactive form range slider after dragging the high slider pointer and after resetting the form reverts the slider to starting state', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -220, offsetY: 50});
  await getFormResetButton(page).click();

  await expect(getSliderLowPointerLabel(page)).toHaveText('20');
  await expect(getLowValueTextElement(page)).toHaveText('Low value: 20');

  await expect(getSliderHighPointerLabel(page)).toHaveText('80');
  await expect(getHighValueTextElement(page)).toHaveText('High value: 80');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 591, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 440, height: 32 });
});
