import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  Optional,
  Renderer2,
} from "@angular/core";
import { SliderElementDirective } from "./slider-element.directive";
import { ValueHelper } from "./value-helper";
import { AllowUnsafeHtmlInSlider } from "./options";

@Directive({
  selector: "[ngxSliderLabel]",
})
export class SliderLabelDirective extends SliderElementDirective {
  private _value: string = null;
  get value(): string {
    return this._value;
  }

  constructor(
    elemRef: ElementRef,
    renderer: Renderer2,
    changeDetectionRef: ChangeDetectorRef,
    @Inject(AllowUnsafeHtmlInSlider)
    @Optional()
    private allowUnsafeHtmlInSlider: boolean
  ) {
    super(elemRef, renderer, changeDetectionRef);
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
