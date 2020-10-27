import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-selection-bar-gradient-slider',
  templateUrl: './selection-bar-gradient-slider.component.html'
})
export class SelectionBarGradientSliderComponent {
  minValue: number = 0;
  maxValue: number = 80;
  options: Options = {
    ceil: 100,
    showSelectionBar: true,
    selectionBarGradient: {
      from: 'white',
      to: '#FC0'
    }
  };
}
