import { Directive, inject } from '@angular/core';
import { SliderElementDirective } from './slider-element.directive';
import { ValueHelper } from './value-helper';
import { AllowUnsafeHtmlInSlider } from './options';

@Directive({
  selector: '[ngxSliderLabel]',
  standalone: false,
})
export class SliderLabelDirective extends SliderElementDirective {
  private allowUnsafeHtmlInSlider = inject(AllowUnsafeHtmlInSlider, {
    optional: true,
  });

  private _value: string = null;
  get value(): string {
    return this._value;
  }

  setValue(value: string): void {
    let recalculateDimension: boolean = false;

    if (
      !this.alwaysHide &&
      (ValueHelper.isNullOrUndefined(this.value) ||
        this.value.length !== value.length ||
        (this.value.length > 0 && this.dimension === 0))
    ) {
      recalculateDimension = true;
    }

    this._value = value;
    if (this.allowUnsafeHtmlInSlider === false) {
      this.elemRef.nativeElement.innerText = value;
    } else {
      this.elemRef.nativeElement.innerHTML = value;
    }

    // Update dimension only when length of the label have changed
    if (recalculateDimension) {
      this.calculateDimension();
    }
  }
}
