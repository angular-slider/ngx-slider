import { ReactiveFormSimpleSliderDemoPage } from './reactive-form-simple-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';

describe('reactive form simple slider', () => {
  let page: ReactiveFormSimpleSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new ReactiveFormSimpleSliderDemoPage();
    page.navigateTo('reactive-form-simple-slider');
  });

  describe('initial state', () => {
    it('should display starting values in labels', () => {
      expect(page.getSliderFloorLabel().getText()).toEqual('0');
      expect(page.getSliderCeilLabel().getText()).toEqual('250');
      expect(page.getSliderPointerLabel().getText()).toEqual('100');
    });

    it('should position the slider elements correctly', () => {
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

    it('should update the pointer label to new value', () => {
      expect(page.getSliderPointerLabel().getText()).toEqual('50');
    });

    it('should update the form to new value', () => {
      expect(page.getValueTextElement().getText()).toEqual('Value: 50');
    });

    it('should position the pointer and pointer label correctly', () => {
      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});

      expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});
    });

    describe('after resetting the form', () => {
      beforeEach(() => {
        page.getFormResetButton().click();
      });

      it('should update the pointer label to new value', () => {
        expect(page.getSliderPointerLabel().getText()).toEqual('100');
      });

      it('should update the form to new value', () => {
        expect(page.getValueTextElement().getText()).toEqual('Value: 100');
      });

      it('should set the pointer and pointer label back in original position', () => {
        expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: 21});

        expect(page.getSliderPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 290, y: -3});
      });
    });
  });
});
