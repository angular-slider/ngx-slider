import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/reactive-form-simple-slider?testMode=true');
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

function getValueTextElement(page: Page): Locator {
  return page.locator('p:nth-child(1)');
}

function getResetTextElement(page: Page): Locator {
  return page.locator('p:nth-child(2)');
}

function getFormButton(page: Page, id: string): Locator {
  return page.locator(`button#${id}`);
}

test('reactive form simple slider initial state displays starting values in labels and positions the slider elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('250');
  await expect(getSliderPointerLabel(page)).toHaveText('100');
  await expect(getValueTextElement(page)).toHaveText('Value: 100');

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderFloorLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });
  await expect(getSliderCeilLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 733, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 293, y: -3 }, { relativeTo: getSlider(page) });
});

test('reactive form simple slider after dragging the slider pointer updates the pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), { offsetX: -146, offsetY: 0 });

  await expect(getSliderPointerLabel(page)).toHaveText('50');
  await expect(getValueTextElement(page)).toHaveText('Value: 50');
  await expect(getResetTextElement(page)).toHaveText('Dirty: true')

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });
});

test('reactive form simple slider after dragging the slider pointer and after resetting the form reverts the slider to starting state', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), { offsetX: -146, offsetY: 0 });
  await getFormButton(page, 'reset').click();

  await expect(getSliderPointerLabel(page)).toHaveText('100');
  await expect(getValueTextElement(page)).toHaveText('Value: 100');
  await expect(getResetTextElement(page)).toHaveText('Dirty: false')

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 293, y: -3 }, { relativeTo: getSlider(page) });
});

test('reactive form simple slider after disabling the form control the slider should not move when dragging the pointer', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('250');
  await expect(getSliderPointerLabel(page)).toHaveText('100');
  await expect(getValueTextElement(page)).toHaveText('Value: 100');

  // Check that dragging the slider works
  await mouseDragRelative(getSliderPointer(page), { offsetX: -146, offsetY: 0 });

  await expect(getSliderPointerLabel(page)).toHaveText('50');
  await expect(getValueTextElement(page)).toHaveText('Value: 50');

  // Reset the slider
  await getFormButton(page, 'reset').click();

  await expect(getSliderPointerLabel(page)).toHaveText('100');
  await expect(getValueTextElement(page)).toHaveText('Value: 100');

  await getFormButton(page, 'disable').click();

  // After disabling the slider, check that it cannot be moved
  await mouseDragRelative(getSliderPointer(page), { offsetX: -146, offsetY: 0 });

  await expect(getSliderPointerLabel(page)).toHaveText('100');
  await expect(getValueTextElement(page)).toHaveText('Value: 100');

  await getFormButton(page, 'enable').click();

  // After enabling the slider, check that it can be moved again
  await mouseDragRelative(getSliderPointer(page), { offsetX: -146, offsetY: 0 });

  await expect(getSliderPointerLabel(page)).toHaveText('50');
  await expect(getValueTextElement(page)).toHaveText('Value: 50');
});
