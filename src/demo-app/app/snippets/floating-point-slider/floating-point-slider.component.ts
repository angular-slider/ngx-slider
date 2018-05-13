import { Component } from '@angular/core';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-floating-point-slider',
  templateUrl: './floating-point-slider.component.html'
})
export class FloatingPointSliderComponent {
  value: number = 0.5;
  options: Options = {
    floor: 0,
    ceil: 2,
    step: 0.1,
    precision: 1
  };
}
