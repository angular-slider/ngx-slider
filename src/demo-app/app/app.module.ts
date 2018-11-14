import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng5SliderModule } from '@local/ng5-slider';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home.component';
import { ApiComponent } from './api.component';
import { DemosComponent } from './demos.component';
import {
  SimpleSliderComponent,
  RangeSliderComponent,
  StyledSliderComponent,
  LimitedSliderComponent,
  LimitedRangeSliderComponent,
  NoSwitchingRangeSliderComponent,
  PushRangeSliderComponent,
  SelectionBarSliderComponent,
  SelectionBarAtEndSliderComponent,
  SelectionBarFromValueSliderComponent,
  SelectionBarGradientSliderComponent,
  DynamicColorSelectionBarSliderComponent,
  DynamicPointerColorSliderComponent,
  SteppedSliderComponent,
  RightToLeftSliderComponent,
  FloatingPointSliderComponent,
  CustomDisplayFunctionSliderComponent,
  CustomCombineLabelsFunctionSliderComponent,
  CustomHtmlDisplayFunctionSliderComponent,
  AlphabetSliderComponent,
  DateSliderComponent,
  TicksSliderComponent,
  IntermediateTicksSliderComponent,
  CustomTicksSliderComponent,
  CustomTicksLegendSliderComponent,
  CustomLegendFunctionSliderComponent,
  TicksTooltipsSliderComponent,
  TicksCustomTooltipsSliderComponent,
  TicksValuesTooltipsSliderComponent,
  TicksValuesRangeSliderComponent,
  IntermediateTicksValuesRangeSliderComponent,
  DynamicTickColorSliderComponent,
  LogScaleSliderComponent,
  CustomScaleSliderComponent,
  DraggableRangeSliderComponent,
  DraggableRangeOnlySliderComponent,
  DisabledSliderComponent,
  ReadOnlySliderComponent,
  VerticalSlidersComponent,
  UserEventsSliderComponent,
  ManualRefreshSliderComponent,
  TicksValuesSliderComponent
} from './snippets';
import { routerConfig } from './app-router.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DemosComponent,
    ApiComponent,
    SimpleSliderComponent,
    RangeSliderComponent,
    StyledSliderComponent,
    LimitedSliderComponent,
    LimitedRangeSliderComponent,
    NoSwitchingRangeSliderComponent,
    PushRangeSliderComponent,
    SelectionBarSliderComponent,
    SelectionBarAtEndSliderComponent,
    SelectionBarFromValueSliderComponent,
    SelectionBarGradientSliderComponent,
    DynamicColorSelectionBarSliderComponent,
    DynamicPointerColorSliderComponent,
    SteppedSliderComponent,
    RightToLeftSliderComponent,
    FloatingPointSliderComponent,
    CustomDisplayFunctionSliderComponent,
    CustomCombineLabelsFunctionSliderComponent,
    CustomHtmlDisplayFunctionSliderComponent,
    AlphabetSliderComponent,
    DateSliderComponent,
    TicksSliderComponent,
    IntermediateTicksSliderComponent,
    CustomTicksSliderComponent,
    CustomTicksLegendSliderComponent,
    CustomLegendFunctionSliderComponent,
    TicksTooltipsSliderComponent,
    TicksCustomTooltipsSliderComponent,
    TicksValuesTooltipsSliderComponent,
    TicksValuesRangeSliderComponent,
    IntermediateTicksValuesRangeSliderComponent,
    DynamicTickColorSliderComponent,
    LogScaleSliderComponent,
    CustomScaleSliderComponent,
    DraggableRangeSliderComponent,
    DraggableRangeOnlySliderComponent,
    DisabledSliderComponent,
    ReadOnlySliderComponent,
    VerticalSlidersComponent,
    UserEventsSliderComponent,
    ManualRefreshSliderComponent,
    TicksValuesSliderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routerConfig),
    NgbModule.forRoot(),
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
