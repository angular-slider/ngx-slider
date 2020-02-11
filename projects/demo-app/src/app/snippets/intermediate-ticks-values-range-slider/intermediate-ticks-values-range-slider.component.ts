import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-intermediate-ticks-values-range-slider',
  templateUrl: './intermediate-ticks-values-range-slider.component.html'
})
export class IntermediateTicksValuesRangeSliderComponent {
  minValue = 15;
  maxValue = 85;
  options: Options = {
    floor: 0,
    ceil: 100,
    showTicksValues: true,
    tickStep: 10,
    tickValueStep: 10
  };
}
