import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from '../utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/range-slider?testMode=true');
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

function getSliderCombinedLabel(page: Page): Locator {
  return getSlider(page).locator('span.ngx-slider-combined');
}

function getLowValueInput(page: Page): Locator {
  return page.locator('p').filter({ hasText: 'Min value:' }).locator('input:nth-child(1)');
}

function getHighValueInput(page: Page): Locator {
  return page.locator('p').filter({ hasText: 'Max value:' }).locator('input:nth-child(1)');
}



test('range slider initial state displays starting values and position elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0');
  await expect(getSliderCeilLabel(page)).toHaveText('250');

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderFloorLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });
  await expect(getSliderCeilLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 733, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 440, height: 32 });
});

test('range slider after dragging the low slider pointer with mouse moves the low pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 220, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('125');
  await expect(getLowValueInput(page)).toHaveValue('125');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 383, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 220, height: 32 });
});

test('range slider after dragging the low slider pointer with touch gesture moves the low pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderLowPointer(page), {offsetX: -74, offsetY: -50});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('25');
  await expect(getLowValueInput(page)).toHaveValue('25');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 73, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 77, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 89, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 514, height: 32 });
});

test('range slider after dragging the high slider pointer with mouse moves the high pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -220, offsetY: 50});

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('125');
  await expect(getHighValueInput(page)).toHaveValue('125');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 220, height: 32 });
});

test('range slider after dragging the high slider pointer with touch gesture moves the high pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderHighPointer(page), {offsetX: 74, offsetY: -50});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('225');
  await expect(getHighValueInput(page)).toHaveValue('225');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 661, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 660, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 514, height: 32 });
});

test('range slider after dragging the low and high pointers to the same position shows only the combined label instead of normal labels', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 381, offsetY: 0});
  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -59, offsetY: 0});
  
  await expect(getLowValueInput(page)).toHaveValue('180');
  await expect(getHighValueInput(page)).toHaveValue('180');

  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderLowPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderHighPointerLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderCombinedLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderCombinedLabel(page)).toHaveText('180 - 180');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 528, y: 21 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 528, y: 21 }, { relativeTo: getSlider(page) });

  await expect(getSliderCombinedLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 508, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 544, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 0, height: 32 });
});

test('range slider after dragging the low pointer past the high pointer switches the low and high pointers and moves the high pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderLowPointer(page), {offsetX: 498, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('200');
  await expect(getLowValueInput(page)).toHaveValue('200');

  await expect(getSliderHighPointerLabel(page)).toHaveText('220');
  await expect(getHighValueInput(page)).toHaveValue('220');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 646, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 646, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 603, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 58, height: 32 });
});

test('range slider after dragging the high pointer past the low pointer switches the low and high pointers and moves the low pointer to the new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderHighPointer(page), {offsetX: -498, offsetY: 0});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('30');
  await expect(getLowValueInput(page)).toHaveValue('30');

  await expect(getSliderHighPointerLabel(page)).toHaveText('50');
  await expect(getHighValueInput(page)).toHaveValue('50');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 87, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 91, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 103, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 58, height: 32 });
});

test('range slider after clicking on slider bar below low pointer moves the low pointer element to the click position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({position: {x: 132, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('40');
  await expect(getLowValueInput(page)).toHaveValue('40');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 116, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 120, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 132, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 470, height: 32 });
});

test('range slider after tapping on slider bar below low pointer moves the low pointer element to the tap position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).tap({position: {x: 105, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('30');
  await expect(getLowValueInput(page)).toHaveValue('30');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 87, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 93, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 104, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 499, height: 32 });
});

test('range slider after clicking on slider bar above high pointer moves the high pointer element to the click position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({position: {x: 632, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('210');
  await expect(getHighValueInput(page)).toHaveValue('210');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 617, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 617, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 470, height: 32 });
});

test('range slider after tapping on slider bar above high pointer moves the high pointer element to the tap position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({position: {x: 662, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('220');
  await expect(getHighValueInput(page)).toHaveValue('220');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 646, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 646, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 499, height: 32 });
});

