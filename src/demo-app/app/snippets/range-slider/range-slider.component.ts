import { Component } from '@angular/core';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent {
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
}
