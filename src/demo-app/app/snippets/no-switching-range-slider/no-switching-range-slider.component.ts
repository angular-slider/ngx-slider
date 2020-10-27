import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-no-switching-range-slider',
  templateUrl: './no-switching-range-slider.component.html'
})
export class NoSwitchingRangeSliderComponent {
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    noSwitching: true
  };
}
