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

  selectionBarSlider: SimpleSliderModel = {
    value: 10,
    options: {
      showSelectionBar: true
    }
  };

  selectionBarAtEndSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showSelectionBarEnd: true
    }
  };

  selectionBarFromValueSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: -10,
      ceil: 10,
      showSelectionBarFromValue: 0
    }
  };

  selectionBarWithGradientSlider: RangeSliderModel = {
    minValue: 0,
    maxValue: 80,
    options: {
      ceil: 100,
      showSelectionBar: true,
      selectionBarGradient: {
        from: 'white',
        to: '#FC0'
      }
    }
  };

  selectionBarWithDynamicColorSlider: SimpleSliderModel = {
    value: 12,
    options: {
      showSelectionBar: true,
      getSelectionBarColor: (value: number) => {
        if (value <= 3) {
            return 'red';
        }
        if (value <= 6) {
            return 'orange';
        }
        if (value <= 9) {
            return 'yellow';
        }
        return '#2AE02A';
      }
    }
  };

  dynamicPointerColorSlider: SimpleSliderModel = {
    value: 12,
    options: {
        showSelectionBar: true,
        getPointerColor: (value: number) => {
            if (value <= 3) {
                return 'red';
            }
            if (value <= 6) {
                return 'orange';
            }
            if (value <= 9) {
                return 'yellow';
            }
            return '#2AE02A';
        }
    }
  };

  floorCeilStepSlider: SimpleSliderModel = {
    value: 12,
    options: {
      floor: 10,
      ceil: 100,
      step: 5
    }
  };

  rtlSlider: SimpleSliderModel = {
    value: 20,
    options: {
      floor: 10,
      ceil: 100,
      step: 5,
      rightToLeft: true
    }
  };

  floatSlider: SimpleSliderModel = {
    value: 0.5,
    options: {
      floor: 0,
      ceil: 2,
      step: 0.1,
      precision: 1
    }
  };

  customDisplayFunctionSlider: RangeSliderModel = {
    minValue: 100,
    maxValue: 400,
    options: {
      floor: 0,
      ceil: 500,
      translate: (value: number) => {
        return '$' + value;
      }
    }
  };

  customDisplayFunctionHtmlSlider: RangeSliderModel = {
    minValue: 100,
    maxValue: 400,
    options: {
      floor: 0,
      ceil: 500,
      translate: (value: number, sliderId: any, label: any) => {
        switch (label) {
          case 'model':
            return '<b>Min price:</b> $' + value;
          case 'high':
            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    }
  };

  alphabetSlider: SimpleSliderModel = {
    value: this.letterToIndex('E'),
    options: {
      stepsArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
        return { value: this.letterToIndex(letter) };
      }),
      translate: (value: number, sliderId: any, label: any) => {
        return this.indexToLetter(value);
      }
    }
  };

  dateSlider: SimpleSliderModel = {
    value: this.createDateRange()[0].getTime(),
    options: {
      stepsArray: this.createDateRange().map((date: Date) => {
        return { value: date.getTime() };
      }),
      translate: (value: number, sliderId: any, label: any) => {
        return new Date(value).toDateString();
      }
    }
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i = 1; i <= 31; i++) {
      dates.push(new Date(2016, 7, i));
    }
    return dates;
  }

  indexToLetter(index: number): string {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[index];
  }

  letterToIndex(letter: string): number {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter);
  }
}
