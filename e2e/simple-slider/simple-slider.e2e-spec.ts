import { SimpleSliderDemoPage } from './simple-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';
import { Key } from 'protractor';

describe('simple slider', () => {
  let page: SimpleSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new SimpleSliderDemoPage();
    page.navigateTo('simple-slider');
  });

  describe('initial state', () => {
    it('should display starting values in labels', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('250');
      expect(page.getSliderPointerLabel().getText()).toBe('100');
    });

    it('should position the slider elements correctly', () => {
      expect(page.getSliderBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderBar().getSize()).toBeApproximateSize({width: 758, height: 32});

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

    it('should update the pointer label to new value', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('50');
    });

    it('should update input in the form to new value', () => {
      expect(page.getValueInput().getAttribute('value')).toBe('50');
    });

    it('should position the pointer and pointer label correctly', () => {
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});

      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });
  });

  describe('after dragging the slider pointer with touch gesture', () => {
    beforeEach(() => {
      page.getSliderPointer().touchDragSync(146, 50);
    });

    it('should update the pointer label to new value', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('150');
    });

    it('should update input in the form to new value', () => {
      expect(page.getValueInput().getAttribute('value')).toBe('150');
    });

    it('should position the pointer and pointer label correctly', () => {
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});

      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 435, y: -3});
    });
  });

  describe('keyboard input', () => {
    describe('after pressing right arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_RIGHT);
      });

      it('should increase the value by step', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('101');
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('101');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 292, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 293, y: -3});
      });
    });

    describe('after pressing left arrow', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.ARROW_LEFT);
      });

      it('should decrease the value by step', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('99');
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('99');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 288, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 292, y: -3});
      });
    });

    describe('after pressing page up', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_UP);
      });

      it('should increase value by larger offset', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('125');
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('125');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});
      });
    });

    describe('after pressing page down', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.PAGE_DOWN);
      });

      it('should decrease value by larger offset', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('75');
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('75');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 218, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 222, y: -3});
      });
    });

    describe('after pressing home', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.HOME);
      });

      it('should set the value to minimum and hide the floor label', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('0');
        expect(page.getSliderFloorLabel().isVisible()).toBe(false);
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('0');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 9, y: -3});
      });
    });

    describe('after pressing end', () => {
      beforeEach(() => {
        page.getSliderPointer().sendKeys(Key.END);
      });

      it('should set the value to maximum and hide the ceil label', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('250');
        expect(page.getSliderCeilLabel().isVisible()).toBe(false);
      });

      it('should update input in the form to new value', () => {
        expect(page.getValueInput().getAttribute('value')).toBe('250');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});
      });
    });
  });

  describe('after changing input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation code, we need to ensure that the number in input is always valid when entering it
      // This should end up with: 100 -> 10 -> 150 -> 50
      page.getValueInput().sendKeys(Key.END, Key.BACK_SPACE, Key.LEFT, '5', Key.LEFT, Key.BACK_SPACE);
    });

    it('should update low value in the form to new value', () => {
      expect(page.getValueInput().getAttribute('value')).toBe('50');
    });

    it('should update the low pointer label to new value', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('50');
    });

    it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});

      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });
  });
});
