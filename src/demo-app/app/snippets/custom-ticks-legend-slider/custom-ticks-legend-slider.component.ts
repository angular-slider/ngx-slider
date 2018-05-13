import { Component } from '@angular/core';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-custom-ticks-legend-slider',
  templateUrl: './custom-ticks-legend-slider.component.html'
})
export class CustomTicksLegendSliderComponent {
  value: number = 50;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicksValues: true,
    customValueToPosition: (val: number, minVal: number, maxVal: number): number => {
      val = Math.sqrt(val);
      minVal = Math.sqrt(minVal);
      maxVal = Math.sqrt(maxVal);
      const range: number = maxVal - minVal;
      return (val - minVal) / range;
    },
    customPositionToValue: (percent: number, minVal: number, maxVal: number): number => {
      minVal = Math.sqrt(minVal);
      maxVal = Math.sqrt(maxVal);
      const value: number = percent * (maxVal - minVal) + minVal;
      return Math.pow(value, 2);
    }
  };
}
