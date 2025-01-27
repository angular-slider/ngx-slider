import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
    selector: 'app-selection-bar-slider',
    templateUrl: './selection-bar-slider.component.html',
    standalone: false
})
export class SelectionBarSliderComponent {
  value: number = 10;
  options: Options = {
    floor: 0,
    ceil: 10,
    showSelectionBar: true
  };
}
