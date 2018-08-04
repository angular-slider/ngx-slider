import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SliderComponent,
  RightOutSelDirective,
  LeftOutSelDirective,
  FullBarDirective,
  SelBarDirective,
  MinHDirective,
  MaxHDirective,
  FlrLabDirective,
  CeilLabDirective,
  MinLabDirective,
  MaxLabDirective,
  CmbLabDirective,
  TicksDirective
} from './slider.component';
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
    RightOutSelDirective,
    LeftOutSelDirective,
    FullBarDirective,
    SelBarDirective,
    MinHDirective,
    MaxHDirective,
    FlrLabDirective,
    CeilLabDirective,
    MinLabDirective,
    MaxLabDirective,
    CmbLabDirective,
    TicksDirective,
    TooltipWrapperComponent
  ],
  exports: [
    SliderComponent
  ]
})
export class Ng5SliderModule { }
