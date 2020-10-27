import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-custom-display-function-slider',
  templateUrl: './custom-display-function-slider.component.html'
})
export class CustomDisplayFunctionSliderComponent {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    }
  };
}
