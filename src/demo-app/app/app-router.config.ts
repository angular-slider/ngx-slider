import { Routes } from '@angular/router';

import { DemosComponent } from './demos.component';
import { HomeComponent } from './home.component';
import {
  DraggableRangeSliderComponent,
  PushRangeSliderComponent,
  RangeSliderComponent,
  ReactiveFormRangeSliderComponent,
  ReactiveFormSimpleSliderComponent,
  SimpleSliderComponent,
  VerticalSlidersComponent,
} from './snippets';

export let routerConfig: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'api', redirectTo: 'docs' },

  // pages for e2e testing
  { path: 'draggable-range-slider', component: DraggableRangeSliderComponent },
  { path: 'push-range-slider', component: PushRangeSliderComponent },
  { path: 'range-slider', component: RangeSliderComponent },
  { path: 'reactive-form-range-slider', component: ReactiveFormRangeSliderComponent },
  { path: 'reactive-form-simple-slider', component: ReactiveFormSimpleSliderComponent },
  { path: 'simple-slider', component: SimpleSliderComponent },
  { path: 'vertical-sliders', component: VerticalSlidersComponent },

  { path: '**', pathMatch: 'full', redirectTo: ''}
];
