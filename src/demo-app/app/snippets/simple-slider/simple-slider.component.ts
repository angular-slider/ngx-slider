import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-simple-slider',
  templateUrl: './simple-slider.component.html'
})
export class SimpleSliderComponent {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };
}
