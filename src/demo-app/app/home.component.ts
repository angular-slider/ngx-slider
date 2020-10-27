import { Component } from '@angular/core';
import { Options, LabelType } from '@local/ngx-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  simpleSliderValue: number = 50;
  simpleSliderOptions: Options = {
    floor: 0,
    ceil: 100
  };

  rangeSliderLowValue: number = 25;
  rangeSliderHighValue: number = 75;
  rangeSliderOptions: Options = {
    floor: 0,
    ceil: 100
  };

  ticksSliderValue: number = 5;
  ticksSliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  customisedSliderLowValue: number = 150;
  customisedSliderHighValue: number = 350;
  customisedSliderOptions: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  styledSliderLowValue: number = 30;
  styledSliderHighValue: number = 70;
  styledSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };

  verticalSliderValue: number = 5;
  verticalSliderOptions: Options = {
    floor: 0,
    ceil: 10,
    vertical: true
  };

  constructor() { }
}
