import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-draggable-range-slider',
  templateUrl: './draggable-range-slider.component.html'
})
export class DraggableRangeSliderComponent {
  minValue: number = 1;
  maxValue: number = 8;
  options: Options = {
    floor: 0,
    ceil: 10,
    draggableRange: true
  };
}
