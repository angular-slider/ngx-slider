import {
  Component,
  OnInit,
  Directive,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Input,
  ElementRef,
  Renderer2
} from '@angular/core';

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
  showTicks: boolean|number = false;
  showTicksValues: boolean|number = false;
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
  style: any;
  tooltip: string;
  tooltipPlacement: string;
  value: string;
  valueTooltip: string;
  valueTooltipPlacement: string;
  legend: string;
}

class JqLiteWrapper {
  rzsp: number = 0;
  rzsv: string;
  rzsd: number;
  alwaysHide: boolean = false;
  private eventListeners: { [eventName: string]: [() => void] } = {};

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {
  }

  // TODO: slowly rewrite to angular
  addClass(clazz: string): void {
    this.renderer.addClass(this.elemRef.nativeElement, clazz);
  }

  removeClass(clazz: string): void {
    this.renderer.removeClass(this.elemRef.nativeElement, clazz);
  }

  hasClass(clazz: string): boolean {
    return this.elemRef.nativeElement.classList.contains(clazz);
  }

  html(html: string): void {
    this.elemRef.nativeElement.innerHTML = html;
  }

  css(style: string, value: string): void {
    if (value !== '') {
      this.renderer.setStyle(this.elemRef.nativeElement, style, value);
    } else {
      this.renderer.removeStyle(this.elemRef.nativeElement, style);
    }
  }

  attr(attr: string, value: string): void {
    if (value !== null) {
      this.renderer.setAttribute(this.elemRef.nativeElement, attr, value);
    } else {
      this.renderer.removeAttribute(this.elemRef.nativeElement, attr);
    }
  }

  getBoundingClientRect(): ClientRect {
    return this.elemRef.nativeElement.getBoundingClientRect();
  }

  focus(): void {
    this.elemRef.nativeElement.focus();
  }

  on(eventName: string, callback: (event: any) => boolean|void): void {
    if (!this.eventListeners.hasOwnProperty(eventName)) {
      this.eventListeners[eventName] = <[() => void]>[];
    }

    const unsubscribe = this.renderer.listen(this.elemRef.nativeElement, eventName, callback);
    this.eventListeners[eventName].push(unsubscribe);
  }

  off(eventName?: string): void {
    if (eventName) {
      if (this.eventListeners.hasOwnProperty(eventName)) {
        for (const unsubscribe of this.eventListeners[eventName]) {
          unsubscribe();
        }
        delete this.eventListeners[eventName];
      }
    } else {
      for (const eName of Object.keys(this.eventListeners)) {
        this.off(eName);
      }
    }
  }
}

class Dragging {
  active: boolean = false;
  value: number = 0;
  difference: number = 0;
  position: number = 0;
  lowLimit: number = 0;
  highLimit: number = 0;
}

enum HandleType {
  Low,
  High
}

class ThrottledFunc {
  func: Function;
  wait: number;
  previous: number = 0;
  timeout: any = null;

  constructor(func, wait) {
    this.func = func;
    this.wait = wait;
  }

  getTime(): number {
    return Date.now();
  }

  later() {
    this.previous = this.getTime();
    this.timeout = null;
    this.func();
  }

  call() {
    const now = this.getTime();
    const remaining = this.wait - (now - this.previous);

    if (remaining <= 0) {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.previous = now;
      this.func();
    } else if (!this.timeout) {
      this.timeout = setTimeout(() => this.later, remaining);
    }
  }
}

@Directive({selector: '[slider-elem]'})
export class SliderDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[right-out-sel-elem]'})
export class RightOutSelDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[left-out-sel-elem]'})
export class LeftOutSelDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[full-bar-elem]'})
export class FullBarDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[sel-bar-elem]'})
export class SelBarDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[min-h-elem]'})
export class MinHDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[max-h-elem]'})
export class MaxHDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[flr-lab-elem]'})
export class FlrLabDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ceil-lab-elem]'})
export class CeilLabDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[min-lab-elem]'})
export class MinLabDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[max-lab-elem]'})
export class MaxLabDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[cmb-lab-elem]'})
export class CmbLabDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ticks-elem]'})
export class TicksDirective extends JqLiteWrapper {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}


