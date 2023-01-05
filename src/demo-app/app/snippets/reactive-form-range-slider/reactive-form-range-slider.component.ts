import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-reactive-form-range-slider',
  templateUrl: './reactive-form-range-slider.component.html'
})
export class ReactiveFormRangeSliderComponent {
  sliderForm: UntypedFormGroup = new UntypedFormGroup({
    sliderControl: new UntypedFormControl([20, 80])
  });
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  resetForm(): void {
    this.sliderForm.reset({sliderControl: [20, 80]});
  }
}
