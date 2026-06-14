import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
    selector: 'app-limited-slider',
    templateUrl: './limited-slider.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LimitedSliderComponent {
  value: number = 50;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minLimit: 10,
    maxLimit: 90
  };
}
