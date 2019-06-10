import { RangeSliderDemoPage } from './range-slider-demo.po';
import { approximateGeometryMatchers } from '../utils';
import { Key, browser } from 'protractor';

describe('range slider', () => {
  let page: RangeSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new RangeSliderDemoPage();
    page.navigateTo('range-slider');
  });

  describe('initial state', () => {
    it('should display starting values in labels', () => {
      expect(page.getSliderFloorLabel().getText()).toBe('0');
      expect(page.getSliderCeilLabel().getText()).toBe('250');
      expect(page.getSliderLowPointerLabel().getText()).toBe('50');
      expect(page.getSliderHighPointerLabel().getText()).toBe('200');
    });

    it('should display starting values in the form inputs', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('50');
      expect(page.getHighValueInput().getAttribute('value')).toBe('200');
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

      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 580, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 436, height: 32});
    });
  });

  describe('after dragging the low slider pointer with mouse', () => {
    beforeEach(() => {
      page.getSliderLowPointer().mouseDragSync(218, -50);
    });

    it('should update the low pointer label to new value', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('125');
    });

    it('should update low value in the form to new value', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('125');
    });

    it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after dragging the low slider pointer with touch gesture', () => {
    beforeEach(() => {
      page.getSliderLowPointer().touchDragSync(218, 50);
    });

    it('should update the low pointer label to new value', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('125');
    });

    it('should update low value in the form to new value', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('125');
    });

    it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after dragging the high slider pointer with mouse', () => {
    beforeEach(() => {
      page.getSliderHighPointer().mouseDragSync(-218, -50);
    });

    it('should update the high pointer label to new value', () => {
      expect(page.getSliderHighPointerLabel().getText()).toBe('125');
    });

    it('should update high value in the form to new value', () => {
      expect(page.getHighValueInput().getAttribute('value')).toBe('125');
    });

    it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after dragging the high slider pointer with touch gesture', () => {
    beforeEach(() => {
      page.getSliderHighPointer().touchDragSync(-218, 50);
    });

    it('should update the high pointer label to new value', () => {
      expect(page.getSliderHighPointerLabel().getText()).toEqual('125');
    });

    it('should update high value in the form to new value', () => {
      expect(page.getHighValueInput().getAttribute('value')).toEqual('125');
    });

    it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

      expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after dragging the low and high pointers to the same position', () => {
    beforeEach(() => {
      page.getSliderLowPointer().mouseDragSync(379, 0);
      page.getSliderHighPointer().mouseDragSync(-59, 0);
    });

    it('should update the high and low value in the form', () => {
      expect(page.getLowValueInput().getAttribute('value')).toEqual('180');
      expect(page.getHighValueInput().getAttribute('value')).toEqual('180');
    });

    it('should show the combined pointer and label instead of low and high pointers and labels', () => {
      expect(page.getSliderCombinedLabel().isVisible()).toBe(true);
      expect(page.getSliderLowPointerLabel().isVisible()).toBe(false);
      expect(page.getSliderHighPointerLabel().isVisible()).toBe(false);

      expect(page.getSliderCombinedLabel().getText()).toBe('180 - 180');
    });

    it('should position the elements correctly', () => {
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

    it('should switch the low and high pointers', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('200');
      expect(page.getSliderHighPointerLabel().getText()).toBe('220');
    });

    it('should update the high and low value in the form', () => {
      expect(page.getLowValueInput().getAttribute('value')).toEqual('200');
      expect(page.getHighValueInput().getAttribute('value')).toEqual('220');
    });

    it('should position the elements correctly', () => {
      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 639, y: 21});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 597, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 58, height: 32});
    });
  });

  describe('after dragging the high pointer past the low pointer', () => {
    beforeEach(() => {
      page.getSliderHighPointer().mouseDragSync(-495, 0);
    });

    it('should switch the low and high pointers', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('30');
      expect(page.getSliderHighPointerLabel().getText()).toBe('50');
    });

    it('should update the high and low value in the form', () => {
      expect(page.getLowValueInput().getAttribute('value')).toEqual('30');
      expect(page.getHighValueInput().getAttribute('value')).toEqual('50');
    });

    it('should position the elements correctly', () => {
      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 87, y: 21});
      expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 103, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 58, height: 32});
    });
  });

  describe('keyboard input', () => {
    describe('on the low pointer element', () => {
      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_RIGHT);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('51');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('51');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 148, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 164, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      });

      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_UP);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('51');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('51');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 148, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 164, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      });

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_LEFT);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('49');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('49');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 142, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 158, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      });

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.ARROW_DOWN);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('49');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('49');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 142, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 158, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.PAGE_UP);
        });

        it('should increase value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('75');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('75');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 218, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 234, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
        });
      });

      describe('after pressing page down', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.PAGE_DOWN);
        });

        it('should decrease value by larger offset', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('25');
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('25');
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
          page.getSliderLowPointer().sendKeys(Key.HOME);
        });

        it('should set the value to minimum and hide the floor label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
          expect(page.getSliderFloorLabel().isVisible()).toBe(false);
        });

        it('should update the low value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('0');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 581, height: 32});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderLowPointer().sendKeys(Key.END);
        });

        it('should set the value to maximum, switching pointers and hiding the ceil label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('200');
          expect(page.getSliderHighPointerLabel().getText()).toEqual('250');
          expect(page.getSliderCeilLabel().isVisible()).toBe(false);
        });

        it('should update the low and high value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('200');
          expect(page.getHighValueInput().getAttribute('value')).toEqual('250');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 581, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 597, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 145, height: 32});
        });
      });
    });

    describe('on the high pointer element', () => {
      describe('after pressing right arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_RIGHT);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('201');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('201');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 584, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      });

      describe('after pressing up arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_UP);
        });

        it('should increase the value by step', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('201');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('201');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 584, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 439, height: 32});
        });
      });

      describe('after pressing left arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_LEFT);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('199');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('199');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 578, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      });

      describe('after pressing down arrow', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.ARROW_DOWN);
        });

        it('should decrease the value by step', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('199');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('199');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 578, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 433, height: 32});
        });
      });

      describe('after pressing page up', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.PAGE_UP);
        });

        it('should increase value by larger offset', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('225');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('225');
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
          page.getSliderHighPointer().sendKeys(Key.PAGE_DOWN);
        });

        it('should decrease value by larger offset', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('175');
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('175');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 508, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
        });
      });

      describe('after pressing home', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.HOME);
        });

        it('should set the value to minimum, switching pointers and hiding the floor label', () => {
          expect(page.getSliderLowPointerLabel().getText()).toEqual('0');
          expect(page.getSliderHighPointerLabel().getText()).toEqual('50');
          expect(page.getSliderFloorLabel().isVisible()).toBe(false);
        });

        it('should update the low and high value in the form', () => {
          expect(page.getLowValueInput().getAttribute('value')).toEqual('0');
          expect(page.getHighValueInput().getAttribute('value')).toEqual('50');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 145, height: 32});
        });
      });

      describe('after pressing end', () => {
        beforeEach(() => {
          page.getSliderHighPointer().sendKeys(Key.END);
        });

        it('should set the value to maximum and hide the ceil label', () => {
          expect(page.getSliderHighPointerLabel().getText()).toEqual('250');
          expect(page.getSliderCeilLabel().isVisible()).toBe(false);
        });

        it('should update the high value in the form', () => {
          expect(page.getHighValueInput().getAttribute('value')).toEqual('250');
        });

        it('should position the elements correctly', () => {
          expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 145, y: 21});
          expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 726, y: 21});

          expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 161, y: 3});
          expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 581, height: 32});
        });
      });
    });
  });

  describe('after changing low input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation checks, we need to ensure that inputs contain valid data at all times while editing
      // Low value: 50 -> 5 -> 125
      page.getLowValueInput().sendKeys(Key.END, Key.BACK_SPACE, Key.LEFT, Key.LEFT, '12');
    });

    it('should update low value in the form to new value', () => {
      expect(page.getLowValueInput().getAttribute('value')).toBe('125');
    });

    it('should update the low pointer label to new value', () => {
      expect(page.getSliderLowPointerLabel().getText()).toBe('125');
    });

    it('should position the low pointer, the low pointer label and the selection bar correctly', () => {
      expect(page.getSliderLowPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

      expect(page.getSliderLowPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

      expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 379, y: 3});
      expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 218, height: 32});
    });
  });

  describe('after changing high input value in the form', () => {
    beforeEach(() => {
      // Due to normalisation checks, we need to change both inputs and ensure that they contain valid data at all times while editing
      // Low value: 50 -> 0
      page.getLowValueInput().sendKeys(Key.END, Key.LEFT, Key.BACK_SPACE)
        .then(() => {
          browser.sleep(50)
            .then(() => {
              // High value: 200 -> 20 -> 25 -> 125
              page.getHighValueInput().sendKeys(Key.END, Key.BACK_SPACE, Key.BACK_SPACE, '5', Key.LEFT, Key.LEFT, '1');
            });
        });
    });

    it('should update values in the form to new value', () => {
      browser.sleep(50).then(() => {
        expect(page.getLowValueInput().getAttribute('value')).toBe('0');
        expect(page.getHighValueInput().getAttribute('value')).toBe('125');
      });
    });

    it('should update the high pointer label to new value', () => {
      browser.sleep(50).then(() => {
        expect(page.getSliderHighPointerLabel().getText()).toEqual('125');
      });
    });

    it('should position the high pointer, the high pointer label and the selection bar correctly', () => {
      browser.sleep(50).then(() => {
        expect(page.getSliderHighPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});

        expect(page.getSliderHighPointerLabel().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: -3});

        expect(page.getSliderSelectionBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 16, y: 3});
        expect(page.getSliderSelectionBar().getSize()).toBeApproximateSize({width: 363, height: 32});
      });
    });
  });
});
