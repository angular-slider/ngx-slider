import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
    selector: 'app-restricted-range-slider',
    templateUrl: './restricted-range-slider.component.html',
    standalone: false
})
export class RestrictedRangeSliderComponent {
  value: number = 10;
  options: Options = {
    floor: 0,
    ceil: 100,
    restrictedRange: [
      { from: 20, to: 35 },
      { from: 65, to: 80 },
    ],
    skipRestrictedRangesWithArrowKeys: true,
  };
}
