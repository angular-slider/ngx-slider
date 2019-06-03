import { VerticalSlidersDemoPage } from './vertical-sliders-demo.po';
import { approximateGeometryMatchers } from '../utils';
import { Key } from 'protractor';

describe('vertical sliders', () => {
  let page: VerticalSlidersDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new VerticalSlidersDemoPage();
    page.navigateTo();
  });

  describe('simple vertical slider', () => {
    const SIMPLE_SLIDER: number = 1;

    describe('initial state', () => {
      it('should display starting values in labels', () => {
        expect(page.getSliderFloorLabel(SIMPLE_SLIDER).getText()).toBe('0');
        expect(page.getSliderCeilLabel(SIMPLE_SLIDER).getText()).toBe('10');
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('5');
      });

      it('should position the slider elements correctly', () => {
        expect(page.getSliderSelectionBar(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 150});
        expect(page.getSliderSelectionBar(SIMPLE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 150});

        expect(page.getSliderFloorLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 274});

        expect(page.getSliderCeilLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 0});

        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});
        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 32});

        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});
      });
    });

    describe('after dragging the slider pointer with mouse', () => {
      beforeEach(() => {
        page.getSliderLowPointer(SIMPLE_SLIDER).mouseDragSync(0, -65);
      });

      it('should update the pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('7');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 80});

        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 83});
      });
    });

    describe('after dragging the slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderLowPointer(SIMPLE_SLIDER).touchDragSync(0, 65);
      });

      it('should update the pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('3');
      });

      it('should position the pointer and pointer label correctly', () => {
        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 188});

        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 191});
      });
    });

    describe('keyboard input', () => {
      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_UP);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('6');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});
        });
      });

      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_RIGHT);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('6');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});
        });
      });

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_DOWN);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('4');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 161});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 164});
        });
      });

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_LEFT);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('4');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 161});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 164});
        });
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.PAGE_UP);
        });

        it('should increase value by larger offset', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('6');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});
        });
      });

      describe('after pressing page down', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.PAGE_DOWN);
        });

        it('should decrease value by larger offset', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('4');
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 161});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 164});
        });
      });

      describe('after pressing home', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.HOME);
        });

        it('should set the value to minimum and hide the floor label', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('0');
          expect(page.getSliderFloorLabel(SIMPLE_SLIDER).isVisible()).toBe(false);
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 271});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.END);
        });

        it('should set the value to maximum and hide the ceil label', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('10');
          expect(page.getSliderCeilLabel(SIMPLE_SLIDER).isVisible()).toBe(false);
        });

        it('should position the pointer and pointer label correctly', () => {
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});

          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 3});
        });
      });
    });
  });

  describe('range vertical slider', () => {
    const RANGE_SLIDER: number = 2;

    describe('initial state', () => {
      it('should display starting values in labels', () => {
        expect(page.getSliderFloorLabel(RANGE_SLIDER).getText()).toBe('0');
        expect(page.getSliderCeilLabel(RANGE_SLIDER).getText()).toBe('100');
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');
      });

      it('should position the slider elements correctly', () => {
        expect(page.getSliderFullBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 0});
        expect(page.getSliderFullBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 300});

        expect(page.getSliderFloorLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 274});

        expect(page.getSliderCeilLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 0});

        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
        expect(page.getSliderLowPointer(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 32});

        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
        expect(page.getSliderHighPointer(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 32});

        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 69});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 161});
      });
    });

    describe('after dragging the low slider pointer with mouse', () => {
      beforeEach(() => {
        page.getSliderLowPointer(RANGE_SLIDER).mouseDragSync(-50, -80);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('50');
      });

      it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});

        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
      });
    });

    describe('after dragging the low slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderLowPointer(RANGE_SLIDER).touchDragSync(50, -80);
      });

      it('should update the low pointer label to new value', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('50');
      });

      it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});

        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
      });
    });

    describe('after dragging the high slider pointer with mouse', () => {
      beforeEach(() => {
        page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(-50, 80);
      });

      it('should update the high pointer label to new value', () => {
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('50');
      });

      it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});

        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 150});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
      });
    });

    describe('after dragging the high slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderHighPointer(RANGE_SLIDER).touchDragSync(50, 80);
      });

      it('should update the high pointer label to new value', () => {
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('50');
      });

      it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});

        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 150});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
      });
    });

    describe('after dragging the low and high pointers to the same position', () => {
      beforeEach(() => {
        page.getSliderLowPointer(RANGE_SLIDER).mouseDragSync(0, -108);
        page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(0, 54);
      });

      it('should show the combined pointer and label instead of low and high pointers and labels', () => {
        expect(page.getSliderCombinedLabel(RANGE_SLIDER).isVisible()).toBe(true);
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).isVisible()).toBe(false);
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).isVisible()).toBe(false);

        expect(page.getSliderCombinedLabel(RANGE_SLIDER).getText()).toBe('60 - 60');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});
        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});

        expect(page.getSliderCombinedLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 123});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 0});
      });
    });

    describe('after dragging the low pointer past the high pointer', () => {
      beforeEach(() => {
        page.getSliderLowPointer(RANGE_SLIDER).mouseDragSync(0, -200);
      });

      it('should switch the low and high pointers', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('80');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('95');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 13});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 30});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 40});
      });
    });

    describe('after dragging the high pointer past the low pointer', () => {
      beforeEach(() => {
        page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(0, 200);
      });

      it('should switch the low and high pointers', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('5');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('20');
      });

      it('should position the elements correctly', () => {
        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 255});
        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 231});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 40});
      });
    });

    describe('keyboard input', () => {
      describe('on the low pointer element', () => {
        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_RIGHT);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('21');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 212});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        });

        describe('after pressing up arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_UP);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('21');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 212});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        });

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_LEFT);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('19');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 217});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        });

        describe('after pressing down arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_DOWN);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('19');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 217});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.PAGE_UP);
          });

          it('should increase value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('30');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 188});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 134});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.PAGE_DOWN);
          });

          it('should decrease value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('10');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 241});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 69});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 188});
          });
        });

        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.HOME);
          });

          it('should set the value to minimum and hide the floor label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('0');
            expect(page.getSliderFloorLabel(RANGE_SLIDER).isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 214});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.END);
          });

          it('should set the value to maximum, switching pointers and hiding the ceil label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('80');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('100');
            expect(page.getSliderCeilLabel(RANGE_SLIDER).isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 16});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 54});
          });
        });
      });

      describe('on the high pointer element', () => {
        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_RIGHT);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('81');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 51});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 67});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        });

        describe('after pressing up arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_UP);
          });

          it('should increase the value by step', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('81');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 51});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 67});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        });

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_LEFT);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('79');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 56});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 72});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        });

        describe('after pressing down arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_DOWN);
          });

          it('should decrease the value by step', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('79');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 56});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 72});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.PAGE_UP);
          });

          it('should increase value by larger offset', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('90');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 27});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 42});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 188});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.PAGE_DOWN);
          });

          it('should decrease value by larger offset', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('70');
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 80});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 96});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 134});
          });
        });

        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.HOME);
          });

          it('should set the value to minimum, switching pointers and hiding the floor label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toEqual('0');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('20');
            expect(page.getSliderFloorLabel(RANGE_SLIDER).isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 230});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 54});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.END);
          });

          it('should set the value to maximum and hide the ceil label', () => {
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toEqual('100');
            expect(page.getSliderCeilLabel(RANGE_SLIDER).isVisible()).toBe(false);
          });

          it('should position the elements correctly', () => {
            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 16});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 214});
          });
        });
      });
    });
  });
});
