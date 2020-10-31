import { SimpleSliderDemoPage } from './simple-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';
import { browser, Key } from 'protractor';

describe('simple slider', () => {
  let page: SimpleSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new SimpleSliderDemoPage();
    page.navigateTo('simple-slider');
  });

  describe('initial state', () => {
    it('displays starting values in labels and positions the slider elements correctly', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('250');
      expect(page.getSliderPointerLabel().getText()).toBe('100');

      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderFloorLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: -3});
      expect(page.getSliderCeilLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});

      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
      expect(page.getSliderPointer().getSize()).toBeApproximateSize({width: 32, height: 32});
      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: -3});
    });
  });

  describe('after dragging the slider pointer with mouse', () => {
    beforeEach(() => {
      page.getSliderPointer().mouseDragSync(-144, 0);
    });

    it('moves the pointer element to the click position', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('50');
      expect(page.getValueInput().getAttribute('value')).toBe('50');
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });
  });

  describe('after dragging the slider pointer with touch gesture', () => {
    beforeEach(() => {
      page.getSliderPointer().touchDragSync(146, 50);
    });

    it('moves the pointer element to the click position', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('150');
      expect(page.getValueInput().getAttribute('value')).toBe('150');
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 435, y: -3});
    });
  });

  describe('after clicking on slider bar', () => {
    const testCases: () => void = (): void => {
      it('moves the pointer element to the click position', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('160');
        expect(page.getValueInput().getAttribute('value')).toBe('160');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 465, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 465, y: -3});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderFullBar().mouseClick(102, 0);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderFullBar().touchTap(102, 0);
      });

      testCases();
    });
  });

  describe('keyboard input', () => {
    const incrementByStepTestCases: () => void = (): void => {
      it('increases the value by step', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('101');
        expect(page.getValueInput().getAttribute('value')).toBe('101');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 292, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 293, y: -3});
      });
    };

    describe('after pressing right arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_RIGHT);
      });

      incrementByStepTestCases();
    });

    describe('after pressing up arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_UP);
      });

      incrementByStepTestCases();
    });

    const decrementByStepTestCases: () => void = (): void => {
      it('decreases the value by step', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('99');
        expect(page.getValueInput().getAttribute('value')).toBe('99');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 288, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 292, y: -3});
      });
    };

    describe('after pressing left arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_LEFT);
      });

      decrementByStepTestCases();
    });

    describe('after pressing down arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_DOWN);
      });

      decrementByStepTestCases();
    });

    describe('after pressing page up', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_UP);
      });

      it('increases value by larger offset', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('125');
        expect(page.getValueInput().getAttribute('value')).toBe('125');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});
      });
    });

    describe('after pressing page down', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_DOWN);
      });

      it('decreases value by larger offset', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('75');
        expect(page.getValueInput().getAttribute('value')).toBe('75');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 218, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 222, y: -3});
      });
    });

    describe('after pressing home', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.HOME);
      });

      it('sets the value to minimum and hide the floor label', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('0');
        expect(page.getSliderFloorLabel().isVisible()).toBe(false);
        expect(page.getValueInput().getAttribute('value')).toBe('0');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 9, y: -3});
      });
    });

    describe('after pressing end', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.END);
      });

      it('sets the value to maximum and hide the ceil label', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('250');
        expect(page.getSliderCeilLabel().isVisible()).toBe(false);
        expect(page.getValueInput().getAttribute('value')).toBe('250');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});
      });
    });
  });

  describe('after changing input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation code, we need to ensure that the number in input is always valid when entering it
      // This should end up with: 100 -> 10 -> 150 -> 50
      page.getValueInput().sendKeys(Key.END, Key.BACK_SPACE).then(() => {
        browser.sleep(200).then(() => {
          page.getValueInput().sendKeys(Key.HOME, Key.RIGHT, '5').then(() => {
            browser.sleep(200).then(() => {
              page.getValueInput().sendKeys(Key.HOME, Key.RIGHT, Key.BACK_SPACE);
            });
          });
        });
      });
    });

    it('sets the value to the new input', () => {
      expect(page.getValueInput().getAttribute('value')).toBe('50');
      expect(page.getSliderPointerLabel().getText()).toBe('50');
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });
  });
});
