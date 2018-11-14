import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DemosComponent } from './demos.component';
import { ApiComponent } from './api.component';
import {
  SimpleSliderComponent,
  RangeSliderComponent,
  PushRangeSliderComponent,
  DraggableRangeSliderComponent
} from './snippets';

export let routerConfig: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'api', component: ApiComponent },
  { path: 'simple-slider', component: SimpleSliderComponent },
  { path: 'range-slider', component: RangeSliderComponent },
  { path: 'draggable-range-slider', component: DraggableRangeSliderComponent },
  { path: 'push-range-slider', component: PushRangeSliderComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];
