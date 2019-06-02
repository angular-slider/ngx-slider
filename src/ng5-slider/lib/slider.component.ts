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

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged, filter, throttleTime, tap } from 'rxjs/operators';

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
import { CompatibilityHelper } from './compatibility-helper';
import { MathHelper } from './math-helper';
import { EventListener } from './event-listener';
import { EventListenerHelper } from './event-listener-helper';

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

class ModelValues {
  value: number;
  highValue: number;

  public static compare(x?: ModelValues, y?: ModelValues): boolean {
    return x && y && x.value === y.value && x.highValue === y.highValue;
  }
}

class ModelChange extends ModelValues {
  // Flag used to by-pass distinctUntilChanged() filter on input values
  // (sometimes there is a need to pass values through even though the model values have not changed)
  forceChange: boolean;

  public static compare(x?: ModelChange, y?: ModelChange): boolean {
    return x && y &&
           x.value === y.value &&
           x.highValue === y.highValue &&
           x.forceChange === y.forceChange;
  }
}

class InputModelChange extends ModelChange {
  internalChange: boolean;
}

class OutputModelChange extends ModelChange {
  userEventInitiated: boolean;
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
  // Model for low value of slider. For simple slider, this is the only input. For range slider, this is the low value.
  @Input() value: number;
  // Output for low value slider to support two-way bindings
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  // Model for high value of slider. Not used in simple slider. For range slider, this is the high value.
  @Input() highValue: number;
  // Output for high value slider to support two-way bindings
  @Output() highValueChange: EventEmitter<number> = new EventEmitter();

  // Changes in model inputs are passed through this subject
  // These are all changes coming in from outside the component through input bindings or reactive form inputs
  private inputModelChangeSubject: Subject<InputModelChange> = new Subject<InputModelChange>();
  // Changes to model outputs are passed through this subject
  // These are all changes that need to be communicated to output emitters and registered callbacks
  private outputModelChangeSubject: Subject<OutputModelChange> = new Subject<OutputModelChange>();

