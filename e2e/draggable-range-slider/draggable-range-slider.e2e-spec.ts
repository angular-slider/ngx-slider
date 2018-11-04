import { RangeSliderDemoPage } from '../range-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';

describe('draggable range slider', () => {
  let page: RangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new RangeSliderDemoPage();
    page.navigateTo('draggable-range-slider');
  });

  describe('initial state', () => {
    it('should display starting values', () => {
      expect(page.getSliderFloorLabel().getText()).toEqual('0');
      expect(page.getSliderCeilLabel().getText()).toEqual('10');
      expect(page.getSliderLowPointerLabel().getText()).toEqual('1');
      expect(page.getSliderHighPointerLabel().getText()).toEqual('8');
    });
  });

  describe('selection bar interactions', () => {
    describe('after dragging the selection bar to the left', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
        });

        it('moves the high pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('7');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().mouseDragSync(-50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().touchDragSync(-50, -50);
        });

        testCases();
      });
    });

    describe('after dragging the selection bar to the right', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('2');
        });

        it('moves the high pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('9');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().mouseDragSync(50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().touchDragSync(50, -50);
        });

        testCases();
      });
    });
  });
});
