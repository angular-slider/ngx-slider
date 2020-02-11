import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-simple-slider',
  templateUrl: './simple-slider.component.html'
})
export class SimpleSliderComponent {
  value = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };
}
