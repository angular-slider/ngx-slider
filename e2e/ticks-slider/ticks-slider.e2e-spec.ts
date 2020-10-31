import { TicksSliderDemoPage } from './ticks-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';
import { Key } from 'protractor';

describe('ticks slider', () => {
  let page: TicksSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new TicksSliderDemoPage();
    page.navigateTo('ticks-values-slider');
  });

  describe('initial state', () => {
    it('hides normal labels and displays tick values', () => {
      expect(page.getSliderFloorLabel().isVisible()).toBe(false);
      expect(page.getSliderCeilLabel().isVisible()).toBe(false);
      expect(page.getSliderPointerLabel().isVisible()).toBe(false);

      expect(page.getSliderTickValue(1).getText()).toBe('0');
      expect(page.getSliderTickValue(2).getText()).toBe('1');
      expect(page.getSliderTickValue(3).getText()).toBe('2');
      expect(page.getSliderTickValue(4).getText()).toBe('3');
      expect(page.getSliderTickValue(5).getText()).toBe('4');
      expect(page.getSliderTickValue(6).getText()).toBe('5');
      expect(page.getSliderTickValue(7).getText()).toBe('6');
      expect(page.getSliderTickValue(8).getText()).toBe('7');
      expect(page.getSliderTickValue(9).getText()).toBe('8');
      expect(page.getSliderTickValue(10).getText()).toBe('9');
      expect(page.getSliderTickValue(11).getText()).toBe('10');
    });

    it('positions the slider elements correctly', () => {
      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
      expect(page.getSliderPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderTick(1).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 22, y: 32});
      expect(page.getSliderTick(1).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(1).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 11, y: -2});
      expect(page.getSliderTickValue(1).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(2).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 95, y: 32});
      expect(page.getSliderTick(2).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(2).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 84, y: -2});
      expect(page.getSliderTickValue(2).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(3).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 167, y: 32});
      expect(page.getSliderTick(3).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(3).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 156, y: -2});
      expect(page.getSliderTickValue(3).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(4).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 240, y: 32});
      expect(page.getSliderTick(4).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(4).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 229, y: -2});
      expect(page.getSliderTickValue(4).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(5).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 312, y: 32});
      expect(page.getSliderTick(5).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(5).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 301, y: -2});
      expect(page.getSliderTickValue(5).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(6).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 385, y: 32});
      expect(page.getSliderTick(6).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(6).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 374, y: -2});
      expect(page.getSliderTickValue(6).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(7).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 458, y: 32});
      expect(page.getSliderTick(7).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(7).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 447, y: -2});
      expect(page.getSliderTickValue(7).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(8).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 530, y: 32});
      expect(page.getSliderTick(8).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(8).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 519, y: -2});
      expect(page.getSliderTickValue(8).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(9).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 603, y: 32});
      expect(page.getSliderTick(9).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(9).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 592, y: -2});
      expect(page.getSliderTickValue(9).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(10).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 675, y: 32});
      expect(page.getSliderTick(10).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(10).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 664, y: -2});
      expect(page.getSliderTickValue(10).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(11).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 748, y: 32});
      expect(page.getSliderTick(11).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(11).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 733, y: -2});
      expect(page.getSliderTickValue(11).getSize()).toBeApproximateSize({width: 18, height: 24});
    });
  });

  describe('after dragging the slider pointer left', () => {
    const testCases: () => void = (): void => {
      it('moves the pointer element to the nearest tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderPointer().mouseDragSync(-100, -50);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderPointer().touchDragSync(-100, -50);
      });

      testCases();
    });
  });

  describe('after dragging the slider pointer right', () => {
    const testCases: () => void = (): void => {
      it('moves the pointer element to the nearest tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderPointer().mouseDragSync(200, -50);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderPointer().touchDragSync(200, -50);
      });

      testCases();
    });
  });

  describe('after clicking on another tick element', () => {
    const testCases: () => void = (): void => {
      it('moves the pointer element to that tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderTick(3).mouseClick();
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderTick(3).touchTap();
      });

      testCases();
    });
  });

  describe('after clicking on slider bar', () => {
    const testCases: () => void = (): void => {
      it('moves the pointer element to the nearest tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderFullBar().mouseClick(100, 0);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderFullBar().touchTap(100, 0);
      });

      testCases();
    });
  });

  describe('keyboard input', () => {
    describe('after pressing right arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_RIGHT);
      });

      it('moves the slider up one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
      });
    });

    describe('after pressing up arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_UP);
      });

      it('moves the slider up one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
      });
    });

    describe('after pressing left arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_LEFT);
      });

      it('moves the slider down one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
      });
    });

    describe('after pressing down arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_DOWN);
      });

      it('moves the slider down one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
      });
    });

    describe('after pressing page up', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_UP);
      });

      it('moves the slider up one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
      });
    });

    describe('after pressing page down', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_DOWN);
      });

      it('moves the slider down one tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
      });
    });

    describe('after pressing home', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.HOME);
      });

      it('moves the slider to the first tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
      });
    });

    describe('after pressing end', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.END);
      });

      it('moves the slider to the last tick', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});
      });
    });
  });
});
