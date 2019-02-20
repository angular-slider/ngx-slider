import {
  Component,
  OnInit,
  Directive,
  ViewChild,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  HostBinding,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  ContentChild,
  TemplateRef,
  ChangeDetectorRef,
  SimpleChanges,
  forwardRef
} from '@angular/core';

import {
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

import detectPassiveEvents from 'detect-passive-events';

import {
  Options,
  GetLegendFunction,
  LabelType,
  TranslateFunction,
  ValueToPositionFunction,
  PositionToValueFunction,
  CustomStepDefinition,
  CombineLabelsFunction,
} from './options';

import { PointerType } from './pointer-type';
import { ChangeContext } from './change-context';

import { ValueHelper } from './value-helper';

import { JqLiteWrapper } from './jq-lite-wrapper';

import { ThrottledFunc } from './throttled-func';
import { CompatibilityHelper } from './compatibility-helper';
import { MathHelper } from './math-helper';

export class Tick {
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

enum HandleLabelType {
  Min,
  Max
}

// TODO: slowly rewrite to angular
export class SliderElement extends JqLiteWrapper {
  position: number = 0;
  value: string; // TODO: this only applies to label elements; it should be moved to the specific directives where it's used
  dimension: number;
  alwaysHide: boolean = false;

  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderRightOutSelElem]'})
export class RightOutSelDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderLeftOutSelElem]'})
export class LeftOutSelDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderFullBarElem]'})
export class FullBarDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderSelBarElem]'})
export class SelBarDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderMinHElem]'})
export class MinHDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderMaxHElem]'})
export class MaxHDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderFlrLabElem]'})
export class FlrLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderCeilLabElem]'})
export class CeilLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderMinLabElem]'})
export class MinLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderMaxLabElem]'})
export class MaxLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderCmbLabElem]'})
export class CmbLabDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

@Directive({selector: '[ng5SliderTicksElem]'})
export class TicksDirective extends SliderElement {
  constructor(elemRef: ElementRef, renderer: Renderer2) {
    super(elemRef, renderer);
  }
}

const NG5_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => SliderComponent),
  multi: true,
};


