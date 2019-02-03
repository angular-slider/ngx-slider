import { ReactiveFormRangeSliderDemoPage } from './reactive-form-range-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';

describe('reactive form range slider', () => {
  let page: ReactiveFormRangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new ReactiveFormRangeSliderDemoPage();
    page.navigateTo('reactive-form-range-slider');
  });

  describe('initial state', () => {
    it('should display starting values in labels', () => {
      expect(page.getSliderFloorLabel().getText()).toEqual('0');
      expect(page.getSliderCeilLabel().getText()).toEqual('100');
      expect(page.getSliderLowPointerLabel().getText()).toEqual('20');
      expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
    });

    it('should position the slider elements correctly', () => {
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

    describe('after dragging the low slider pointer', () => {
      beforeEach(() => {
        page.getSliderLowPointer().mouseDragSync(220, -50);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel().getText()).toEqual('50');
      });

      it('should update the low value on the form to new value', () => {
        expect(page.getLowValueTextElement().getText()).toEqual('Low value: 50');
      });

      it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
      });

      describe('after resetting the form', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(-220, -50);
          page.getFormResetButton().click();
        });

        it('should update the slider pointer labels to original values', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('20');
          expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
        });

        it('should update the form to original values', () => {
          expect(page.getLowValueTextElement().getText()).toEqual('Low value: 20');
          expect(page.getHighValueTextElement().getText()).toEqual('High value: 80');
        });

        it('should set slider elements back in original positions', () => {
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
    });

    describe('after dragging the high slider pointer', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-220, -50);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderHighPointerLabel().getText()).toEqual('50');
      });

      it('should update the high value on the form to new value', () => {
        expect(page.getHighValueTextElement().getText()).toEqual('High value: 50');
      });

      it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
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

        it('should update the slider pointer labels to original values', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('20');
          expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
        });

        it('should update the form to original values', () => {
          expect(page.getLowValueTextElement().getText()).toEqual('Low value: 20');
          expect(page.getHighValueTextElement().getText()).toEqual('High value: 80');
        });

        it('should set slider elements back in original positions', () => {
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
    });
  });
});
