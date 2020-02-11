import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent {
  minValue = 50;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
}
