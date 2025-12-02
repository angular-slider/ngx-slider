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
    restrictedRange: {
      from: 30,
      to: 70,
    },
    skipRestrictedRangesWithArrowKeys: true,
  };
}
