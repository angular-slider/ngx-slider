import { VerticalSlidersDemoPage } from './vertical-sliders-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';
import { Key } from 'protractor';

/* tslint:disable:max-line-length */

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
      it('displays starting values in labels and positions the slider elements correctly', () => {
        expect(page.getSliderFloorLabel(SIMPLE_SLIDER).getText()).toBe('0');
        expect(page.getSliderCeilLabel(SIMPLE_SLIDER).getText()).toBe('10');
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('5');

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

      it('moves the pointer to new position', () => {
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('7');
        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 80});
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 83});
      });
    });

    describe('after dragging the slider pointer with touch gesture', () => {
      beforeEach(() => {
        page.getSliderLowPointer(SIMPLE_SLIDER).touchDragSync(0, 65);
      });

      it('moves the pointer to new position', () => {
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('3');
        expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 188});
        expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 191});
      });
    });

    describe('keyboard input', () => {
      const incrementByStepTestCases: () => void = (): void => {
        it('increases the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('6');
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});
        });
      };

      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_UP);
        });

        incrementByStepTestCases();
      });

      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_RIGHT);
        });

        incrementByStepTestCases();
      });

      const decrementByStepTestCases: () => void = (): void => {
        it('decreases the value by step', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('4');
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 161});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 164});
        });
      };

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_DOWN);
        });

        decrementByStepTestCases();
      });

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.ARROW_LEFT);
        });

        decrementByStepTestCases();
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.PAGE_UP);
        });

        it('increases the value by larger offset', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('6');
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 107});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 110});
        });
      });

      describe('after pressing page down', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.PAGE_DOWN);
        });

        it('decreases value by larger offset', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('4');
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 161});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 164});
        });
      });

      describe('after pressing home', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.HOME);
        });

        it('sets the value to minimum and hides the floor label', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('0');
          expect(page.getSliderFloorLabel(SIMPLE_SLIDER).isVisible()).toBe(false);
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 271});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderLowPointer(SIMPLE_SLIDER).sendKeys(Key.END);
        });

        it('sets the value to maximum and hides the ceil label', () => {
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getText()).toBe('10');
          expect(page.getSliderCeilLabel(SIMPLE_SLIDER).isVisible()).toBe(false);
          expect(page.getSliderLowPointer(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});
          expect(page.getSliderLowPointerLabel(SIMPLE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 3});
        });
      });
    });
  });

  describe('range vertical slider', () => {
    const RANGE_SLIDER: number = 2;

    describe('initial state', () => {
      it('displays starting values in labels and positions the slider elements correctly', () => {
        expect(page.getSliderFloorLabel(RANGE_SLIDER).getText()).toBe('0');
        expect(page.getSliderCeilLabel(RANGE_SLIDER).getText()).toBe('100');
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

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

    describe('after dragging the low slider pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer to new position', () => {
          expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('50');
          expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

          expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});
          expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

          expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
          expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

          expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
          expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderLowPointer(RANGE_SLIDER).mouseDragSync(-50, -80);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderLowPointer(RANGE_SLIDER).touchDragSync(50, -80);
        });

        testCases();
      });
    });

    describe('after dragging the high slider pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the high pointer to new position', () => {
          expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
          expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('50');

          expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
          expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

          expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 134});
          expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 137});

          expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 150});
          expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 80});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(-50, 80);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderHighPointer(RANGE_SLIDER).touchDragSync(50, 80);
        });

        testCases();
      });
    });

    describe('after dragging the low and high pointers to the same position', () => {
      beforeEach(() => {
        page.getSliderLowPointer(RANGE_SLIDER).mouseDragSync(0, -108);
        page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(0, 54);
      });

      it('shows the combined pointer and label instead of low and high pointers and labels', () => {
        expect(page.getSliderCombinedLabel(RANGE_SLIDER).isVisible()).toBe(true);
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).isVisible()).toBe(false);
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).isVisible()).toBe(false);

        expect(page.getSliderCombinedLabel(RANGE_SLIDER).getText()).toBe('60 - 60');

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

      it('switches the low and high pointers and moves the high pointer to the new position', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('80');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('95');

        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 13});
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 16});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 30});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 40});
      });
    });

    describe('after dragging the high pointer past the low pointer', () => {
      beforeEach(() => {
        page.getSliderHighPointer(RANGE_SLIDER).mouseDragSync(0, 200);
      });

      it('switches the low and high pointers and moves the low pointer to the new position', () => {
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('5');
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('20');

        expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 255});
        expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 258});

        expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
        expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

        expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 231});
        expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 40});
      });
    });

    describe('keyboard input', () => {
      describe('on the low pointer element', () => {
        const incrementByStepTestCases: () => void = (): void => {
          it('increases the low value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('21');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 212});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 215});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        };

        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_RIGHT);
          });

          incrementByStepTestCases();
        });

        describe('after pressing up arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_UP);
          });

          incrementByStepTestCases();
        });

        const decrementByStepTestCases: () => void = (): void => {
          it('decreases the low value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('19');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 217});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 220});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        };

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_LEFT);
          });

          decrementByStepTestCases();
        });

        describe('after pressing down arrow', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.ARROW_DOWN);
          });

          decrementByStepTestCases();
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.PAGE_UP);
          });

          it('increases the low value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('30');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 188});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 191});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 134});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.PAGE_DOWN);
          });

          it('decreases the low value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('10');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 241});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 244});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 69});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 188});
          });
        });

        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.HOME);
          });

          it('sets the value to minimum and hides the floor label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('0');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('80');
            expect(page.getSliderFloorLabel(RANGE_SLIDER).isVisible()).toBe(false);

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 271});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 70});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 214});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderLowPointer(RANGE_SLIDER).sendKeys(Key.END);
          });

          it('sets the value to maximum, switches pointers and hides the ceil label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('80');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('100');
            expect(page.getSliderCeilLabel(RANGE_SLIDER).isVisible()).toBe(false);

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 54});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 57});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 3});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 16});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 54});
          });
        });
      });

      describe('on the high pointer element', () => {
        const incrementTestCases: () => void = (): void => {
          it('increases the high value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('81');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 51});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 54});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 67});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 163});
          });
        };

        describe('after pressing right arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_RIGHT);
          });

          incrementTestCases();
        });

        describe('after pressing up arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_UP);
          });

          incrementTestCases();
        });

        const decrementTestCases: () => void = (): void => {
          it('decreases the high value by step', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('79');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 56});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 59});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 72});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 158});
          });
        };

        describe('after pressing left arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_LEFT);
          });

          decrementTestCases();
        });

        describe('after pressing down arrow', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.ARROW_DOWN);
          });

          decrementTestCases();
        });

        describe('after pressing page up', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.PAGE_UP);
          });

          it('should increase the high value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('90');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 27});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 30});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 42});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 188});
          });
        });

        describe('after pressing page down', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.PAGE_DOWN);
          });

          it('should decrease the hight value by larger offset', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('70');

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 80});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 83});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 96});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 134});
          });
        });

        describe('after pressing home', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.HOME);
          });

          it('sets the value to minimum, switches pointers and hides the floor label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('0');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderFloorLabel(RANGE_SLIDER).isVisible()).toBe(false);

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 268});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 271});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 230});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 54});
          });
        });

        describe('after pressing end', () => {
          beforeEach(() => {
            page.getSliderHighPointer(RANGE_SLIDER).sendKeys(Key.END);
          });

          it('sets the value to maximum and hides the ceil label', () => {
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getText()).toBe('20');
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getText()).toBe('100');
            expect(page.getSliderCeilLabel(RANGE_SLIDER).isVisible()).toBe(false);

            expect(page.getSliderLowPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 214});
            expect(page.getSliderLowPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 217});

            expect(page.getSliderHighPointer(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 6, y: 0});
            expect(page.getSliderHighPointerLabel(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 36, y: 3});

            expect(page.getSliderSelectionBar(RANGE_SLIDER).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: -12, y: 16});
            expect(page.getSliderSelectionBar(RANGE_SLIDER).getSize()).toBeApproximateSize({width: 32, height: 214});
          });
        });
      });
    });
  });
});