@Component({
  selector: 'ng2-slider',
  templateUrl: './ng2-slider.component.html',
  styleUrls: ['./ng2-slider.component.scss']
})
export class Ng2SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  // Model for low value slider. If only value is provided single slider will be rendered.
  private _value: number;
  @Input() set value(value: number) {
    this.onChangeValue(this._value, value);
    this._value = value;
  }
  get value(): number {
     return this._value;
  }

  // Model for high value slider. Providing both value and highValue will render range slider.
  private _highValue: number;
  @Input() set highValue(highValue: number) {
    this.onChangeHighValue(this._highValue, highValue);
    this._highValue = highValue;
  }
  get highValue(): number {
     return this._highValue;
  }

  // An object with all the other options of the slider.
  // Each option can be updated at runtime and the slider will automatically be re-rendered.
  private _options: Options = new Options();
  @Input() set options(options: Options) {
    this.onChangeOptions(this._options, options);
    this._options = options;
  }
  get options(): Options {
     return this._options;
  }

  // Low value synced to model low value
  private viewLowValue: number;
  // High value synced to model high value
  private viewHighValue: number;

  private barStyle: any = {};
  private minPointerStyle: any = {};
  private maxPointerStyle: any = {};
  private showTicks: boolean|number = false;
  private ticks: Tick[] = [];

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
  private ticksElem: JqLiteWrapper;

  // Slider type, true means range slider
  get range(): boolean {
    return this.value !== undefined && this.highValue !== undefined;
  }

  // Values recorded when first dragging the bar
  private dragging: Dragging = new Dragging();

  // Property that handles position (defaults to left for horizontal)
  private positionProperty: string = 'left'; // TODO: left|bottom enum?

  /// Property that handles dimension (defaults to width for horizontal)
  private dimensionProperty: string = 'width';

  // Half of the width or height of the slider handles
  private handleHalfDim: number = 0;

  // Maximum position the slider handle can have
  private maxPos: number = 0;

  // Precision
  private precision: number = 0;

  // Step
  private step: number = 1;

  // The name of the handle we are currently tracking
  private tracking: HandleType = null;

  // Minimum value (floor) of the model
  private minValue: number = 0;

  // Maximum value (ceiling) of the model
  private maxValue: number = 0;

  // The delta between min and max value
  private valueRange: number = 0;

  /* If showTicks/showTicksValues options are number.
   * In this case, ticks values should be displayed below the slider. */
  private intermediateTicks: boolean = false;

  // Set to true if init method already executed
  private initHasRun: boolean = false; // TODO: necessary?

  // Used to call onStart on the first keydown event
  private firstKeyDown: boolean = false;

  // Internal flag to prevent watchers to be called when the sliders value are modified internally.
  private internalChange: boolean = false;

  // Internal flag to keep track of the visibility of combo label
  private cmbLabelShown: boolean = false;

  // Internal variable to keep track of the focus element
  private currentFocusElement: any = null; // TODO: type?

  private barDimension: number;

  private customTrFn: Function;
  private getLegend: Function;

  private thrOnLowHandleChange: ThrottledFunc;
  private thrOnHighHandleChange: ThrottledFunc;

  private isDragging: boolean;
  private touchId: number;

  private onMoveUnsubscribe: () => void = null;
  private onEndUnsubscribe: () => void = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.applyOptions();
    this.syncLowValue();

    if (this.range) {
      this.syncHighValue();
    }

    this.manageElementsStyle();
    this.setDisabledState();
    this.calcViewDimensions();
    this.setMinAndMax();
    this.addAccessibility();
    this.updateCeilLab();
    this.updateFloorLab();
    this.initHandles();
    this.manageEventsBindings();

    this.thrOnLowHandleChange = new ThrottledFunc(() => { this.onLowHandleChange(); }, this.options.interval);
    this.thrOnHighHandleChange = new ThrottledFunc(() => { this.onHighHandleChange(); }, this.options.interval);

    this.initHasRun = true;
  }

  onChangeOptions(oldValue: Options, newValue: Options): void {
    if (newValue === oldValue) {
      return;
    }

    this.applyOptions(); // need to be called before synchronizing the values
    this.syncLowValue();
    if (this.range) {
      this.syncHighValue();
    }
    this.resetSlider();
  }

  onChangeValue(oldValue: number, newValue: number): void {
    if (this.internalChange || newValue === oldValue) {
      return;
    }

    this.thrOnLowHandleChange.call();
  }

  onChangeHighValue(oldValue: number, newValue: number): void {
    if (this.internalChange || newValue === oldValue) {
      return;
    }
    if (newValue != null) {
      this.thrOnHighHandleChange.call();
    }
    if ( (this.range && newValue == null) ||
         (!this.range && newValue != null) ) {
      this.applyOptions();
      this.resetSlider();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.calcViewDimensions();
  }

  ngOnDestroy(): void {
    this.unbindEvents();
    this.currentFocusElement = null;
  }

  private getCurrentTrackingValue(): number {
    if (this.tracking === null) {
      return null;
    }

    return this.tracking === HandleType.Low ? this.viewLowValue : this.viewHighValue;
  }

  private findStepIndex(modelValue: any /* TODO: type */): number {
    let index = 0;
    for (let i = 0; i < this.options.stepsArray.length; i++) {
      const step = this.options.stepsArray[i];
      if (step === modelValue) {
        index = i;
        break;
      } else if (step instanceof Date) {
        if (step.getTime() === modelValue.getTime()) {
          index = i;
          break;
        }
      } else if (step instanceof Object) {
        if ( (step.value instanceof Date &&
              step.value.getTime() === modelValue.getTime()) ||
              step.value === modelValue) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  private syncLowValue(): void {
    if (this.options.stepsArray) {
      if (!this.options.bindIndexForStepsArray) {
        this.viewLowValue = this.findStepIndex(this.value);
      } else {
        this.viewLowValue = this.value;
      }
    } else {
      this.viewLowValue = this.value;
    }
  }

  private syncHighValue(): void {
    if (this.options.stepsArray) {
      if (!this.options.bindIndexForStepsArray) {
        this.viewHighValue = this.findStepIndex(this.highValue);
      } else {
        this.viewHighValue = this.highValue;
      }
    } else {
      this.viewHighValue = this.highValue;
    }
  }

  private getStepValue(sliderValue): any /* TODO: type? */ {
    const step = this.options.stepsArray[sliderValue];
    if (step instanceof Date) {
      return step;
    }
    if (step instanceof Object) {
      return step.value;
    }
    return step;
  }

  private applyLowValue(): void {
    this.internalChange = true;

    if (this.options.stepsArray) {
      if (!this.options.bindIndexForStepsArray) {
        this.value = this.getStepValue(this.viewLowValue);
      } else {
        this.value = this.viewLowValue;
      }
    } else {
      this.value = this.viewLowValue;
    }

    this.internalChange = false;
  }

  private applyHighValue(): void {
    this.internalChange = true;

    if (this.options.stepsArray) {
      if (!this.options.bindIndexForStepsArray) {
        this.highValue = this.getStepValue(this.viewHighValue);
      } else {
        this.highValue = this.viewHighValue;
      }
    } else {
      this.highValue = this.viewHighValue;
    }

    this.internalChange = false;
  }

  // Reflow the slider when the low handle changes (called with throttle)
  private onLowHandleChange(): void {
    this.syncLowValue();
    if (this.range) {
      this.syncHighValue();
    }
    this.setMinAndMax();
    this.updateLowHandle(this.valueToPosition(this.viewLowValue));
    this.updateSelectionBar();
    this.updateTicksScale();
    this.updateAriaAttributes();
    if (this.range) {
      this.updateCmbLabel();
    }
  }

  // Reflow the slider when the high handle changes (called with throttle)
  private onHighHandleChange() {
    this.syncLowValue();
    this.syncHighValue();
    this.setMinAndMax();
    this.updateHighHandle(this.valueToPosition(this.viewHighValue));
    this.updateSelectionBar();
    this.updateTicksScale();
    this.updateCmbLabel();
    this.updateAriaAttributes();
  }

  // Read the user options and apply them to the slider model
  private applyOptions(): void {
    if (this.options.step <= 0) {
       this.options.step = 1;
    }

    this.options.draggableRange = this.range && this.options.draggableRange;
    this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly;
    if (this.options.draggableRangeOnly) {
      this.options.draggableRange = true;
    }

    this.options.showTicks = this.options.showTicks ||
      this.options.showTicksValues ||
      !!this.options.ticksArray;
    this.showTicks = !!this.options.showTicks;

    if ((<any>this.options.showTicks) instanceof Number || this.options.ticksArray) {
      this.intermediateTicks = true;
    }

    this.options.showSelectionBar = this.options.showSelectionBar ||
      this.options.showSelectionBarEnd ||
      this.options.showSelectionBarFromValue !== null;

    if (this.options.stepsArray) {
      this.parseStepsArray();
    } else {
      if (this.options.translate) {
        this.customTrFn = this.options.translate;
      } else {
        this.customTrFn = (value) => String(value);
      }

      this.getLegend = this.options.getLegend;
    }

    if (this.options.vertical) {
      this.positionProperty = 'bottom';
      this.dimensionProperty = 'height';
    }
  }

  private parseStepsArray(): any /* TODO: type? */ {
    this.options.floor = 0;
    this.options.ceil = this.options.stepsArray.length - 1;
    this.options.step = 1;

    if (this.options.translate) {
      this.customTrFn = this.options.translate;
    } else {
      this.customTrFn = (modelValue) => {
        if (this.options.bindIndexForStepsArray) {
          return this.getStepValue(modelValue);
        }
        return modelValue;
      };
    }

    this.getLegend = (index) => {
      const step = this.options.stepsArray[index];
      if (step instanceof Object) {
        return step.legend;
      }
      return null;
    };
  }

  // Resets slider
  private resetSlider(): void {
    this.manageElementsStyle();
    this.addAccessibility();
    this.setMinAndMax();
    this.updateCeilLab();
    this.updateFloorLab();
    this.unbindEvents();
    this.manageEventsBindings();
    this.setDisabledState();
    this.calcViewDimensions();
    this.refocusPointerIfNeeded();
  }

  private refocusPointerIfNeeded(): void {
    if (this.currentFocusElement) {
      this.onPointerFocus(this.currentFocusElement.pointer, this.currentFocusElement.ref);
      this.focusElement(this.currentFocusElement.pointer);
    }
  }

  // Update each elements style based on options
  private manageElementsStyle(): void {
    if (!this.range) {
      this.maxHElem.css('display', 'none');
    } else {
      this.maxHElem.css('display', '');
    }

    this.alwaysHide(
      this.flrLabElem,
      this.options.showTicksValues || this.options.hideLimitLabels
    );
    this.alwaysHide(
      this.ceilLabElem,
      this.options.showTicksValues || this.options.hideLimitLabels
    );

    const hideLabelsForTicks = this.options.showTicksValues && !this.intermediateTicks;
    this.alwaysHide(
      this.minLabElem,
      hideLabelsForTicks || this.options.hidePointerLabels
    );
    this.alwaysHide(
      this.maxLabElem,
      hideLabelsForTicks || !this.range || this.options.hidePointerLabels
    );
    this.alwaysHide(
      this.cmbLabElem,
      hideLabelsForTicks || !this.range || this.options.hidePointerLabels
    );
    this.alwaysHide(
      this.selBarElem,
      !this.range && !this.options.showSelectionBar
    );
    this.alwaysHide(
      this.leftOutSelBar,
      !this.range || !this.options.showOuterSelectionBars
    );
    this.alwaysHide(
      this.rightOutSelBar,
      !this.range || !this.options.showOuterSelectionBars
    );

    if (this.range && this.options.showOuterSelectionBars) {
      this.fullBarElem.addClass('rz-transparent');
    }

    if (this.options.vertical) {
      this.sliderElem.addClass('rz-vertical');
    }

    if (this.options.draggableRange) {
      this.selBarElem.addClass('rz-draggable');
    } else {
      this.selBarElem.removeClass('rz-draggable');
    }

    if (this.intermediateTicks && this.options.showTicksValues) {
      this.ticksElem.addClass('rz-ticks-values-under');
    }
  }

  private alwaysHide(el: JqLiteWrapper, hide: any): void {
    el.alwaysHide = hide;
    if (hide) {
      this.hideEl(el);
    } else {
      this.showEl(el);
    }
  }

  // Manage the events bindings based on readOnly and disabled options
  private manageEventsBindings(): void {
    if (this.options.disabled || this.options.readOnly) {
      this.unbindEvents();
    } else {
      this.bindEvents();
    }
  }

  // Set the disabled state based on disabled option
  private setDisabledState(): void {
    if (this.options.disabled) {
      this.sliderElem.attr('disabled', 'disabled');
    } else {
      this.sliderElem.attr('disabled', null);
    }
  }

  // Reset label values
  private resetLabelsValue(): void {
    this.minLabElem.rzsv = undefined;
    this.maxLabElem.rzsv = undefined;
  }

  // Initialize slider handles positions and labels
  // Run only once during initialization and every time view port changes size
  private initHandles() {
    this.updateLowHandle(this.valueToPosition(this.viewLowValue));

    /*
   the order here is important since the selection bar should be
   updated after the high handle but before the combined label
   */
    if (this.range) {
      this.updateHighHandle(this.valueToPosition(this.viewHighValue));
    }

    this.updateSelectionBar();

    if (this.range) {
      this.updateCmbLabel();
    }

    this.updateTicksScale();
  }

  // Translate value to human readable format
  private translateFn(value: number|string, label: JqLiteWrapper, which: string, useCustomTr?: boolean): any {
    useCustomTr = useCustomTr === undefined ? true : useCustomTr;

    let valStr = '';
    let getDimension = false;
    const noLabelInjection = label.hasClass('no-label-injection');

    if (useCustomTr) {
      if (this.options.stepsArray && !this.options.bindIndexForStepsArray) {
        value = this.getStepValue(value);
      }
      valStr = String(this.customTrFn(value, this.options.id, which));
    } else {
      valStr = String(value);
    }

    if (label.rzsv === undefined ||
        label.rzsv.length !== valStr.length ||
       (label.rzsv.length > 0 && label.rzsd === 0)) {
      getDimension = true;
      label.rzsv = valStr;
    }

    if (!noLabelInjection) {
      label.html(valStr);
    }

    // Update width only when length of the label have changed
    if (getDimension) {
      this.getDimension(label);
    }
  }

  // Set maximum and minimum values for the slider and ensure the model and high value match these limits
  private setMinAndMax(): void {
    this.step = +this.options.step;
    this.precision = +this.options.precision;

    this.minValue = this.options.floor;
    if (this.options.logScale && this.minValue === 0) {
      throw Error('Can\'t use floor=0 with logarithmic scale');
    }

    if (this.options.enforceStep) {
      this.viewLowValue = this.roundStep(this.viewLowValue);
      if (this.range) {
        this.viewHighValue = this.roundStep(this.viewHighValue);
      }
    }

    if (this.options.ceil != null) {
      this.maxValue = this.options.ceil;
    } else {
      this.maxValue = this.options.ceil = this.range ? this.viewHighValue : this.viewLowValue;
    }

    if (this.options.enforceRange) {
      this.viewLowValue = this.sanitizeValue(this.viewLowValue);
      if (this.range) {
        this.viewHighValue = this.sanitizeValue(this.viewHighValue);
      }
    }

    this.applyLowValue();
    if (this.range) {
      this.applyHighValue();
    }

    this.valueRange = this.maxValue - this.minValue;
  }

  // Adds accessibility attributes, run only once during initialization
  private addAccessibility(): void {
    this.updateAriaAttributes();

    this.minHElem.attr('role', 'slider');

    if ( this.options.keyboardSupport &&
      !(this.options.readOnly || this.options.disabled) ) {
      this.minHElem.attr('tabindex', '0');
    } else {
      this.minHElem.attr('tabindex', '');
    }

    if (this.options.vertical) {
      this.minHElem.attr('aria-orientation', 'vertical');
    }

    if (this.options.ariaLabel) {
      this.minHElem.attr('aria-label', this.options.ariaLabel);
    } else if (this.options.ariaLabelledBy) {
      this.minHElem.attr('aria-labelledby', this.options.ariaLabelledBy);
    }

    if (this.range) {
      this.maxHElem.attr('role', 'slider');

      if (this.options.keyboardSupport &&
        !(this.options.readOnly || this.options.disabled)) {
        this.maxHElem.attr('tabindex', '0');
      } else {
        this.maxHElem.attr('tabindex', '');
      }

      if (this.options.vertical) {
        this.maxHElem.attr('aria-orientation', 'vertical');
      }

      if (this.options.ariaLabelHigh) {
        this.maxHElem.attr('aria-label', this.options.ariaLabelHigh);
      } else if (this.options.ariaLabelledByHigh) {
        this.maxHElem.attr('aria-labelledby', this.options.ariaLabelledByHigh);
      }
    }
  }

  // Updates aria attributes according to current values
  private updateAriaAttributes(): void {
    this.minHElem.attr('aria-valuenow', this.value.toString());
    this.minHElem.attr('aria-valuetext', this.customTrFn(this.value, this.options.id, 'model'));
    this.minHElem.attr('aria-valuemin', this.minValue.toString());
    this.minHElem.attr('aria-valuemax', this.maxValue.toString());

    if (this.range) {
      this.maxHElem.attr('aria-valuenow', this.highValue.toString());
      this.maxHElem.attr('aria-valuetext', this.customTrFn(this.highValue, this.options.id, 'high'));
      this.maxHElem.attr('aria-valuemin', this.minValue.toString());
      this.maxHElem.attr('aria-valuemax', this.maxValue.toString());
    }
  }

  // Calculate dimensions that are dependent on view port size
  // Run once during initialization and every time view port changes size.
  private calcViewDimensions(): void {
    const handleWidth = this.getDimension(this.minHElem);

    this.handleHalfDim = handleWidth / 2;
    this.barDimension = this.getDimension(this.fullBarElem);

    this.maxPos = this.barDimension - handleWidth;

    this.getDimension(this.sliderElem);
    this.sliderElem.rzsp = this.sliderElem.getBoundingClientRect()[this.positionProperty];

    if (this.initHasRun) {
      this.updateFloorLab();
      this.updateCeilLab();
      this.initHandles();
      this.updateTicksScale(); // TODO: correct???
    }
  }

  // Update the ticks position
  private updateTicksScale(): void {
    if (!this.options.showTicks) {
      return;
    }

    const ticksArray = this.options.ticksArray || this.getTicksArray();
    const translate = this.options.vertical ? 'translateY' : 'translateX';

    if (this.options.rightToLeft) {
      ticksArray.reverse();
    }

    this.ticks = ticksArray.map((value) => {
      let position: number = this.valueToPosition(value);

      if (this.options.vertical) {
        position = this.maxPos - position;
      }

      const translation = translate + '(' + Math.round(position) + 'px)';
      const tick = new Tick();
      tick.selected = this.isTickSelected(value);
      tick.style = {
        '-webkit-transform': translation,
        '-moz-transform': translation,
        '-o-transform': translation,
        '-ms-transform': translation,
        transform: translation,
      };
      if (tick.selected && this.options.getSelectionBarColor) {
        tick.style['background-color'] = this.getSelectionBarColor();
      }
      if (!tick.selected && this.options.getTickColor) {
        tick.style['background-color'] = this.getTickColor(value);
      }
      if (this.options.ticksTooltip) {
        tick.tooltip = this.options.ticksTooltip(value);
        tick.tooltipPlacement = this.options.vertical ? 'right' : 'top';
      }
      if (this.options.showTicksValues === true ||
          (<any>this.options.showTicksValues instanceof Number && value % <number>this.options.showTicksValues === 0)) {
        tick.value = this.getDisplayValue(value, 'tick-value');
        if (this.options.ticksValuesTooltip) {
          tick.valueTooltip = this.options.ticksValuesTooltip(value);
          tick.valueTooltipPlacement = this.options.vertical
            ? 'right'
            : 'top';
        }
      }
      if (this.getLegend) {
        const legend = this.getLegend(value, this.options.id);
        if (legend) {
          tick.legend = legend;
        }
      }
      return tick;
    });
  }

  private getTicksArray(): any[] /* TODO: type? */ {
    let step = this.step;
    const ticksArray = [];
    if (this.intermediateTicks) {
      step = <number>this.options.showTicks;
    }
    for (let value = this.minValue; value <= this.maxValue; value += step) {
      ticksArray.push(value);
    }
    return ticksArray;
  }

  isTickSelected(value): boolean {
    if (!this.range) {
      if (this.options.showSelectionBarFromValue !== null) {
        const center = this.options.showSelectionBarFromValue;
        if (this.viewLowValue > center &&
            value >= center &&
            value <= this.viewLowValue) {
          return true;
        } else if (this.viewLowValue < center &&
                   value <= center &&
                   value >= this.viewLowValue) {
          return true;
        }
      } else if (this.options.showSelectionBarEnd) {
        if (value >= this.viewLowValue) {
          return true;
        }
      } else if (this.options.showSelectionBar && value <= this.viewLowValue) {
        return true;
      }
    }

    if (this.range && value >= this.viewLowValue && value <= this.viewHighValue) {
      return true;
    }

    return false;
  }

  // Update position of the floor label
  private updateFloorLab(): void {
    this.translateFn(this.minValue, this.flrLabElem, 'floor');
    this.getDimension(this.flrLabElem);
    const position = this.options.rightToLeft
      ? this.barDimension - this.flrLabElem.rzsd
      : 0;
    this.setPosition(this.flrLabElem, position);
  }

  // Update position of the ceiling label
  private updateCeilLab(): void {
    this.translateFn(this.maxValue, this.ceilLabElem, 'ceil');
    this.getDimension(this.ceilLabElem);
    const position = this.options.rightToLeft
      ? 0
      : this.barDimension - this.ceilLabElem.rzsd;
    this.setPosition(this.ceilLabElem, position);
  }

  // Update slider handles and label positions
  private updateHandles(which: HandleType, newPos: number): void {
    if (which === HandleType.Low) {
      this.updateLowHandle(newPos);
    } else {
      this.updateHighHandle(newPos);
    }

    this.updateSelectionBar();
    this.updateTicksScale();
    if (this.range) {
      this.updateCmbLabel();
    }
  }

  // Helper function to work out the position for handle labels depending on RTL or not
  private getHandleLabelPos(labelName: string, newPos: number): number {
    const labelRzsd = labelName === 'minLab' ? this.minLabElem.rzsd : this.maxLabElem.rzsd;
    const nearHandlePos = newPos - labelRzsd / 2 + this.handleHalfDim;
    const endOfBarPos = this.barDimension - labelRzsd;

    if (!this.options.boundPointerLabels) {
      return nearHandlePos;
    }

    if ((this.options.rightToLeft && labelName === 'minLab') ||
       (!this.options.rightToLeft && labelName === 'maxLab')) {
      return Math.min(nearHandlePos, endOfBarPos);
    } else {
      return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
    }
  }

  // Update low slider handle position and label
  private updateLowHandle(newPos: number): void {
    this.setPosition(this.minHElem, newPos);
    this.translateFn(this.viewLowValue, this.minLabElem, 'model');
    this.setPosition(
      this.minLabElem,
      this.getHandleLabelPos('minLab', newPos)
    );

    if (this.options.getPointerColor) {
      const pointercolor = this.getPointerColor('min');
      this.minPointerStyle = {
        backgroundColor: pointercolor,
      };
    }

    if (this.options.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Update high slider handle position and label
  private updateHighHandle(newPos: number) {
    this.setPosition(this.maxHElem, newPos);
    this.translateFn(this.viewHighValue, this.maxLabElem, 'high');
    this.setPosition(
      this.maxLabElem,
      this.getHandleLabelPos('maxLab', newPos)
    );

    if (this.options.getPointerColor) {
      const pointercolor = this.getPointerColor('max');
      this.maxPointerStyle = {
        backgroundColor: pointercolor,
      };
    }
    if (this.options.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Show/hide floor/ceiling label
  private shFloorCeil(): void {
    // Show based only on hideLimitLabels if pointer labels are hidden
    if (this.options.hidePointerLabels) {
      return;
    }
    let flHidden = false;
    let clHidden = false;
    const isMinLabAtFloor = this.isLabelBelowFloorLab(this.minLabElem);
    const isMinLabAtCeil = this.isLabelAboveCeilLab(this.minLabElem);
    const isMaxLabAtCeil = this.isLabelAboveCeilLab(this.maxLabElem);
    const isCmbLabAtFloor = this.isLabelBelowFloorLab(this.cmbLabElem);
    const isCmbLabAtCeil = this.isLabelAboveCeilLab(this.cmbLabElem);

    if (isMinLabAtFloor) {
      flHidden = true;
      this.hideEl(this.flrLabElem);
    } else {
      flHidden = false;
      this.showEl(this.flrLabElem);
    }

    if (isMinLabAtCeil) {
      clHidden = true;
      this.hideEl(this.ceilLabElem);
    } else {
      clHidden = false;
      this.showEl(this.ceilLabElem);
    }

    if (this.range) {
      const hideCeil = this.cmbLabelShown ? isCmbLabAtCeil : isMaxLabAtCeil;
      const hideFloor = this.cmbLabelShown
        ? isCmbLabAtFloor
        : isMinLabAtFloor;

      if (hideCeil) {
        this.hideEl(this.ceilLabElem);
      } else if (!clHidden) {
        this.showEl(this.ceilLabElem);
      }

      // Hide or show floor label
      if (hideFloor) {
        this.hideEl(this.flrLabElem);
      } else if (!flHidden) {
        this.showEl(this.flrLabElem);
      }
    }
  }

  private isLabelBelowFloorLab(label: JqLiteWrapper): boolean {
    const isRTL = this.options.rightToLeft,
      pos = label.rzsp,
      dim = label.rzsd,
      floorPos = this.flrLabElem.rzsp,
      floorDim = this.flrLabElem.rzsd;
    return isRTL
      ? pos + dim >= floorPos - 2
      : pos <= floorPos + floorDim + 2;
  }

  private isLabelAboveCeilLab(label: JqLiteWrapper): boolean {
    const isRTL = this.options.rightToLeft,
      pos = label.rzsp,
      dim = label.rzsd,
      ceilPos = this.ceilLabElem.rzsp,
      ceilDim = this.ceilLabElem.rzsd;
    return isRTL ? pos <= ceilPos + ceilDim + 2 : pos + dim >= ceilPos - 2;
  }

  // Update slider selection bar, combined label and range label
  private updateSelectionBar(): void {
    let position = 0;
    let dimension = 0;
    const isSelectionBarFromRight = this.options.rightToLeft
        ? !this.options.showSelectionBarEnd
        : this.options.showSelectionBarEnd;
    const positionForRange = this.options.rightToLeft
        ? this.maxHElem.rzsp + this.handleHalfDim
        : this.minHElem.rzsp + this.handleHalfDim;

    if (this.range) {
      dimension = Math.abs(this.maxHElem.rzsp - this.minHElem.rzsp);
      position = positionForRange;
    } else {
      if (this.options.showSelectionBarFromValue !== null) {
        const center = this.options.showSelectionBarFromValue;
        const centerPosition = this.valueToPosition(center);
        const isModelGreaterThanCenter = this.options.rightToLeft
            ? this.viewLowValue <= center
            : this.viewLowValue > center;
        if (isModelGreaterThanCenter) {
          dimension = this.minHElem.rzsp - centerPosition;
          position = centerPosition + this.handleHalfDim;
        } else {
          dimension = centerPosition - this.minHElem.rzsp;
          position = this.minHElem.rzsp + this.handleHalfDim;
        }
      } else if (isSelectionBarFromRight) {
        dimension =
          Math.abs(this.maxPos - this.minHElem.rzsp) + this.handleHalfDim;
        position = this.minHElem.rzsp + this.handleHalfDim;
      } else {
        dimension = this.minHElem.rzsp + this.handleHalfDim;
        position = 0;
      }
    }
    this.setDimension(this.selBarElem, dimension);
    this.setPosition(this.selBarElem, position);
    if (this.range && this.options.showOuterSelectionBars) {
      if (this.options.rightToLeft) {
        this.setDimension(this.rightOutSelBar, position);
        this.setPosition(this.rightOutSelBar, 0);
        this.setDimension(
          this.leftOutSelBar,
          this.getDimension(this.fullBarElem) - (position + dimension)
        );
        this.setPosition(this.leftOutSelBar, position + dimension);
      } else {
        this.setDimension(this.leftOutSelBar, position);
        this.setPosition(this.leftOutSelBar, 0);
        this.setDimension(
          this.rightOutSelBar,
          this.getDimension(this.fullBarElem) - (position + dimension)
        );
        this.setPosition(this.rightOutSelBar, position + dimension);
      }
    }
    if (this.options.getSelectionBarColor) {
      const color = this.getSelectionBarColor();
      this.barStyle = {
        backgroundColor: color,
      };
    } else if (this.options.selectionBarGradient) {
      const offset = this.options.showSelectionBarFromValue !== null
            ? this.valueToPosition(this.options.showSelectionBarFromValue)
            : 0;
      const reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
      const direction = this.options.vertical
          ? reversed ? 'bottom' : 'top'
          : reversed ? 'left' : 'right';
      this.barStyle = {
        backgroundImage:
          'linear-gradient(to ' +
          direction +
          ', ' +
          this.options.selectionBarGradient.from +
          ' 0%,' +
          this.options.selectionBarGradient.to +
          ' 100%)',
      };
      if (this.options.vertical) {
        this.barStyle.backgroundPosition =
          'center ' +
          (offset +
            dimension +
            position +
            (reversed ? -this.handleHalfDim : 0)) +
          'px';
        this.barStyle.backgroundSize =
          '100% ' + (this.barDimension - this.handleHalfDim) + 'px';
      } else {
        this.barStyle.backgroundPosition =
          offset -
          position +
          (reversed ? this.handleHalfDim : 0) +
          'px center';
        this.barStyle.backgroundSize =
          this.barDimension - this.handleHalfDim + 'px 100%';
      }
    }
  }

  // Wrapper around the getSelectionBarColor of the user to pass to correct parameters
  private getSelectionBarColor() {
    if (this.range) {
      return this.options.getSelectionBarColor(
        this.value,
        this.highValue
      );
    }
    return this.options.getSelectionBarColor(this.value);
  }

  // Wrapper around the getPointerColor of the user to pass to  correct parameters
  private getPointerColor(pointerType) {
    if (pointerType === 'max') {
      return this.options.getPointerColor(
        this.highValue,
        pointerType
      );
    }
    return this.options.getPointerColor(
      this.value,
      pointerType
    );
  }

  // Wrapper around the getTickColor of the user to pass to correct parameters
  private getTickColor(value) {
    return this.options.getTickColor(value);
  }

  // Update combined label position and value
  private updateCmbLabel(): void {
    let isLabelOverlap = null;
    if (this.options.rightToLeft) {
      isLabelOverlap =
        this.minLabElem.rzsp - this.minLabElem.rzsd - 10 <= this.maxLabElem.rzsp;
    } else {
      isLabelOverlap =
        this.minLabElem.rzsp + this.minLabElem.rzsd + 10 >= this.maxLabElem.rzsp;
    }

    if (isLabelOverlap) {
      const lowTr = this.getDisplayValue(this.viewLowValue, 'model');
      const highTr = this.getDisplayValue(this.viewHighValue, 'high');
      let labelVal = '';
      if (this.options.mergeRangeLabelsIfSame && lowTr === highTr) {
        labelVal = lowTr;
      } else {
        labelVal = this.options.rightToLeft
          ? highTr + this.options.labelOverlapSeparator + lowTr
          : lowTr + this.options.labelOverlapSeparator + highTr;
      }

      this.translateFn(labelVal, this.cmbLabElem, 'cmb', false);
      const pos = this.options.boundPointerLabels
        ? Math.min(
            Math.max(
              this.selBarElem.rzsp +
                this.selBarElem.rzsd / 2 -
                this.cmbLabElem.rzsd / 2,
              0
            ),
            this.barDimension - this.cmbLabElem.rzsd
          )
        : this.selBarElem.rzsp + this.selBarElem.rzsd / 2 - this.cmbLabElem.rzsd / 2;

      this.setPosition(this.cmbLabElem, pos);
      this.cmbLabelShown = true;
      this.hideEl(this.minLabElem);
      this.hideEl(this.maxLabElem);
      this.showEl(this.cmbLabElem);
    } else {
      this.cmbLabelShown = false;
      this.updateHighHandle(this.valueToPosition(this.viewHighValue));
      this.updateLowHandle(this.valueToPosition(this.viewLowValue));
      this.showEl(this.maxLabElem);
      this.showEl(this.minLabElem);
      this.hideEl(this.cmbLabElem);
    }
    if (this.options.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Return the translated value if a translate function is provided else the original value
  private getDisplayValue(value, which) /* TODO: type? */ {
    if (this.options.stepsArray && !this.options.bindIndexForStepsArray) {
      value = this.getStepValue(value);
    }
    return this.customTrFn(value, this.options.id, which);
  }

  // Round value to step and precision based on minValue
  private roundStep(value: number, customStep?: number): number {
    const step = customStep ? customStep : this.step;
    let steppedDifference = +( (value - this.minValue) / step ).toPrecision(12);
    steppedDifference = Math.round(steppedDifference) * step;
    const newValue = (this.minValue + steppedDifference).toFixed(this.precision);
    return +newValue;
  }

  // Hide element
  private hideEl(element: JqLiteWrapper): void {
    element.css('visibility', 'hidden');
  }

  // Show element
  private showEl(element: JqLiteWrapper): void {
    if (!!element.alwaysHide) {
      return;
    }

    element.css('visibility', 'visible');
  }

  // Set element left/top position depending on whether slider is horizontal or vertical
  private setPosition(elem, pos) {
    elem.rzsp = pos;
    elem.css(this.positionProperty, Math.round(pos) + 'px');
    return pos;
  }

  // Get element width/height depending on whether slider is horizontal or vertical
  private getDimension(elem: JqLiteWrapper): number {
    const val = elem.getBoundingClientRect();
    if (this.options.vertical) {
      elem.rzsd = (val.bottom - val.top) * this.options.scale;
    } else {
      elem.rzsd = (val.right - val.left) * this.options.scale;
    }
    return elem.rzsd;
  }

  // Set element width/height depending on whether slider is horizontal or vertical
  private setDimension(elem: JqLiteWrapper, dim: number): number {
    elem.rzsd = dim;
    elem.css(this.dimensionProperty, Math.round(dim) + 'px');
    return dim;
  }

  // Returns a value that is within slider range
  private sanitizeValue(val: number): number {
    return Math.min(Math.max(val, this.minValue), this.maxValue);
  }

  // Translate value to pixel position
  private valueToPosition(val: number): number {
    let fn = this.linearValueToPosition;
    if (this.options.customValueToPosition) {
      fn = this.options.customValueToPosition;
    } else if (this.options.logScale) {
      fn = this.logValueToPosition;
    }

    val = this.sanitizeValue(val);
    let percent = fn(val, this.minValue, this.maxValue) || 0;
    if (this.options.rightToLeft) {
      percent = 1 - percent;
    }
    return percent * this.maxPos;
  }

  private linearValueToPosition(val, minVal, maxVal): number {
    const range = maxVal - minVal;
    return (val - minVal) / range;
  }

  private logValueToPosition(val, minVal, maxVal): number {
    val = Math.log(val);
    minVal = Math.log(minVal);
    maxVal = Math.log(maxVal);
    const range = maxVal - minVal;
    return (val - minVal) / range;
  }

  // Translate position to model value
  private positionToValue(position: number): number {
    let percent = position / this.maxPos;
    if (this.options.rightToLeft) {
      percent = 1 - percent;
    }
    let fn = this.linearPositionToValue;
    if (this.options.customPositionToValue) {
      fn = this.options.customPositionToValue;
    } else if (this.options.logScale) {
      fn = this.logPositionToValue;
    }
    return fn(percent, this.minValue, this.maxValue) || 0;
  }

  private linearPositionToValue(percent, minVal, maxVal): number {
    return percent * (maxVal - minVal) + minVal;
  }

  private logPositionToValue(percent, minVal, maxVal): number {
    minVal = Math.log(minVal);
    maxVal = Math.log(maxVal);
    const value = percent * (maxVal - minVal) + minVal;
    return Math.exp(value);
  }

  // Get the X-coordinate or Y-coordinate of an event
  private getEventXY(event, targetTouchId): number {
    const clientXY = this.options.vertical ? 'clientY' : 'clientX';
    if (event[clientXY] !== undefined) {
      return event[clientXY];
    }

    const touches = event.touches;

    if (targetTouchId !== undefined) {
      for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === targetTouchId) {
          return touches[i][clientXY];
        }
      }
    }

    // If no target touch or the target touch was not found in the event
    // returns the coordinates of the first touch
    return touches[0][clientXY];
  }

  // Compute the event position depending on whether the slider is horizontal or vertical
  private getEventPosition(event, targetTouchId?) {
    const sliderPos = this.sliderElem.rzsp;
    let eventPos = 0;
    if (this.options.vertical) {
      eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
    } else {
      eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
    }
    return eventPos * this.options.scale - this.handleHalfDim;
  }

  // Get event names for move and event end
  private getEventNames(event) /* TODO: type? */ {
    const eventNames = {
      moveEvent: '',
      endEvent: '',
    };

    if (event.touches) {
      eventNames.moveEvent = 'touchmove';
      eventNames.endEvent = 'touchend';
    } else {
      eventNames.moveEvent = 'mousemove';
      eventNames.endEvent = 'mouseup';
    }

    return eventNames;
  }

  // Get the handle closest to an event
  private getNearestHandle(event): JqLiteWrapper {
    if (!this.range) {
      return this.minHElem;
    }

    const position = this.getEventPosition(event);
    const distanceMin = Math.abs(position - this.minHElem.rzsp);
    const distanceMax = Math.abs(position - this.maxHElem.rzsp);

    if (distanceMin < distanceMax) {
      return this.minHElem;
    } else if (distanceMin > distanceMax) {
      return this.maxHElem;
    } else if (!this.options.rightToLeft) {
      // if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
      return position < this.minHElem.rzsp ? this.minHElem : this.maxHElem;
    } else {
      // reverse in rtl
      return position > this.minHElem.rzsp ? this.minHElem : this.maxHElem;
    }
  }

  // Wrapper function to focus an angular element
  private focusElement(el: JqLiteWrapper): void {
    el.focus();
  }

  // Bind mouse and touch events to slider handles
  private bindEvents(): void {
    let barTracking, barStart, barMove;

    if (this.options.draggableRange) {
      barTracking = 'rzSliderDrag'; // TODO: find out how this is supposed to work...
      barStart = this.onDragStart;
      barMove = this.onDragMove;
    } else {
      barTracking = HandleType.Low;
      barStart = this.onStart;
      barMove = this.onMove;
    }

    if (!this.options.onlyBindHandles) {
      this.selBarElem.on('mousedown', (event) => barStart(null, barTracking, event));
      this.selBarElem.on('mousedown', (event) => barMove(this.selBarElem, event));
    }

    if (this.options.draggableRangeOnly) {
      this.minHElem.on('mousedown', (event) => barStart(null, barTracking, event));
      this.maxHElem.on('mousedown', (event) => barStart(null, barTracking, event));
    } else {
      this.minHElem.on('mousedown', (event) => this.onStart(this.minHElem, HandleType.Low, event));

      if (this.range) {
        this.maxHElem.on('mousedown', (event) => this.onStart(this.maxHElem, HandleType.High, event));
      }
      if (!this.options.onlyBindHandles) {
        this.fullBarElem.on('mousedown', (event) => this.onStart(null, null, event));
        this.fullBarElem.on('mousedown', (event) => this.onMove(this.fullBarElem, event));
        this.ticksElem.on('mousedown', (event) => this.onStart(null, null, event));
        this.ticksElem.on('mousedown', (event) => this.onTickClick(this.ticksElem, event));
      }
    }

    if (!this.options.onlyBindHandles) {
      this.selBarElem.on('touchstart', (event) => barStart(null, barTracking, event));
      this.selBarElem.on('touchstart', (event) => barMove(this.selBarElem, event));
    }
    if (this.options.draggableRangeOnly) {
      this.minHElem.on('touchstart', (event) => barStart(null, barTracking, event));
      this.maxHElem.on('touchstart', (event) => barStart(null, barTracking, event));
    } else {
      this.minHElem.on('touchstart', (event) => this.onStart(this.minHElem, HandleType.Low, event));
      if (this.range) {
        this.maxHElem.on('touchstart', (event) => this.onStart(this.maxHElem, HandleType.High, event));
      }
      if (!this.options.onlyBindHandles) {
        this.fullBarElem.on('touchstart', (event) => this.onStart(null, null, event));
        this.fullBarElem.on('touchstart', (event) => this.onMove(this.fullBarElem, event));
        this.ticksElem.on('touchstart', (event) => this.onStart(null, null, event));
        this.ticksElem.on('touchstart', (event) => this.onTickClick(this.ticksElem, event));
      }
    }

    if (this.options.keyboardSupport) {
      this.minHElem.on('focus', () => this.onPointerFocus(this.minHElem, HandleType.Low));
      if (this.range) {
        this.maxHElem.on('focus', () => this.onPointerFocus(this.maxHElem, HandleType.High));
      }
    }
  }

  // Unbind mouse and touch events to slider handles
  private unbindEvents(): void {
    this.minHElem.off();
    this.maxHElem.off();
    this.fullBarElem.off();
    this.selBarElem.off();
    this.ticksElem.off();
  }

  // onStart event handler
  private onStart(pointer: JqLiteWrapper, ref: HandleType, event: any): void {
    const eventNames = this.getEventNames(event);

    event.stopPropagation();
    event.preventDefault();

    // We have to do this in case the HTML where the sliders are on
    // have been animated into view.
    this.calcViewDimensions();

    if (pointer) {
      this.tracking = ref;
    } else {
      pointer = this.getNearestHandle(event);
      this.tracking = pointer === this.minHElem ? HandleType.Low : HandleType.High;
    }

    pointer.addClass('rz-active');

    if (this.options.keyboardSupport) {
      this.focusElement(pointer);
    }

    const ehMove = (e: any) => this.dragging.active ? this.onDragMove(pointer, e) : this.onMove(pointer, e);

    if (this.onMoveUnsubscribe !== null) {
      this.onMoveUnsubscribe();
    }
    this.onMoveUnsubscribe = this.renderer.listen('document', eventNames.moveEvent, ehMove);

    const ehEnd = (e: any) => this.onEnd(e);
    if (this.onEndUnsubscribe !== null) {
      this.onEndUnsubscribe();
    }
    this.onEndUnsubscribe = this.renderer.listen('document', eventNames.endEvent, ehEnd);

    this.callOnStart();

    const changedTouches = event.changedTouches;
    if (changedTouches) {
      // Store the touch identifier
      if (!this.touchId) {
        this.isDragging = true;
        this.touchId = changedTouches[0].identifier;
      }
    }
  }

  // onMove event handler
  private onMove(pointer: JqLiteWrapper, event: any, fromTick?: boolean): void {
    const changedTouches = event.changedTouches;
    let touchForThisSlider;
    if (changedTouches) {
      for (let i = 0; i < changedTouches.length; i++) {
        if (changedTouches[i].identifier === this.touchId) {
          touchForThisSlider = changedTouches[i];
          break;
        }
      }
    }

    if (changedTouches && !touchForThisSlider) {
      return;
    }

    const newPos = this.getEventPosition(
        event,
        touchForThisSlider ? touchForThisSlider.identifier : undefined
      );
    let newValue;
    const ceilValue = this.options.rightToLeft
        ? this.minValue
        : this.maxValue;
    const flrValue = this.options.rightToLeft ? this.maxValue : this.minValue;

    if (newPos <= 0) {
      newValue = flrValue;
    } else if (newPos >= this.maxPos) {
      newValue = ceilValue;
    } else {
      newValue = this.positionToValue(newPos);
      if (fromTick && <any>this.options.showTicks instanceof Number) {
        newValue = this.roundStep(newValue, <number>this.options.showTicks);
      } else {
        newValue = this.roundStep(newValue);
      }
    }
    this.positionTrackingHandle(newValue);
  }

  private onEnd(event: any): void {
    const changedTouches = event.changedTouches;
    if (changedTouches && changedTouches[0].identifier !== this.touchId) {
      return;
    }
    this.isDragging = false;
    this.touchId = null;

    if (!this.options.keyboardSupport) {
      this.minHElem.removeClass('rz-active');
      this.maxHElem.removeClass('rz-active');
      this.tracking = null;
    }
    this.dragging.active = false;

    const eventNames = this.getEventNames(event);

    if (this.onMoveUnsubscribe !== null) {
      this.onMoveUnsubscribe();
    }
    if (this.onEndUnsubscribe !== null) {
      this.onEndUnsubscribe();
    }

    this.callOnEnd();
  }

  private onTickClick(pointer: JqLiteWrapper, event: any): void {
    this.onMove(pointer, event, true);
  }

  private onPointerFocus(pointer: JqLiteWrapper, ref: HandleType): void {
    this.tracking = ref;
    pointer.on('blur', (event) => this.onPointerBlur(pointer));
    pointer.on('keydown', (event) => this.onKeyboardEvent(event));
    pointer.on('keyup', (event) => this.onKeyUp());
    this.firstKeyDown = true;
    pointer.addClass('rz-active');

    this.currentFocusElement = {
      pointer: pointer,
      ref: ref,
    };
  }

  private onKeyUp(): void {
    this.firstKeyDown = true;
    this.callOnEnd();
  }

  private onPointerBlur(pointer: JqLiteWrapper): void {
    pointer.off('blur');
    pointer.off('keydown');
    pointer.off('keyup');
    pointer.removeClass('rz-active');
    if (!this.isDragging) {
      this.tracking = null;
      this.currentFocusElement = null;
    }
  }

  private getKeyActions(currentValue: number): {[key: string]: number} {
    let increaseStep = currentValue + this.step,
      decreaseStep = currentValue - this.step,
      increasePage = currentValue + this.valueRange / 10,
      decreasePage = currentValue - this.valueRange / 10;

    if (this.options.reversedControls) {
      increaseStep = currentValue - this.step;
      decreaseStep = currentValue + this.step;
      increasePage = currentValue - this.valueRange / 10;
      decreasePage = currentValue + this.valueRange / 10;
    }

    // Left to right default actions
    const actions = {
      UP: increaseStep,
      DOWN: decreaseStep,
      LEFT: decreaseStep,
      RIGHT: increaseStep,
      PAGEUP: increasePage,
      PAGEDOWN: decreasePage,
      HOME: this.options.reversedControls ? this.maxValue : this.minValue,
      END: this.options.reversedControls ? this.minValue : this.maxValue,
    };
    // right to left means swapping right and left arrows
    if (this.options.rightToLeft) {
      actions.LEFT = increaseStep;
      actions.RIGHT = decreaseStep;
      // right to left and vertical means we also swap up and down
      if (this.options.vertical) {
        actions.UP = decreaseStep;
        actions.DOWN = increaseStep;
      }
    }
    return actions;
  }

  private onKeyboardEvent(event: any): void {
    const currentValue = this.getCurrentTrackingValue();
    const keyCode = event.keyCode || event.which;
    const keys = {
        38: 'UP',
        40: 'DOWN',
        37: 'LEFT',
        39: 'RIGHT',
        33: 'PAGEUP',
        34: 'PAGEDOWN',
        36: 'HOME',
        35: 'END',
      };
    const actions = this.getKeyActions(currentValue);
    const key = keys[keyCode];
    const action = actions[key];

    if (action == null || this.tracking === null) {
      return;
    }
    event.preventDefault();

    if (this.firstKeyDown) {
      this.firstKeyDown = false;
      this.callOnStart();
    }

    const newValue = this.roundStep(this.sanitizeValue(action));
    if (!this.options.draggableRangeOnly) {
      this.positionTrackingHandle(newValue);
    } else {
      const difference = this.viewHighValue - this.viewLowValue;
      let newMinValue, newMaxValue;

      if (this.tracking === HandleType.Low) {
        newMinValue = newValue;
        newMaxValue = newValue + difference;
        if (newMaxValue > this.maxValue) {
          newMaxValue = this.maxValue;
          newMinValue = newMaxValue - difference;
        }
      } else {
        newMaxValue = newValue;
        newMinValue = newValue - difference;
        if (newMinValue < this.minValue) {
          newMinValue = this.minValue;
          newMaxValue = newMinValue + difference;
        }
      }
      this.positionTrackingBar(newMinValue, newMaxValue);
    }
  }

  // onDragStart event handler, handles dragging of the middle bar
  private onDragStart(pointer: JqLiteWrapper, ref: HandleType, event: any): void {
    const position = this.getEventPosition(event);

    this.dragging = new Dragging();
    this.dragging.active = true;
    this.dragging.value = this.positionToValue(position);
    this.dragging.difference = this.viewHighValue - this.viewLowValue;
    this.dragging.lowLimit = this.options.rightToLeft
        ? this.minHElem.rzsp - position
        : position - this.minHElem.rzsp;
    this.dragging.highLimit = this.options.rightToLeft
        ? position - this.maxHElem.rzsp
        : this.maxHElem.rzsp - position;

    this.onStart(pointer, ref, event);
  }

  /// getValue helper function, gets max or min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
  private getValue(type: string, newPos: number, outOfBounds: boolean, isAbove: boolean): number {
    const isRTL = this.options.rightToLeft;
    let value = null;

    if (type === 'min') {
      if (outOfBounds) {
        if (isAbove) {
          value = isRTL
            ? this.minValue
            : this.maxValue - this.dragging.difference;
        } else {
          value = isRTL
            ? this.maxValue - this.dragging.difference
            : this.minValue;
        }
      } else {
        value = isRTL
          ? this.positionToValue(newPos + this.dragging.lowLimit)
          : this.positionToValue(newPos - this.dragging.lowLimit);
      }
    } else {
      if (outOfBounds) {
        if (isAbove) {
          value = isRTL
            ? this.minValue + this.dragging.difference
            : this.maxValue;
        } else {
          value = isRTL
            ? this.maxValue
            : this.minValue + this.dragging.difference;
        }
      } else {
        if (isRTL) {
          value =
            this.positionToValue(newPos + this.dragging.lowLimit) +
            this.dragging.difference;
        } else {
          value =
            this.positionToValue(newPos - this.dragging.lowLimit) +
            this.dragging.difference;
        }
      }
    }
    return this.roundStep(value);
  }

  private onDragMove(pointer, event?) {
    const newPos = this.getEventPosition(event);

    let ceilLimit, flrLimit, flrHElem, ceilHElem;
    if (this.options.rightToLeft) {
      ceilLimit = this.dragging.lowLimit;
      flrLimit = this.dragging.highLimit;
      flrHElem = this.maxHElem;
      ceilHElem = this.minHElem;
    } else {
      ceilLimit = this.dragging.highLimit;
      flrLimit = this.dragging.lowLimit;
      flrHElem = this.minHElem;
      ceilHElem = this.maxHElem;
    }

    const isUnderFlrLimit = newPos <= flrLimit;
    const isOverCeilLimit = newPos >= this.maxPos - ceilLimit;

    let newMinValue, newMaxValue;
    if (isUnderFlrLimit) {
      if (flrHElem.rzsp === 0) {
        return;
      }
      newMinValue = this.getValue('min', newPos, true, false);
      newMaxValue = this.getValue('max', newPos, true, false);
    } else if (isOverCeilLimit) {
      if (ceilHElem.rzsp === this.maxPos) {
        return;
      }
      newMaxValue = this.getValue('max', newPos, true, true);
      newMinValue = this.getValue('min', newPos, true, true);
    } else {
      newMinValue = this.getValue('min', newPos, false, false);
      newMaxValue = this.getValue('max', newPos, false, false);
    }

    this.positionTrackingBar(newMinValue, newMaxValue);
  }

  // Set the new value and position for the entire bar
  private positionTrackingBar(newMinValue, newMaxValue) {
    if (this.options.minLimit != null &&
        newMinValue < this.options.minLimit) {
      newMinValue = this.options.minLimit;
      newMaxValue = newMinValue + this.dragging.difference;
    }
    if (this.options.maxLimit != null &&
        newMaxValue > this.options.maxLimit) {
      newMaxValue = this.options.maxLimit;
      newMinValue = newMaxValue - this.dragging.difference;
    }

    this.viewLowValue = newMinValue;
    this.viewHighValue = newMaxValue;
    this.applyLowValue();
    if (this.range) {
      this.applyHighValue();
    }
    this.applyModel();
    this.updateHandles(HandleType.Low, this.valueToPosition(newMinValue));
    this.updateHandles(HandleType.High, this.valueToPosition(newMaxValue));
  }

  // Set the new value and position to the current tracking handle
  private positionTrackingHandle(newValue): void {
    let valueChanged = false;
    newValue = this.applyMinMaxLimit(newValue);
    if (this.range) {
      if (this.options.pushRange) {
        newValue = this.applyPushRange(newValue);
        valueChanged = true;
      } else {
        if (this.options.noSwitching) {
          if (this.tracking === HandleType.Low && newValue > this.viewHighValue) {
            newValue = this.applyMinMaxRange(this.viewHighValue);
          } else if (this.tracking === HandleType.High &&
                     newValue < this.viewLowValue) {
            newValue = this.applyMinMaxRange(this.viewLowValue);
          }
        }
        newValue = this.applyMinMaxRange(newValue);
        /* This is to check if we need to switch the min and max handles */
        if (this.tracking === HandleType.Low && newValue > this.viewHighValue) {
          this.viewLowValue = this.viewHighValue;
          this.applyLowValue();
          this.applyModel();
          this.updateHandles(HandleType.Low, this.maxHElem.rzsp);
          this.updateAriaAttributes();
          this.tracking = HandleType.High;
          this.minHElem.removeClass('rz-active');
          this.maxHElem.addClass('rz-active');
          if (this.options.keyboardSupport) {
            this.focusElement(this.maxHElem);
          }
          valueChanged = true;
        } else if (this.tracking === HandleType.High &&
                   newValue < this.viewLowValue) {
          this.viewHighValue = this.viewLowValue;
          this.applyHighValue();
          this.applyModel();
          this.updateHandles(HandleType.High, this.minHElem.rzsp);
          this.updateAriaAttributes();
          this.tracking = HandleType.Low;
          this.maxHElem.removeClass('rz-active');
          this.minHElem.addClass('rz-active');
          if (this.options.keyboardSupport) {
            this.focusElement(this.minHElem);
          }
          valueChanged = true;
        }
      }
    }

    if (this.getCurrentTrackingValue() !== newValue) {
      if (this.tracking === HandleType.Low) {
        this.viewLowValue = newValue;
        this.applyLowValue();
      } else {
        this.viewHighValue = newValue;
        this.applyHighValue();
      }
      this.applyModel();
      this.updateHandles(this.tracking, this.valueToPosition(newValue));
      this.updateAriaAttributes();
      valueChanged = true;
    }

    if (valueChanged) {
      this.applyModel();
    }
  }

  private applyMinMaxLimit(newValue: number): number {
    if (this.options.minLimit != null && newValue < this.options.minLimit) {
      return this.options.minLimit;
    }
    if (this.options.maxLimit != null && newValue > this.options.maxLimit) {
      return this.options.maxLimit;
    }
    return newValue;
  }

  private applyMinMaxRange(newValue: number): number {
    const oppositeValue = this.tracking === HandleType.High ? this.viewHighValue : this.viewLowValue;
    const difference = Math.abs(newValue - oppositeValue);
    if (this.options.minRange != null) {
      if (difference < this.options.minRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewHighValue - this.options.minRange;
        } else {
          return this.viewLowValue + this.options.minRange;
        }
      }
    }
    if (this.options.maxRange != null) {
      if (difference > this.options.maxRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewHighValue - this.options.maxRange;
        } else {
          return this.viewLowValue + this.options.maxRange;
        }
      }
    }
    return newValue;
  }

  private applyPushRange(newValue: number): number {
    const difference = this.tracking === HandleType.Low
          ? this.viewHighValue - newValue
          : newValue - this.viewLowValue;
    const minRange =
        this.options.minRange !== null
          ? this.options.minRange
          : this.options.step;
    const maxRange = this.options.maxRange;
    // if smaller than minRange
    if (difference < minRange) {
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = Math.min(newValue + minRange, this.maxValue);
        newValue = this.viewHighValue - minRange;
        this.applyHighValue();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue));
      } else {
        this.viewLowValue = Math.max(newValue - minRange, this.minValue);
        newValue = this.viewLowValue + minRange;
        this.applyLowValue();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    } else if (maxRange !== null && difference > maxRange) {
      // if greater than maxRange
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = newValue + maxRange;
        this.applyHighValue();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue)
        );
      } else {
        this.viewLowValue = newValue - maxRange;
        this.applyLowValue();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    }
    return newValue;
  }

  private applyModel() {
    // TODO: @Output...
  }

  // TODO: support options callbacks?
  private callOnStart() {}

  private callOnChange() {}

  private callOnEnd() {}
}
