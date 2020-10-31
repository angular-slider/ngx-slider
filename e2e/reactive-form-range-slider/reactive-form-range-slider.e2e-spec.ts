import { ReactiveFormRangeSliderDemoPage } from './reactive-form-range-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';

describe('reactive form range slider', () => {
  let page: ReactiveFormRangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new ReactiveFormRangeSliderDemoPage();
    page.navigateTo('reactive-form-range-slider');
  });

  describe('initial state', () => {
    it('displays starting values in labels and positions the slider elements correctly', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('100');

      expect(page.getSliderLowPointerLabel().getText()).toBe('20');
      expect(page.getSliderHighPointerLabel().getText()).toBe('80');

      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderFloorLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: -3});
      expect(page.getSliderCeilLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderLowPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderHighPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 585, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 436, height: 32});
    });
  });

  describe('after dragging the low slider pointer', () => {
    beforeEach(() => {
      page.getSliderLowPointer().mouseDragSync(220, -50);
    });

    it('moves the low pointer to new position', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('50');
      expect(page.getLowValueTextElement().getText()).toBe('Low value: 50');

      expect(page.getSliderHighPointerLabel().getText()).toBe('80');
      expect(page.getHighValueTextElement().getText()).toBe('High value: 80');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 585, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });

    describe('after resetting the form', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-220, -50);
        page.getFormResetButton().click();
      });

      it('reverts the slider to starting state', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('20');
        expect(page.getLowValueTextElement().getText()).toBe('Low value: 20');

        expect(page.getSliderHighPointerLabel().getText()).toBe('80');
        expect(page.getHighValueTextElement().getText()).toBe('High value: 80');

        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 585, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 436, height: 32});
      });
    });
  });

  describe('after dragging the high slider pointer', () => {
    beforeEach(() => {
      page.getSliderHighPointer().mouseDragSync(-220, -50);
    });

    it('moves the high pointer to new position', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('20');
      expect(page.getLowValueTextElement().getText()).toBe('Low value: 20');

      expect(page.getSliderHighPointerLabel().getText()).toBe('50');
      expect(page.getHighValueTextElement().getText()).toBe('High value: 50');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });

    describe('after resetting the form', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-220, -50);
        page.getFormResetButton().click();
      });

      it('reverts the slider to starting state', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('20');
        expect(page.getLowValueTextElement().getText()).toBe('Low value: 20');

        expect(page.getSliderHighPointerLabel().getText()).toBe('80');
        expect(page.getHighValueTextElement().getText()).toBe('High value: 80');

        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 585, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 436, height: 32});
      });
    });
  });
});
