import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from '../utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/simple-slider?testMode=true');
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

function getValueInput(page: Page): Locator {
  return page.locator('input:nth-child(1)');
}


test('simple slider initial state', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('0', { useInnerText: true });
  await expect(getSliderCeilLabel(page)).toHaveText('250', { useInnerText: true });
  await expect(getSliderPointerLabel(page)).toHaveText('100', { useInnerText: true });

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderFloorLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });
  await expect(getSliderCeilLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 733, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 294, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 293, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider after dragging the slider pointer with mouse', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), -146, 0);

  await expect(getSliderPointerLabel(page)).toHaveText('50');
  await expect(getValueInput(page)).toHaveValue('50');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider after dragging the slider pointer with touch gesture', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderPointer(page), 146, 0);

  await expect(getSliderPointerLabel(page)).toHaveText('150');
  await expect(getValueInput(page)).toHaveValue('150');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 440, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider after clicking on slider bar with mouse', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({ position: { x: 192, y: 0 } });

  await expect(getSliderPointerLabel(page)).toHaveText('60');
  await expect(getValueInput(page)).toHaveValue('60');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 176, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 180, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider after tapping on slider bar with touch gesture', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).tap({ position: { x: 602, y: 0 } });

  await expect(getSliderPointerLabel(page)).toHaveText('200');
  await expect(getValueInput(page)).toHaveValue('200');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 587, y: -3 }, { relativeTo: getSlider(page) });
});

async function expectIncrementByOneStep(page) {
  await expect(getSliderPointerLabel(page)).toHaveText('101');
  await expect(getValueInput(page)).toHaveValue('101');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 297, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 297, y: -3 }, { relativeTo: getSlider(page) });
}

test('simple slider keyboard input after pressing right arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowRight');

  await expectIncrementByOneStep(page);
});

test('simple slider keyboard input after pressing up arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowUp');

  await expectIncrementByOneStep(page);
});

async function expectDecrementByOneStep(page) {
  await expect(getSliderPointerLabel(page)).toHaveText('99');
  await expect(getValueInput(page)).toHaveValue('99');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 291, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 295, y: -3 }, { relativeTo: getSlider(page) });
}

test('simple slider keyboard input after pressing left arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowLeft');

  await expectDecrementByOneStep(page);
});

test('simple slider keyboard input after pressing down arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowDown');

  await expectDecrementByOneStep(page);
});

test('simple slider keyboard input after pressing page up increases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageUp');

  await expect(getSliderPointerLabel(page)).toHaveText('125');
  await expect(getValueInput(page)).toHaveValue('125');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 367, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider keyboard input after pressing page down decreases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageDown');

  await expect(getSliderPointerLabel(page)).toHaveText('75');
  await expect(getValueInput(page)).toHaveValue('75');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 220, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 224, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider keyboard input after pressing home sets the value to minimum and hides the floor label', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('Home');

  await expect(getSliderPointerLabel(page)).toHaveText('0');
  await expect(getValueInput(page)).toHaveValue('0');
  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderFloorLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 9, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider keyboard input after pressing end sets the value to maximum and hides the ceil label', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('End');

  await expect(getSliderPointerLabel(page)).toHaveText('250');
  await expect(getValueInput(page)).toHaveValue('250');
  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderCeilLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: -3 }, { relativeTo: getSlider(page) });
});

test('simple slider after changing input value in the form sets the value to the new input', async ({ page }) => {
  await setUp(page);

  // Due to normalisation code, we need to ensure that the number in input is always valid when entering it
  // This should end up with: 100 -> 10 -> 150 -> 50
  await getValueInput(page).press('End');
  await getValueInput(page).press('Backspace');
  await getValueInput(page).press('Home');
  await getValueInput(page).press('ArrowRight');
  await getValueInput(page).press('5');
  await getValueInput(page).press('Home');
  await getValueInput(page).press('ArrowRight');
  await getValueInput(page).press('Backspace');

  await expect(getSliderPointerLabel(page)).toHaveText('50');
  await expect(getValueInput(page)).toHaveValue('50');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 147, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 151, y: -3 }, { relativeTo: getSlider(page) });
});

