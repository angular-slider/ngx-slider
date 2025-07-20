import { Locator } from '@playwright/test';

export async function mouseDragRelative(locator: Locator, options: {offsetX: number, offsetY: number}) {
  const page = locator.page();
  const box = await locator.boundingBox();

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  await page.mouse.move(centerX, centerY);
  await page.mouse.down({ button: 'left' });
  await page.mouse.move(centerX + options.offsetX, centerY + options.offsetY);
  await page.mouse.up({ button: 'left' });
}

export async function touchDragRelative(locator: Locator, options: {offsetX: number, offsetY: number}) {
  const page = locator.page();
  const box = await locator.boundingBox();

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  // Playwright doesn't support touch gestures yet, so this is a crude workaround
  await page.evaluate(
    ([centerX, centerY, offsetX, offsetY]) => {
      const element = document.elementFromPoint(centerX, centerY);

      const touchStartEvent = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        composed: true,
        isPrimary: true,
        pointerType: 'touch',
        clientX: centerX,
        clientY: centerY,
      });
      element.dispatchEvent(touchStartEvent);

      const touchMoveEvent1 = new PointerEvent("pointermove", {
        bubbles: true,
        cancelable: true,
        composed: true,
        isPrimary: true,
        pointerType: 'touch',
        clientX: centerX + offsetX,
        clientY: centerY + offsetY,
      });
      element.dispatchEvent(touchMoveEvent1);

      const touchEndEvent = new PointerEvent("pointerup", {
        bubbles: true,
        cancelable: true,
        composed: true,
        isPrimary: true,
        pointerType: 'touch',
        clientX: centerX + offsetX,
        clientY: centerY + offsetY
      });
      element.dispatchEvent(touchEndEvent);
    },
    [centerX, centerY, options.offsetX, options.offsetY]
  );
}
