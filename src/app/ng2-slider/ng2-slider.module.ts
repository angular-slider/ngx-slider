import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Ng2SliderComponent,
  RightOutSelDirective,
  LeftOutSelDirective,
  FullBarDirective,
  SelBarDirective,
  MinHDirective,
  MaxHDirective,
  FlrLabDirective,
  FloorLabelTemplateDirective,
  CeilLabDirective,
  CeilLabelTemplateDirective,
  MinLabDirective,
  MinLabelTemplateDirective,
  MaxLabDirective,
  MaxLabelTemplateDirective,
  CmbLabDirective,
  CombinedLabelTemplateDirective,
  TicksDirective
 } from './ng2-slider.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    Ng2SliderComponent,
    RightOutSelDirective,
    LeftOutSelDirective,
    FullBarDirective,
    SelBarDirective,
    MinHDirective,
    MaxHDirective,
    FlrLabDirective,
    FloorLabelTemplateDirective,
    CeilLabDirective,
    CeilLabelTemplateDirective,
    MinLabDirective,
    MinLabelTemplateDirective,
    MaxLabDirective,
    MaxLabelTemplateDirective,
    CmbLabDirective,
    CombinedLabelTemplateDirective,
    TicksDirective
  ],
  exports: [
    Ng2SliderComponent,
    FloorLabelTemplateDirective,
    CeilLabelTemplateDirective,
    MinLabelTemplateDirective,
    MaxLabelTemplateDirective,
    CombinedLabelTemplateDirective,
  ]
})
export class Ng2SliderModule { }

export { Options as Ng2SliderOptions } from './options';
