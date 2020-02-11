import { Directive, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { SliderElementDirective } from './slider-element.directive';

@Directive({
  selector: '[ng5SliderHandle]'
})
export class SliderHandleDirective extends SliderElementDirective {
  @HostBinding('class.ng5-slider-active')
  active = false;

  @HostBinding('attr.role')
  role = '';

  @HostBinding('attr.tabindex')
  tabindex = '';

  @HostBinding('attr.aria-orientation')
  ariaOrientation = '';

  @HostBinding('attr.aria-label')
  ariaLabel = '';

  @HostBinding('attr.aria-labelledby')
  ariaLabelledBy = '';

  @HostBinding('attr.aria-valuenow')
  ariaValueNow = '';

  @HostBinding('attr.aria-valuetext')
  ariaValueText = '';

  @HostBinding('attr.aria-valuemin')
  ariaValueMin = '';

  @HostBinding('attr.aria-valuemax')
  ariaValueMax = '';

  focus(): void {
    this.elemRef.nativeElement.focus();
  }

  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}
