import { RangeSliderDemoPage } from '../range-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';

describe('push range slider', () => {
  let page: RangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new RangeSliderDemoPage();
    page.navigateTo('push-range-slider');
  });

  describe('initial state', () => {
    it('should display starting values', () => {
      expect(page.getSliderFloorLabel().getText()).toEqual('0');
      expect(page.getSliderCeilLabel().getText()).toEqual('100');
      expect(page.getSliderLowPointerLabel().getText()).toEqual('60');
      expect(page.getSliderHighPointerLabel().getText()).toEqual('70');
    });
  });

  describe('low pointer interactions', () => {
    describe('after dragging the low pointer to the left within changeable range', () => {
      const testCases: () => void = (): void => {
        it('should move the low pointer to the new value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('50');
        });

        it('should leave the high pointer unchanged', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('70');
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
        it('should move the low pointer to the new value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('30');
        });

        it('should pull the high pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('60');
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
        it('should move the low pointer to the minimum value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
        });

        it('should pull the high pointer to the maximum range', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('30');
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
        it('should move the low pointer to the new value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('65');
        });

        it('should push the high pointer along', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('75');
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
        it('should move the low pointer to the maximum value minus minimum range', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('90');
        });

        it('should push the high pointer to the maximum value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
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
        it('should move the high pointer to the new value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
        });

        it('should leave the low pointer unchanged', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('60');
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
        it('should move the high pointer to the new value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('95');
        });

        it('should pull the low pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('65');
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
        it('should move the high pointer to the maximum value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
        });

        it('should pull the low pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('70');
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
        it('should move the high pointer to the new value', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('60');
        });

        it('should push the low pointer along', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('50');
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
        it('should move the high pointer to the minimum value value plus minimum range', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('10');
        });

        it('should push the low pointer to the minimum value', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
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
