import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangecontextchangecontextComponent } from './classes/_change_context_.changecontext.component';
import { OptionsoptionsComponent } from './classes/_options_.options.component';
import { Slidermoduleng5slidermoduleComponent } from './classes/_slider_module_.ng5slidermodule.component';
import { OptionslabeltypeComponent } from './enums/_options_.labeltype.component';
import { PointertypepointertypeComponent } from './enums/_pointer_type_.pointertype.component';
import { GlobalsComponent } from '././globals.component';
import { IndexComponent } from '././index.component';
import { OptionscustomstepdefinitionComponent } from './interfaces/_options_.customstepdefinition.component';
import { ChangecontextComponent } from './modules/_change_context_.component';
import { OptionsComponent } from './modules/_options_.component';
import { PointertypeComponent } from './modules/_pointer_type_.component';
import { SlidermoduleComponent } from './modules/_slider_module_.component';

const routes: Routes = [
    { path: 'docs', component: IndexComponent }, // always start with index
    { path: 'docs/classes/_change_context_.changecontext.html', component: ChangecontextchangecontextComponent },
    { path: 'docs/classes/_options_.options.html', component: OptionsoptionsComponent },
    { path: 'docs/classes/_slider_module_.ng5slidermodule.html', component: Slidermoduleng5slidermoduleComponent },
    { path: 'docs/enums/_options_.labeltype.html', component: OptionslabeltypeComponent },
    { path: 'docs/enums/_pointer_type_.pointertype.html', component: PointertypepointertypeComponent },
    { path: 'docs/globals.html', component: GlobalsComponent },
    { path: 'docs/index.html', component: IndexComponent },
    { path: 'docs/interfaces/_options_.customstepdefinition.html', component: OptionscustomstepdefinitionComponent },
    { path: 'docs/modules/_change_context_.html', component: ChangecontextComponent },
    { path: 'docs/modules/_options_.html', component: OptionsComponent },
    { path: 'docs/modules/_pointer_type_.html', component: PointertypeComponent },
    { path: 'docs/modules/_slider_module_.html', component: SlidermoduleComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
    ChangecontextchangecontextComponent,
    OptionsoptionsComponent,
    Slidermoduleng5slidermoduleComponent,
    OptionslabeltypeComponent,
    PointertypepointertypeComponent,
    GlobalsComponent,
    IndexComponent,
    OptionscustomstepdefinitionComponent,
    ChangecontextComponent,
    OptionsComponent,
    PointertypeComponent,
    SlidermoduleComponent,
  ],
  exports: [
    ChangecontextchangecontextComponent,
    OptionsoptionsComponent,
    Slidermoduleng5slidermoduleComponent,
    OptionslabeltypeComponent,
    PointertypepointertypeComponent,
    GlobalsComponent,
    IndexComponent,
    OptionscustomstepdefinitionComponent,
    ChangecontextComponent,
    OptionsComponent,
    PointertypeComponent,
    SlidermoduleComponent,
  ]
})
export class DocsModule { }
