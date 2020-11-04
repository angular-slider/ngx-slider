import { Component } from '@angular/core';
import { Options } from '@local/ngx-slider';

interface SliderDetails {
  value: number;
  highValue: number;
  floor: number;
  ceil: number;
}

@Component({
  selector: 'app-dynamically-created-sliders',
  templateUrl: './dynamically-created-sliders.component.html'
})
export class DynamicallyCreatedSlidersComponent {
  sliders: SliderDetails[] = [
    {
      value: -1,
      highValue: 2,
      floor: -5,
      ceil: 5
    },
    {
      value: 1,
      highValue: 2,
      floor: 0,
      ceil: 5
    },
    {
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100
    }
  ];

  sliderOptions(slider: SliderDetails): Options {
    return {
      floor: slider.floor,
      ceil: slider.ceil
    };
  }
}
