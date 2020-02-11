import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-ticks-values-tooltips-slider',
  templateUrl: './ticks-values-tooltips-slider.component.html'
})
export class TicksValuesTooltipsSliderComponent {
  value = 5;
  options: Options = {
    floor: 0,
    ceil: 10,
    showTicksValues: true,
    ticksValuesTooltip: (v: number): string => {
      return 'Tooltip for ' + v;
    }
  };
}
