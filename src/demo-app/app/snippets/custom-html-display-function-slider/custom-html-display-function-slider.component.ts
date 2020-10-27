import { Component } from '@angular/core';
import { Options, LabelType } from '@local/ngx-slider';

@Component({
  selector: 'app-custom-html-display-function-slider',
  templateUrl: './custom-html-display-function-slider.component.html'
})
export class CustomHtmlDisplayFunctionSliderComponent {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
}
