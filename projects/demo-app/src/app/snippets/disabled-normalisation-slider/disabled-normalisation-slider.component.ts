import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-disabled-normalisation-slider',
  templateUrl: './disabled-normalisation-slider.component.html'
})
export class DisabledNormalisationSliderComponent {
  minValue = 50;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 250,
    step: 10,
    enforceStep: false,
    enforceRange: false,
  };
}