test('range slider after clicking on selection bar closer to low pointer moves the low pointer element to the click position', async ({ page }) => {
  await setUp(page);

  await getSliderSelectionBar(page).click({position: {x: 118, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('90');
  await expect(getLowValueInput(page)).toHaveValue('90');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 264, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 268, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 280, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 323, height: 32 });
});

test('range slider after tapping on selection bar closer to low pointer moves the low pointer element to the tap position', async ({ page }) => {
  await setUp(page);

  await getSliderSelectionBar(page).tap({position: {x: 146, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('100');
  await expect(getLowValueInput(page)).toHaveValue('100');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 310, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 294, height: 32 });
});

test('range slider after clicking on selection bar closer to high pointer moves the high pointer element to the click position', async ({ page }) => {
  await setUp(page);

  await getSliderSelectionBar(page).click({position: {x: 294, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('150');
  await expect(getHighValueInput(page)).toHaveValue('150');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 294, height: 32 });
});

test('range slider after tapping on selection bar closer to high pointer moves the high pointer element to the tap position', async ({ page }) => {
  await setUp(page);

  await getSliderSelectionBar(page).click({position: {x: 322, y: 0}});
  
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('160');
  await expect(getHighValueInput(page)).toHaveValue('160');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 470, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 469, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 323, height: 32 });
});

async function expectLowPointerIncrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page)).toHaveText('51');
  await expect(getLowValueInput(page)).toHaveValue('51');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 150, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 153, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 166, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 437, height: 32 });
}

test('range slider keyboard input on the low pointer element after pressing right arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('ArrowRight');

  await expectLowPointerIncrementByOneStep(page);
});

test('range slider keyboard input on the low pointer element after pressing up arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('ArrowUp');

  await expectLowPointerIncrementByOneStep(page);
});

async function expectLowPointerDecrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page)).toHaveText('49');
  await expect(getLowValueInput(page)).toHaveValue('49');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 144, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 160, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 443, height: 32 });
}

test('range slider keyboard input on the low pointer element after pressing left arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('ArrowLeft');

  await expectLowPointerDecrementByOneStep(page);
});

test('range slider keyboard input on the low pointer element after pressing down arrow increases the low value by step', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('ArrowDown');

  await expectLowPointerDecrementByOneStep(page);
});

test('range slider keyboard input on the low pointer element after pressing page up increases the low value by larger offset', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('PageUp');

  await expect(getSliderLowPointerLabel(page)).toHaveText('75');
  await expect(getLowValueInput(page)).toHaveValue('75');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 220, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 224, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 236, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 367, height: 32 });
});

test('range slider keyboard input on the low pointer element after pressing page down decreases the low value by larger offset', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('PageDown');

  await expect(getSliderLowPointerLabel(page)).toHaveText('25');
  await expect(getLowValueInput(page)).toHaveValue('25');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 73, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 77, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 89, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 514, height: 32 });
});

test('range slider keyboard input on the low pointer element after pressing home sets the value to minimum and hides the floor label', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('Home');

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getLowValueInput(page)).toHaveValue('0');
  await expect(getSliderFloorLabel(page)).toHaveCSS('opacity', '0');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');
  await expect(getSliderCeilLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 9, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 16, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 587, height: 32 });
});

test('range slider keyboard input on the low pointer element after pressing end sets the value to maximum, switching pointers and hiding the ceil label', async ({ page }) => {
  await setUp(page);

  getSliderLowPointer(page).press('End');

  await expect(getSliderLowPointerLabel(page)).toHaveText('200');
  await expect(getLowValueInput(page)).toHaveValue('200');
  await expect(getSliderFloorLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderHighPointerLabel(page)).toHaveText('250');
  await expect(getHighValueInput(page)).toHaveValue('250');
  await expect(getSliderCeilLabel(page)).toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 603, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 147, height: 32 });
});

async function expectHighPointerIncrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('201');
  await expect(getHighValueInput(page)).toHaveValue('201');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 590, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 590, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 443, height: 32 });
}

test('range slider keyboard input on the high pointer element after pressing right arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('ArrowRight');

  await expectHighPointerIncrementByOneStep(page);
});

test('range slider keyboard input on the high pointer element after pressing up arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('ArrowUp');

  await expectHighPointerIncrementByOneStep(page);
});

async function expectHighPointerDecrementByOneStep(page) {
  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('199');
  await expect(getHighValueInput(page)).toHaveValue('199');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 584, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 584, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 437, height: 32 });
}

