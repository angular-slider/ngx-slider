import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}

@Component({
  selector: 'app-vertical-sliders',
  templateUrl: './vertical-sliders.component.html'
})
export class VerticalSlidersComponent {
  verticalSlider1: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider2: RangeSliderModel = {
    minValue: 20,
    maxValue: 80,
    options: {
      floor: 0,
      ceil: 100,
      vertical: true
    }
  };

  verticalSlider3: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true,
      showTicks: true
    }
  };

  verticalSlider4: RangeSliderModel = {
    minValue: 1,
    maxValue: 5,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showTicksValues: true
    }
  };

  verticalSlider5: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      vertical: true,
      showSelectionBar: true
    }
  };

  verticalSlider6: SimpleSliderModel = {
    value: 6,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showSelectionBar: true,
      showTicksValues: true,
      ticksValuesTooltip: (v: number): string => {
        return 'Tooltip for ' + v;
      }
    }
  };
}
