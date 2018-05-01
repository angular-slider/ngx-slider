import {
  Component,
  OnInit,
  Directive,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';

import {
  CustomStepDefinition,
  Options,
  GetLegendFunction,
  TranslateLabel,
  TranslateFunction,
  ValueToPositionFunction,
  PositionToValueFunction,
} from './options';

import { ValuePositionConverter } from './value-position-converter';

import { JqLiteWrapper } from './jq-lite-wrapper';

import { ThrottledFunc } from './throttled-func';

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

// TODO: slowly rewrite to angular
class SliderElement extends JqLiteWrapper {
  position: number = 0;
  value: string; // TODO: this only applies to label elements; it should be moved to the specific directives where it's used
  dimension: number;
  alwaysHide: boolean = false;

  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[right-out-sel-elem]'})
export class RightOutSelDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[left-out-sel-elem]'})
export class LeftOutSelDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[full-bar-elem]'})
export class FullBarDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[sel-bar-elem]'})
export class SelBarDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[min-h-elem]'})
export class MinHDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[max-h-elem]'})
export class MaxHDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[flr-lab-elem]'})
export class FlrLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ceil-lab-elem]'})
export class CeilLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[min-lab-elem]'})
export class MinLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[max-lab-elem]'})
export class MaxLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[cmb-lab-elem]'})
export class CmbLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ticks-elem]'})
export class TicksDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}


