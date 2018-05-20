import { Routes } from '@angular/router';
import { AllDemosComponent } from './all-demos.component';
import {
  SimpleSliderComponent,
  RangeSliderComponent
} from './snippets';

export let routerConfig: Routes = [
  { path: '', pathMatch: 'full', component: AllDemosComponent },
  { path: 'simple-slider', component: SimpleSliderComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];
