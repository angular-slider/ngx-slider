import { ReactiveFormSimpleSliderDemoPage } from './reactive-form-simple-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';

describe('reactive form simple slider', () => {
  let page: ReactiveFormSimpleSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new ReactiveFormSimpleSliderDemoPage();
    page.navigateTo('reactive-form-simple-slider');
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

  describe('after dragging the slider pointer', () => {
    beforeEach(() => {
      page.getSliderPointer().mouseDragSync(-144, 0);
    });

    it('updates the pointer to new position', () => {
      expect(page.getSliderPointerLabel().getText()).toBe('50');
      expect(page.getValueTextElement().getText()).toBe('Value: 50');
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });

    describe('after resetting the form', () => {
      beforeEach(() => {
        page.getFormResetButton().click();
      });

      it('reverts the slider to starting state', () => {
        expect(page.getSliderPointerLabel().getText()).toBe('100');
        expect(page.getValueTextElement().getText()).toBe('Value: 100');
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});
        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: -3});
      });
    });
  });
});
