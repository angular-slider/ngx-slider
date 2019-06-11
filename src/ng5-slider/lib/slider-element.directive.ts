import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { JqLiteWrapper } from './jq-lite-wrapper';

@Directive({
  selector: '[ng5SliderElement]'
})
export class SliderElementDirective extends JqLiteWrapper {
  position: number = 0;
  dimension: number = 0;
  alwaysHide: boolean = false;


  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}
