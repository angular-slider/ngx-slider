import { BaseRangeSliderDemoPage } from '../base-range-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';

describe('draggable range only slider', () => {
  let page: BaseRangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new BaseRangeSliderDemoPage();
    page.navigateTo('draggable-range-only-slider');
  });

  describe('initial state', () => {
    it('displays starting values', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('10');
      expect(page.getSliderLowPointerLabel().getText()).toBe('4');
      expect(page.getSliderHighPointerLabel().getText()).toBe('6');
    });
  });

  describe('low pointer interactions', () => {
    describe('after dragging the low slider pointer to the left', () => {
      const testCases: () => void = (): void => {
        it('moves the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('3');
          expect(page.getSliderHighPointerLabel().getText()).toBe('5');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(-50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(-50, -50);
        });

        testCases();
      });
    });

    describe('after dragging the low slider pointer to the right', () => {
      const testCases: () => void = (): void => {
        it('moves the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('5');
          expect(page.getSliderHighPointerLabel().getText()).toBe('7');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(50, -50);
        });

        testCases();
      });
    });
  });

  describe('high pointer interactions', () => {
    describe('after dragging the high slider pointer to the left', () => {
      const testCases: () => void = (): void => {
        it('moves the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('3');
          expect(page.getSliderHighPointerLabel().getText()).toBe('5');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(-50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(-50, -50);
        });

        testCases();
      });
    });

    describe('after dragging the high slider pointer to the right', () => {
      const testCases: () => void = (): void => {
        it('moves both the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('5');
          expect(page.getSliderHighPointerLabel().getText()).toBe('7');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(50, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(50, -50);
        });

        testCases();
      });
    });
  });

  describe('selection bar interactions', () => {
    describe('after dragging the selection bar to the left', () => {
      const testCases: () => void = (): void => {
        it('moves both the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('3');
          expect(page.getSliderHighPointerLabel().getText()).toBe('5');
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
        it('moves both the low and high pointers along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('5');
          expect(page.getSliderHighPointerLabel().getText()).toBe('7');
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
