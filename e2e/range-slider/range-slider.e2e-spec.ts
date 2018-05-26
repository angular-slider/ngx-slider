import { RangeSliderDemoPage } from '../range-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';
import { Key } from 'protractor';

describe('range slider', () => {
  let page: RangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new RangeSliderDemoPage();
    page.navigateTo('range-slider');
  });

  describe('initial state', () => {
    it('should display starting values in labels', () => {
      expect(page.getSliderFloorLabel().getText()).toEqual('0');
      expect(page.getSliderCeilLabel().getText()).toEqual('100');
      expect(page.getSliderLowPointerLabel().getText()).toEqual('10');
      expect(page.getSliderHighPointerLabel().getText()).toEqual('90');
    });

    it('should position the slider elements correctly', () => {
      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderFloorLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: -3});

      expect(page.getSliderCeilLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
      expect(page.getSliderLowPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 77, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});
      expect(page.getSliderHighPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 657, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 581, height: 32});
    });

    describe('after dragging the low slider pointer with mouse', () => {
      beforeEach(() => {
        page.getSliderLowPointer().mouseDragSync(273, -50);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel().getText()).toEqual('50');
      });

      it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 290, height: 32});
      });
    });

    describe('after dragging the low slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderLowPointer().touchDragSync(273, 50);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel().getText()).toEqual('50');
      });

      it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 290, height: 32});
      });
    });

    describe('after dragging the high slider pointer with mouse', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-273, -50);
      });

      it('should update the high pointer label to new value', () => {
        expect(page.getSliderHighPointerLabel().getText()).toEqual('50');
      });

      it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 290, height: 32});
      });
    });

    describe('after dragging the high slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderHighPointer().touchDragSync(-273, 50);
      });

      it('should update the high pointer label to new value', () => {
        expect(page.getSliderHighPointerLabel().getText()).toEqual('50');
      });

      it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 367, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 290, height: 32});
      });
    });

    describe('after dragging the low and high pointers to the same position', () => {
      beforeEach(() => {
        page.getSliderLowPointer().mouseDragSync(400, 0);
        page.getSliderHighPointer().mouseDragSync(-109, 0);
      });

      it('should show the combined pointer and label instead of low and high pointers and labels', () => {
        expect(page.getSliderCombinedLabel().isVisible()).toBe(true);
        expect(page.getSliderLowPointerLabel().isVisible()).toBe(false);
        expect(page.getSliderHighPointerLabel().isVisible()).toBe(false);

        expect(page.getSliderCombinedLabel().getText()).toBe('70 - 70');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});

        expect(page.getSliderCombinedLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 497, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 524, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 0, height: 32});
      });
    });

    describe('after dragging the low pointer past the high pointer', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-109, 0);
        page.getSliderLowPointer().mouseDragSync(490, 0);
      });

      it('should switch the low and high pointers', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('70');
        expect(page.getSliderHighPointerLabel().getText()).toBe('80');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 524, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 73, height: 32});
      });
    });

    describe('after dragging the high pointer past the low pointer', () => {
      beforeEach(() => {
        page.getSliderLowPointer().mouseDragSync(400, 0);
        page.getSliderHighPointer().mouseDragSync(-200, 0);
      });

      it('should switch the low and high pointers', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('60');
        expect(page.getSliderHighPointerLabel().getText()).toBe('70');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 436, y: 21});
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 452, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 73, height: 32});
      });
    });

    describe('keyboard input', () => {
      describe('on the low pointer element', () => {
        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.ARROW_RIGHT);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('20');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
          });
        });

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.ARROW_LEFT);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.PAGE_UP);
          });

          it('should increase value by larger offset', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('20');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.PAGE_DOWN);
          });

          it('should decrease value by larger offset', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });

        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.HOME);
          });

          it('should set the value to minimum and hide the floor label', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
            expect(page.getSliderFloorLabel().isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderLowPointer().sendKeys(Key.END);
          });

          it('should set the value to maximum, switching pointers and hiding the ceil label', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('90');
            expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
            expect(page.getSliderCeilLabel().isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 669, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 73, height: 32});
          });
        });
      });

      describe('on the high pointer element', () => {
        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.ARROW_RIGHT);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.ARROW_LEFT);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
          });
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.PAGE_UP);
          });

          it('should increase value by larger offset', () => {
            expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.PAGE_DOWN);
          });

          it('should decrease value by larger offset', () => {
            expect(page.getSliderHighPointerLabel().getText()).toEqual('80');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
          });
        });
        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.HOME);
          });

          it('should set the value to minimum, switching pointers and hiding the floor label', () => {
            expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
            expect(page.getSliderHighPointerLabel().getText()).toEqual('10');
            expect(page.getSliderFloorLabel().isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 73, height: 32});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderHighPointer().sendKeys(Key.END);
          });

          it('should set the value to maximum and hide the ceil label', () => {
            expect(page.getSliderHighPointerLabel().getText()).toEqual('100');
            expect(page.getSliderCeilLabel().isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
            expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

            expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
            expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 653, height: 32});
          });
        });
      });
    });
  });
});
