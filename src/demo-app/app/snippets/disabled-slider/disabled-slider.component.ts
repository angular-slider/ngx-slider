import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-disabled-slider',
  templateUrl: './disabled-slider.component.html'
})
export class DisabledSliderComponent {
  disabled: boolean = true;
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    disabled: true,
    showTicks: true,
    draggableRange: true
  };

  /* Due to the way Angular 2+ handles change detection, we have to create a new options object. */
  onChangeDisabled(): void {
    this.options = Object.assign({}, this.options, {disabled: this.disabled});
  }
}
