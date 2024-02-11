import { Locator } from '@playwright/test';

export async function mouseDragRelative(locator: Locator, offsetX: number, offsetY: number) {
  const page = locator.page();
  const box = await locator.boundingBox();

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  await page.mouse.move(centerX, centerY);
  await page.mouse.down({ button: 'left' });
  await page.mouse.move(centerX + offsetX, centerY + offsetY);
  await page.mouse.up({ button: 'left' });
}

export async function touchDragRelative(locator: Locator, offsetX: number, offsetY: number) {
  const page = locator.page();
  const box = await locator.boundingBox();

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  // Playwright doesn't support touch gestures yet, so this is a crude workaround
  await page.evaluate(
    ([centerX, centerY, offsetX, offsetY]) => {
      const touchAtStart = new Touch({ identifier: 1, target: document.documentElement, clientX: centerX, clientY: centerY });
      const touchAtEnd = new Touch({ identifier: 1, target: document.documentElement, clientX: centerX + offsetX, clientY: centerY + offsetY });

      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [touchAtStart],
        changedTouches: [touchAtStart],
        targetTouches: [touchAtStart],
      });
      document.elementFromPoint(centerX, centerY).dispatchEvent(touchStartEvent);

      const touchMoveEvent1 = new TouchEvent("touchmove", {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [touchAtStart],
        changedTouches: [touchAtStart],
        targetTouches: [touchAtStart],
      });
      document.elementFromPoint(centerX, centerY).dispatchEvent(touchMoveEvent1);

      const touchMoveEvent2 = new TouchEvent("touchmove", {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [touchAtEnd],
        changedTouches: [touchAtEnd],
        targetTouches: [touchAtEnd],
      });
      document.elementFromPoint(centerX + offsetX, centerY + offsetY).dispatchEvent(touchMoveEvent2);

      const touchEndEvent = new TouchEvent("touchend", {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [],
        changedTouches: [touchAtEnd],
        targetTouches: [],
      });
      document.elementFromPoint(centerX + offsetX, centerY + offsetY).dispatchEvent(touchEndEvent);
    },
    [centerX, centerY, offsetX, offsetY]
  );
}
