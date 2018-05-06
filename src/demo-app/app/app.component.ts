import { Component } from '@angular/core';
import { Options, LabelType, CustomStepDefinition } from '@local/ng5-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
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
      getSelectionBarColor: (value: number): string => {
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
        getPointerColor: (value: number): string => {
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
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  customCombineLabelsFunctionSlider: RangeSliderModel = {
    minValue: 100,
    maxValue: 400,
    options: {
      floor: 0,
      ceil: 500,
      translate: (value: number): string => {
        return '$' + value;
      },
      combineLabels: (minValue: string, maxValue: string): string => {
        return 'from ' + minValue + ' up to ' + maxValue;
      }
    }
  };

  customDisplayFunctionHtmlSlider: RangeSliderModel = {
    minValue: 100,
    maxValue: 400,
    options: {
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
    }
  };

  alphabetSlider: SimpleSliderModel = {
    value: this.letterToIndex('E'),
    options: {
      stepsArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter: string): CustomStepDefinition => {
        return { value: this.letterToIndex(letter) };
      }),
      translate: (value: number, label: LabelType): string => {
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
      translate: (value: number, label: LabelType): string => {
        return new Date(value).toDateString();
      }
    }
  };

  ticksSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicks: true
    }
  };

  intermediateTicksSlider: SimpleSliderModel = {
    value: 55,
    options: {
      floor: 0,
      ceil: 100,
      showTicks: true,
      tickStep: 10
    }
  };

  ticksArraySlider: SimpleSliderModel = {
    value: 55,
    options: {
      floor: 0,
      ceil: 100,
      ticksArray: [0, 10, 25, 50, 100]
    }
  };

  ticksLegendSlider: SimpleSliderModel = {
    value: 5,
    options: {
      showTicksValues: true,
      stepsArray: [
        {value: 1, legend: 'Very poor'},
        {value: 2},
        {value: 3, legend: 'Fair'},
        {value: 4},
        {value: 5, legend: 'Average'},
        {value: 6},
        {value: 7, legend: 'Good'},
        {value: 8},
        {value: 9, legend: 'Excellent'}
      ]
    }
  };

  ticksCustomLegendFunctionSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicks: true,
      getLegend: (value: number): string => {
        return 'T' + value;
      }
    }
  };

  ticksAndTooltipsSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicks: true,
      ticksTooltip: (v: number): string => {
        return 'Tooltip for ' + v;
      }
    }
  };

  ticksValuesAndTooltipsSlider: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true,
      ticksValuesTooltip: (v: number): string => {
        return 'Tooltip for ' + v;
      }
    }
  };

  rangeTicksValuesSlider: RangeSliderModel = {
    minValue: 1,
    maxValue: 8,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true
    }
  };

  rangeIntermediateTicksSlider: RangeSliderModel = {
    minValue: 15,
    maxValue: 85,
    options: {
      floor: 0,
      ceil: 100,
      showTicksValues: true,
      tickStep: 10,
      tickValueStep: 10
    }
  };

  dynamicTickColorSlider: SimpleSliderModel = {
    value: 0,
    options: {
      ceil: 12,
      floor: 0,
      showSelectionBar: true,
      showTicks: true,
      getTickColor: (value: number): string => {
        if (value < 3) {
          return 'red';
        }
        if (value < 6) {
          return 'orange';
        }
        if (value < 9) {
          return 'yellow';
        }
        return '#2AE02A';
      }
    }
  };

  logScaleSlider: SimpleSliderModel = {
    value: 1,
    options: {
      floor: 1,
      ceil: 100,
      logScale: true,
      showTicks: true
    }
  };

  customScaleSlider: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      showTicksValues: true,
      customValueToPosition: (val: number, minVal: number, maxVal: number): number => {
        val = Math.sqrt(val);
        minVal = Math.sqrt(minVal);
        maxVal = Math.sqrt(maxVal);
        const range: number = maxVal - minVal;
        return (val - minVal) / range;
      },
      customPositionToValue: (percent: number, minVal: number, maxVal: number): number => {
        minVal = Math.sqrt(minVal);
        maxVal = Math.sqrt(maxVal);
        const value: number = percent * (maxVal - minVal) + minVal;
        return Math.pow(value, 2);
      }
    }
  };

  draggableRangeSlider: RangeSliderModel = {
    minValue: 1,
    maxValue: 8,
    options: {
      floor: 0,
      ceil: 10,
      draggableRange: true
    }
  };

  draggableRangeOnlySlider: RangeSliderModel = {
    minValue: 4,
    maxValue: 6,
    options: {
      floor: 0,
      ceil: 10,
      draggableRangeOnly: true
    }
  };

  disabledSliderCheckbox: boolean = true;

  disabledSlider: RangeSliderModel = {
    minValue: 20,
    maxValue: 80,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      disabled: true,
      showTicks: true,
      draggableRange: true
    }
  };

  readOnlySliderCheckbox: boolean = true;

  readOnlySlider: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      readOnly: true
    }
  };

  verticalSlider1: SimpleSliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true
    }
  };

  verticalSlider2: RangeSliderModel = {
    minValue: 20,
    maxValue: 80,
    options: {
      floor: 0,
      ceil: 100,
      vertical: true
    }
  };

  verticalSlider3: SimpleSliderModel = {
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      vertical: true,
      showTicks: true
    }
  };

  verticalSlider4: RangeSliderModel = {
    minValue: 1,
    maxValue: 5,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showTicksValues: true
    }
  };

  verticalSlider5: SimpleSliderModel = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      vertical: true,
      showSelectionBar: true
    }
  };

  verticalSlider6: SimpleSliderModel = {
    value: 6,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showSelectionBar: true,
      showTicksValues: true,
      ticksValuesTooltip: (v: number): string => {
        return 'Tooltip for ' + v;
      }
    }
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i: number = 1; i <= 31; i++) {
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

  /* TODO: For better or worse, Angular 2+ does not run deep checks on change detection, unlike $watch in angularjs
     The only sane workaround for now is creating a new options object for every update that needs to be done.
     Otherwise, it's a long way down the rabbithole of costly custom check detection
     In future refactoring, I think it's better to move away from nested options to simply a list of @Inputs */
  onChangeDisabledSliderCheckbox(): void {
    this.disabledSlider.options = Object.assign({}, this.disabledSlider.options, {disabled: this.disabledSliderCheckbox});
  }

  onChangeReadOnlySliderCheckbox(): void {
    this.readOnlySlider.options = Object.assign({}, this.readOnlySlider.options, {readOnly: this.readOnlySliderCheckbox});
  }
}
