import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Ng2SliderModule } from './ng2-slider/ng2-slider.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
