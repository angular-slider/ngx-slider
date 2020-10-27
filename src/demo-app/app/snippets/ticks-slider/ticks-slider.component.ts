import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-ticks-slider',
  templateUrl: './ticks-slider.component.html'
})
export class TicksSliderComponent {
  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 10,
    showTicks: true
  };
}
