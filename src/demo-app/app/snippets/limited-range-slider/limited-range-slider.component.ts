import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-limited-range-slider',
  templateUrl: './limited-range-slider.component.html'
})
export class LimitedRangeSliderComponent {
  minValue: number = 40;
  maxValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minRange: 10,
    maxRange: 50
  };
}
