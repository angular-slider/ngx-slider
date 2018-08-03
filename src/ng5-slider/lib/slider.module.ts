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
import { NgBootstrapFakesModule } from './ng-bootstrap-fakes.module';

// import {} syntax cannot be used in try {} block, so we need to fall back to nodejs's require()
declare var require: any;

const extraImports: any[] = [];
try {
  const ngBootstrap: any = require('@ng-bootstrap/ng-bootstrap');
  extraImports.push(ngBootstrap.NgbModule);
} catch (e) {
  // Use a fake replacement in case ng-bootstrap is missing
  extraImports.push(NgBootstrapFakesModule);
}

/**
 * Ng5Slider module
 *
 * The module exports the slider component
 */
@NgModule({
  imports: [
    CommonModule,
    ...extraImports
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
