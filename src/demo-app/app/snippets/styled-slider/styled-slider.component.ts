import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-styled-slider',
  templateUrl: './styled-slider.component.html',
  styleUrls: ['./styled-slider.component.scss']
})
export class StyledSliderComponent {
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };
}
