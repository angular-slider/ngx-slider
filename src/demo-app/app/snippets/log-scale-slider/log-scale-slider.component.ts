import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-log-scale-slider',
  templateUrl: './log-scale-slider.component.html'
})
export class LogScaleSliderComponent {
  value: number = 1;
  options: Options = {
    floor: 1,
    ceil: 100,
    logScale: true,
    showTicks: true
  };
}
