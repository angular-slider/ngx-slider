import { BaseRangeSliderDemoPage } from '../base-range-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';

describe('push range slider', () => {
  let page: BaseRangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new BaseRangeSliderDemoPage();
    page.navigateTo('push-range-slider');
  });

  describe('initial state', () => {
    it('displays starting values', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('100');
      expect(page.getSliderLowPointerLabel().getText()).toBe('60');
      expect(page.getSliderHighPointerLabel().getText()).toBe('70');
    });
  });

  describe('low pointer interactions', () => {
    describe('after dragging the low pointer to the left within changeable range', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer to the new value and leave the high pointer unchanged', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getSliderHighPointerLabel().getText()).toBe('70');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(-73, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(-73, -50);
        });

        testCases();
      });
    });

    describe('after dragging the low pointer to the left exceeding range limit', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer to the new value and pull the high pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('30');
          expect(page.getSliderHighPointerLabel().getText()).toBe('60');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(-215, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(-215, 50);
        });

        testCases();
      });
    });

    describe('after dragging the low pointer to the left below lowest value', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer to the minimum value and pull the high pointer to the maximum range', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('0');
          expect(page.getSliderHighPointerLabel().getText()).toBe('30');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(-450, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(-435, 50);
        });

        testCases();
      });
    });

    describe('after dragging the low slider pointer to the right', () => {
      const testCases: () => void = (): void => {
        it('should move the low pointer to the new value and push the high pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('65');
          expect(page.getSliderHighPointerLabel().getText()).toBe('75');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(37, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(37, 50);
        });

        testCases();
      });
    });

    describe('after dragging the low slider pointer to the right above maximum value', () => {
      const testCases: () => void = (): void => {
        it('should move the low pointer to the maximum value minus minimum range and push the high pointer to the maximum value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('90');
          expect(page.getSliderHighPointerLabel().getText()).toBe('100');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer().mouseDragSync(300, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer().touchDragSync(300, -50);
        });

        testCases();
      });
    });
  });

  describe('high pointer interactions', () => {
    describe('after dragging the high pointer to the right below maximum range', () => {
      const testCases: () => void = (): void => {
        it('should move the high pointer to the new value and leave the low pointer unchanged', () => {
          expect(page.getSliderHighPointerLabel().getText()).toBe('80');
          expect(page.getSliderLowPointerLabel().getText()).toBe('60');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(73, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(73, 50);
        });

        testCases();
      });
    });

    describe('after dragging the high pointer to the right exceeding maximum range', () => {
      const testCases: () => void = (): void => {
        it('should move the high pointer to the new value and pull the low pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toBe('95');
          expect(page.getSliderLowPointerLabel().getText()).toBe('65');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(185, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(185, 50);
        });

        testCases();
      });
    });

    describe('after dragging the high slider pointer to the right above highest value', () => {
      const testCases: () => void = (): void => {
        it('should move the high pointer to the maximum value and pull the low pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toBe('100');
          expect(page.getSliderLowPointerLabel().getText()).toBe('70');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(235, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(235, 50);
        });

        testCases();
      });
    });

    describe('after dragging the high slider pointer to the left', () => {
      const testCases: () => void = (): void => {
        it('should move the high pointer to the new value and push the low pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toBe('60');
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(-73, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(-73, 50);
        });

        testCases();
      });
    });

    describe('after dragging the high slider pointer to the left below minimum value', () => {
      const testCases: () => void = (): void => {
        it('should move the high pointer to the minimum value value plus minimum range ' +
           'and push the low pointer to the minimum value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toBe('10');
          expect(page.getSliderLowPointerLabel().getText()).toBe('0');
        });
      };

      describe('with a mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer().mouseDragSync(-450, -50);
        });

        testCases();
      });

      describe('with a touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer().touchDragSync(-450, 50);
        });

        testCases();
      });
    });
  });
});
