import { Component, OnInit } from '@angular/core';

class Tick {
  selected: boolean;
  style: string;
  tooltip: string;
  tooltipPlacement: string;
  value: string;
  valueTooltip: string;
  valueTooltipPlacement: string;
  legend: string;
}

@Component({
  selector: 'ng2-slider',
  templateUrl: './ng2-slider.component.html',
  styleUrls: ['./ng2-slider.component.scss']
})
export class Ng2SliderComponent implements OnInit {
  barStyle: string = '';
  minPointerStyle: string = '';
  maxPointerStyle: string = '';
  showTicks: boolean = false;
  ticks: Tick[] = [];

  constructor() { }

  ngOnInit() {
  }


}
