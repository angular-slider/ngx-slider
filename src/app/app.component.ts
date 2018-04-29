import { Component } from '@angular/core';
import { Ng2SliderOptions } from './ng2-slider/ng2-slider.module';

interface SimpleSliderModel {
  value: number;
  options: Ng2SliderOptions;
}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Ng2SliderOptions;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  simpleSlider: SimpleSliderModel = {
    value: 200,
    options: {
      floor: 0,
      ceil: 500
    }
  };

  rangeSlider: RangeSliderModel = {
    minValue: 10,
    maxValue: 90,
    options: {
      floor: 0,
      ceil: 100,
       step: 10
    }
  };

  styledSlider: RangeSliderModel = {
    minValue: 10,
    maxValue: 90,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      showTicks: true
    }
  };

  minMaxLimitSlider: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minLimit: 10,
      maxLimit: 90
    }
  };

  minMaxRangeSlider: RangeSliderModel = {
    minValue: 10,
    maxValue: 90,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minRange: 10,
      maxRange: 50
    }
  };

  noSwitchingRangeSlider: RangeSliderModel = {
    minValue: 10,
    maxValue: 90,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      noSwitching: true
    }
  };

  minMaxAndPushRangeSlider: RangeSliderModel = {
    minValue: 60,
    maxValue: 70,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minRange: 10,
      maxRange: 30,
      pushRange: true
    }
  };
}
