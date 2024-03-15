import { test, Page, Locator } from '@playwright/test';
import { expect, mouseDragRelative, touchDragRelative } from './utils';

async function setUp(page: Page) {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto('/right-to-left-slider?testMode=true');
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


test('right to left slider initial state displays starting values and position elements correctly', async ({ page }) => {
  await setUp(page);

  await expect(getSliderFloorLabel(page)).toHaveText('10');
  await expect(getSliderCeilLabel(page)).toHaveText('100');
  await expect(getSliderPointerLabel(page)).toHaveText('20');

  await expect(getSliderFullBar(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 3 }, { relativeTo: getSlider(page) });
  await expect(getSliderFullBar(page)).toHaveApproximateSize({ width: 766, height: 32 });

  await expect(getSliderFloorLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 742, y: -3 }, { relativeTo: getSlider(page) });
  await expect(getSliderCeilLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });

  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 652, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointer(page)).toHaveApproximateSize({ width: 32, height: 32 });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 656, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider after dragging the slider pointer with mouse moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await mouseDragRelative(getSliderPointer(page), {offsetX: -46, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('25');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 612, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 616, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider after dragging the slider pointer with touch gesture moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await touchDragRelative(getSliderPointer(page), {offsetX: 46, offsetY: 0});

  await expect(getSliderPointerLabel(page)).toHaveText('15');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 693, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 697, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider after clicking on slider bar with mouse moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).click({ position: { x: 192, y: 0 } });

  await expect(getSliderPointerLabel(page)).toHaveText('80');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 163, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 167, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider after tapping on slider bar with touch gesture moves the pointer to new position', async ({ page }) => {
  await setUp(page);

  await getSliderFullBar(page).tap({ position: { x: 602, y: 0 } });

  await expect(getSliderPointerLabel(page)).toHaveText('30');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 571, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 575, y: -3 }, { relativeTo: getSlider(page) });
});

async function expectIncrementByOneStep(page) {
  await expect(getSliderPointerLabel(page)).toHaveText('25');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 612, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 616, y: -3 }, { relativeTo: getSlider(page) });
}

test('right to left slider keyboard input after pressing left arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowLeft');

  await expectIncrementByOneStep(page);
});

test('right to left slider keyboard input after pressing up arrow increases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowUp');

  await expectIncrementByOneStep(page);
});

async function expectDecrementByOneStep(page) {
  await expect(getSliderPointerLabel(page)).toHaveText('15');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 693, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 697, y: -3 }, { relativeTo: getSlider(page) });
}

test('right to left slider keyboard input after pressing right arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowRight');

  await expectDecrementByOneStep(page);
});

test('right to left slider keyboard input after pressing down arrow decreases the value by step', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('ArrowDown');

  await expectDecrementByOneStep(page);
});

test('right to left slider keyboard input after pressing page up increases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageUp');

  await expect(getSliderPointerLabel(page)).toHaveText('30');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 571, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 575, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider keyboard input after pressing page down decreases the value by larger offset', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('PageDown');

  await expect(getSliderPointerLabel(page)).toHaveText('10');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 738, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider keyboard input after pressing home sets the value to minimum and hides the floor label', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('Home');

  await expect(getSliderPointerLabel(page)).toHaveText('10');
  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderFloorLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 734, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 738, y: -3 }, { relativeTo: getSlider(page) });
});

test('right to left slider keyboard input after pressing end sets the value to maximum and hides the ceil label', async ({ page }) => {
  await setUp(page);

  await getSliderPointer(page).press('End');

  await expect(getSliderPointerLabel(page)).toHaveText('100');
  // Slider elements are hidden by setting opacity to 0, hence this assertion
  // Regular assertion such as expect(...).toBeHidden() don't work based on opacity
  await expect(getSliderCeilLabel(page)).toHaveCSS('opacity', '0');
  await expect(getSliderPointer(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: 21 }, { relativeTo: getSlider(page) });
  await expect(getSliderPointerLabel(page)).toHaveRelativeLocationWithoutMargins({ x: 0, y: -3 }, { relativeTo: getSlider(page) });
});
