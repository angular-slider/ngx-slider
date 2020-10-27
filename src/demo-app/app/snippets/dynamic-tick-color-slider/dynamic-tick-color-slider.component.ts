import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-dynamic-tick-color-slider',
  templateUrl: './dynamic-tick-color-slider.component.html'
})
export class DynamicTickColorSliderComponent {
  value: number = 0;
  options: Options = {
    ceil: 12,
    floor: 0,
    showSelectionBar: true,
    showTicks: true,
    getTickColor: (value: number): string => {
      if (value < 3) {
        return 'red';
      }
      if (value < 6) {
        return 'orange';
      }
      if (value < 9) {
        return 'yellow';
      }
      return '#2AE02A';
    }
  };
}
