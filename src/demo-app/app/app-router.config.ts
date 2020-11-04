import { ExtraOptions, Routes } from '@angular/router';

import { DemosComponent } from './demos.component';
import { HomeComponent } from './home.component';
import {
  CustomTicksLegendSliderComponent,
  DraggableRangeSliderComponent,
  DraggableRangeOnlySliderComponent,
  PushRangeSliderComponent,
  RangeSliderComponent,
  ReactiveFormRangeSliderComponent,
  ReactiveFormSimpleSliderComponent,
  SimpleSliderComponent,
  TicksValuesSliderComponent,
  VerticalSlidersComponent,
} from './snippets';

export const routerConfig: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'api', redirectTo: 'docs' },

  // pages for e2e testing
  { path: 'custom-ticks-legend-slider', component: CustomTicksLegendSliderComponent },
  { path: 'draggable-range-slider', component: DraggableRangeSliderComponent },
  { path: 'draggable-range-only-slider', component: DraggableRangeOnlySliderComponent },
  { path: 'push-range-slider', component: PushRangeSliderComponent },
  { path: 'range-slider', component: RangeSliderComponent },
  { path: 'reactive-form-range-slider', component: ReactiveFormRangeSliderComponent },
  { path: 'reactive-form-simple-slider', component: ReactiveFormSimpleSliderComponent },
  { path: 'simple-slider', component: SimpleSliderComponent },
  { path: 'ticks-values-slider', component: TicksValuesSliderComponent },
  { path: 'vertical-sliders', component: VerticalSlidersComponent },

  { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
};
