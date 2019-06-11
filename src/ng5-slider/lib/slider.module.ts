import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { SliderElementDirective } from './slider-element.directive';
import { SliderLabelDirective } from './slider-label.directive';
import { TooltipWrapperComponent } from './tooltip-wrapper.component';

/**
 * Ng5Slider module
 *
 * The module exports the slider component
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SliderComponent,
    SliderElementDirective,
    SliderLabelDirective,
    TooltipWrapperComponent
  ],
  exports: [
    SliderComponent
  ]
})
export class Ng5SliderModule { }