  private inputModelChangeSubscription: Subscription = null;
  private outputModelChangeSubscription: Subscription = null;

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
      setTimeout(() => this.calcViewDimensions());
    });
  }

  private triggerFocusSubscription: any;
  @Input() set triggerFocus(triggerFocus: EventEmitter<void>) {
    this.unsubscribeTriggerFocus();

    this.triggerFocusSubscription = triggerFocus.subscribe((pointerType: PointerType) => {
      this.focusPointer(pointerType);
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

  @HostBinding('class.vertical')
  public sliderElementVerticalClass: boolean = false;

  @HostBinding('class.animate')
  public sliderElementAnimateClass: boolean = false;

  @HostBinding('attr.disabled')
  public sliderElementDisabledAttr: string = null;

  // Slider type, true means range slider
  get range(): boolean {
    return !ValueHelper.isNullOrUndefined(this.value) && !ValueHelper.isNullOrUndefined(this.highValue);
  }

  // Values recorded when first dragging the bar
  private dragging: Dragging = new Dragging();

  // Half of the width or height of the slider handles
  private handleHalfDim: number = 0;

  // Maximum position the slider handle can have
  private maxPos: number = 0;

  // The name of the handle we are currently tracking
  private tracking: HandleType = null;

  // Minimum value (floor) of the model
  private minValue: number = 0;

  // Maximum value (ceiling) of the model
  private maxValue: number = 0;

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

  private isDragging: boolean;
  private touchId: number;

  private eventListenerHelper: EventListenerHelper;
  private onMoveEventListener: EventListener = null;
  private onEndEventListener: EventListener = null;

  private onTouchedCallback: (value: any) => void = null;
  private onChangeCallback: (value: any) => void = null;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private changeDetectionRef: ChangeDetectorRef) {
    this.eventListenerHelper = new EventListenerHelper(this.renderer);
  }

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
    this.applyOptions();

    this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
    this.subscribeOutputModelChangeSubject(this.viewOptions.outputEventsInterval);

    // Once we apply options, we need to normalise model values for the first time
    this.renormaliseModelValues();

    this.viewLowValue = this.modelValueToViewValue(this.value);
    if (this.range) {
      this.viewHighValue = this.modelValueToViewValue(this.highValue);
    } else {
      this.viewHighValue = null;
    }

    this.manageElementsStyle();
    this.setDisabledStateAttr();
    this.calcViewDimensions();
    this.addAccessibility();
    this.updateCeilLab();
    this.updateFloorLab();
    this.initHandles();
    this.manageEventsBindings();

    this.initHasRun = true;

    // Run change detection manually to resolve some issues when init procedure changes values used in the view
    this.changeDetectionRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Always apply options first
    if (changes.options) {
      this.onChangeOptions();
    }

    // Then value changes
    if (changes.value || changes.highValue) {
      this.inputModelChangeSubject.next({
        value: this.value,
        highValue: this.highValue,
        forceChange: false,
        internalChange: false
      });
    }
  }

  onChangeOptions(): void {
    if (!this.initHasRun) {
      return;
    }

    const previousInputEventsInterval: number = this.viewOptions.inputEventsInterval;
    const previousOutputEventsInterval: number = this.viewOptions.outputEventsInterval;

    this.applyOptions();

    if (previousInputEventsInterval !== this.viewOptions.inputEventsInterval) {
      this.unsubscribeInputModelChangeSubject();
      this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
    }

    if (previousOutputEventsInterval !== this.viewOptions.outputEventsInterval) {
      this.unsubscribeInputModelChangeSubject();
      this.subscribeInputModelChangeSubject(this.viewOptions.outputEventsInterval);
    }

    // With new options, we need to re-normalise model values if necessary
    this.renormaliseModelValues();

    this.viewLowValue = this.modelValueToViewValue(this.value);
    if (this.range) {
      this.viewHighValue = this.modelValueToViewValue(this.highValue);
    } else {
      this.viewHighValue = null;
    }

    this.resetSlider();
  }

  renormaliseModelValues(): void {
    const previousModelValues: ModelValues = {
      value: this.value,
      highValue: this.highValue
    };
    const normalisedModelValues: ModelValues = this.normaliseModelValues(previousModelValues);
    if (!ModelValues.compare(normalisedModelValues, previousModelValues)) {
      this.value = normalisedModelValues.value;
      this.highValue = normalisedModelValues.highValue;

      this.outputModelChangeSubject.next({
        value: this.value,
        highValue: this.highValue,
        forceChange: true,
        userEventInitiated: false
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calcViewDimensions();
  }

  ngOnDestroy(): void {
    this.leftOutSelBar.off();
    this.rightOutSelBar.off();
    this.fullBarElem.off();
    this.selBarElem.off();
    this.minHElem.off();
    this.maxHElem.off();
    this.flrLabElem.off();
    this.ceilLabElem.off();
    this.minLabElem.off();
    this.maxLabElem.off();
    this.cmbLabElem.off();
    this.ticksElem.off();

    this.unsubscribeOnMove();
    this.unsubscribeOnEnd();
    this.unsubscribeInputModelChangeSubject();
    this.unsubscribeOutputModelChangeSubject();
    this.unsubscribeManualRefresh();
    this.unsubscribeTriggerFocus();
    this.unbindEvents();
    this.currentFocusElement = null;
  }


  // ControlValueAccessor interface
  writeValue(obj: any): void {
    if (obj instanceof Array) {
      this.value = obj[0];
      this.highValue = obj[1];
    } else {
      this.value = obj;
    }

    // ngOnChanges() is not called in this instance, so we need to communicate the change manually
    this.inputModelChangeSubject.next({
      value: this.value,
      highValue: this.highValue,
      forceChange: false,
      internalChange: false
    });
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

  private subscribeInputModelChangeSubject(interval?: number): void {
    this.inputModelChangeSubscription = this.inputModelChangeSubject
    .pipe(
      distinctUntilChanged(ModelChange.compare),
      // Hack to reset the status of the distinctUntilChanged() - if a "fake" event comes through with forceChange=true,
      // we forcefully by-pass distinctUntilChanged(), but otherwise drop the event
      filter((modelChange: InputModelChange) => !modelChange.forceChange && !modelChange.internalChange),
      (!ValueHelper.isNullOrUndefined(interval))
          ? throttleTime(interval, undefined, { leading: true, trailing: true})
          : tap(() => {}) // no-op
    )
    .subscribe((modelChange: InputModelChange) => this.applyInputModelChange(modelChange));
  }

  private subscribeOutputModelChangeSubject(interval?: number): void {
    this.outputModelChangeSubscription = this.outputModelChangeSubject
      .pipe(
        distinctUntilChanged(ModelChange.compare),
        (!ValueHelper.isNullOrUndefined(interval))
          ? throttleTime(interval, undefined, { leading: true, trailing: true})
          : tap(() => {}) // no-op
      )
      .subscribe((modelChange: OutputModelChange) => this.publishOutputModelChange(modelChange));
  }

  private unsubscribeOnMove(): void {
    if (this.onMoveEventListener) {
      this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
      this.onMoveEventListener = null;
    }
  }

  private unsubscribeOnEnd(): void {
    if (this.onEndEventListener) {
      this.eventListenerHelper.detachEventListener(this.onEndEventListener);
      this.onEndEventListener = null;
    }
  }

  private unsubscribeInputModelChangeSubject(): void {
    if (this.inputModelChangeSubscription) {
      this.inputModelChangeSubscription.unsubscribe();
      this.inputModelChangeSubscription = null;
    }
  }

  private unsubscribeOutputModelChangeSubject(): void {
    if (this.outputModelChangeSubscription) {
      this.outputModelChangeSubscription.unsubscribe();
      this.outputModelChangeSubscription = null;
    }
  }

  private unsubscribeManualRefresh(): void {
    if (this.manualRefreshSubscription) {
      this.manualRefreshSubscription.unsubscribe();
      this.manualRefreshSubscription = null;
    }
  }

  private unsubscribeTriggerFocus(): void {
    if (this.triggerFocusSubscription) {
      this.triggerFocusSubscription.unsubscribe();
      this.triggerFocusSubscription = null;
    }
  }

  private getCurrentTrackingValue(): number {
    if (ValueHelper.isNullOrUndefined(this.tracking)) {
      return null;
    }

    return this.tracking === HandleType.Low ? this.viewLowValue : this.viewHighValue;
  }

  private modelValueToViewValue(modelValue: number): number {
    if (ValueHelper.isNullOrUndefined(modelValue)) {
      return NaN;
    }

    if (this.viewOptions.stepsArray && !this.viewOptions.bindIndexForStepsArray) {
        return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
    }
    return +modelValue;
  }

  private viewValueToModelValue(viewValue: number): number {
    if (this.viewOptions.stepsArray && !this.viewOptions.bindIndexForStepsArray) {
      return this.getStepValue(viewValue);
    }
    return viewValue;
  }

  private getStepValue(sliderValue: number): number {
    const step: CustomStepDefinition = this.viewOptions.stepsArray[sliderValue];
    return step ? step.value : NaN;
  }

  private applyViewChange(): void {
    this.value = this.viewValueToModelValue(this.viewLowValue);
    this.highValue = this.viewValueToModelValue(this.viewHighValue);

    this.outputModelChangeSubject.next({
      value: this.value,
      highValue: this.highValue,
      userEventInitiated: true,
      forceChange: false
    });

    // At this point all changes are applied and outputs are emitted, so we should be done.
    // However, input changes are communicated in different stream and we need to be ready to
    // act on the next input change even if it is exactly the same as last input change.
    // Therefore, we send a special event to reset the stream.
    this.inputModelChangeSubject.next({
      value: this.value,
      highValue: this.highValue,
      forceChange: false,
      internalChange: true
    });
  }

  // Apply model change to the slider view
  private applyInputModelChange(modelChange: InputModelChange): void {
    const normalisedModelChange: ModelValues = this.normaliseModelValues(modelChange);

    // If normalised model change is different, apply the change to the model values
    const normalisationChange: boolean = !ModelValues.compare(modelChange, normalisedModelChange);
    if (normalisationChange) {
      this.value = normalisedModelChange.value;
      this.highValue = normalisedModelChange.highValue;
    }

    this.viewLowValue = this.modelValueToViewValue(normalisedModelChange.value);
    if (this.range) {
      this.viewHighValue = this.modelValueToViewValue(normalisedModelChange.highValue);
    } else {
      this.viewHighValue = null;
    }

    this.updateLowHandle(this.valueToPosition(this.viewLowValue));
    if (this.range) {
      this.updateHighHandle(this.valueToPosition(this.viewHighValue));
    }
    this.updateSelectionBar();
    this.updateTicksScale();
    this.updateAriaAttributes();
    if (this.range) {
      this.updateCmbLabel();
    }

    // At the end, we need to communicate the model change to the outputs as well
    // Normalisation changes are also always forced out to ensure that subscribers always end up in correct state
    this.outputModelChangeSubject.next({
      value: normalisedModelChange.value,
      highValue: normalisedModelChange.highValue,
      forceChange: normalisationChange,
      userEventInitiated: false
    });
  }

  // Publish model change to output event emitters and registered callbacks
  private publishOutputModelChange(modelChange: OutputModelChange): void {
    const emitOutputs: () => void = (): void => {
      this.valueChange.emit(modelChange.value);
      if (this.range) {
        this.highValueChange.emit(modelChange.highValue);
      }

      if (this.onChangeCallback) {
        if (this.range) {
          this.onChangeCallback([modelChange.value, modelChange.highValue]);
        } else {
          this.onChangeCallback(modelChange.value);
        }
      }
      if (this.onTouchedCallback) {
        if (this.range) {
          this.onTouchedCallback([modelChange.value, modelChange.highValue]);
        } else {
          this.onTouchedCallback(modelChange.value);
        }
      }
    };

    if (modelChange.userEventInitiated) {
      // If this change was initiated by a user event, we can emit outputs in the same tick
      emitOutputs();
      this.userChange.emit(this.getChangeContext());
    } else {
      // But, if the change was initated by something else like a change in input bindings,
      // we need to wait until next tick to emit the outputs to keep Angular change detection happy
      setTimeout(() => { emitOutputs(); });
    }
  }

  private normaliseModelValues(input: ModelValues): ModelValues {
    const normalisedInput: ModelValues = new ModelValues();
    normalisedInput.value = input.value;
    normalisedInput.highValue = input.highValue;

    if (this.viewOptions.enforceStep) {
      normalisedInput.value = this.roundStep(normalisedInput.value);
      if (this.range) {
        normalisedInput.highValue = this.roundStep(normalisedInput.highValue);
      }
    }

    // Don't attempt to normalise further when using steps array (steps may be out of order and that is perfectly fine)
    if (this.viewOptions.stepsArray || !this.viewOptions.enforceRange) {
      return normalisedInput;
    }

    normalisedInput.value = MathHelper.clampToRange(normalisedInput.value, this.viewOptions.floor, this.viewOptions.ceil);

    if (this.range) {
      normalisedInput.highValue = MathHelper.clampToRange(normalisedInput.highValue, this.viewOptions.floor, this.viewOptions.ceil);
    } else {
      normalisedInput.highValue = input.highValue;
    }

    // Make sure that range slider invariant (value <= highValue) is always satisfied
    if (this.range && input.value > input.highValue) {
      // We know that both values are now clamped correctly, they may just be in the wrong order
      // So the easy solution is to swap them... except swapping is sometimes disabled in options, so we make the two values the same
      if (this.viewOptions.noSwitching) {
        normalisedInput.value = normalisedInput.highValue;
      } else {
        const tempValue: number = input.value;
        normalisedInput.value = input.highValue;
        normalisedInput.highValue = tempValue;
      }
    }

    return normalisedInput;
  }

  // Read the user options and apply them to the slider model
  private applyOptions(): void {
    this.viewOptions = new Options();
    Object.assign(this.viewOptions, this.options);

    this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange;
    this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly;
    if (this.viewOptions.draggableRangeOnly) {
      this.viewOptions.draggableRange = true;
    }

    this.viewOptions.showTicks = this.viewOptions.showTicks ||
      this.viewOptions.showTicksValues ||
      !!this.viewOptions.ticksArray;
    if (this.viewOptions.showTicks && (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) || this.viewOptions.ticksArray)) {
      this.intermediateTicks = true;
    }
    this.showTicks = this.viewOptions.showTicks;

    this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar ||
      this.viewOptions.showSelectionBarEnd ||
      !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue);

    if (this.viewOptions.stepsArray) {
      this.parseStepsArray();
    } else {
      if (ValueHelper.isNullOrUndefined(this.viewOptions.step)) {
        this.viewOptions.step = 1;
      } else {
        this.viewOptions.step = +this.viewOptions.step;
        if (this.viewOptions.step <= 0) {
          this.viewOptions.step = 1;
       }
      }

      if (ValueHelper.isNullOrUndefined(this.viewOptions.ceil) ||
          ValueHelper.isNullOrUndefined(this.viewOptions.floor)) {
        throw Error('floor and ceil options must be supplied');
      }
      this.viewOptions.ceil = +this.viewOptions.ceil;
      this.viewOptions.floor = +this.viewOptions.floor;

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

    if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
      throw Error('Can\'t use floor=0 with logarithmic scale');
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
    this.updateCeilLab();
    this.updateFloorLab();
    this.unbindEvents();
    this.manageEventsBindings();
    this.setDisabledStateAttr();
    this.calcViewDimensions();
    this.refocusPointerIfNeeded();
  }

  // Sets focus on the specified pointer
  private focusPointer(pointerType: PointerType): void {
    // If not supplied, use min pointer as default
    if (pointerType !== PointerType.Min && pointerType !== PointerType.Max) {
      pointerType = PointerType.Min;
    }

    if (pointerType === PointerType.Min) {
      this.focusElement(this.minHElem);
    } else if (this.range && pointerType === PointerType.Max) {
      this.focusElement(this.maxHElem);
    }
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

    // Changing animate class may interfere with slider reset/initialisation, so we should set it separately,
    // after all is properly set up
    if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
      setTimeout((): void => { this.sliderElementAnimateClass = this.viewOptions.animate; });
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
      el.css('visibility', 'hidden');
    } else {
      el.css('visibility', 'visible');
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
        (ValueHelper.isNullOrUndefined(label.value) ||
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
    this.minHElem.attr('aria-valuenow', (+this.value).toString());
    this.minHElem.attr('aria-valuetext', this.translate(+this.value, LabelType.Low));
    this.minHElem.attr('aria-valuemin', this.viewOptions.floor.toString());
    this.minHElem.attr('aria-valuemax', this.viewOptions.ceil.toString());

    if (this.range) {
      this.maxHElem.attr('aria-valuenow', (+this.highValue).toString());
      this.maxHElem.attr('aria-valuetext', this.translate(+this.highValue, LabelType.High));
      this.maxHElem.attr('aria-valuemin', this.viewOptions.floor.toString());
      this.maxHElem.attr('aria-valuemax', this.viewOptions.ceil.toString());
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

    const newTicks: Tick[] = ticksArray.map((value: number): Tick => {
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

    // We should avoid re-creating the ticks array if possible
    // This both improves performance and makes CSS animations work correctly
    if (this.ticks && this.ticks.length === newTicks.length) {
      for (let i: number = 0; i  < newTicks.length; ++i) {
        Object.assign(this.ticks[i], newTicks[i]);
      }
    } else {
      this.ticks = newTicks;
    }
  }

  private getTicksArray(): number[] {
    const step: number = (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) ? this.viewOptions.tickStep : this.viewOptions.step;
    const ticksArray: number[] = [];
    for (let value: number = this.viewOptions.floor; value <= this.viewOptions.ceil; value += step) {
      ticksArray.push(value);
    }
    return ticksArray;
  }

  private isTickSelected(value: number): boolean {
    if (!this.range) {
      if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
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
      this.setLabelValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor), this.flrLabElem);
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
      this.setLabelValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil), this.ceilLabElem);
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
      if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
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
      const offset: number = (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue))
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
    const step: number = customStep ? customStep : this.viewOptions.step;
    let steppedDifference: number = MathHelper.roundToPrecisionLimit(
      (value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
    steppedDifference = Math.round(steppedDifference) * step;
    return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
  }

  // Hide element
  private hideEl(element: SliderElement): void {
    element.css('opacity', '0');
  }

  // Show element
  private showEl(element: SliderElement): void {
    if (!!element.alwaysHide) {
      return;
    }

    element.css('opacity', '1');
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

  // Translate value to pixel position
  private valueToPosition(val: number): number {
    let fn: ValueToPositionFunction  = ValueHelper.linearValueToPosition;
    if (this.viewOptions.customValueToPosition) {
      fn = this.viewOptions.customValueToPosition;
    } else if (this.viewOptions.logScale) {
      fn = ValueHelper.logValueToPosition;
    }

    val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
    let percent: number = fn(val, this.viewOptions.floor, this.viewOptions.ceil) || 0;
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
    return fn(percent, this.viewOptions.floor, this.viewOptions.ceil) || 0;
  }

  // Get the X-coordinate or Y-coordinate of an event
  private getEventXY(event: MouseEvent|TouchEvent, targetTouchId?: number): number {
    if (event instanceof MouseEvent) {
      return this.viewOptions.vertical ? event.clientY : event.clientX;
    }

    let touchIndex: number = 0;
    const touches: TouchList = event.touches;
    if (!ValueHelper.isNullOrUndefined(targetTouchId)) {
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
      this.selBarElem.on('mousedown',
        (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true, true)
      );
    }

    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.on('mousedown',
        (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true)
      );
      this.maxHElem.on('mousedown',
        (event: MouseEvent): void => this.onBarStart(draggableRange, null, event, true, true)
      );
    } else {
      this.minHElem.on('mousedown',
        (event: MouseEvent): void => this.onStart(this.minHElem, HandleType.Low, event, true, true)
      );

      if (this.range) {
        this.maxHElem.on('mousedown',
          (event: MouseEvent): void => this.onStart(this.maxHElem, HandleType.High, event, true, true)
        );
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.on('mousedown',
          (event: MouseEvent): void => this.onStart(null, null, event, true, true, true)
        );
        this.ticksElem.on('mousedown',
          (event: MouseEvent): void => this.onStart(null, null, event, true, true, true, true)
        );
      }
    }

    if (!this.viewOptions.onlyBindHandles) {
      this.selBarElem.onPassive('touchstart',
        (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true)
      );
    }
    if (this.viewOptions.draggableRangeOnly) {
      this.minHElem.onPassive('touchstart',
        (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true)
      );
      this.maxHElem.onPassive('touchstart',
        (event: TouchEvent): void => this.onBarStart(draggableRange, null, event, true, true)
      );
    } else {
      this.minHElem.onPassive('touchstart',
        (event: TouchEvent): void => this.onStart(this.minHElem, HandleType.Low, event, true, true)
      );
      if (this.range) {
        this.maxHElem.onPassive('touchstart',
          (event: TouchEvent): void => this.onStart(this.maxHElem, HandleType.High, event, true, true)
        );
      }
      if (!this.viewOptions.onlyBindHandles) {
        this.fullBarElem.onPassive('touchstart',
          (event: TouchEvent): void => this.onStart(null, null, event, true, true, true)
        );
        this.ticksElem.onPassive('touchstart',
          (event: TouchEvent): void => this.onStart(null, null, event, false, false, true, true)
        );
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
      this.unsubscribeOnMove();

      const onMoveCallback: ((e: MouseEvent|TouchEvent) => void) =
        (e: MouseEvent|TouchEvent): void => this.dragging.active ? this.onDragMove(pointer, e) : this.onMove(pointer, e);

      if (CompatibilityHelper.isTouchEvent(event)) {
        this.onMoveEventListener = this.eventListenerHelper.attachPassiveEventListener(
          document, 'touchmove', onMoveCallback, this.viewOptions.touchEventsInterval);
      } else {
        this.onMoveEventListener = this.eventListenerHelper.attachEventListener(
          document, 'mousemove', onMoveCallback, this.viewOptions.mouseEventsInterval);
      }
    }

    if (bindEnd) {
      this.unsubscribeOnEnd();

      const onEndCallback: ((e: MouseEvent|TouchEvent) => void) =
        (e: MouseEvent|TouchEvent): void => this.onEnd(e);

      if (CompatibilityHelper.isTouchEvent(event)) {
        this.onEndEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchend', onEndCallback);
      } else {
        this.onEndEventListener = this.eventListenerHelper.attachEventListener(document, 'mouseup', onEndCallback);
      }
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

    const newPos: number = touchForThisSlider
      ? this.getEventPosition(event, touchForThisSlider.identifier)
      : this.getEventPosition(event);
    let newValue: number;
    const ceilValue: number = this.viewOptions.rightToLeft
        ? this.viewOptions.floor
        : this.viewOptions.ceil;
    const flrValue: number = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor;

    if (newPos <= 0) {
      newValue = flrValue;
    } else if (newPos >= this.maxPos) {
      newValue = ceilValue;
    } else {
      newValue = this.positionToValue(newPos);
      if (fromTick && !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) {
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

    this.unsubscribeOnMove();
    this.unsubscribeOnEnd();

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
    const valueRange: number = this.viewOptions.ceil - this.viewOptions.floor;

    let increaseStep: number = currentValue + this.viewOptions.step;
    let decreaseStep: number = currentValue - this.viewOptions.step;
    let increasePage: number = currentValue + valueRange / 10;
    let decreasePage: number = currentValue - valueRange / 10;

    if (this.viewOptions.reversedControls) {
      increaseStep = currentValue - this.viewOptions.step;
      decreaseStep = currentValue + this.viewOptions.step;
      increasePage = currentValue - valueRange / 10;
      decreasePage = currentValue + valueRange / 10;
    }

    // Left to right default actions
    const actions: {[key: string]: number} = {
      UP: increaseStep,
      DOWN: decreaseStep,
      LEFT: decreaseStep,
      RIGHT: increaseStep,
      PAGEUP: increasePage,
      PAGEDOWN: decreasePage,
      HOME: this.viewOptions.reversedControls ? this.viewOptions.ceil : this.viewOptions.floor,
      END: this.viewOptions.reversedControls ? this.viewOptions.floor : this.viewOptions.ceil,
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

    if (ValueHelper.isNullOrUndefined(action) || ValueHelper.isNullOrUndefined(this.tracking)) {
      return;
    }
    event.preventDefault();

    if (this.firstKeyDown) {
      this.firstKeyDown = false;
      this.userChangeStart.emit(this.getChangeContext());
    }

    const actionValue: number = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
    const newValue: number = this.roundStep(actionValue);
    if (!this.viewOptions.draggableRangeOnly) {
      this.positionTrackingHandle(newValue);
    } else {
      const difference: number = this.viewHighValue - this.viewLowValue;
      let newMinValue: number;
      let newMaxValue: number;

      if (this.tracking === HandleType.Low) {
        newMinValue = newValue;
        newMaxValue = newValue + difference;
        if (newMaxValue > this.viewOptions.ceil) {
          newMaxValue = this.viewOptions.ceil;
          newMinValue = newMaxValue - difference;
        }
      } else {
        newMaxValue = newValue;
        newMinValue = newValue - difference;
        if (newMinValue < this.viewOptions.floor) {
          newMinValue = this.viewOptions.floor;
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
          ? this.viewOptions.floor
          : this.viewOptions.ceil - this.dragging.difference;
      } else {
        value = isRTL
          ? this.viewOptions.ceil - this.dragging.difference
          : this.viewOptions.floor;
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
          ? this.viewOptions.floor + this.dragging.difference
          : this.viewOptions.ceil;
      } else {
        value = isRTL
          ? this.viewOptions.ceil
          : this.viewOptions.floor + this.dragging.difference;
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
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) &&
        newMinValue < this.viewOptions.minLimit) {
      newMinValue = this.viewOptions.minLimit;
      newMaxValue = MathHelper.roundToPrecisionLimit(newMinValue + this.dragging.difference, this.viewOptions.precisionLimit);
    }
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) &&
        newMaxValue > this.viewOptions.maxLimit) {
      newMaxValue = this.viewOptions.maxLimit;
      newMinValue = MathHelper.roundToPrecisionLimit(newMaxValue - this.dragging.difference, this.viewOptions.precisionLimit);
    }

    this.viewLowValue = newMinValue;
    this.viewHighValue = newMaxValue;
    this.applyViewChange();
    this.updateHandles(HandleType.Low, this.valueToPosition(newMinValue));
    this.updateHandles(HandleType.High, this.valueToPosition(newMaxValue));
  }

  // Set the new value and position to the current tracking handle
  private positionTrackingHandle(newValue: number): void {
    newValue = this.applyMinMaxLimit(newValue);
    if (this.range) {
      if (this.viewOptions.pushRange) {
        newValue = this.applyPushRange(newValue);
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
          this.applyViewChange();
          this.updateHandles(HandleType.Low, this.maxHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.High;
          this.minHElem.removeClass('ng5-slider-active');
          this.maxHElem.addClass('ng5-slider-active');
          if (this.viewOptions.keyboardSupport) {
            this.focusElement(this.maxHElem);
          }
        } else if (this.tracking === HandleType.High &&
                   newValue < this.viewLowValue) {
          this.viewHighValue = this.viewLowValue;
          this.applyViewChange();
          this.updateHandles(HandleType.High, this.minHElem.position);
          this.updateAriaAttributes();
          this.tracking = HandleType.Low;
          this.maxHElem.removeClass('ng5-slider-active');
          this.minHElem.addClass('ng5-slider-active');
          if (this.viewOptions.keyboardSupport) {
            this.focusElement(this.minHElem);
          }
        }
      }
    }

    if (this.getCurrentTrackingValue() !== newValue) {
      if (this.tracking === HandleType.Low) {
        this.viewLowValue = newValue;
        this.applyViewChange();
      } else {
        this.viewHighValue = newValue;
        this.applyViewChange();
      }
      this.updateHandles(this.tracking, this.valueToPosition(newValue));
      this.updateAriaAttributes();
    }
  }

  private applyMinMaxLimit(newValue: number): number {
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) && newValue < this.viewOptions.minLimit) {
      return this.viewOptions.minLimit;
    }
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) && newValue > this.viewOptions.maxLimit) {
      return this.viewOptions.maxLimit;
    }
    return newValue;
  }

  private applyMinMaxRange(newValue: number): number {
    const oppositeValue: number = this.tracking === HandleType.Low ? this.viewHighValue : this.viewLowValue;
    const difference: number = Math.abs(newValue - oppositeValue);
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange)) {
      if (difference < this.viewOptions.minRange) {
        if (this.tracking === HandleType.Low) {
          return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
        } else {
          return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit);
        }
      }
    }
    if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxRange)) {
      if (difference > this.viewOptions.maxRange) {
        if (this.tracking === HandleType.Low) {
          return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
        } else {
          return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit);
        }
      }
    }
    return newValue;
  }

  private applyPushRange(newValue: number): number {
    const difference: number = this.tracking === HandleType.Low
          ? this.viewHighValue - newValue
          : newValue - this.viewLowValue;
    const minRange: number = (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange))
          ? this.viewOptions.minRange
          : this.viewOptions.step;
    const maxRange: number = this.viewOptions.maxRange;
    // if smaller than minRange
    if (difference < minRange) {
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = MathHelper.roundToPrecisionLimit(
          Math.min(newValue + minRange, this.viewOptions.ceil), this.viewOptions.precisionLimit);
        newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.viewOptions.precisionLimit);
        this.applyViewChange();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue));
      } else {
        this.viewLowValue = MathHelper.roundToPrecisionLimit(
          Math.max(newValue - minRange, this.viewOptions.floor), this.viewOptions.precisionLimit);
        newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.viewOptions.precisionLimit);
        this.applyViewChange();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    } else if (!ValueHelper.isNullOrUndefined(maxRange) && difference > maxRange) {
      // if greater than maxRange
      if (this.tracking === HandleType.Low) {
        this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.viewOptions.precisionLimit);
        this.applyViewChange();
        this.updateHandles(HandleType.High, this.valueToPosition(this.viewHighValue)
        );
      } else {
        this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.viewOptions.precisionLimit);
        this.applyViewChange();
        this.updateHandles(HandleType.Low, this.valueToPosition(this.viewLowValue));
      }
      this.updateAriaAttributes();
    }
    return newValue;
  }

  private getChangeContext(): ChangeContext {
    const changeContext: ChangeContext = new ChangeContext();
    changeContext.pointerType = this.tracking === HandleType.Low ? PointerType.Min : PointerType.Max;
    changeContext.value = +this.value;
    if (this.range) {
      changeContext.value = +this.highValue;
    }
    return changeContext;
  }
}
