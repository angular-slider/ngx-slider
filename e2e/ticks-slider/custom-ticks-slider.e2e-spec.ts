import { TicksSliderDemoPage } from './ticks-slider-demo.po';
import { approximateGeometryMatchers, expect } from '../utils';

describe('custom ticks slider', () => {
  let page: TicksSliderDemoPage;

  beforeEach(() => {
    jasmine.addMatchers(approximateGeometryMatchers);

    page = new TicksSliderDemoPage();
    page.navigateTo('custom-ticks-legend-slider');
  });

  describe('initial state', () => {
    it('hides normal labels and displays tick values and legend and ', () => {
      expect(page.getSliderFloorLabel().isVisible()).toBe(false);
      expect(page.getSliderCeilLabel().isVisible()).toBe(false);
      expect(page.getSliderPointerLabel().isVisible()).toBe(false);

      expect(page.getSliderTickValue(1).getText()).toBe('1');
      expect(page.getSliderTickLegend(1).getText()).toBe('Very poor');

      expect(page.getSliderTickValue(2).getText()).toBe('2');
      expect(page.getSliderTickLegend(2).isPresent()).toBe(false);

      expect(page.getSliderTickValue(3).getText()).toBe('3');
      expect(page.getSliderTickLegend(3).getText()).toBe('Fair');

      expect(page.getSliderTickValue(4).getText()).toBe('4');
      expect(page.getSliderTickLegend(4).isPresent()).toBe(false);

      expect(page.getSliderTickValue(5).getText()).toBe('5');
      expect(page.getSliderTickLegend(5).getText()).toBe('Average');

      expect(page.getSliderTickValue(6).getText()).toBe('6');
      expect(page.getSliderTickLegend(6).isPresent()).toBe(false);

      expect(page.getSliderTickValue(7).getText()).toBe('7');
      expect(page.getSliderTickLegend(7).getText()).toBe('Good');

      expect(page.getSliderTickValue(8).getText()).toBe('8');
      expect(page.getSliderTickLegend(8).isPresent()).toBe(false);

      expect(page.getSliderTickValue(9).getText()).toBe('9');
      expect(page.getSliderTickLegend(9).getText()).toBe('Excellent');
    });

    it('positions the slider elements correctly', () => {
      expect(page.getSliderFullBar().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 3});
      expect(page.getSliderFullBar().getSize()).toBeApproximateSize({width: 758, height: 32});

      expect(page.getSliderPointer().getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 363, y: 21});
      expect(page.getSliderPointer().getSize()).toBeApproximateSize({width: 32, height: 32});

      expect(page.getSliderTick(1).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 22, y: 32});
      expect(page.getSliderTick(1).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(1).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 11.5, y: -2});
      expect(page.getSliderTickValue(1).getSize()).toBeApproximateSize({width: 9, height: 24});
      expect(page.getSliderTickLegend(1).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 0, y: 56});
      expect(page.getSliderTickLegend(1).getSize()).toBeApproximateSize({width: 32, height: 48});

      expect(page.getSliderTick(2).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 113, y: 32});
      expect(page.getSliderTick(2).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(2).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 102, y: -2});
      expect(page.getSliderTickValue(2).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(3).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 204, y: 32});
      expect(page.getSliderTick(3).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(3).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 193, y: -2});
      expect(page.getSliderTickValue(3).getSize()).toBeApproximateSize({width: 9, height: 24});
      expect(page.getSliderTickLegend(3).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 184, y: 56});
      expect(page.getSliderTickLegend(3).getSize()).toBeApproximateSize({width: 28, height: 24});

      expect(page.getSliderTick(4).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 294, y: 32});
      expect(page.getSliderTick(4).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(4).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 283, y: -2});
      expect(page.getSliderTickValue(4).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(5).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 385, y: 32});
      expect(page.getSliderTick(5).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(5).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 374, y: -2});
      expect(page.getSliderTickValue(5).getSize()).toBeApproximateSize({width: 9, height: 24});
      expect(page.getSliderTickLegend(5).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 354, y: 56});
      expect(page.getSliderTickLegend(5).getSize()).toBeApproximateSize({width: 50, height: 48});

      expect(page.getSliderTick(6).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 476, y: 32});
      expect(page.getSliderTick(6).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(6).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 465, y: -2});
      expect(page.getSliderTickValue(6).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(7).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 567, y: 32});
      expect(page.getSliderTick(7).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(7).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 556, y: -2});
      expect(page.getSliderTickValue(7).getSize()).toBeApproximateSize({width: 9, height: 24});
      expect(page.getSliderTickLegend(7).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 541, y: 56});
      expect(page.getSliderTickLegend(7).getSize()).toBeApproximateSize({width: 39, height: 24});

      expect(page.getSliderTick(8).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 657, y: 32});
      expect(page.getSliderTick(8).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(8).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 646, y: -2});
      expect(page.getSliderTickValue(8).getSize()).toBeApproximateSize({width: 9, height: 24});

      expect(page.getSliderTick(9).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 748, y: 32});
      expect(page.getSliderTick(9).getSize()).toBeApproximateSize({width: 10, height: 10});
      expect(page.getSliderTickValue(9).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 737, y: -2});
      expect(page.getSliderTickValue(9).getSize()).toBeApproximateSize({width: 9, height: 24});
      expect(page.getSliderTickLegend(9).getRelativeLocationWithoutMargins()).toBeApproximateLocation({x: 717, y: 56});
      expect(page.getSliderTickLegend(9).getSize()).toBeApproximateSize({width: 50, height: 48});
    });
  });
});
