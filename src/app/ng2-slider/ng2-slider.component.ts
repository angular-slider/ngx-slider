import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';

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

class JqLiteWrapper {
  // TODO: implement jqLite methods?
}

class Dragging {
  active: boolean = false;
  value: number = 0;
  difference: number = 0;
  position: number = 0;
  lowLimit: number = 0;
  highLimit: number = 0;
}

@Directive({selector: '[slider-elem]'})
export class SliderDirective extends JqLiteWrapper {}

@Directive({selector: '[right-out-sel-elem]'})
export class RightOutSelDirective extends JqLiteWrapper {}

@Directive({selector: '[left-out-sel-elem]'})
export class LeftOutSelDirective extends JqLiteWrapper {}

@Directive({selector: '[full-bar-elem]'})
export class FullBarDirective extends JqLiteWrapper {}

@Directive({selector: '[sel-bar-elem]'})
export class SelBarDirective extends JqLiteWrapper {}

@Directive({selector: '[min-h-elem]'})
export class MinHDirective extends JqLiteWrapper {}

@Directive({selector: '[max-h-elem]'})
export class MaxHDirective extends JqLiteWrapper {}

@Directive({selector: '[flr-lab-elem]'})
export class FlrLabDirective extends JqLiteWrapper {}

@Directive({selector: '[ceil-lab-elem]'})
export class CeilLabDirective extends JqLiteWrapper {}

@Directive({selector: '[min-lab-elem]'})
export class MinLabDirective extends JqLiteWrapper {}

@Directive({selector: '[max-lab-elem]'})
export class MaxLabDirective extends JqLiteWrapper {}

@Directive({selector: '[cmb-lab-elem]'})
export class CmbLabDirective extends JqLiteWrapper {}

@Directive({selector: '[ticks-elem]'})
export class TicksDirective extends JqLiteWrapper {}


@Component({
  selector: 'ng2-slider',
  templateUrl: './ng2-slider.component.html',
  styleUrls: ['./ng2-slider.component.scss']
})
export class Ng2SliderComponent implements OnInit, AfterViewInit {
  barStyle: string = '';
  minPointerStyle: string = '';
  maxPointerStyle: string = '';
  showTicks: boolean = false;
  ticks: Tick[] = [];


  // The slider inner low value (linked to rzSliderLow)
  lowValue: number = 0;

  // The slider inner high value (linked to rzSliderHigh)
  highValue: number = 0;

  /* Slider DOM elements */

  // Main slider element
  @ViewChild(SliderDirective)
  private sliderElem: JqLiteWrapper;

  // Left highlight outside two handles
  @ViewChild(LeftOutSelDirective)
  private leftOutSelBar: JqLiteWrapper;

  // Right highlight outside two handles
  @ViewChild(RightOutSelDirective)
  private rightOutSelBar: JqLiteWrapper;

  // The whole slider bar
  @ViewChild(FullBarDirective)
  private fullBarElem: JqLiteWrapper;

  // Highlight between two handles
  @ViewChild(SelBarDirective)
  private selBarElem: JqLiteWrapper;

  // Left slider handle
  @ViewChild(MinHDirective)
  private minHElem: JqLiteWrapper;

  // Right slider handle
  @ViewChild(MaxHDirective)
  private maxHElem: JqLiteWrapper;

  // Floor label
  @ViewChild(FlrLabDirective)
  private flrLabElem: JqLiteWrapper;

  // Ceiling label
  @ViewChild(CeilLabDirective)
  private ceilLabElem: JqLiteWrapper;

  // Label above the low value
  @ViewChild(MinLabDirective)
  private minLabElem: JqLiteWrapper;

  // Label above the high value
  @ViewChild(MaxLabDirective)
  private maxLabElem: JqLiteWrapper;

  // Combined label
  @ViewChild(CmbLabDirective)
  private cmbLabElem: JqLiteWrapper;

  // The ticks
  @ViewChild(TicksDirective)
  private ticksElem;

  // Slider type, set to true for range slider
  range: boolean = false;
    /* TODO:
    this.scope.rzSliderModel !== undefined &&
    this.scope.rzSliderHigh !== undefined */

  // Values recorded when first dragging the bar
  dragging: Dragging = new Dragging();

  // Property that handles position (defaults to left for horizontal)
  positionProperty: string = 'left'; // TODO: left|bottom enum?

  /// Property that handles dimension (defaults to width for horizontal)
  dimensionProperty: string = 'width';

  // Half of the width or height of the slider handles
  handleHalfDim: number = 0;

  // Maximum position the slider handle can have
  maxPos: number = 0;

  // Precision
  precision: number = 0;

  // Step
  step: number = 1;

  // The name of the handle we are currently tracking
  tracking: string = '';

  // Minimum value (floor) of the model
  minValue: number = 0;

  // Maximum value (ceiling) of the model
  maxValue: number = 0;

  // The delta between min and max value
  valueRange: number = 0;

  /* If showTicks/showTicksValues options are number.
   * In this case, ticks values should be displayed below the slider. */
  intermediateTicks: boolean = false;

  // Set to true if init method already executed
  initHasRun: boolean = false; // TODO: necessary?

  // Used to call onStart on the first keydown event
  firstKeyDown: boolean = false;

  // Internal flag to prevent watchers to be called when the sliders value are modified internally.
  internalChange: boolean = false;

  // Internal flag to keep track of the visibility of combo label
  cmbLabelShown: boolean = false;

  // Internal variable to keep track of the focus element
  currentFocusElement: any = null; // TODO: type?

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
