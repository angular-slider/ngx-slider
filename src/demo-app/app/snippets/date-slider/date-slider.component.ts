import { Component } from '@angular/core';
import { Options, LabelType } from '@local/ngx-slider';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html'
})
export class DateSliderComponent {
  dateRange: Date[] = this.createDateRange();
  value: number = this.dateRange[0].getTime();
  options: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    }
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i: number = 1; i <= 31; i++) {
      dates.push(new Date(2018, 5, i));
    }
    return dates;
  }
}
