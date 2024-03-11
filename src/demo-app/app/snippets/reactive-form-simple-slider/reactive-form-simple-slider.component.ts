import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-reactive-form-simple-slider',
  templateUrl: './reactive-form-simple-slider.component.html'
})
export class ReactiveFormSimpleSliderComponent {
  sliderControl: FormControl = new FormControl(100);

  options: Options = {
    floor: 0,
    ceil: 250
  };

  resetForm(): void {
    this.sliderControl.reset(100);
  }
}
