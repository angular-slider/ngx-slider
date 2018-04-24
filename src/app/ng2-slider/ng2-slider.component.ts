import { Component, OnInit } from '@angular/core';

class Options {
  floor: number = 0;
  ceil: number = null;
  step: number = 1;
  precision: number = 0;
  minRange: any = null; // TODO: type?
  maxRange: any = null; // TODO: type?
  pushRange: boolean = false;
  minLimit: any = null; // TODO: type?
  maxLimit: any = null; // TODO: type?
  id: any = null; // TODO: type?
  translate: any = null; // TODO: type?
  getLegend: any = null; // TODO: type?
  stepsArray: any = null; // TODO: type?
  bindIndexForStepsArray: boolean = false;
  draggableRange: boolean = false;
  draggableRangeOnly: boolean = false;
  showSelectionBar: boolean = false;
  showSelectionBarEnd: boolean = false;
  showSelectionBarFromValue: any = null;
  showOuterSelectionBars: boolean = false;
  hidePointerLabels: boolean = false;
  hideLimitLabels: boolean = false;
  autoHideLimitLabels: boolean = true;
  readOnly: boolean = false;
  disabled: boolean = false;
  interval: number = 350;
  showTicks: boolean = false;
  showTicksValues: boolean = false;
  ticksArray: any = null; // TODO: type?
  ticksTooltip: any = null; // TODO: type?
  ticksValuesTooltip: any = null; // TODO: type?
  vertical: boolean = false;
  getSelectionBarColor: any = null; // TODO: type?
  getTickColor: any = null; // TODO: type?
  getPointerColor: any = null; // TODO: type?
  keyboardSupport: boolean = true;
  scale: number = 1;
  enforceStep: boolean = true;
  enforceRange: boolean = false;
  noSwitching: boolean = false;
  onlyBindHandles: boolean = false;
  onStart: any = null; // TODO: type?
  onChange: any = null; // TODO: type?
  onEnd: any = null; // TODO: type?
  rightToLeft: boolean = false;
  reversedControls: boolean = false;
  boundPointerLabels: boolean = true;
  mergeRangeLabelsIfSame: boolean = false;
  labelOverlapSeparator: string = ' - ';
  customTemplateScope: any = null; // TODO: type?
  logScale: boolean = false;
  customValueToPosition: any = null; // TODO: type?
  customPositionToValue: any = null; // TODO: type?
  selectionBarGradient: any = null; // TODO: type?
  ariaLabel: any = null; // TODO: type?
  ariaLabelledBy: any = null; // TODO: type?
  ariaLabelHigh: any = null; // TODO: type?
  ariaLabelledByHigh: any = null; // TODO: type?
}

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
