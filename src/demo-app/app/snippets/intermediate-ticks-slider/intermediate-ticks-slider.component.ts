import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-intermediate-ticks-slider',
  templateUrl: './intermediate-ticks-slider.component.html'
})
export class IntermediateTicksSliderComponent {
  value: number = 55;
  options: Options = {
    floor: 0,
    ceil: 100,
    showTicks: true,
    tickStep: 10
  };
}
