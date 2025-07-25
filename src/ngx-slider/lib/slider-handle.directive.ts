import { Directive, HostBinding, inject } from '@angular/core';
import { SliderElementDirective } from './slider-element.directive';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ngxSliderHandle]',
  standalone: false,
})
export class SliderHandleDirective extends SliderElementDirective {
  @HostBinding('class.ngx-slider-active')
  active: boolean = false;

  @HostBinding('attr.role')
  role: string = '';

  @HostBinding('attr.tabindex')
  tabindex: string = '';

  @HostBinding('attr.aria-orientation')
  ariaOrientation: string = '';

  @HostBinding('attr.aria-label')
  ariaLabel: string = '';

  @HostBinding('attr.aria-labelledby')
  ariaLabelledBy: string = '';

  @HostBinding('attr.aria-valuenow')
  ariaValueNow: string = '';

  @HostBinding('attr.aria-valuetext')
  ariaValueText: string = '';

  @HostBinding('attr.aria-valuemin')
  ariaValueMin: string = '';

  @HostBinding('attr.aria-valuemax')
  ariaValueMax: string = '';

  private document: Document = inject(DOCUMENT);

  focus(): void {
    this.elemRef.nativeElement.focus();
  }

  focusIfNeeded(): void {
    if (this.document.activeElement !== this.elemRef.nativeElement) {
      this.elemRef.nativeElement.focus();
    }
  }
}
