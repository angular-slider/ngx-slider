import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-custom-ticks-slider',
  templateUrl: './custom-ticks-slider.component.html'
})
export class CustomTicksSliderComponent {
  value: number = 55;
  options: Options = {
    floor: 0,
    ceil: 100,
    ticksArray: [0, 10, 25, 50, 100]
  };
}
