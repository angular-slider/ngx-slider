import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-ticks-values-range-slider',
  templateUrl: './ticks-values-range-slider.component.html'
})
export class TicksValuesRangeSliderComponent {
  minValue: number = 1;
  maxValue: number = 8;
  options: Options = {
    floor: 0,
    ceil: 10,
    showTicksValues: true
  };
}