@Component({
  selector: 'ng5-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  host: { class: 'ng5-slider' },
  providers: [NG5_SLIDER_CONTROL_VALUE_ACCESSOR]
})
export class SliderComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  // Model for low value slider. If only value is provided single slider will be rendered.
  private _value: number;
  @Input() set value(newValue: number) {
    this._value = +newValue;
  }
  get value(): number {
     return this._value;
  }
  // Output for low value slider to support two-way bindings
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  // Model for high value slider. Providing both value and highValue will render range slider.
  private _highValue: number;
  @Input() set highValue(newHighValue: number) {
    this._highValue = +newHighValue;
  }
  get highValue(): number {
     return this._highValue;
  }
  // Output for high value slider to support two-way bindings
  @Output() highValueChange: EventEmitter<number> = new EventEmitter();

  // Event emitted when user starts interaction with the slider
  @Output() userChangeStart: EventEmitter<ChangeContext> = new EventEmitter();

  // Event emitted on each change coming from user interaction
  @Output() userChange: EventEmitter<ChangeContext> = new EventEmitter();

  // Event emitted when user finishes interaction with the slider
  @Output() userChangeEnd: EventEmitter<ChangeContext> = new EventEmitter();

  // An object with all the other options of the slider.
  // Each option can be updated at runtime and the slider will automatically be re-rendered.
  private _options: Options = new Options();
  @Input() set options(newOptions: Options) {
    this._options = newOptions;
  }
  get options(): Options {
     return this._options;
  }

  private manualRefreshSubscription: any;
  // Input event that triggers slider refresh (re-positioning of slider elements)
  @Input() set manualRefresh(manualRefresh: EventEmitter<void>) {
    this.unsubscribeManualRefresh();

    this.manualRefreshSubscription = manualRefresh.subscribe(() => {
      setTimeout(() =>  this.calcViewDimensions());
    });
  }

  // Options synced to model options, based on defaults
  private viewOptions: Options = new Options();
  // Low value synced to model low value
  private viewLowValue: number;
  // High value synced to model high value
  private viewHighValue: number;

  public barStyle: any = {};
  public minPointerStyle: any = {};
  public maxPointerStyle: any = {};
  public showTicks: boolean = false;
  public ticks: Tick[] = [];

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

  // Optional custom template for displaying tooltips
  @ContentChild('tooltipTemplate')
  public tooltipTemplate: TemplateRef<any>;

  @HostBinding('class.ng5-slider-vertical')
  public sliderElementVerticalClass: boolean = false;

  @HostBinding('attr.disabled')
  public sliderElementDisabledAttr: string = null;

  // Slider type, true means range slider
  get range(): boolean {
    return this.value !== undefined && this.highValue !== undefined;
  }

  // Values recorded when first dragging the bar
  private dragging: Dragging = new Dragging();

  // Half of the width or height of the slider handles
  private handleHalfDim: number = 0;

  // Maximum position the slider handle can have
  private maxPos: number = 0;

  // Precision limit
  private precisionLimit: number = 12;

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

  // Internal flag to keep track of the visibility of combo label
  private cmbLabelShown: boolean = false;

  // Internal variable to keep track of the focus element
  private currentFocusElement: {pointer: SliderElement, ref: HandleType} = null;

  private barDimension: number;

  private translate: TranslateFunction;
  private combineLabels: CombineLabelsFunction;
  private getLegend: GetLegendFunction;

  private thrOnLowHandleChange: ThrottledFunc;
  private thrOnHighHandleChange: ThrottledFunc;

  private isDragging: boolean;
  private touchId: number;

  private onMoveUnsubscribe: () => void = null;
  private onEndUnsubscribe: () => void = null;

  private onTouchedCallback: (value: any) => void = null;
  private onChangeCallback: (value: any) => void = null;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.viewOptions = new Options();
    Object.assign(this.viewOptions, this.options);

    // We need to run these two things first, before the rest of the init in ngAfterViewInit(),
    // because these two settings are set through @HostBinding and Angular change detection
    // mechanism doesn't like them changing in ngAfterViewInit()
    this.setDisabledStateAttr();
    this.setVerticalClass();
  }

  ngAfterViewInit(): void {
    this.thrOnLowHandleChange = new ThrottledFunc((): void => { this.onLowHandleChange(); }, this.viewOptions.interval);
    this.thrOnHighHandleChange = new ThrottledFunc((): void => { this.onHighHandleChange(); }, this.viewOptions.interval);

    this.applyOptions();
    this.syncLowValue();

    if (this.range) {
      this.syncHighValue();
    }

    this.manageElementsStyle();
    this.setDisabledStateAttr();
    this.calcViewDimensions();
    this.setMinAndMax();
    this.addAccessibility();
    this.updateCeilLab();
    this.updateFloorLab();
    this.initHandles();
    this.manageEventsBindings();

    this.initHasRun = true;

    // In some cases, the starting model values are actually outside valid range, so we need to fix this
    if (this.value !== this.viewLowValue || (this.range && this.highValue !== this.viewHighValue)) {
      setTimeout(() => this.applyModel(false));
    }

    // Run change detection manually to resolve some issues when init procedure changes values used in the view
    this.changeDetectionRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Always apply options first
    if (changes.options) {
      this.onChangeOptions(changes.options.previousValue, changes.options.currentValue);
    }

    // Then value changes
    if (changes.value) {
      this.onChangeValue(changes.value.previousValue, changes.value.currentValue);
    }

    if (changes.highValue) {
      this.onChangeHighValue(changes.highValue.previousValue, changes.highValue.currentValue);
    }
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
    if (!this.initHasRun || newValue === oldValue) {
      return;
    }

    this.thrOnLowHandleChange.call();
  }

  onChangeHighValue(oldValue: number, newValue: number): void {
    if (!this.initHasRun || newValue === oldValue) {
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
  onResize(event: any): void {
    this.calcViewDimensions();
  }

  ngOnDestroy(): void {
    this.unsubscribeManualRefresh();
    this.unbindEvents();
    this.currentFocusElement = null;
  }


  // ControlValueAccessor interface
  writeValue(obj: any): void {
    if (obj instanceof Array) {

      const oldValue: number = this.value;
      const oldHighValue: number = this.highValue;

      this.value = obj[0];
      this.highValue = obj[1];

      // We have to manually invoke change handlers since ngOnChanges() will not be called
      this.onChangeValue(oldValue, this.value);
      this.onChangeHighValue(oldHighValue, this.highValue);
    } else {
      const oldValue: number = this.value;

      this.value = obj;

      // We have to manually invoke change handler since ngOnChanges() will not be called
      this.onChangeValue(oldValue, this.value);
    }
  }

  registerOnChange(onChangeCallback: any): void {
    this.onChangeCallback = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: any): void {
    this.onTouchedCallback = onTouchedCallback;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.viewOptions) {
      this.viewOptions.disabled = isDisabled;
      this.setDisabledStateAttr();
    }
  }


  private unsubscribeManualRefresh(): void {
    if (this.manualRefreshSubscription) {
      this.manualRefreshSubscription.unsubscribe();
      this.manualRefreshSubscription = null;
    }
  }

  private getCurrentTrackingValue(): number {
    if (this.tracking === null) {
      return null;
    }

    return this.tracking === HandleType.Low ? this.viewLowValue : this.viewHighValue;
  }

  private syncLowValue(): void {
    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
        this.viewLowValue = ValueHelper.findStepIndex(this.value, this.viewOptions.stepsArray);
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
        this.viewHighValue = ValueHelper.findStepIndex(this.highValue, this.viewOptions.stepsArray);
      } else {
        this.viewHighValue = this.highValue;
      }
    } else {
      this.viewHighValue = this.highValue;
    }
  }

  private getStepValue(sliderValue: number): number {
    const step: CustomStepDefinition = this.viewOptions.stepsArray[sliderValue];
    return step.value;
  }

  private applyLowValue(): void {
    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
        this.value = this.getStepValue(this.viewLowValue);
      } else {
        this.value = this.viewLowValue;
      }
    } else {
      this.value = this.viewLowValue;
    }
  }

  private applyHighValue(): void {
    if (this.viewOptions.stepsArray) {
      if (!this.viewOptions.bindIndexForStepsArray) {
        this.highValue = this.getStepValue(this.viewHighValue);
      } else {
        this.highValue = this.viewHighValue;
      }
    } else {
      this.highValue = this.viewHighValue;
    }
  }

  // Reflow the slider when the low handle changes (called with throttle)
  private onLowHandleChange(): void {
    this.normaliseLowValue();
    if (this.range) {
      this.normaliseRange(PointerType.Min);
    }
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
    this.normaliseHighValue();
    this.normaliseRange(PointerType.Max);
    this.syncLowValue();
    this.syncHighValue();
    this.setMinAndMax();
    this.updateHighHandle(this.valueToPosition(this.viewHighValue));
    this.updateSelectionBar();
    this.updateTicksScale();
    this.updateCmbLabel();
    this.updateAriaAttributes();
  }

  // Make sure the low value is in allowed range
  private normaliseLowValue(): void {
    if (this.viewOptions.stepsArray) {
      return;
    }

    const normalisedValue: number = MathHelper.clampToRange(this.value, this.viewOptions.floor, this.viewOptions.ceil);
    if (this.value !== normalisedValue) {
      this.value = normalisedValue;

      // Push the value out, too
      setTimeout(() => this.applyModel(false));
    }
  }

  // Make sure high value is in allowed range
  private normaliseHighValue(): void {
    if (this.viewOptions.stepsArray) {
      return;
    }

    const normalisedHighValue: number = MathHelper.clampToRange(this.highValue, this.viewOptions.floor, this.viewOptions.ceil);
    if (this.highValue !== normalisedHighValue) {
      this.highValue = normalisedHighValue;

      // Push the value out, too
      setTimeout(() => this.applyModel(false));
    }
  }

  // Make sure that range slider invariant (value <= highValue) is always satisfied
  private normaliseRange(changedPointer: PointerType): void {
    if (this.viewOptions.stepsArray) {
      return;
    }

    if (this.range && this.value > this.highValue) {
      // Depending on noSwitching, either swap values, or make them the same
      if (this.viewOptions.noSwitching) {
        if (changedPointer === PointerType.Max) {
          this.highValue = this.value;
        } else if (changedPointer === PointerType.Min) {
          this.value = this.highValue;
        }

        // Push the values out, too
        setTimeout(() => this.applyModel(false));
      } else {
        const tempValue: number = this.value;
        this.value = this.highValue;
        this.highValue = tempValue;

        // Since we are changing both pointers at the same time, we need to invoke
        // the change callback for the other pointer, too.
        if (changedPointer === PointerType.Max) {
          setTimeout(() => this.thrOnLowHandleChange.call());
        } else if (changedPointer === PointerType.Min) {
          setTimeout(() => this.thrOnHighHandleChange.call());
        }

        // Push the values out, too
        setTimeout(() => this.applyModel(false));
      }
    }
  }

  // Read the user options and apply them to the slider model
  private applyOptions(): void {
    this.viewOptions = new Options();
    Object.assign(this.viewOptions, this.options);

    if (this.viewOptions.precisionLimit) {
      this.precisionLimit = this.viewOptions.precisionLimit;
    }

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
        this.translate = this.viewOptions.translate;
      } else {
        this.translate = (value: number): string => String(value);
      }

      this.getLegend = this.viewOptions.getLegend;
    }

    if (this.viewOptions.combineLabels) {
      this.combineLabels = this.viewOptions.combineLabels;
    } else {
      this.combineLabels = (minValue: string, maxValue: string): string => {
        return minValue + ' - ' + maxValue;
      };
    }
  }

  private parseStepsArray(): void {
    this.viewOptions.floor = 0;
    this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
    this.viewOptions.step = 1;

    if (this.viewOptions.translate) {
      this.translate = this.viewOptions.translate;
    } else {
      this.translate = (modelValue: number): string => {
        if (this.viewOptions.bindIndexForStepsArray) {
          return String(this.getStepValue(modelValue));
        }
        return String(modelValue);
      };
    }

    this.getLegend = (index: number): string => {
      const step: CustomStepDefinition = this.viewOptions.stepsArray[index];
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
    this.setDisabledStateAttr();
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

    const hideLabelsForTicks: boolean = this.viewOptions.showTicksValues && !this.intermediateTicks;
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
      this.fullBarElem.addClass('ng5-slider-transparent');
    }

    if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
      this.setVerticalClass();
      // The above change in host component class will not be applied until the end of this cycle
      // However, functions calculating the slider position expect the slider to be already styled as vertical
      // So as a workaround, we need to reset the slider once again to compute the correct values
      setTimeout((): void => { this.resetSlider(); });
    }

    if (this.viewOptions.draggableRange) {
      this.selBarElem.addClass('ng5-slider-draggable');
    } else {
      this.selBarElem.removeClass('ng5-slider-draggable');
    }

    if (this.intermediateTicks && this.options.showTicksValues) {
      this.ticksElem.addClass('ng5-slider-ticks-values-under');
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
  private setDisabledStateAttr(): void {
    this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
  }

  // Set vertical class based on vertical option
  private setVerticalClass(): void {
    this.sliderElementVerticalClass = this.viewOptions.vertical;
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

  // Set label value and recalculate label dimensions
  private setLabelValue(value: string, label: SliderElement): void {
    let recalculateDimension: boolean = false;
    const noLabelInjection: boolean = label.hasClass('no-label-injection');

    if (!label.alwaysHide &&
        (label.value === undefined ||
         label.value.length !== value.length ||
         (label.value.length > 0 && label.dimension === 0))) {
      recalculateDimension = true;
      label.value = value;
    }

    if (!noLabelInjection) {
      label.html(value);
    }

    // Update width only when length of the label have changed
    if (recalculateDimension) {
      this.calculateElementDimension(label);
    }
  }

  // Set maximum and minimum values for the slider and ensure the model and high value match these limits
  private setMinAndMax(): void {
    this.step = +this.viewOptions.step;

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
    this.minHElem.attr('aria-valuetext', this.translate(this.value, LabelType.Low));
    this.minHElem.attr('aria-valuemin', this.minValue.toString());
    this.minHElem.attr('aria-valuemax', this.maxValue.toString());

    if (this.range) {
      this.maxHElem.attr('aria-valuenow', this.highValue.toString());
      this.maxHElem.attr('aria-valuetext', this.translate(this.highValue, LabelType.High));
      this.maxHElem.attr('aria-valuemin', this.minValue.toString());
      this.maxHElem.attr('aria-valuemax', this.maxValue.toString());
    }
  }

  // Calculate dimensions that are dependent on view port size
  // Run once during initialization and every time view port changes size.
  private calcViewDimensions(): void {
    if (this.viewOptions.handleDimension) {
      this.minHElem.dimension = this.viewOptions.handleDimension;
    } else {
      this.calculateElementDimension(this.minHElem);
    }

    const handleWidth: number = this.minHElem.dimension;

    this.handleHalfDim = handleWidth / 2;

    if (this.viewOptions.barDimension) {
      this.fullBarElem.dimension = this.viewOptions.barDimension;
    } else {
      this.calculateElementDimension(this.fullBarElem);
    }

    this.barDimension = this.fullBarElem.dimension;

    this.maxPos = this.barDimension - handleWidth;

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

    const ticksArray: number[] = this.viewOptions.ticksArray || this.getTicksArray();
    const translate: string = this.viewOptions.vertical ? 'translateY' : 'translateX';

    if (this.viewOptions.rightToLeft) {
      ticksArray.reverse();
    }

    this.ticks = ticksArray.map((value: number): Tick => {
      let position: number = this.valueToPosition(value);

      if (this.viewOptions.vertical) {
        position = this.maxPos - position;
      }

      const translation: string = translate + '(' + Math.round(position) + 'px)';
      const tick: Tick = new Tick();
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
        tick.value = this.getDisplayValue(value, LabelType.TickValue);
        if (this.viewOptions.ticksValuesTooltip) {
          tick.valueTooltip = this.viewOptions.ticksValuesTooltip(value);
          tick.valueTooltipPlacement = this.viewOptions.vertical
            ? 'right'
            : 'top';
        }
      }
      if (this.getLegend) {
        const legend: string = this.getLegend(value);
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
    for (let value: number = this.minValue; value <= this.maxValue; value += step) {
      ticksArray.push(value);
    }
    return ticksArray;
  }

  private isTickSelected(value: number): boolean {
    if (!this.range) {
      if (this.viewOptions.showSelectionBarFromValue !== null) {
        const center: number = this.viewOptions.showSelectionBarFromValue;
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
    if (!this.flrLabElem.alwaysHide) {
      this.setLabelValue(this.getDisplayValue(this.minValue, LabelType.Floor), this.flrLabElem);
      this.calculateElementDimension(this.flrLabElem);
      const position: number = this.viewOptions.rightToLeft
        ? this.barDimension - this.flrLabElem.dimension
        : 0;
      this.setPosition(this.flrLabElem, position);
    }
  }

  // Update position of the ceiling label
  private updateCeilLab(): void {
    if (!this.ceilLabElem.alwaysHide) {
      this.setLabelValue(this.getDisplayValue(this.maxValue, LabelType.Ceil), this.ceilLabElem);
      this.calculateElementDimension(this.ceilLabElem);
      const position: number = this.viewOptions.rightToLeft
        ? 0
        : this.barDimension - this.ceilLabElem.dimension;
      this.setPosition(this.ceilLabElem, position);
    }
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
  private getHandleLabelPos(labelType: HandleLabelType, newPos: number): number {
    const labelDimension: number = labelType === HandleLabelType.Min ? this.minLabElem.dimension : this.maxLabElem.dimension;
    const nearHandlePos: number = newPos - labelDimension / 2 + this.handleHalfDim;
    const endOfBarPos: number = this.barDimension - labelDimension;

    if (!this.viewOptions.boundPointerLabels) {
      return nearHandlePos;
    }

    if ((this.viewOptions.rightToLeft && labelType === HandleLabelType.Min) ||
       (!this.viewOptions.rightToLeft && labelType === HandleLabelType.Max)) {
      return Math.min(nearHandlePos, endOfBarPos);
    } else {
      return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
    }
  }

  // Update low slider handle position and label
  private updateLowHandle(newPos: number): void {
    this.setPosition(this.minHElem, newPos);
    this.setLabelValue(this.getDisplayValue(this.viewLowValue, LabelType.Low), this.minLabElem);
    this.setPosition(
      this.minLabElem,
      this.getHandleLabelPos(HandleLabelType.Min, newPos)
    );

    if (this.viewOptions.getPointerColor) {
      const pointercolor: string = this.getPointerColor(PointerType.Min);
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
    this.setLabelValue(this.getDisplayValue(this.viewHighValue, LabelType.High), this.maxLabElem);
    this.setPosition(
      this.maxLabElem,
      this.getHandleLabelPos(HandleLabelType.Max, newPos)
    );

    if (this.viewOptions.getPointerColor) {
      const pointercolor: string = this.getPointerColor(PointerType.Max);
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
    let flHidden: boolean = false;
    let clHidden: boolean = false;
    const isMinLabAtFloor: boolean = this.isLabelBelowFloorLab(this.minLabElem);
    const isMinLabAtCeil: boolean = this.isLabelAboveCeilLab(this.minLabElem);
    const isMaxLabAtCeil: boolean = this.isLabelAboveCeilLab(this.maxLabElem);
    const isCmbLabAtFloor: boolean = this.isLabelBelowFloorLab(this.cmbLabElem);
    const isCmbLabAtCeil: boolean = this.isLabelAboveCeilLab(this.cmbLabElem);

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
      const hideCeil: boolean = this.cmbLabelShown ? isCmbLabAtCeil : isMaxLabAtCeil;
      const hideFloor: boolean = this.cmbLabelShown
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
    const isRTL: boolean = this.viewOptions.rightToLeft;
    const pos: number = label.position;
    const dim: number = label.dimension;
    const floorPos: number = this.flrLabElem.position;
    const floorDim: number = this.flrLabElem.dimension;
    return isRTL
      ? pos + dim >= floorPos - 2
      : pos <= floorPos + floorDim + 2;
  }

  private isLabelAboveCeilLab(label: SliderElement): boolean {
    const isRTL: boolean = this.viewOptions.rightToLeft;
    const pos: number = label.position;
    const dim: number = label.dimension;
    const ceilPos: number = this.ceilLabElem.position;
    const ceilDim: number = this.ceilLabElem.dimension;
    return isRTL ? pos <= ceilPos + ceilDim + 2 : pos + dim >= ceilPos - 2;
  }

  // Update slider selection bar, combined label and range label
  private updateSelectionBar(): void {
    let position: number = 0;
    let dimension: number = 0;
    const isSelectionBarFromRight: boolean = this.viewOptions.rightToLeft
        ? !this.viewOptions.showSelectionBarEnd
        : this.viewOptions.showSelectionBarEnd;
    const positionForRange: number = this.viewOptions.rightToLeft
        ? this.maxHElem.position + this.handleHalfDim
        : this.minHElem.position + this.handleHalfDim;

    if (this.range) {
      dimension = Math.abs(this.maxHElem.position - this.minHElem.position);
      position = positionForRange;
    } else {
      if (this.viewOptions.showSelectionBarFromValue !== null) {
        const center: number = this.viewOptions.showSelectionBarFromValue;
        const centerPosition: number = this.valueToPosition(center);
        const isModelGreaterThanCenter: boolean = this.viewOptions.rightToLeft
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
        dimension = Math.ceil(Math.abs(this.maxPos - this.minHElem.position) + this.handleHalfDim);
        position = Math.floor(this.minHElem.position + this.handleHalfDim);
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
      const color: string = this.getSelectionBarColor();
      this.barStyle = {
        backgroundColor: color,
      };
    } else if (this.viewOptions.selectionBarGradient) {
      const offset: number = this.viewOptions.showSelectionBarFromValue !== null
            ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
            : 0;
      const reversed: boolean = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
      const direction: string = this.viewOptions.vertical
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
  private getPointerColor(pointerType: PointerType): string {
    if (pointerType === PointerType.Max) {
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
    let isLabelOverlap: boolean = null;
    if (this.viewOptions.rightToLeft) {
      isLabelOverlap =
        this.minLabElem.position - this.minLabElem.dimension - 10 <= this.maxLabElem.position;
    } else {
      isLabelOverlap =
        this.minLabElem.position + this.minLabElem.dimension + 10 >= this.maxLabElem.position;
    }

    if (isLabelOverlap) {
      const lowTr: string = this.getDisplayValue(this.viewLowValue, LabelType.Low);
      const highTr: string = this.getDisplayValue(this.viewHighValue, LabelType.High);
      const labelVal: string = this.viewOptions.rightToLeft
        ? this.combineLabels(highTr, lowTr)
        : this.combineLabels(lowTr, highTr);

      this.setLabelValue(labelVal, this.cmbLabElem);
      const pos: number = this.viewOptions.boundPointerLabels
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
  private getDisplayValue(value: number, which: LabelType): string {
    if (this.viewOptions.stepsArray && !this.viewOptions.bindIndexForStepsArray) {
      value = this.getStepValue(value);
    }
    return this.translate(value, which);
  }

  // Round value to step and precision based on minValue
  private roundStep(value: number, customStep?: number): number {
    const step: number = customStep ? customStep : this.step;
    let steppedDifference: number = MathHelper.roundToPrecisionLimit((value - this.minValue) / step, this.precisionLimit);
    steppedDifference = Math.round(steppedDifference) * step;
    return MathHelper.roundToPrecisionLimit(this.minValue + steppedDifference, this.precisionLimit);
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
    if (this.viewOptions.vertical) {
      elem.css('bottom', Math.round(pos) + 'px');
    } else {
      elem.css('left', Math.round(pos) + 'px');
    }
  }

  // Calculate element's width/height depending on whether slider is horizontal or vertical
  private calculateElementDimension(elem: SliderElement): void {
    const val: ClientRect = elem.getBoundingClientRect();
    if (this.viewOptions.vertical) {
      elem.dimension = (val.bottom - val.top) * this.viewOptions.scale;
    } else {
      elem.dimension = (val.right - val.left) * this.viewOptions.scale;
    }
  }

  // Set element width/height depending on whether slider is horizontal or vertical
  private setDimension(elem: SliderElement, dim: number): number {
    elem.dimension = dim;
    if (this.viewOptions.vertical) {
      elem.css('height', Math.round(dim) + 'px');
    } else {
      elem.css('width', Math.round(dim) + 'px');
    }
    return dim;
  }

  // Returns a value that is within slider range
  private sanitizeValue(val: number): number {
    return Math.min(Math.max(val, this.minValue), this.maxValue);
  }

  // Translate value to pixel position
  private valueToPosition(val: number): number {
    let fn: ValueToPositionFunction  = ValueHelper.linearValueToPosition;
    if (this.viewOptions.customValueToPosition) {
      fn = this.viewOptions.customValueToPosition;
    } else if (this.viewOptions.logScale) {
      fn = ValueHelper.logValueToPosition;
    }

    val = this.sanitizeValue(val);
    let percent: number = fn(val, this.minValue, this.maxValue) || 0;
    if (this.viewOptions.rightToLeft) {
      percent = 1 - percent;
    }
    return percent * this.maxPos;
  }

  // Translate position to model value
  private positionToValue(position: number): number {
    let percent: number = position / this.maxPos;
    if (this.viewOptions.rightToLeft) {
      percent = 1 - percent;
    }
    let fn: PositionToValueFunction = ValueHelper.linearPositionToValue;
    if (this.viewOptions.customPositionToValue) {
      fn = this.viewOptions.customPositionToValue;
    } else if (this.viewOptions.logScale) {
      fn = ValueHelper.logPositionToValue;
    }
    return fn(percent, this.minValue, this.maxValue) || 0;
  }

  // Get the X-coordinate or Y-coordinate of an event
  private getEventXY(event: MouseEvent|TouchEvent, targetTouchId: number): number {
    if (event instanceof MouseEvent) {
      return this.viewOptions.vertical ? event.clientY : event.clientX;
    }

    let touchIndex: number = 0;
    const touches: TouchList = event.touches;
    if (targetTouchId !== undefined) {
      for (let i: number = 0; i < touches.length; i++) {
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
    const sliderElementBoundingRect: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();

    const sliderPos: number = this.viewOptions.vertical ?
      sliderElementBoundingRect.bottom : sliderElementBoundingRect.left;
    let eventPos: number = 0;
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

    const position: number = this.getEventPosition(event);
    const distanceMin: number = Math.abs(position - this.minHElem.position);
    const distanceMax: number = Math.abs(position - this.maxHElem.position);

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
    const draggableRange: boolean = this.viewOptions.draggableRange;

    if (!this.viewOptions.onlyBindHandles) {
      this.selBarElem.on('mousedown', (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true, true));
    }

    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.on('mousedown', (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true));
      this.maxHElem.on('mousedown', (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true));
    } else {
      this.minHElem.on('mousedown', (event: MouseEvent): void => this.onStart(this.minHElem, HandleType.Low, event, true, true));

      if (this.range) {
        this.maxHElem.on('mousedown', (event: MouseEvent): void => this.onStart(this.maxHElem, HandleType.High, event, true, true));
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.on('mousedown', (event: MouseEvent): void => { this.onStart(null, null, event, true, true, true); });
        this.ticksElem.on('mousedown', (event: MouseEvent): void => { this.onStart(null, null, event, true, true, true, true); });
      }
    }

    if (!this.viewOptions.onlyBindHandles) {
      this.selBarElem.onPassive('touchstart', (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true));
    }
    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.onPassive('touchstart', (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true));
      this.maxHElem.onPassive('touchstart', (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true));
    } else {
      this.minHElem.onPassive('touchstart', (event: TouchEvent): void => this.onStart(this.minHElem, HandleType.Low, event, true, true));
      if (this.range) {
        this.maxHElem.onPassive('touchstart', (event: TouchEvent): void => this.onStart(this.maxHElem, HandleType.High, event, true, true));
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.onPassive('touchstart', (event: TouchEvent): void => this.onStart(null, null, event, true, true, true));
        this.ticksElem.onPassive('touchstart', (event: TouchEvent): void => this.onStart(null, null, event, false, false, true, true));
      }
    }

    if (this.viewOptions.keyboardSupport) {
      this.minHElem.on('focus', (): void => this.onPointerFocus(this.minHElem, HandleType.Low));
      if (this.range) {
        this.maxHElem.on('focus', (): void => this.onPointerFocus(this.maxHElem, HandleType.High));
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

  private onBarStart(draggableRange: boolean, pointer: SliderElement, event: MouseEvent|TouchEvent,
    bindMove: boolean, bindEnd: boolean, simulateImmediateMove?: boolean, simulateImmediateEnd?: boolean): void {
    if (draggableRange) {
      this.onDragStart(pointer, HandleType.High, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
    } else {
      this.onStart(pointer, HandleType.Low, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
    }
  }

  // onStart event handler
  private onStart(pointer: SliderElement, ref: HandleType, event: MouseEvent|TouchEvent,
      bindMove: boolean, bindEnd: boolean, simulateImmediateMove?: boolean, simulateImmediateEnd?: boolean): void {
    let moveEvent: string = '';
    let endEvent: string = '';

    if (CompatibilityHelper.isTouchEvent(event)) {
      moveEvent = 'touchmove';
      endEvent = 'touchend';
    } else {
      moveEvent = 'mousemove';
      endEvent = 'mouseup';
    }

    event.stopPropagation();
    // Only call preventDefault() when handling non-passive events (passive events don't need it)
    if (!CompatibilityHelper.isTouchEvent(event) || !detectPassiveEvents.hasSupport) {
      event.preventDefault();
    }

    // We have to do this in case the HTML where the sliders are on
    // have been animated into view.
    this.calcViewDimensions();

    if (pointer) {
      this.tracking = ref;
    } else {
      pointer = this.getNearestHandle(event);
      this.tracking = pointer === this.minHElem ? HandleType.Low : HandleType.High;
    }

    pointer.addClass('ng5-slider-active');

    if (this.viewOptions.keyboardSupport) {
      this.focusElement(pointer);
    }

    if (bindMove) {
      const ehMove: ((e: MouseEvent|TouchEvent) => void) =
        (e: MouseEvent|TouchEvent): void => this.dragging.active ? this.onDragMove(pointer, e) : this.onMove(pointer, e);

      if (this.onMoveUnsubscribe !== null) {
        this.onMoveUnsubscribe();
      }
      this.onMoveUnsubscribe = this.renderer.listen('document', moveEvent, ehMove);
    }

    if (bindEnd) {
      const ehEnd: ((e: MouseEvent|TouchEvent) => void) =
        (e: MouseEvent|TouchEvent): void => this.onEnd(e);
      if (this.onEndUnsubscribe !== null) {
        this.onEndUnsubscribe();
      }
      this.onEndUnsubscribe = this.renderer.listen('document', endEvent, ehEnd);
    }

    this.userChangeStart.emit(this.getChangeContext());

    if (CompatibilityHelper.isTouchEvent(event) && (event as TouchEvent).changedTouches) {
      // Store the touch identifier
      if (!this.touchId) {
        this.isDragging = true;
        this.touchId = (event as TouchEvent).changedTouches[0].identifier;
      }
    }

    // Click events, either with mouse or touch gesture are weird. Sometimes they result in full
    // start, move, end sequence, and sometimes, they don't - they only invoke mousedown
    // As a workaround, we simulate the first move event and the end event if it's necessary
    if (simulateImmediateMove) {
      this.onMove(pointer, event, true);
    }

    if (simulateImmediateEnd) {
      this.onEnd(event);
    }
  }

  // onMove event handler
  private onMove(pointer: SliderElement, event: MouseEvent|TouchEvent, fromTick?: boolean): void {
    let touchForThisSlider: Touch;

    if (CompatibilityHelper.isTouchEvent(event)) {
      const changedTouches: TouchList = (event as TouchEvent).changedTouches;
      for (let i: number = 0; i < changedTouches.length; i++) {
        if (changedTouches[i].identifier === this.touchId) {
          touchForThisSlider = changedTouches[i];
          break;
        }
      }

      if (!touchForThisSlider) {
        return;
      }
    }

    const newPos: number = this.getEventPosition(
        event,
        touchForThisSlider ? touchForThisSlider.identifier : undefined
      );
    let newValue: number;
    const ceilValue: number = this.viewOptions.rightToLeft
        ? this.minValue
        : this.maxValue;
    const flrValue: number = this.viewOptions.rightToLeft ? this.maxValue : this.minValue;

    if (newPos <= 0) {
      newValue = flrValue;
    } else if (newPos >= this.maxPos) {
      newValue = ceilValue;
    } else {
      newValue = this.positionToValue(newPos);
      if (fromTick && this.viewOptions.tickStep !== null) {
        newValue = this.roundStep(newValue, this.viewOptions.tickStep);
      } else {
        newValue = this.roundStep(newValue);
      }
    }
    this.positionTrackingHandle(newValue);
  }

  private onEnd(event: MouseEvent|TouchEvent): void {
    if (CompatibilityHelper.isTouchEvent(event)) {
      const changedTouches: TouchList = (event as TouchEvent).changedTouches;
      if (changedTouches[0].identifier !== this.touchId) {
        return;
      }
    }

    this.isDragging = false;
    this.touchId = null;

    if (!this.viewOptions.keyboardSupport) {
      this.minHElem.removeClass('ng5-slider-active');
      this.maxHElem.removeClass('ng5-slider-active');
      this.tracking = null;
    }
    this.dragging.active = false;

    if (this.onMoveUnsubscribe !== null) {
      this.onMoveUnsubscribe();
    }
    if (this.onEndUnsubscribe !== null) {
      this.onEndUnsubscribe();
    }

    this.userChangeEnd.emit(this.getChangeContext());
  }

  private onPointerFocus(pointer: SliderElement, ref: HandleType): void {
    this.tracking = ref;
    pointer.on('blur', (): void => this.onPointerBlur(pointer));
    pointer.on('keydown', (event: KeyboardEvent): void => this.onKeyboardEvent(event));
    pointer.on('keyup', (): void => this.onKeyUp());
    this.firstKeyDown = true;
    pointer.addClass('ng5-slider-active');

    this.currentFocusElement = {
      pointer: pointer,
      ref: ref,
    };
  }

  private onKeyUp(): void {
    this.firstKeyDown = true;
    this.userChangeEnd.emit(this.getChangeContext());
  }

  private onPointerBlur(pointer: SliderElement): void {
    pointer.off('blur');
    pointer.off('keydown');
    pointer.off('keyup');
    pointer.removeClass('ng5-slider-active');
    if (!this.isDragging) {
      this.tracking = null;
      this.currentFocusElement = null;
    }
  }

  private getKeyActions(currentValue: number): {[key: string]: number} {
    let increaseStep: number = currentValue + this.step;
    let decreaseStep: number = currentValue - this.step;
    let increasePage: number = currentValue + this.valueRange / 10;
    let decreasePage: number = currentValue - this.valueRange / 10;

    if (this.viewOptions.reversedControls) {
      increaseStep = currentValue - this.step;
      decreaseStep = currentValue + this.step;
      increasePage = currentValue - this.valueRange / 10;
      decreasePage = currentValue + this.valueRange / 10;
    }

    // Left to right default actions
    const actions: {[key: string]: number} = {
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
    const currentValue: number = this.getCurrentTrackingValue();
    const keyCode: number = event.keyCode || event.which;
    const keys: {[keyCode: number]: string} = {
        38: 'UP',
        40: 'DOWN',
        37: 'LEFT',
        39: 'RIGHT',
        33: 'PAGEUP',
        34: 'PAGEDOWN',
        36: 'HOME',
        35: 'END',
      };
    const actions: {[key: string]: number} = this.getKeyActions(currentValue);
    const key: string = keys[keyCode];
    const action: number = actions[key];

    if (action == null || this.tracking === null) {
      return;
    }
    event.preventDefault();

    if (this.firstKeyDown) {
      this.firstKeyDown = false;
      this.userChangeStart.emit(this.getChangeContext());
    }

    const newValue: number = this.roundStep(this.sanitizeValue(action));
    if (!this.viewOptions.draggableRangeOnly) {
      this.positionTrackingHandle(newValue);
    } else {
      const difference: number = this.viewHighValue - this.viewLowValue;
      let newMinValue: number;
      let newMaxValue: number;

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
  private onDragStart(pointer: SliderElement, ref: HandleType, event: MouseEvent|TouchEvent,
    bindMove: boolean, bindEnd: boolean, simulateImmediateMove?: boolean, simulateImmediateEnd?: boolean): void {
    const position: number = this.getEventPosition(event);

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

    this.onStart(pointer, ref, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
  }

  /** Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft */
  private getMinValue(newPos: number, outOfBounds: boolean, isAbove: boolean): number {
    const isRTL: boolean = this.viewOptions.rightToLeft;
    let value: number = null;

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
    return this.roundStep(value);
  }

  /** Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft */
  private getMaxValue(newPos: number, outOfBounds: boolean, isAbove: boolean): number {
    const isRTL: boolean = this.viewOptions.rightToLeft;
    let value: number = null;

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

    return this.roundStep(value);
  }

  private onDragMove(pointer: SliderElement, event?: MouseEvent|TouchEvent): void {
    const newPos: number = this.getEventPosition(event);

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

    const isUnderFlrLimit: boolean = newPos <= flrLimit;
    const isOverCeilLimit: boolean = newPos >= this.maxPos - ceilLimit;

    let newMinValue: number;
    let newMaxValue: number;
    if (isUnderFlrLimit) {
      if (flrHElem.position === 0) {
        return;
      }
      newMinValue = this.getMinValue(newPos, true, false);
      newMaxValue = this.getMaxValue(newPos, true, false);
    } else if (isOverCeilLimit) {
      if (ceilHElem.position === this.maxPos) {
        return;
      }
      newMaxValue = this.getMaxValue(newPos, true, true);
      newMinValue = this.getMinValue(newPos, true, true);
    } else {
      newMinValue = this.getMinValue(newPos, false, false);
      newMaxValue = this.getMaxValue(newPos, false, false);
    }

    this.positionTrackingBar(newMinValue, newMaxValue);
  }

  // Set the new value and position for the entire bar
  private positionTrackingBar(newMinValue: number, newMaxValue: number): void {
    if (this.viewOptions.minLimit != null &&
        newMinValue < this.viewOptions.minLimit) {
      newMinValue = this.viewOptions.minLimit;
      newMaxValue = MathHelper.roundToPrecisionLimit(newMinValue + this.dragging.difference, this.precisionLimit);
    }
    if (this.viewOptions.maxLimit != null &&
        newMaxValue > this.viewOptions.maxLimit) {
      newMaxValue = this.viewOptions.maxLimit;
      newMinValue = MathHelper.roundToPrecisionLimit(newMaxValue - this.dragging.difference, this.precisionLimit);
    }

    this.viewLowValue = newMinValue;
    this.viewHighValue = newMaxValue;
    this.applyLowValue();
    if (this.range) {
      this.applyHighValue();
    }
    this.applyModel(true);
    this.updateHandles(HandleType.Low, this.valueToPosition(newMinValue));
    this.updateHandles(HandleType.High, this.valueToPosition(newMaxValue));
  }

  // Set the new value and position to the current tracking handle
  private positionTrackingHandle(newValue: number): void {
    let valueChanged: boolean = false;
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
          this.applyModel(false);
          this.updateHandles(HandleType.Low, this.maxHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.High;
          this.minHElem.removeClass('ng5-slider-active');
          this.maxHElem.addClass('ng5-slider-active');
          if (this.viewOptions.keyboardSupport) {
            this.focusElement(this.maxHElem);
          }
          valueChanged = true;
        } else if (this.tracking === HandleType.High &&
                   newValue < this.viewLowValue) {
          this.viewHighValue = this.viewLowValue;
          this.applyHighValue();
          this.applyModel(false);
          this.updateHandles(HandleType.High, this.minHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.Low;
          this.maxHElem.removeClass('ng5-slider-active');
          this.minHElem.addClass('ng5-slider-active');
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
      this.applyModel(false);
      this.updateHandles(this.tracking, this.valueToPosition(newValue));
      this.updateAriaAttributes();
      valueChanged = true;
    }

    if (valueChanged) {
      this.applyModel(true);
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
    const oppositeValue: number = this.tracking === HandleType.Low ? this.viewHighValue : this.viewLowValue;
    const difference: number = this.viewOptions.stepsArray
      ? Math.abs(this.getStepValue(newValue) - this.getStepValue(oppositeValue))
      : Math.abs(newValue - oppositeValue);
    if (this.viewOptions.minRange != null) {
      if (difference < this.viewOptions.minRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewOptions.stepsArray
            ? ValueHelper.findStepIndex(this.getStepValue(this.viewHighValue) - this.viewOptions.minRange, this.viewOptions.stepsArray)
            : MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.precisionLimit);
        } else {
          return this.viewOptions.stepsArray
            ? ValueHelper.findStepIndex(this.getStepValue(this.viewLowValue) + this.viewOptions.minRange, this.viewOptions.stepsArray)
            : MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.precisionLimit);
        }
      }
    }
    if (this.viewOptions.maxRange != null) {
      if (difference > this.viewOptions.maxRange) {
        if (this.tracking === HandleType.Low) {
          return this.viewOptions.stepsArray
            ? ValueHelper.findStepIndex(this.getStepValue(this.viewHighValue) - this.viewOptions.maxRange, this.viewOptions.stepsArray)
            : MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.precisionLimit);
        } else {
          return this.viewOptions.stepsArray
            ? ValueHelper.findStepIndex(this.getStepValue(this.viewLowValue) + this.viewOptions.maxRange, this.viewOptions.stepsArray)
            : MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.precisionLimit);
        }
      }
    }
    return newValue;
  }

  private applyPushRange(newValue: number): number {
    const difference: number = this.tracking === HandleType.Low
          ? this.viewHighValue - newValue
          : newValue - this.viewLowValue;
    const minRange: number =
        this.viewOptions.minRange !== null
          ? this.viewOptions.minRange
          : this.viewOptions.step;
    const maxRange: number = this.viewOptions.maxRange;
    // if smaller than minRange
    if (difference < minRange) {
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = MathHelper.roundToPrecisionLimit(Math.min(newValue + minRange, this.maxValue), this.precisionLimit);
        newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.precisionLimit);
        this.applyHighValue();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue));
      } else {
        this.viewLowValue = MathHelper.roundToPrecisionLimit(Math.max(newValue - minRange, this.minValue), this.precisionLimit);
        newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.precisionLimit);
        this.applyLowValue();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    } else if (maxRange !== null && difference > maxRange) {
      // if greater than maxRange
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.precisionLimit);
        this.applyHighValue();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue)
        );
      } else {
        this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.precisionLimit);
        this.applyLowValue();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    }
    return newValue;
  }

  private applyModel(callUserChange: boolean): void {
    this.valueChange.emit(this.value);
    this.highValueChange.emit(this.highValue);
    if (callUserChange) {
      this.userChange.emit(this.getChangeContext());
    }

    if (this.onChangeCallback) {
      if (this.range) {
        this.onChangeCallback([this.value, this.highValue]);
      } else {
        this.onChangeCallback(this.value);
      }
    }
    if (this.onTouchedCallback) {
      if (this.range) {
        this.onTouchedCallback([this.value, this.highValue]);
      } else {
        this.onTouchedCallback(this.value);
      }
    }
  }

  private getChangeContext(): ChangeContext {
    const changeContext: ChangeContext = new ChangeContext();
    changeContext.pointerType = this.tracking === HandleType.Low ? PointerType.Min : PointerType.Max;
    changeContext.value = this.value;
    changeContext.highValue = this.highValue;
    return changeContext;
  }
}
