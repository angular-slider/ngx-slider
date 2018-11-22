import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-reactive-form-range-slider',
  templateUrl: './reactive-form-range-slider.component.html'
})
export class ReactiveFormRangeSliderComponent {
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };
}