test('range slider keyboard input on the high pointer element after pressing left arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('ArrowLeft');

  await expectHighPointerDecrementByOneStep(page);
});

test('range slider keyboard input on the high pointer element after pressing down arrow increases the high value by step', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('ArrowDown');

  await expectHighPointerDecrementByOneStep(page);
});

test('range slider keyboard input on the high pointer element after pressing page up increases the high value by larger offset', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('PageUp');

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('225');
  await expect(getHighValueInput(page)).toHaveValue('225');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 661, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 661, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 514, height: 32 });
});

test('range slider keyboard input on the high pointer element after pressing page down decreases the high value by larger offset', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('PageDown');

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');

  await expect(getSliderHighPointerLabel(page)).toHaveText('175');
  await expect(getHighValueInput(page)).toHaveValue('175');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 514, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 514, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 367, height: 32 });
});

test('range slider keyboard input on the high pointer element after pressing home sets the value to minimum, switching pointers and hiding the floor label', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('Home');

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getLowValueInput(page)).toHaveValue('0');
  await expect(getSliderFloorLabel(page)).toHaveCSS('opacity', '0');

  await expect(getSliderHighPointerLabel(page)).toHaveText('50');
  await expect(getHighValueInput(page)).toHaveValue('50');
  await expect(getSliderCeilLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 9, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 16, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 147, height: 32 });
});

test('range slider keyboard input on the high pointer element after pressing end sets the high value to maximum and hides the ceil label', async ({ page }) => {
  await setUp(page);

  getSliderHighPointer(page).press('End');

  await expect(getSliderLowPointerLabel(page)).toHaveText('50');
  await expect(getLowValueInput(page)).toHaveValue('50');
  await expect(getSliderFloorLabel(page)).not.toHaveCSS('opacity', '0');

  await expect(getSliderHighPointerLabel(page)).toHaveText('250');
  await expect(getHighValueInput(page)).toHaveValue('250');
  await expect(getSliderCeilLabel(page)).toHaveCSS('opacity', '0');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 587, height: 32 });
});

test('range slider after changing low input value in the form sets the low value to new input', async ({ page }) => {
  await setUp(page);

  // Due to normalisation checks, we need to ensure that inputs contain valid data at all times while editing
  // Low value: 50 -> 5 -> 25 -> 125
  await getLowValueInput(page).press('End');
  await getLowValueInput(page).press('Backspace');
  await getLowValueInput(page).press('Home');
  await getLowValueInput(page).press('2');
  await getLowValueInput(page).press('Home');
  await getLowValueInput(page).press('1');

  await expect(getSliderLowPointerLabel(page)).toHaveText('125');
  await expect(getLowValueInput(page)).toHaveValue('125');

  await expect(getSliderHighPointerLabel(page)).toHaveText('200');
  await expect(getHighValueInput(page)).toHaveValue('200');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 383, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 220, height: 32 });
});

test('range slider after changing high input value in the form sets the high value to new input', async ({ page }) => {
  await setUp(page);

  // Due to normalisation checks, we need to change both inputs and ensure that they contain valid data at all times while editing
  // Low value: 50 -> 0
  await getLowValueInput(page).press('End');
  await getLowValueInput(page).press('ArrowLeft');
  await getLowValueInput(page).press('Backspace');
  // High value: 200 -> 20 -> 2 -> 25 -> 125
  await getHighValueInput(page).press('End');
  await getHighValueInput(page).press('Backspace');
  await getHighValueInput(page).press('End');
  await getHighValueInput(page).press('Backspace');
  await getHighValueInput(page).press('End');
  await getHighValueInput(page).press('5');
  await getHighValueInput(page).press('Home');
  await getHighValueInput(page).press('1');

  await expect(getSliderLowPointerLabel(page)).toHaveText('0');
  await expect(getLowValueInput(page)).toHaveValue('0');

  await expect(getSliderHighPointerLabel(page)).toHaveText('125');
  await expect(getHighValueInput(page)).toHaveValue('125');

  await expect(getSliderLowPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderLowPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 9, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderHighPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderHighPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderSelectionBar(page)).toHaveRelativeLocationWithoutMargins({ x: 16, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderSelectionBar(page)).toHaveApproximateSize({ width: 367, height: 32 });
});
