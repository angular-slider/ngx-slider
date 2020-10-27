import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-custom-combine-labels-function-slider',
  templateUrl: './custom-combine-labels-function-slider.component.html'
})
export class CustomCombineLabelsFunctionSliderComponent {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };
}