@Component({
  selector: 'ng2-slider',
  templateUrl: './ng2-slider.component.html',
  styleUrls: ['./ng2-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'rzslider' }
})
export class Ng2SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  // Model for low value slider. If only value is provided single slider will be rendered.
  private _value: number;
  @Input() set value(newValue: number) {
    const oldValue = this._value;
    this._value = newValue;
    this.onChangeValue(oldValue, newValue);
  }
  get value(): number {
     return this._value;
  }
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  // Model for high value slider. Providing both value and highValue will render range slider.
  private _highValue: number;
  @Input() set highValue(newHighValue: number) {
    const oldHighValue = this._highValue;
    this._highValue = newHighValue;
    this.onChangeHighValue(oldHighValue, newHighValue);
  }
  get highValue(): number {
     return this._highValue;
  }
  @Output() highValueChange: EventEmitter<number> = new EventEmitter();

  // An object with all the other options of the slider.
  // Each option can be updated at runtime and the slider will automatically be re-rendered.
  private _options: Options = new Options();
  @Input() set options(newOptions: Options) {
    const oldOptions = this._options;
    this._options = newOptions;
    this.onChangeOptions(oldOptions, newOptions);
  }
  get options(): Options {
     return this._options;
  }

  // Options synced to model options, based on defaults
  private viewOptions = new Options();
  // Low value synced to model low value
  private viewLowValue: number;
  // High value synced to model high value
  private viewHighValue: number;

  private barStyle: any = {};
  private minPointerStyle: any = {};
  private maxPointerStyle: any = {};
  private showTicks: boolean = false;
  private ticks: Tick[] = [];

  /* Slider DOM elements */

  // Left highlight outside two handles
  @ViewChild(LeftOutSelDirective)
  private leftOutSelBar: SliderElement;

  // Right highlight outside two handles
  @ViewChild(RightOutSelDirective)
  private rightOutSelBar: SliderElement;

  // The whole slider bar
  @ViewChild(FullBarDirective)
  private fullBarElem: SliderElement;

  // Highlight between two handles
  @ViewChild(SelBarDirective)
  private selBarElem: SliderElement;

  // Left slider handle
  @ViewChild(MinHDirective)
  private minHElem: SliderElement;

  // Right slider handle
  @ViewChild(MaxHDirective)
  private maxHElem: SliderElement;

  // Floor label
  @ViewChild(FlrLabDirective)
  private flrLabElem: SliderElement;

  // Ceiling label
  @ViewChild(CeilLabDirective)
  private ceilLabElem: SliderElement;

  // Label above the low value
  @ViewChild(MinLabDirective)
  private minLabElem: SliderElement;

  // Label above the high value
  @ViewChild(MaxLabDirective)
  private maxLabElem: SliderElement;

  // Combined label
  @ViewChild(CmbLabDirective)
  private cmbLabElem: SliderElement;

  // The ticks
  @ViewChild(TicksDirective)
  private ticksElem: SliderElement;

  @HostBinding('class.rz-vertical')
  private sliderElementVerticalClass: boolean = false;

  @HostBinding('attr.disabled')
  private sliderElementDisabledAttr: string = null;

  /** Viewport position of the slider element (the host element) */
  private sliderElementPosition: number = 0;

  // Slider type, true means range slider
  get range(): boolean {
    return this.value !== undefined && this.highValue !== undefined;
  }

  // Values recorded when first dragging the bar
  private dragging: Dragging = new Dragging();

  // Property that handles position (defaults to left for horizontal)
  private positionProperty: 'left'|'bottom' = 'left';

  /// Property that handles dimension (defaults to width for horizontal)
  private dimensionProperty: 'width'|'height' = 'width';

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

  /* If tickStep is set or ticksArray is specified.
    In this case, ticks values should be displayed below the slider. */
  private intermediateTicks: boolean = false;

  // Set to true if init method already executed
  private initHasRun: boolean = false;

  // Used to call onStart on the first keydown event
  private firstKeyDown: boolean = false;

  // Internal flag to prevent watchers to be called when the sliders value are modified internally.
  private internalChange: boolean = false;

  // Internal flag to keep track of the visibility of combo label
  private cmbLabelShown: boolean = false;

  // Internal variable to keep track of the focus element
  private currentFocusElement: {pointer: SliderElement, ref: HandleType} = null;

  private barDimension: number;

  private customTrFn: TranslateFunction;
  private getLegend: GetLegendFunction;

  private thrOnLowHandleChange: ThrottledFunc;
  private thrOnHighHandleChange: ThrottledFunc;

  private isDragging: boolean;
  private touchId: number;

  private onMoveUnsubscribe: () => void = null;
  private onEndUnsubscribe: () => void = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.thrOnLowHandleChange = new ThrottledFunc(() => { this.onLowHandleChange(); }, this.viewOptions.interval);
    this.thrOnHighHandleChange = new ThrottledFunc(() => { this.onHighHandleChange(); }, this.viewOptions.interval);

    /* We have to run the rest of the actual init function later, in separate Angular tick cycle,
     because this one has been checked and it will lead to ExpressionChangedAfterItHasBeenCheckedError */
    setTimeout(() => this.init(), 0);
  }

  init(): void {
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

    this.initHasRun = true;
  }

  onChangeOptions(oldValue: Options, newValue: Options): void {
    if (!this.initHasRun || newValue === oldValue) {
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
    if (!this.initHasRun || this.internalChange || newValue === oldValue) {
      return;
    }

    this.thrOnLowHandleChange.call();
  }

  onChangeHighValue(oldValue: number, newValue: number): void {
    if (!this.initHasRun || this.internalChange || newValue === oldValue) {
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

  private findStepIndex(modelValue: number): number {
    let index = 0;
    for (let i = 0; i < this.viewOptions.stepsArray.length; i++) {
      const step = this.viewOptions.stepsArray[i];
      if (step.value === modelValue) {
        index = i;
        break;
      }
    }
    return index;
  }

  private syncLowValue(): void {
    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
        this.viewLowValue = this.findStepIndex(this.value);
      } else {
        this.viewLowValue = this.value;
      }
    } else {
      this.viewLowValue = this.value;
    }
  }

  private syncHighValue(): void {
    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
        this.viewHighValue = this.findStepIndex(this.highValue);
      } else {
        this.viewHighValue = this.highValue;
      }
    } else {
      this.viewHighValue = this.highValue;
    }
  }

  private getStepValue(sliderValue: number): number {
    const step = this.viewOptions.stepsArray[sliderValue];
    return step.value;
  }

  private applyLowValue(): void {
    this.internalChange = true;

    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
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

    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
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
  private onHighHandleChange(): void {
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
    this.viewOptions = new Options();
    Object.assign(this.viewOptions, this.options);

    if (this.viewOptions.step <= 0) {
       this.viewOptions.step = 1;
    }

    this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange;
    this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly;
    if (this.viewOptions.draggableRangeOnly) {
      this.viewOptions.draggableRange = true;
    }

    this.viewOptions.showTicks = this.viewOptions.showTicks ||
      this.viewOptions.showTicksValues ||
      !!this.viewOptions.ticksArray;
    if (this.viewOptions.showTicks && (this.viewOptions.tickStep !== null || this.viewOptions.ticksArray)) {
      this.intermediateTicks = true;
    }
    this.showTicks = this.viewOptions.showTicks;

    this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar ||
      this.viewOptions.showSelectionBarEnd ||
      this.viewOptions.showSelectionBarFromValue !== null;

    if (this.viewOptions.stepsArray) {
      this.parseStepsArray();
    } else {
      if (this.viewOptions.translate) {
        this.customTrFn = this.viewOptions.translate;
      } else {
        this.customTrFn = (value) => String(value);
      }

      this.getLegend = this.viewOptions.getLegend;
    }

    if (this.viewOptions.vertical) {
      this.positionProperty = 'bottom';
      this.dimensionProperty = 'height';
    }
  }

  private parseStepsArray(): void {
    this.viewOptions.floor = 0;
    this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
    this.viewOptions.step = 1;

    if (this.viewOptions.translate) {
      this.customTrFn = this.viewOptions.translate;
    } else {
      this.customTrFn = (modelValue: number) => {
        if (this.viewOptions.bindIndexForStepsArray) {
          return String(this.getStepValue(modelValue));
        }
        return String(modelValue);
      };
    }

    this.getLegend = (index) => {
      const step = this.viewOptions.stepsArray[index];
      return step.legend;
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
      this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels
    );
    this.alwaysHide(
      this.ceilLabElem,
      this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels
    );

    const hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
    this.alwaysHide(
      this.minLabElem,
      hideLabelsForTicks || this.viewOptions.hidePointerLabels
    );
    this.alwaysHide(
      this.maxLabElem,
      hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels
    );
    this.alwaysHide(
      this.cmbLabElem,
      hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels
    );
    this.alwaysHide(
      this.selBarElem,
      !this.range && !this.viewOptions.showSelectionBar
    );
    this.alwaysHide(
      this.leftOutSelBar,
      !this.range || !this.viewOptions.showOuterSelectionBars
    );
    this.alwaysHide(
      this.rightOutSelBar,
      !this.range || !this.viewOptions.showOuterSelectionBars
    );

    if (this.range && this.viewOptions.showOuterSelectionBars) {
      this.fullBarElem.addClass('rz-transparent');
    }

    if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
      this.sliderElementVerticalClass = this.viewOptions.vertical;
      // The above change in host component class will not be applied until the end of this cycle
      // However, functions calculating the slider position expect the slider to be already styled as vertical
      // So as a workaround, we need to reset the slider once again to compute the correct values
      setTimeout(() => { this.resetSlider(); });
    }

    if (this.viewOptions.draggableRange) {
      this.selBarElem.addClass('rz-draggable');
    } else {
      this.selBarElem.removeClass('rz-draggable');
    }

    if (this.intermediateTicks && this.options.showTicksValues) {
      this.ticksElem.addClass('rz-ticks-values-under');
    }
  }

  private alwaysHide(el: SliderElement, hide: boolean): void {
    el.alwaysHide = hide;
    if (hide) {
      this.hideEl(el);
    } else {
      this.showEl(el);
    }
  }

  // Manage the events bindings based on readOnly and disabled options
  private manageEventsBindings(): void {
    if (this.viewOptions.disabled || this.viewOptions.readOnly) {
      this.unbindEvents();
    } else {
      this.bindEvents();
    }
  }

  // Set the disabled state based on disabled option
  private setDisabledState(): void {
    this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
  }

  // Reset label values
  private resetLabelsValue(): void {
    this.minLabElem.value = undefined;
    this.maxLabElem.value = undefined;
  }

  // Initialize slider handles positions and labels
  // Run only once during initialization and every time view port changes size
  private initHandles(): void {
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
  private translateFn(value: number, label: SliderElement, which: TranslateLabel, useCustomTr?: boolean): void {
    useCustomTr = useCustomTr === undefined ? true : useCustomTr;

    let valStr = '';
    let recalculateDimension = false;
    const noLabelInjection = label.hasClass('no-label-injection');

    if (useCustomTr) {
      if (this.viewOptions.stepsArray && !this.viewOptions.bindIndexForStepsArray) {
        value = this.getStepValue(value);
      }
      valStr = String(this.customTrFn(value, this.viewOptions.id, which));
    } else {
      valStr = String(value);
    }

    if (label.value === undefined ||
        label.value.length !== valStr.length ||
       (label.value.length > 0 && label.dimension === 0)) {
      recalculateDimension = true;
      label.value = valStr;
    }

    if (!noLabelInjection) {
      label.html(valStr);
    }

    // Update width only when length of the label have changed
    if (recalculateDimension) {
      this.calculateElementDimension(label);
    }
  }

  // Set maximum and minimum values for the slider and ensure the model and high value match these limits
  private setMinAndMax(): void {
    this.step = +this.viewOptions.step;
    this.precision = +this.viewOptions.precision;

    this.minValue = this.viewOptions.floor;
    if (this.viewOptions.logScale && this.minValue === 0) {
      throw Error('Can\'t use floor=0 with logarithmic scale');
    }

    if (this.viewOptions.enforceStep) {
      this.viewLowValue = this.roundStep(this.viewLowValue);
      if (this.range) {
        this.viewHighValue = this.roundStep(this.viewHighValue);
      }
    }

    if (this.viewOptions.ceil != null) {
      this.maxValue = this.viewOptions.ceil;
    } else {
      this.maxValue = this.viewOptions.ceil = this.range ? this.viewHighValue : this.viewLowValue;
    }

    if (this.viewOptions.enforceRange) {
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

    if ( this.viewOptions.keyboardSupport &&
      !(this.viewOptions.readOnly || this.viewOptions.disabled) ) {
      this.minHElem.attr('tabindex', '0');
    } else {
      this.minHElem.attr('tabindex', '');
    }

    if (this.viewOptions.vertical) {
      this.minHElem.attr('aria-orientation', 'vertical');
    }

    if (this.viewOptions.ariaLabel) {
      this.minHElem.attr('aria-label', this.viewOptions.ariaLabel);
    } else if (this.viewOptions.ariaLabelledBy) {
      this.minHElem.attr('aria-labelledby', this.viewOptions.ariaLabelledBy);
    }

    if (this.range) {
      this.maxHElem.attr('role', 'slider');

      if (this.viewOptions.keyboardSupport &&
        !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
        this.maxHElem.attr('tabindex', '0');
      } else {
        this.maxHElem.attr('tabindex', '');
      }

      if (this.viewOptions.vertical) {
        this.maxHElem.attr('aria-orientation', 'vertical');
      }

      if (this.viewOptions.ariaLabelHigh) {
        this.maxHElem.attr('aria-label', this.viewOptions.ariaLabelHigh);
      } else if (this.viewOptions.ariaLabelledByHigh) {
        this.maxHElem.attr('aria-labelledby', this.viewOptions.ariaLabelledByHigh);
      }
    }
  }

  // Updates aria attributes according to current values
  private updateAriaAttributes(): void {
    this.minHElem.attr('aria-valuenow', this.value.toString());
    this.minHElem.attr('aria-valuetext', this.customTrFn(this.value, this.viewOptions.id, 'model'));
    this.minHElem.attr('aria-valuemin', this.minValue.toString());
    this.minHElem.attr('aria-valuemax', this.maxValue.toString());

    if (this.range) {
      this.maxHElem.attr('aria-valuenow', this.highValue.toString());
      this.maxHElem.attr('aria-valuetext', this.customTrFn(this.highValue, this.viewOptions.id, 'high'));
      this.maxHElem.attr('aria-valuemin', this.minValue.toString());
      this.maxHElem.attr('aria-valuemax', this.maxValue.toString());
    }
  }

  // Calculate dimensions that are dependent on view port size
  // Run once during initialization and every time view port changes size.
  private calcViewDimensions(): void {
    this.calculateElementDimension(this.minHElem);

    const handleWidth = this.minHElem.dimension;

    this.handleHalfDim = handleWidth / 2;
    this.calculateElementDimension(this.fullBarElem);
    this.barDimension = this.fullBarElem.dimension;

    this.maxPos = this.barDimension - handleWidth;

    const sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.sliderElementPosition = sliderElementBoundingRect[this.positionProperty];
    console.log(this.sliderElementPosition);

    if (this.initHasRun) {
      this.updateFloorLab();
      this.updateCeilLab();
      this.initHandles();
    }
  }

  // Update the ticks position
  private updateTicksScale(): void {
    if (!this.viewOptions.showTicks) {
      return;
    }

    const ticksArray = this.viewOptions.ticksArray || this.getTicksArray();
    const translate = this.viewOptions.vertical ? 'translateY' : 'translateX';

    if (this.viewOptions.rightToLeft) {
      ticksArray.reverse();
    }

    this.ticks = ticksArray.map((value: number): Tick => {
      let position: number = this.valueToPosition(value);

      if (this.viewOptions.vertical) {
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
      if (tick.selected && this.viewOptions.getSelectionBarColor) {
        tick.style['background-color'] = this.getSelectionBarColor();
      }
      if (!tick.selected && this.viewOptions.getTickColor) {
        tick.style['background-color'] = this.getTickColor(value);
      }
      if (this.viewOptions.ticksTooltip) {
        tick.tooltip = this.viewOptions.ticksTooltip(value);
        tick.tooltipPlacement = this.viewOptions.vertical ? 'right' : 'top';
      }
      if (this.viewOptions.showTicksValues && (value % this.viewOptions.tickValueStep === 0)) {
        tick.value = this.getDisplayValue(value, 'tick-value');
        if (this.viewOptions.ticksValuesTooltip) {
          tick.valueTooltip = this.viewOptions.ticksValuesTooltip(value);
          tick.valueTooltipPlacement = this.viewOptions.vertical
            ? 'right'
            : 'top';
        }
      }
      if (this.getLegend) {
        const legend = this.getLegend(value, this.viewOptions.id);
        if (legend) {
          tick.legend = legend;
        }
      }
      return tick;
    });
  }

  private getTicksArray(): number[] {
    const step: number = (this.viewOptions.tickStep !== null) ? this.viewOptions.tickStep : this.step;
    const ticksArray: number[] = [];
    for (let value = this.minValue; value <= this.maxValue; value += step) {
      ticksArray.push(value);
    }
    return ticksArray;
  }

  private isTickSelected(value: number): boolean {
    if (!this.range) {
      if (this.viewOptions.showSelectionBarFromValue !== null) {
        const center = this.viewOptions.showSelectionBarFromValue;
        if (this.viewLowValue > center &&
            value >= center &&
            value <= this.viewLowValue) {
          return true;
        } else if (this.viewLowValue < center &&
                   value <= center &&
                   value >= this.viewLowValue) {
          return true;
        }
      } else if (this.viewOptions.showSelectionBarEnd) {
        if (value >= this.viewLowValue) {
          return true;
        }
      } else if (this.viewOptions.showSelectionBar && value <= this.viewLowValue) {
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
    this.calculateElementDimension(this.flrLabElem);
    const position = this.viewOptions.rightToLeft
      ? this.barDimension - this.flrLabElem.dimension
      : 0;
    this.setPosition(this.flrLabElem, position);
  }

  // Update position of the ceiling label
  private updateCeilLab(): void {
    this.translateFn(this.maxValue, this.ceilLabElem, 'ceil');
    this.calculateElementDimension(this.ceilLabElem);
    const position = this.viewOptions.rightToLeft
      ? 0
      : this.barDimension - this.ceilLabElem.dimension;
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
    const labelDimension = labelName === 'minLab' ? this.minLabElem.dimension : this.maxLabElem.dimension;
    const nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDim;
    const endOfBarPos = this.barDimension - labelDimension;

    if (!this.viewOptions.boundPointerLabels) {
      return nearHandlePos;
    }

    if ((this.viewOptions.rightToLeft && labelName === 'minLab') ||
       (!this.viewOptions.rightToLeft && labelName === 'maxLab')) {
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

    if (this.viewOptions.getPointerColor) {
      const pointercolor = this.getPointerColor('min');
      this.minPointerStyle = {
        backgroundColor: pointercolor,
      };
    }

    if (this.viewOptions.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Update high slider handle position and label
  private updateHighHandle(newPos: number): void {
    this.setPosition(this.maxHElem, newPos);
    this.translateFn(this.viewHighValue, this.maxLabElem, 'high');
    this.setPosition(
      this.maxLabElem,
      this.getHandleLabelPos('maxLab', newPos)
    );

    if (this.viewOptions.getPointerColor) {
      const pointercolor = this.getPointerColor('max');
      this.maxPointerStyle = {
        backgroundColor: pointercolor,
      };
    }
    if (this.viewOptions.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Show/hide floor/ceiling label
  private shFloorCeil(): void {
    // Show based only on hideLimitLabels if pointer labels are hidden
    if (this.viewOptions.hidePointerLabels) {
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

  private isLabelBelowFloorLab(label: SliderElement): boolean {
    const isRTL = this.viewOptions.rightToLeft,
      pos = label.position,
      dim = label.dimension,
      floorPos = this.flrLabElem.position,
      floorDim = this.flrLabElem.dimension;
    return isRTL
      ? pos + dim >= floorPos - 2
      : pos <= floorPos + floorDim + 2;
  }

  private isLabelAboveCeilLab(label: SliderElement): boolean {
    const isRTL = this.viewOptions.rightToLeft,
      pos = label.position,
      dim = label.dimension,
      ceilPos = this.ceilLabElem.position,
      ceilDim = this.ceilLabElem.dimension;
    return isRTL ? pos <= ceilPos + ceilDim + 2 : pos + dim >= ceilPos - 2;
  }

  // Update slider selection bar, combined label and range label
  private updateSelectionBar(): void {
    let position = 0;
    let dimension = 0;
    const isSelectionBarFromRight = this.viewOptions.rightToLeft
        ? !this.viewOptions.showSelectionBarEnd
        : this.viewOptions.showSelectionBarEnd;
    const positionForRange = this.viewOptions.rightToLeft
        ? this.maxHElem.position + this.handleHalfDim
        : this.minHElem.position + this.handleHalfDim;

    if (this.range) {
      dimension = Math.abs(this.maxHElem.position - this.minHElem.position);
      position = positionForRange;
    } else {
      if (this.viewOptions.showSelectionBarFromValue !== null) {
        const center = this.viewOptions.showSelectionBarFromValue;
        const centerPosition = this.valueToPosition(center);
        const isModelGreaterThanCenter = this.viewOptions.rightToLeft
            ? this.viewLowValue <= center
            : this.viewLowValue > center;
        if (isModelGreaterThanCenter) {
          dimension = this.minHElem.position - centerPosition;
          position = centerPosition + this.handleHalfDim;
        } else {
          dimension = centerPosition - this.minHElem.position;
          position = this.minHElem.position + this.handleHalfDim;
        }
      } else if (isSelectionBarFromRight) {
        dimension =
          Math.abs(this.maxPos - this.minHElem.position) + this.handleHalfDim;
        position = this.minHElem.position + this.handleHalfDim;
      } else {
        dimension = this.minHElem.position + this.handleHalfDim;
        position = 0;
      }
    }
    this.setDimension(this.selBarElem, dimension);
    this.setPosition(this.selBarElem, position);
    if (this.range && this.viewOptions.showOuterSelectionBars) {
      if (this.viewOptions.rightToLeft) {
        this.setDimension(this.rightOutSelBar, position);
        this.setPosition(this.rightOutSelBar, 0);
        this.calculateElementDimension(this.fullBarElem);
        this.setDimension(
          this.leftOutSelBar,
          this.fullBarElem.dimension - (position + dimension)
        );
        this.setPosition(this.leftOutSelBar, position + dimension);
      } else {
        this.setDimension(this.leftOutSelBar, position);
        this.setPosition(this.leftOutSelBar, 0);
        this.calculateElementDimension(this.fullBarElem);
        this.setDimension(
          this.rightOutSelBar,
          this.fullBarElem.dimension - (position + dimension)
        );
        this.setPosition(this.rightOutSelBar, position + dimension);
      }
    }
    if (this.viewOptions.getSelectionBarColor) {
      const color = this.getSelectionBarColor();
      this.barStyle = {
        backgroundColor: color,
      };
    } else if (this.viewOptions.selectionBarGradient) {
      const offset = this.viewOptions.showSelectionBarFromValue !== null
            ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
            : 0;
      const reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
      const direction = this.viewOptions.vertical
          ? reversed ? 'bottom' : 'top'
          : reversed ? 'left' : 'right';
      this.barStyle = {
        backgroundImage:
          'linear-gradient(to ' +
          direction +
          ', ' +
          this.viewOptions.selectionBarGradient.from +
          ' 0%,' +
          this.viewOptions.selectionBarGradient.to +
          ' 100%)',
      };
      if (this.viewOptions.vertical) {
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
  private getSelectionBarColor(): string {
    if (this.range) {
      return this.viewOptions.getSelectionBarColor(
        this.value,
        this.highValue
      );
    }
    return this.viewOptions.getSelectionBarColor(this.value);
  }

  // Wrapper around the getPointerColor of the user to pass to  correct parameters
  private getPointerColor(pointerType: 'min'|'max'): string {
    if (pointerType === 'max') {
      return this.viewOptions.getPointerColor(
        this.highValue,
        pointerType
      );
    }
    return this.viewOptions.getPointerColor(
      this.value,
      pointerType
    );
  }

  // Wrapper around the getTickColor of the user to pass to correct parameters
  private getTickColor(value: number): string {
    return this.viewOptions.getTickColor(value);
  }

  // Update combined label position and value
  private updateCmbLabel(): void {
    let isLabelOverlap = null;
    if (this.viewOptions.rightToLeft) {
      isLabelOverlap =
        this.minLabElem.position - this.minLabElem.dimension - 10 <= this.maxLabElem.position;
    } else {
      isLabelOverlap =
        this.minLabElem.position + this.minLabElem.dimension + 10 >= this.maxLabElem.position;
    }

    if (isLabelOverlap) {
      const lowTr = this.getDisplayValue(this.viewLowValue, 'model');
      const highTr = this.getDisplayValue(this.viewHighValue, 'high');
      let labelVal;
      if (this.viewOptions.mergeRangeLabelsIfSame && lowTr === highTr) {
        labelVal = lowTr;
      } else {
        labelVal = this.viewOptions.rightToLeft
          ? highTr + this.viewOptions.labelOverlapSeparator + lowTr
          : lowTr + this.viewOptions.labelOverlapSeparator + highTr;
      }

      this.translateFn(labelVal, this.cmbLabElem, 'cmb', false);
      const pos = this.viewOptions.boundPointerLabels
        ? Math.min(
            Math.max(
              this.selBarElem.position +
                this.selBarElem.dimension / 2 -
                this.cmbLabElem.dimension / 2,
              0
            ),
            this.barDimension - this.cmbLabElem.dimension
          )
        : this.selBarElem.position + this.selBarElem.dimension / 2 - this.cmbLabElem.dimension / 2;

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
    if (this.viewOptions.autoHideLimitLabels) {
      this.shFloorCeil();
    }
  }

  // Return the translated value if a translate function is provided else the original value
  private getDisplayValue(value: number, which: TranslateLabel): string {
    if (this.viewOptions.stepsArray && !this.viewOptions.bindIndexForStepsArray) {
      value = this.getStepValue(value);
    }
    return this.customTrFn(value, this.viewOptions.id, which);
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
  private hideEl(element: SliderElement): void {
    element.css('visibility', 'hidden');
  }

  // Show element
  private showEl(element: SliderElement): void {
    if (!!element.alwaysHide) {
      return;
    }

    element.css('visibility', 'visible');
  }

  // Set element left/top position depending on whether slider is horizontal or vertical
  private setPosition(elem: SliderElement, pos: number): void {
    elem.position = pos;
    elem.css(this.positionProperty, Math.round(pos) + 'px');
  }

  // Calculate element's width/height depending on whether slider is horizontal or vertical
  private calculateElementDimension(elem: SliderElement) {
    const val = elem.getBoundingClientRect();
    if (this.viewOptions.vertical) {
      elem.dimension = (val.bottom - val.top) * this.viewOptions.scale;
    } else {
      elem.dimension = (val.right - val.left) * this.viewOptions.scale;
    }
  }

  // Set element width/height depending on whether slider is horizontal or vertical
  private setDimension(elem: SliderElement, dim: number): number {
    elem.dimension = dim;
    elem.css(this.dimensionProperty, Math.round(dim) + 'px');
    return dim;
  }

  // Returns a value that is within slider range
  private sanitizeValue(val: number): number {
    return Math.min(Math.max(val, this.minValue), this.maxValue);
  }

  // Translate value to pixel position
  private valueToPosition(val: number): number {
    let fn: ValueToPositionFunction  = ValuePositionConverter.linearValueToPosition;
    if (this.viewOptions.customValueToPosition) {
      fn = this.viewOptions.customValueToPosition;
    } else if (this.viewOptions.logScale) {
      fn = ValuePositionConverter.logValueToPosition;
    }

    val = this.sanitizeValue(val);
    let percent = fn(val, this.minValue, this.maxValue) || 0;
    if (this.viewOptions.rightToLeft) {
      percent = 1 - percent;
    }
    return percent * this.maxPos;
  }

  // Translate position to model value
  private positionToValue(position: number): number {
    let percent = position / this.maxPos;
    if (this.viewOptions.rightToLeft) {
      percent = 1 - percent;
    }
    let fn: PositionToValueFunction = ValuePositionConverter.linearPositionToValue;
    if (this.viewOptions.customPositionToValue) {
      fn = this.viewOptions.customPositionToValue;
    } else if (this.viewOptions.logScale) {
      fn = ValuePositionConverter.logPositionToValue;
    }
    return fn(percent, this.minValue, this.maxValue) || 0;
  }

  // Get the X-coordinate or Y-coordinate of an event
  private getEventXY(event: MouseEvent|TouchEvent, targetTouchId: number): number {
    if (event instanceof MouseEvent) {
      return this.viewOptions.vertical ? event.clientY : event.clientX;
    }

    let touchIndex = 0;
    const touches = event.touches;
    if (targetTouchId !== undefined) {
      for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === targetTouchId) {
          touchIndex = i;
          break;
        }
      }
    }

    // Return the target touch or if the target touch was not found in the event
    // returns the coordinates of the first touch
    return this.viewOptions.vertical ? touches[touchIndex].clientY : touches[touchIndex].clientX;
  }

  // Compute the event position depending on whether the slider is horizontal or vertical
  private getEventPosition(event: MouseEvent|TouchEvent, targetTouchId?: number): number {
    const sliderPos = this.sliderElementPosition;
    let eventPos = 0;
    if (this.viewOptions.vertical) {
      eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
    } else {
      eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
    }
    return eventPos * this.viewOptions.scale - this.handleHalfDim;
  }

  // Get the handle closest to an event
  private getNearestHandle(event: MouseEvent|TouchEvent): SliderElement {
    if (!this.range) {
      return this.minHElem;
    }

    const position = this.getEventPosition(event);
    const distanceMin = Math.abs(position - this.minHElem.position);
    const distanceMax = Math.abs(position - this.maxHElem.position);

    if (distanceMin < distanceMax) {
      return this.minHElem;
    } else if (distanceMin > distanceMax) {
      return this.maxHElem;
    } else if (!this.viewOptions.rightToLeft) {
      // if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
      return position < this.minHElem.position ? this.minHElem : this.maxHElem;
    } else {
      // reverse in rtl
      return position > this.minHElem.position ? this.minHElem : this.maxHElem;
    }
  }

  // Wrapper function to focus an angular element
  private focusElement(el: SliderElement): void {
    el.focus();
  }

  // Bind mouse and touch events to slider handles
  private bindEvents(): void {
    const draggableRange = this.viewOptions.draggableRange;

    if (!this.viewOptions.onlyBindHandles) {
      this.selBarElem.on('mousedown', (event) => this.onBarStart(draggableRange, null, event));
      this.selBarElem.on('mousedown', (event) => this.onBarMove(draggableRange, this.selBarElem, event));
    }

    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.on('mousedown', (event) => this.onBarStart(draggableRange, null, event));
      this.maxHElem.on('mousedown', (event) => this.onBarStart(draggableRange, null, event));
    } else {
      this.minHElem.on('mousedown', (event) => this.onStart(this.minHElem, HandleType.Low, event));

      if (this.range) {
        this.maxHElem.on('mousedown', (event) => this.onStart(this.maxHElem, HandleType.High, event));
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.on('mousedown', (event) => this.onStart(null, null, event));
        this.fullBarElem.on('mousedown', (event) => this.onMove(this.fullBarElem, event));
        this.ticksElem.on('mousedown', (event) => this.onStart(null, null, event));
        this.ticksElem.on('mousedown', (event) => this.onTickClick(this.ticksElem, event));
      }
    }

    if (!this.viewOptions.onlyBindHandles) {
      this.selBarElem.on('touchstart', (event) => this.onBarStart(draggableRange, null, event));
      this.selBarElem.on('touchstart', (event) => this.onBarMove(draggableRange, this.selBarElem, event));
    }
    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.on('touchstart', (event) => this.onBarStart(draggableRange, null, event));
      this.maxHElem.on('touchstart', (event) => this.onBarStart(draggableRange, null, event));
    } else {
      this.minHElem.on('touchstart', (event) => this.onStart(this.minHElem, HandleType.Low, event));
      if (this.range) {
        this.maxHElem.on('touchstart', (event) => this.onStart(this.maxHElem, HandleType.High, event));
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.on('touchstart', (event) => this.onStart(null, null, event));
        this.fullBarElem.on('touchstart', (event) => this.onMove(this.fullBarElem, event));
        this.ticksElem.on('touchstart', (event) => this.onStart(null, null, event));
        this.ticksElem.on('touchstart', (event) => this.onTickClick(this.ticksElem, event));
      }
    }

    if (this.viewOptions.keyboardSupport) {
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

  private onBarStart(draggableRange: boolean, pointer: SliderElement, event: MouseEvent|TouchEvent): void {
    if (draggableRange) {
      this.onDragStart(pointer, HandleType.High, event); // original: ref='rzSliderDrag', TODO: find out how this is supposed to work...
    } else {
      this.onStart(pointer, HandleType.Low, event);
    }
  }

  private onBarMove(draggableRange: boolean, pointer: SliderElement, event: MouseEvent|TouchEvent): void {
    if (draggableRange) {
      this.onDragMove(pointer, event);
    } else {
      this.onMove(pointer, event);
    }
  }


  // onStart event handler
  private onStart(pointer: SliderElement, ref: HandleType, event: MouseEvent|TouchEvent): void {
    let moveEvent: string = '';
    let endEvent: string = '';

    if (event instanceof TouchEvent) {
      moveEvent = 'touchmove';
      endEvent = 'touchend';
    } else {
      moveEvent = 'mousemove';
      endEvent = 'mouseup';
    }

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

    if (this.viewOptions.keyboardSupport) {
      this.focusElement(pointer);
    }

    const ehMove = (e: MouseEvent|TouchEvent) => this.dragging.active ? this.onDragMove(pointer, e) : this.onMove(pointer, e);

    if (this.onMoveUnsubscribe !== null) {
      this.onMoveUnsubscribe();
    }
    this.onMoveUnsubscribe = this.renderer.listen('document', moveEvent, ehMove);

    const ehEnd = (e: MouseEvent|TouchEvent) => this.onEnd(e);
    if (this.onEndUnsubscribe !== null) {
      this.onEndUnsubscribe();
    }
    this.onEndUnsubscribe = this.renderer.listen('document', endEvent, ehEnd);

    if (event instanceof TouchEvent && event.changedTouches) {
      // Store the touch identifier
      if (!this.touchId) {
        this.isDragging = true;
        this.touchId = event.changedTouches[0].identifier;
      }
    }
  }

  // onMove event handler
  private onMove(pointer: SliderElement, event: MouseEvent|TouchEvent, fromTick?: boolean): void {
    let touchForThisSlider;

    if (event instanceof TouchEvent) {
      const changedTouches = event.changedTouches;
      for (let i = 0; i < changedTouches.length; i++) {
        if (changedTouches[i].identifier === this.touchId) {
          touchForThisSlider = changedTouches[i];
          break;
        }
      }

      if (!touchForThisSlider) {
        return;
      }
    }

    const newPos = this.getEventPosition(
        event,
        touchForThisSlider ? touchForThisSlider.identifier : undefined
      );
    let newValue;
    const ceilValue = this.viewOptions.rightToLeft
        ? this.minValue
        : this.maxValue;
    const flrValue = this.viewOptions.rightToLeft ? this.maxValue : this.minValue;

    if (newPos <= 0) {
      newValue = flrValue;
    } else if (newPos >= this.maxPos) {
      newValue = ceilValue;
    } else {
      newValue = this.positionToValue(newPos);
      if (fromTick && this.viewOptions.tickStep !== null) {
        newValue = this.roundStep(newValue, this.viewOptions.tickStep);
      } else { // TODO: what if tickArray option is specified?
        newValue = this.roundStep(newValue);
      }
    }
    this.positionTrackingHandle(newValue);
  }

  private onEnd(event: MouseEvent|TouchEvent): void {
    if (event instanceof TouchEvent) {
      const changedTouches = event.changedTouches;
      if (changedTouches[0].identifier !== this.touchId) {
        return;
      }
    }

    this.isDragging = false;
    this.touchId = null;

    if (!this.viewOptions.keyboardSupport) {
      this.minHElem.removeClass('rz-active');
      this.maxHElem.removeClass('rz-active');
      this.tracking = null;
    }
    this.dragging.active = false;

    if (this.onMoveUnsubscribe !== null) {
      this.onMoveUnsubscribe();
    }
    if (this.onEndUnsubscribe !== null) {
      this.onEndUnsubscribe();
    }
  }

  private onTickClick(pointer: SliderElement, event: MouseEvent|TouchEvent): void {
    this.onMove(pointer, event, true);
  }

  private onPointerFocus(pointer: SliderElement, ref: HandleType): void {
    this.tracking = ref;
    pointer.on('blur', (event) => this.onPointerBlur(pointer));
    pointer.on('keydown', (event: KeyboardEvent) => this.onKeyboardEvent(event));
    pointer.on('keyup', (event: KeyboardEvent) => this.onKeyUp());
    this.firstKeyDown = true;
    pointer.addClass('rz-active');

    this.currentFocusElement = {
      pointer: pointer,
      ref: ref,
    };
  }

  private onKeyUp(): void {
    this.firstKeyDown = true;
  }

  private onPointerBlur(pointer: SliderElement): void {
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

    if (this.viewOptions.reversedControls) {
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
      HOME: this.viewOptions.reversedControls ? this.maxValue : this.minValue,
      END: this.viewOptions.reversedControls ? this.minValue : this.maxValue,
    };
    // right to left means swapping right and left arrows
    if (this.viewOptions.rightToLeft) {
      actions.LEFT = increaseStep;
      actions.RIGHT = decreaseStep;
      // right to left and vertical means we also swap up and down
      if (this.viewOptions.vertical) {
        actions.UP = decreaseStep;
        actions.DOWN = increaseStep;
      }
    }
    return actions;
  }

  private onKeyboardEvent(event: KeyboardEvent): void {
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
    }

    const newValue = this.roundStep(this.sanitizeValue(action));
    if (!this.viewOptions.draggableRangeOnly) {
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
  private onDragStart(pointer: SliderElement, ref: HandleType, event: MouseEvent|TouchEvent): void {
    const position = this.getEventPosition(event);

    this.dragging = new Dragging();
    this.dragging.active = true;
    this.dragging.value = this.positionToValue(position);
    this.dragging.difference = this.viewHighValue - this.viewLowValue;
    this.dragging.lowLimit = this.viewOptions.rightToLeft
        ? this.minHElem.position - position
        : position - this.minHElem.position;
    this.dragging.highLimit = this.viewOptions.rightToLeft
        ? position - this.maxHElem.position
        : this.maxHElem.position - position;

    this.onStart(pointer, ref, event);
  }

  /// getValue helper function, gets max or min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
  private getValue(type: string, newPos: number, outOfBounds: boolean, isAbove: boolean): number {
    const isRTL = this.viewOptions.rightToLeft;
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

  private onDragMove(pointer: SliderElement, event?: MouseEvent|TouchEvent): void {
    const newPos = this.getEventPosition(event);

    let ceilLimit: number, flrLimit: number, flrHElem: SliderElement, ceilHElem: SliderElement;
    if (this.viewOptions.rightToLeft) {
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
      if (flrHElem.position === 0) {
        return;
      }
      newMinValue = this.getValue('min', newPos, true, false);
      newMaxValue = this.getValue('max', newPos, true, false);
    } else if (isOverCeilLimit) {
      if (ceilHElem.position === this.maxPos) {
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
  private positionTrackingBar(newMinValue: number, newMaxValue: number): void {
    if (this.viewOptions.minLimit != null &&
        newMinValue < this.viewOptions.minLimit) {
      newMinValue = this.viewOptions.minLimit;
      newMaxValue = newMinValue + this.dragging.difference;
    }
    if (this.viewOptions.maxLimit != null &&
        newMaxValue > this.viewOptions.maxLimit) {
      newMaxValue = this.viewOptions.maxLimit;
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
  private positionTrackingHandle(newValue: number): void {
    let valueChanged = false;
    newValue = this.applyMinMaxLimit(newValue);
    if (this.range) {
      if (this.viewOptions.pushRange) {
        newValue = this.applyPushRange(newValue);
        valueChanged = true;
      } else {
        if (this.viewOptions.noSwitching) {
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
          this.updateHandles(HandleType.Low, this.maxHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.High;
          this.minHElem.removeClass('rz-active');
          this.maxHElem.addClass('rz-active');
          if (this.viewOptions.keyboardSupport) {
            this.focusElement(this.maxHElem);
          }
          valueChanged = true;
        } else if (this.tracking === HandleType.High &&
                   newValue < this.viewLowValue) {
          this.viewHighValue = this.viewLowValue;
          this.applyHighValue();
          this.applyModel();
          this.updateHandles(HandleType.High, this.minHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.Low;
          this.maxHElem.removeClass('rz-active');
          this.minHElem.addClass('rz-active');
          if (this.viewOptions.keyboardSupport) {
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
    if (this.viewOptions.minLimit != null && newValue < this.viewOptions.minLimit) {
      return this.viewOptions.minLimit;
    }
    if (this.viewOptions.maxLimit != null && newValue > this.viewOptions.maxLimit) {
      return this.viewOptions.maxLimit;
    }
    return newValue;
  }

  private applyMinMaxRange(newValue: number): number {
    const oppositeValue = this.tracking === HandleType.Low ? this.viewHighValue : this.viewLowValue;
    const difference = Math.abs(newValue - oppositeValue);
    if (this.viewOptions.minRange != null) {
      if (difference < this.viewOptions.minRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewHighValue - this.viewOptions.minRange;
        } else {
          return this.viewLowValue + this.viewOptions.minRange;
        }
      }
    }
    if (this.viewOptions.maxRange != null) {
      if (difference > this.viewOptions.maxRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewHighValue - this.viewOptions.maxRange;
        } else {
          return this.viewLowValue + this.viewOptions.maxRange;
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
        this.viewOptions.minRange !== null
          ? this.viewOptions.minRange
          : this.viewOptions.step;
    const maxRange = this.viewOptions.maxRange;
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

  private applyModel(): void {
    this.internalChange = true;

    this.valueChange.emit(this.value);
    this.highValueChange.emit(this.highValue);

    this.internalChange = false;
  }
}
