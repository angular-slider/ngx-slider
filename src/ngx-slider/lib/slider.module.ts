import { NgModule } from '@angular/core';
import { SliderComponent } from './slider.component';
import { SliderElementDirective } from './slider-element.directive';
import { SliderHandleDirective } from './slider-handle.directive';
import { SliderLabelDirective } from './slider-label.directive';
import { TooltipWrapperComponent } from './tooltip-wrapper.component';

/**
 * NgxSlider module
 *
 * The module exports the slider component
 */
@NgModule({
  imports: [
    SliderComponent,
    SliderElementDirective,
    SliderHandleDirective,
    SliderLabelDirective,
    TooltipWrapperComponent,
  ],
  exports: [SliderComponent],
})
export class NgxSliderModule {}
