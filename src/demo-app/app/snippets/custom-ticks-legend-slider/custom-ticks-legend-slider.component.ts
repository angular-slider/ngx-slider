import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-custom-ticks-legend-slider',
  templateUrl: './custom-ticks-legend-slider.component.html'
})
export class CustomTicksLegendSliderComponent {
  value: number = 5;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 1, legend: 'Very poor'},
      {value: 2},
      {value: 3, legend: 'Fair'},
      {value: 4},
      {value: 5, legend: 'Average'},
      {value: 6},
      {value: 7, legend: 'Good'},
      {value: 8},
      {value: 9, legend: 'Excellent'}
    ]
  };
}
