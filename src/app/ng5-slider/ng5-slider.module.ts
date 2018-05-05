import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

@NgModule({
  imports: [
    CommonModule,
    NgbModule
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
    TicksDirective
  ],
  exports: [
    SliderComponent
  ]
})
export class Ng5SliderModule { }

export { Options } from './options';
