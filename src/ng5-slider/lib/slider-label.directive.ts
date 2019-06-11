import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { SliderElementDirective } from './slider-element.directive';

@Directive({
  selector: '[ng5SliderLabel]'
})
export class SliderLabelDirective extends SliderElementDirective {
  value: string = '';

  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}
