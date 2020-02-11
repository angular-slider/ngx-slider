import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-limited-range-slider',
  templateUrl: './limited-range-slider.component.html'
})
export class LimitedRangeSliderComponent {
  minValue = 40;
  maxValue = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minRange: 10,
    maxRange: 50
  };
}
