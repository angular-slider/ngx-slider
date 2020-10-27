import { Component, EventEmitter } from '@angular/core';
import { Options, PointerType } from '@local/ngx-slider';

@Component({
  selector: 'app-trigger-focus-slider',
  templateUrl: './trigger-focus-slider.component.html'
})
export class TriggerFocusSliderComponent {
  triggerFocus: EventEmitter<PointerType> = new EventEmitter<PointerType>();
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  PointerType: any = PointerType; // expose enum to the view

  focusSlider(pointerType: PointerType): void {
    this.triggerFocus.emit(pointerType);
  }
}
