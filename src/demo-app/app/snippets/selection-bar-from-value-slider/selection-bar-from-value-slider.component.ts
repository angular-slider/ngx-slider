import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-selection-bar-from-value-slider',
  templateUrl: './selection-bar-from-value-slider.component.html'
})
export class SelectionBarFromValueSliderComponent {
  value: number = 5;
  options: Options = {
    floor: -10,
    ceil: 10,
    showSelectionBarFromValue: 0
  };
}
