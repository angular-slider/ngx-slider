import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-ticks-values-slider',
  templateUrl: './ticks-values-slider.component.html'
})
export class TicksValuesSliderComponent {
  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };
}
