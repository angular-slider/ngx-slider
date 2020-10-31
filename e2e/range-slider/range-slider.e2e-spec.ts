import { RangeSliderDemoPage } from './range-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';
import { Key, browser } from 'protractor';

describe('range slider', () => {
  let page: RangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new RangeSliderDemoPage();
    page.navigateTo('range-slider');
  });

  describe('initial state', () => {
    it('displays starting values and position elements correctly', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('250');

      expect(page.getSliderLowPointerLabel().getText()).toBe('50');
      expect(page.getLowValueInput().getAttribute('value')).toBe('50');

      expect(page.getSliderHighPointerLabel().getText()).toBe('200');
      expect(page.getHighValueInput().getAttribute('value')).toBe('200');

      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderFloorLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: -3});
      expect(page.getSliderCeilLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderLowPointer().getSize()).toBeApproximateSize({width: 32, height: 32});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderHighPointer().getSize()).toBeApproximateSize({width: 32, height: 32});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 580, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 436, height: 32});
    });
  });

  describe('after dragging the low slider pointer', () => {
    const testCases: () => void = (): void => {
      it('moves the low pointer to new position', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('125');
        expect(page.getLowValueInput().getAttribute('value')).toBe('125');

        expect(page.getHighValueInput().getAttribute('value')).toBe('200');
        expect(page.getSliderHighPointerLabel().getText()).toBe('200');

        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 580, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderLowPointer().mouseDragSync(218, -50);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderLowPointer().touchDragSync(218, 50);
      });

      testCases();
    });
  });

  describe('after dragging the high slider pointer', () => {
    const testCases: () => void = (): void => {
      it('moves the high pointer to new position', () => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('50');
        expect(page.getLowValueInput().getAttribute('value')).toBe('50');

        expect(page.getSliderHighPointerLabel().getText()).toBe('125');
        expect(page.getHighValueInput().getAttribute('value')).toBe('125');

        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
      });
    };

    describe('with mouse', () => {
      beforeEach(() => {
        page.getSliderHighPointer().mouseDragSync(-218, -50);
      });

      testCases();
    });

    describe('with touch gesture', () => {
      beforeEach(() => {
        page.getSliderHighPointer().touchDragSync(-218, 50);
      });

      testCases();
    });
  });


  describe('after dragging the low and high pointers to the same position', () => {
    beforeEach(() => {
      page.getSliderLowPointer().mouseDragSync(379, 0);
      page.getSliderHighPointer().mouseDragSync(-59, 0);
    });

    it('shows only the combined label instead of normal labels', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('180');
      expect(page.getHighValueInput().getAttribute('value')).toBe('180');

      expect(page.getSliderCombinedLabel().isVisible()).toBe(true);
      expect(page.getSliderLowPointerLabel().isVisible()).toBe(false);
      expect(page.getSliderHighPointerLabel().isVisible()).toBe(false);

      expect(page.getSliderCombinedLabel().getText()).toBe('180 - 180');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 523, y: 21});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 523, y: 21});

      expect(page.getSliderCombinedLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 502, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 539, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 0, height: 32});
    });
  });

  describe('after dragging the low pointer past the high pointer', () => {
    beforeEach(() => {
      page.getSliderLowPointer().mouseDragSync(495, 0);
    });

    it('switches the low and high pointers and moves the high pointer to the new position', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('200');
      expect(page.getLowValueInput().getAttribute('value')).toBe('200');

      expect(page.getSliderHighPointerLabel().getText()).toBe('220');
      expect(page.getHighValueInput().getAttribute('value')).toBe('220');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 580, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 639, y: 21});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 639, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 597, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 58, height: 32});
    });
  });

  describe('after dragging the high pointer past the low pointer', () => {
    beforeEach(() => {
      page.getSliderHighPointer().mouseDragSync(-495, 0);
    });

    it('switches the low and high pointers and moves the low pointer to the new position', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('30');
      expect(page.getLowValueInput().getAttribute('value')).toBe('30');

      expect(page.getSliderHighPointerLabel().getText()).toBe('50');
      expect(page.getHighValueInput().getAttribute('value')).toBe('50');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 87, y: 21});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 91, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 103, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 58, height: 32});
    });
  });

  describe('after clicking on slider bar', () => {
    describe('below low pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer element to the click position', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('40');
          expect(page.getLowValueInput().getAttribute('value')).toBe('40');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 116, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 120, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 132, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 465, height: 32});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderFullBar().mouseClick(-248, 0);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderFullBar().touchTap(-248, 0);
        });

        testCases();
      });
    });

    describe('above high pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the high pointer element to the click position', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getHighValueInput().getAttribute('value')).toBe('210');
          expect(page.getSliderHighPointerLabel().getText()).toBe('210');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 610, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 610, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 465, height: 32});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderFullBar().mouseClick(248, 0);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderFullBar().touchTap(248, 0);
        });

        testCases();
      });
    });
  });

  describe('after clicking on selection bar', () => {
    describe('closer to low pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the low pointer element to the click position', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('90');
          expect(page.getLowValueInput().getAttribute('value')).toBe('90');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 261, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 265, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 277, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 319, height: 32});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().mouseClick(-102, 0);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().touchTap(-102, 0);
        });

        testCases();
      });
    });

    describe('closer to high pointer', () => {
      const testCases: () => void = (): void => {
        it('moves the high pointer element to the click position', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getSliderHighPointerLabel().getText()).toBe('160');
          expect(page.getHighValueInput().getAttribute('value')).toBe('160');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 465, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 465, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 319, height: 32});
        });
      };

      describe('with mouse', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().mouseClick(102, 0);
        });

        testCases();
      });

      describe('with touch gesture', () => {
        beforeEach(() => {
          page.getSliderSelectionBar().touchTap(102, 0);
        });

        testCases();
      });
    });
  });

  describe('keyboard input', () => {
    describe('on the low pointer element', () => {
      const incrementByStepTestCases: () => void = (): void => {
        it('increases the low value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('51');
          expect(page.getLowValueInput().getAttribute('value')).toBe('51');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 148, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 152, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 164, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      };

      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_RIGHT);
        });

        incrementByStepTestCases();
      });

      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_UP);
        });

        incrementByStepTestCases();
      });

      const decrementByStepTestCases: () => void = (): void => {
        it('decreases the low value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('49');
          expect(page.getLowValueInput().getAttribute('value')).toBe('49');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 142, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 146, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 158, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      };

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_LEFT);
        });

        decrementByStepTestCases();
      });

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_DOWN);
        });

        decrementByStepTestCases();
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.PAGE_UP);
        });

        it('increases the low value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('75');
          expect(page.getLowValueInput().getAttribute('value')).toBe('75');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 218, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 222, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 234, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
        });
      });

      describe('after pressing page down', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.PAGE_DOWN);
        });

        it('decreases the low value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('25');
          expect(page.getLowValueInput().getAttribute('value')).toBe('25');

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 73, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 77, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 89, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
        });
      });

      describe('after pressing home', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.HOME);
        });

        it('sets the value to minimum and hides the floor label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('0');
          expect(page.getLowValueInput().getAttribute('value')).toBe('0');
          expect(page.getSliderFloorLabel().isVisible()).toBe(false);

          expect(page.getSliderHighPointerLabel().getText()).toBe('200');
          expect(page.getHighValueInput().getAttribute('value')).toBe('200');
          expect(page.getSliderCeilLabel().isVisible()).toBe(true);

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 9, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 581, height: 32});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.END);
        });

        it('sets the value to maximum, switching pointers and hiding the ceil label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('200');
          expect(page.getLowValueInput().getAttribute('value')).toBe('200');
          expect(page.getSliderFloorLabel().isVisible()).toBe(true);

          expect(page.getSliderHighPointerLabel().getText()).toBe('250');
          expect(page.getHighValueInput().getAttribute('value')).toBe('250');
          expect(page.getSliderCeilLabel().isVisible()).toBe(false);

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 597, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 145, height: 32});
        });
      });
    });

    describe('on the high pointer element', () => {
      const incrementByStepTestCases: () => void = (): void => {
        it('increases the high value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getSliderHighPointerLabel().getText()).toBe('201');
          expect(page.getHighValueInput().getAttribute('value')).toBe('201');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 584, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 584, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      };

      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_RIGHT);
        });

        incrementByStepTestCases();
      });

      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_UP);
        });

        incrementByStepTestCases();
      });

      const decrementByStepTestCases: () => void = (): void => {
        it('decreases the high value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getSliderHighPointerLabel().getText()).toBe('199');
          expect(page.getHighValueInput().getAttribute('value')).toBe('199');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 578, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 578, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      };

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_LEFT);
        });

        decrementByStepTestCases();
      });

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_DOWN);
        });

        decrementByStepTestCases();
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.PAGE_UP);
        });

        it('increases the high value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getSliderHighPointerLabel().getText()).toBe('225');
          expect(page.getHighValueInput().getAttribute('value')).toBe('225');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 653, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 508, height: 32});
        });
      });

      describe('after pressing page down', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.PAGE_DOWN);
        });

        it('decreases the high value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');

          expect(page.getSliderHighPointerLabel().getText()).toBe('175');
          expect(page.getHighValueInput().getAttribute('value')).toBe('175');

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
        });
      });

      describe('after pressing home', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.HOME);
        });

        it('sets the value to minimum, switching pointers and hiding the floor label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('0');
          expect(page.getLowValueInput().getAttribute('value')).toBe('0');
          expect(page.getSliderFloorLabel().isVisible()).toBe(false);

          expect(page.getSliderHighPointerLabel().getText()).toBe('50');
          expect(page.getHighValueInput().getAttribute('value')).toBe('50');
          expect(page.getSliderCeilLabel().isVisible()).toBe(true);

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 9, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 145, height: 32});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.END);
        });

        it('sets the high value to maximum and hides the ceil label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toBe('50');
          expect(page.getLowValueInput().getAttribute('value')).toBe('50');
          expect(page.getSliderFloorLabel().isVisible()).toBe(true);

          expect(page.getSliderHighPointerLabel().getText()).toBe('250');
          expect(page.getHighValueInput().getAttribute('value')).toBe('250');
          expect(page.getSliderCeilLabel().isVisible()).toBe(false);

          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 149, y: -3});

          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});
          expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 725, y: -3});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 581, height: 32});
        });
      });
    });
  });

  describe('after changing low input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation checks, we need to ensure that inputs contain valid data at all times while editing
      // Low value: 50 -> 5 -> 25 -> 125
      page.getLowValueInput().sendKeys(Key.END, Key.BACK_SPACE).then(() => {
        browser.sleep(200).then(() => {
          page.getLowValueInput().sendKeys(Key.HOME, '2').then(() => {
            browser.sleep(200).then(() => {
              page.getLowValueInput().sendKeys(Key.HOME, '1');
            });
          });
        });
      });
    });

    it('sets the low value to new input', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('125');
      expect(page.getSliderLowPointerLabel().getText()).toBe('125');

      expect(page.getHighValueInput().getAttribute('value')).toBe('200');
      expect(page.getSliderHighPointerLabel().getText()).toBe('200');

      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after changing high input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation checks, we need to change both inputs and ensure that they contain valid data at all times while editing
      // We also need to wait between edits, so that changes are propagated correctly due to throttling
      // Low value: 50 -> 0
      page.getLowValueInput().sendKeys(Key.END, Key.LEFT, Key.BACK_SPACE).then(() => {
        browser.sleep(200).then(() => {
          // High value: 200 -> 20
          page.getHighValueInput().sendKeys(Key.END, Key.BACK_SPACE).then(() => {
            browser.sleep(200).then(() => {
              // 20 -> 2
              page.getHighValueInput().sendKeys(Key.END, Key.BACK_SPACE).then(() => {
                browser.sleep(200).then(() => {
                  // 2 -> 25
                  page.getHighValueInput().sendKeys(Key.END, '5').then(() => {
                    browser.sleep(200).then(() => {
                      // 2 -> 25
                      page.getHighValueInput().sendKeys(Key.HOME, '1');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('sets the high value to new input', () => {
      browser.sleep(1200).then(() => {
        expect(page.getSliderLowPointerLabel().getText()).toBe('0');
        expect(page.getLowValueInput().getAttribute('value')).toBe('0');

        expect(page.getSliderHighPointerLabel().getText()).toBe('125');
        expect(page.getHighValueInput().getAttribute('value')).toBe('125');

        expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
        expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 9, y: -3});

        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
      });
    });
  });
});
