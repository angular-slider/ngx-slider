import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
    selector: 'app-disabled-normalisation-slider',
    templateUrl: './disabled-normalisation-slider.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DisabledNormalisationSliderComponent {
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250,
    step: 10,
    enforceStep: false,
    enforceRange: false,
  };
}
