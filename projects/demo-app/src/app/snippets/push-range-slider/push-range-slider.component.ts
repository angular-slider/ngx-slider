import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-push-range-slider',
  templateUrl: './push-range-slider.component.html'
})
export class PushRangeSliderComponent {
  minValue = 60;
  maxValue = 70;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minRange: 10,
    maxRange: 30,
    pushRange: true
  };
}
