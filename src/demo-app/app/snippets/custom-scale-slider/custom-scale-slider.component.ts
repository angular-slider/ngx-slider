import { Component } from '@angular/core';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-custom-scale-slider',
  templateUrl: './custom-scale-slider.component.html'
})
export class CustomScaleSliderComponent {
  value: number = 200;
  options: Options = {
    floor: 0,
    ceil: 500
  };
}
