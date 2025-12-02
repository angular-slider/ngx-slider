import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, Renderer2, ChangeDetectorRef, HostBinding, Directive, Input, Component, forwardRef, NgZone, EventEmitter, HostListener, ContentChild, ViewChild, Output, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { throttleTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { supportsPassiveEvents } from 'detect-passive-events';

/** Label type */
var LabelType;
(function (LabelType) {
    /** Label above low pointer */
    LabelType[LabelType["Low"] = 0] = "Low";
    /** Label above high pointer */
    LabelType[LabelType["High"] = 1] = "High";
    /** Label for minimum slider value */
    LabelType[LabelType["Floor"] = 2] = "Floor";
    /** Label for maximum slider value */
    LabelType[LabelType["Ceil"] = 3] = "Ceil";
    /** Label below legend tick */
    LabelType[LabelType["TickValue"] = 4] = "TickValue";
})(LabelType || (LabelType = {}));
/** Slider options */
class Options {
    /** Minimum value for a slider.
      Not applicable when using stepsArray. */
    floor = 0;
    /** Maximum value for a slider.
      Not applicable when using stepsArray. */
    ceil = null;
    /** Step between each value.
      Not applicable when using stepsArray. */
    step = 1;
    /** The minimum range authorized on the slider.
      Applies to range slider only.
      When using stepsArray, expressed as index into stepsArray. */
    minRange = null;
    /** The maximum range authorized on the slider.
      Applies to range slider only.
      When using stepsArray, expressed as index into stepsArray. */
    maxRange = null;
    /** Set to true to have a push behavior. When the min handle goes above the max,
      the max is moved as well (and vice-versa). The range between min and max is
      defined by the step option (defaults to 1) and can also be overriden by
      the minRange option. Applies to range slider only. */
    pushRange = false;
    /** The minimum value authorized on the slider.
      When using stepsArray, expressed as index into stepsArray. */
    minLimit = null;
    /** The maximum value authorized on the slider.
      When using stepsArray, expressed as index into stepsArray. */
    maxLimit = null;
    /** Restricted range(s) on the slider where handles cannot be placed.
      Can be a single RestrictedRangeDefinition object or an array of them.
      Each restricted range has 'from' and 'to' properties defining the restricted area. */
    restrictedRange = null;
    /** Set to true to skip restricted ranges when using arrow keys.
      When enabled, pressing arrow keys will jump over restricted ranges. */
    skipRestrictedRangesWithArrowKeys = false;
    /** Custom translate function. Use this if you want to translate values displayed
        on the slider. */
    translate = null;
    /** Custom function for combining overlapping labels in range slider.
        It takes the min and max values (already translated with translate fuction)
        and should return how these two values should be combined.
        If not provided, the default function will join the two values with
        ' - ' as separator. */
    combineLabels = null;
    /** Use to display legend under ticks (thus, it needs to be used along with
       showTicks or showTicksValues). The function will be called with each tick
       value and returned content will be displayed under the tick as a legend.
       If the returned value is null, then no legend is displayed under
       the corresponding tick.You can also directly provide the legend values
       in the stepsArray option. */
    getLegend = null;
    /** Use to display a custom legend of a stepItem from stepsArray.
      It will be the same as getLegend but for stepsArray. */
    getStepLegend = null;
    /** If you want to display a slider with non linear/number steps.
       Just pass an array with each slider value and that's it; the floor, ceil and step settings
       of the slider will be computed automatically.
       By default, the value model and valueHigh model values will be the value of the selected item
       in the stepsArray.
       They can also be bound to the index of the selected item by setting the bindIndexForStepsArray
       option to true. */
    stepsArray = null;
    /** Set to true to bind the index of the selected item to value model and valueHigh model. */
    bindIndexForStepsArray = false;
    /** When set to true and using a range slider, the range can be dragged by the selection bar.
      Applies to range slider only. */
    draggableRange = false;
    /** Same as draggableRange but the slider range can't be changed.
      Applies to range slider only. */
    draggableRangeOnly = false;
    /** Set to true to always show the selection bar before the slider handle. */
    showSelectionBar = false;
    /** Set to true to always show the selection bar after the slider handle. */
    showSelectionBarEnd = false;
    /**  Set a number to draw the selection bar between this value and the slider handle.
      When using stepsArray, expressed as index into stepsArray. */
    showSelectionBarFromValue = null;
    /**  Only for range slider. Set to true to visualize in different colour the areas
      on the left/right (top/bottom for vertical range slider) of selection bar between the handles. */
    showOuterSelectionBars = false;
    /** Set to true to hide pointer labels */
    hidePointerLabels = false;
    /** Set to true to hide min / max labels  */
    hideLimitLabels = false;
    /** Set to false to disable the auto-hiding behavior of the limit labels. */
    autoHideLimitLabels = true;
    /** Set to true to make the slider read-only. */
    readOnly = false;
    /** Set to true to disable the slider. */
    disabled = false;
    /** Set to true to display a tick for each step of the slider. */
    showTicks = false;
    /** Set to true to display a tick and the step value for each step of the slider.. */
    showTicksValues = false;
    /* The step between each tick to display. If not set, the step value is used.
      Not used when ticksArray is specified. */
    tickStep = null;
    /* The step between displaying each tick step value.
      If not set, then tickStep or step is used, depending on which one is set. */
    tickValueStep = null;
    /** Use to display ticks at specific positions.
      The array contains the index of the ticks that should be displayed.
      For example, [0, 1, 5] will display a tick for the first, second and sixth values. */
    ticksArray = null;
    /** Used to display a tooltip when a tick is hovered.
      Set to a function that returns the tooltip content for a given value. */
    ticksTooltip = null;
    /** Same as ticksTooltip but for ticks values. */
    ticksValuesTooltip = null;
    /** Set to true to display the slider vertically.
      The slider will take the full height of its parent.
      Changing this value at runtime is not currently supported. */
    vertical = false;
    /** Function that returns the current color of the selection bar.
      If your color won't change, don't use this option but set it through CSS.
      If the returned color depends on a model value (either value or valueHigh),
      you should use the argument passed to the function.
      Indeed, when the function is called, there is no certainty that the model
      has already been updated.*/
    getSelectionBarColor = null;
    /** Function that returns the color of a tick. showTicks must be enabled. */
    getTickColor = null;
    /** Function that returns the current color of a pointer.
      If your color won't change, don't use this option but set it through CSS.
      If the returned color depends on a model value (either value or valueHigh),
      you should use the argument passed to the function.
      Indeed, when the function is called, there is no certainty that the model has already been updated.
      To handle range slider pointers independently, you should evaluate pointerType within the given
      function where "min" stands for value model and "max" for valueHigh model values. */
    getPointerColor = null;
    /** Handles are focusable (on click or with tab) and can be modified using the following keyboard controls:
      Left/bottom arrows: -1
      Right/top arrows: +1
      Page-down: -10%
      Page-up: +10%
      Home: minimum value
      End: maximum value
     */
    keyboardSupport = true;
    /** If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2
      so that the slider is rendered properly and the events are handled correctly. */
    scale = 1;
    /** If you display the slider in an element that uses transform: rotate(90deg), set the rotate value to 90
     so that the slider is rendered properly and the events are handled correctly. Value is in degrees. */
    rotate = 0;
    /** Set to true to force the value(s) to be rounded to the step, even when modified from the outside.
      When set to false, if the model values are modified from outside the slider, they are not rounded
      and can be between two steps. */
    enforceStep = true;
    /** Set to true to force the value(s) to be normalised to allowed range (floor to ceil), even when modified from the outside.
      When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
      the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation. */
    enforceRange = true;
    /** Set to true to force the value(s) to be rounded to the nearest step value, even when modified from the outside.
      When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
      the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation. */
    enforceStepsArray = true;
    /** Set to true to prevent to user from switching the min and max handles. Applies to range slider only. */
    noSwitching = false;
    /** Set to true to only bind events on slider handles. */
    onlyBindHandles = false;
    /** Set to true to show graphs right to left.
      If vertical is true it will be from top to bottom and left / right arrow functions reversed. */
    rightToLeft = false;
    /** Set to true to reverse keyboard navigation:
      Right/top arrows: -1
      Left/bottom arrows: +1
      Page-up: -10%
      Page-down: +10%
      End: minimum value
      Home: maximum value
     */
    reversedControls = false;
    /** Set to true to keep the slider labels inside the slider bounds. */
    boundPointerLabels = true;
    /** Set to true to use a logarithmic scale to display the slider.  */
    logScale = false;
    /** Function that returns the position on the slider for a given value.
      The position must be a percentage between 0 and 1.
      The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly. */
    customValueToPosition = null;
    /** Function that returns the value for a given position on the slider.
      The position is a percentage between 0 and 1.
      The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly. */
    customPositionToValue = null;
    /** Precision limit for calculated values.
      Values used in calculations will be rounded to this number of significant digits
      to prevent accumulating small floating-point errors. */
    precisionLimit = 12;
    /** Use to display the selection bar as a gradient.
      The given object must contain from and to properties which are colors. */
    selectionBarGradient = null;
    /** Use to add a label directly to the slider for accessibility. Adds the aria-label attribute. */
    ariaLabel = 'ngx-slider';
    /** Use instead of ariaLabel to reference the id of an element which will be used to label the slider.
      Adds the aria-labelledby attribute. */
    ariaLabelledBy = null;
    /** Use to add a label directly to the slider range for accessibility. Adds the aria-label attribute. */
    ariaLabelHigh = 'ngx-slider-max';
    /** Use instead of ariaLabelHigh to reference the id of an element which will be used to label the slider range.
      Adds the aria-labelledby attribute. */
    ariaLabelledByHigh = null;
    /** Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the handle */
    handleDimension = null;
    /** Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the bar */
    barDimension = null;
    /** Enable/disable CSS animations */
    animate = true;
    /** Enable/disable CSS animations while moving the slider */
    animateOnMove = false;
}
const AllowUnsafeHtmlInSlider = new InjectionToken('AllowUnsafeHtmlInSlider');

/** Pointer type */
var PointerType;
(function (PointerType) {
    /** Low pointer */
    PointerType[PointerType["Min"] = 0] = "Min";
    /** High pointer */
    PointerType[PointerType["Max"] = 1] = "Max";
})(PointerType || (PointerType = {}));

class ChangeContext {
    value;
    highValue;
    pointerType;
}

/**
 *  Collection of functions to handle conversions/lookups of values
 */
class ValueHelper {
    static isNullOrUndefined(value) {
        return value === undefined || value === null;
    }
    static areArraysEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; ++i) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
    static linearValueToPosition(val, minVal, maxVal) {
        const range = maxVal - minVal;
        return (val - minVal) / range;
    }
    static logValueToPosition(val, minVal, maxVal) {
        val = Math.log(val);
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        const range = maxVal - minVal;
        return (val - minVal) / range;
    }
    static linearPositionToValue(percent, minVal, maxVal) {
        return percent * (maxVal - minVal) + minVal;
    }
    static logPositionToValue(percent, minVal, maxVal) {
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        const value = percent * (maxVal - minVal) + minVal;
        return Math.exp(value);
    }
    static findStepIndex(modelValue, stepsArray) {
        const differences = stepsArray.map((step) => Math.abs(modelValue - step.value));
        let minDifferenceIndex = 0;
        for (let index = 0; index < stepsArray.length; index++) {
            if (differences[index] !== differences[minDifferenceIndex] && differences[index] < differences[minDifferenceIndex]) {
                minDifferenceIndex = index;
            }
        }
        return minDifferenceIndex;
    }
}

/** Helper with mathematical functions */
class MathHelper {
    /* Round numbers to a given number of significant digits */
    static roundToPrecisionLimit(value, precisionLimit) {
        return +(value.toPrecision(precisionLimit));
    }
    static isModuloWithinPrecisionLimit(value, modulo, precisionLimit) {
        const limit = Math.pow(10, -precisionLimit);
        return Math.abs(value % modulo) <= limit || Math.abs(Math.abs(value % modulo) - modulo) <= limit;
    }
    static clampToRange(value, floor, ceil) {
        return Math.min(Math.max(value, floor), ceil);
    }
}

class EventListener {
    eventName = null;
    events = null;
    eventsSubscription = null;
    teardownCallback = null;
}

/**
 * Helper class to attach event listeners to DOM elements with debounce support using rxjs
 */
class EventListenerHelper {
    renderer;
    constructor(renderer) {
        this.renderer = renderer;
    }
    attachPassiveEventListener(nativeElement, eventName, callback, throttleInterval) {
        // Only use passive event listeners if the browser supports it
        if (supportsPassiveEvents !== true) {
            return this.attachEventListener(nativeElement, eventName, callback, throttleInterval);
        }
        // Angular doesn't support passive event handlers (yet), so we need to roll our own code using native functions
        const listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        const observerCallback = (event) => {
            listener.events.next(event);
        };
        nativeElement.addEventListener(eventName, observerCallback, { passive: true, capture: false });
        listener.teardownCallback = () => {
            nativeElement.removeEventListener(eventName, observerCallback, { passive: true, capture: false });
        };
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((event) => {
            callback(event);
        });
        return listener;
    }
    detachEventListener(eventListener) {
        if (!ValueHelper.isNullOrUndefined(eventListener.eventsSubscription)) {
            eventListener.eventsSubscription.unsubscribe();
            eventListener.eventsSubscription = null;
        }
        if (!ValueHelper.isNullOrUndefined(eventListener.events)) {
            eventListener.events.complete();
            eventListener.events = null;
        }
        if (!ValueHelper.isNullOrUndefined(eventListener.teardownCallback)) {
            eventListener.teardownCallback();
            eventListener.teardownCallback = null;
        }
    }
    attachEventListener(nativeElement, eventName, callback, throttleInterval) {
        const listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        const observerCallback = (event) => {
            listener.events.next(event);
        };
        listener.teardownCallback = this.renderer.listen(nativeElement, eventName, observerCallback);
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((event) => { callback(event); });
        return listener;
    }
}

class SliderElementDirective {
    elemRef = inject(ElementRef);
    renderer = inject(Renderer2);
    changeDetectionRef = inject(ChangeDetectorRef);
    _position = 0;
    get position() {
        return this._position;
    }
    _dimension = 0;
    get dimension() {
        return this._dimension;
    }
    _alwaysHide = false;
    get alwaysHide() {
        return this._alwaysHide;
    }
    _vertical = false;
    get vertical() {
        return this._vertical;
    }
    _scale = 1;
    get scale() {
        return this._scale;
    }
    _rotate = 0;
    get rotate() {
        return this._rotate;
    }
    opacity = 1;
    visibility = 'visible';
    left = '';
    bottom = '';
    height = '';
    width = '';
    transform = '';
    eventListenerHelper;
    eventListeners = [];
    constructor() {
        this.eventListenerHelper = new EventListenerHelper(this.renderer);
    }
    setAlwaysHide(hide) {
        this._alwaysHide = hide;
        if (hide) {
            this.visibility = 'hidden';
        }
        else {
            this.visibility = 'visible';
        }
    }
    hide() {
        this.opacity = 0;
    }
    show() {
        if (this.alwaysHide) {
            return;
        }
        this.opacity = 1;
    }
    isVisible() {
        if (this.alwaysHide) {
            return false;
        }
        return this.opacity !== 0;
    }
    setVertical(vertical) {
        this._vertical = vertical;
        if (this._vertical) {
            this.left = '';
            this.width = '';
        }
        else {
            this.bottom = '';
            this.height = '';
        }
    }
    setScale(scale) {
        this._scale = scale;
    }
    setRotate(rotate) {
        this._rotate = rotate;
        this.transform = 'rotate(' + rotate + 'deg)';
    }
    getRotate() {
        return this._rotate;
    }
    // Set element left/top position depending on whether slider is horizontal or vertical
    setPosition(pos) {
        if (this._position !== pos && !this.isRefDestroyed()) {
            this.changeDetectionRef.markForCheck();
        }
        this._position = pos;
        if (this._vertical) {
            this.bottom = Math.round(pos) + 'px';
        }
        else {
            this.left = Math.round(pos) + 'px';
        }
    }
    // Calculate element's width/height depending on whether slider is horizontal or vertical
    calculateDimension() {
        const val = this.getBoundingClientRect();
        if (this.vertical) {
            this._dimension = (val.bottom - val.top) * this.scale;
        }
        else {
            this._dimension = (val.right - val.left) * this.scale;
        }
    }
    // Set element width/height depending on whether slider is horizontal or vertical
    setDimension(dim) {
        if (this._dimension !== dim && !this.isRefDestroyed()) {
            this.changeDetectionRef.markForCheck();
        }
        this._dimension = dim;
        if (this._vertical) {
            this.height = Math.round(dim) + 'px';
        }
        else {
            this.width = Math.round(dim) + 'px';
        }
    }
    getBoundingClientRect() {
        return this.elemRef.nativeElement.getBoundingClientRect();
    }
    on(eventName, callback, debounceInterval) {
        const listener = this.eventListenerHelper.attachEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    }
    onPassive(eventName, callback, debounceInterval) {
        const listener = this.eventListenerHelper.attachPassiveEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    }
    off(eventName) {
        let listenersToKeep;
        let listenersToRemove;
        if (!ValueHelper.isNullOrUndefined(eventName)) {
            listenersToKeep = this.eventListeners.filter((event) => event.eventName !== eventName);
            listenersToRemove = this.eventListeners.filter((event) => event.eventName === eventName);
        }
        else {
            listenersToKeep = [];
            listenersToRemove = this.eventListeners;
        }
        for (const listener of listenersToRemove) {
            this.eventListenerHelper.detachEventListener(listener);
        }
        this.eventListeners = listenersToKeep;
    }
    isRefDestroyed() {
        return ValueHelper.isNullOrUndefined(this.changeDetectionRef) || this.changeDetectionRef['destroyed'];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.4", type: SliderElementDirective, isStandalone: false, selector: "[ngxSliderElement]", host: { properties: { "style.opacity": "this.opacity", "style.visibility": "this.visibility", "style.left": "this.left", "style.bottom": "this.bottom", "style.height": "this.height", "style.width": "this.width", "style.transform": "this.transform" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxSliderElement]',
                    standalone: false
                }]
        }], ctorParameters: () => [], propDecorators: { opacity: [{
                type: HostBinding,
                args: ['style.opacity']
            }], visibility: [{
                type: HostBinding,
                args: ['style.visibility']
            }], left: [{
                type: HostBinding,
                args: ['style.left']
            }], bottom: [{
                type: HostBinding,
                args: ['style.bottom']
            }], height: [{
                type: HostBinding,
                args: ['style.height']
            }], width: [{
                type: HostBinding,
                args: ['style.width']
            }], transform: [{
                type: HostBinding,
                args: ['style.transform']
            }] } });

class SliderHandleDirective extends SliderElementDirective {
    active = false;
    role = '';
    tabindex = '';
    ariaOrientation = '';
    ariaLabel = '';
    ariaLabelledBy = '';
    ariaValueNow = '';
    ariaValueText = '';
    ariaValueMin = '';
    ariaValueMax = '';
    document = inject(DOCUMENT);
    focus() {
        this.elemRef.nativeElement.focus();
    }
    focusIfNeeded() {
        if (this.document.activeElement !== this.elemRef.nativeElement) {
            this.elemRef.nativeElement.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderHandleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.4", type: SliderHandleDirective, isStandalone: false, selector: "[ngxSliderHandle]", host: { properties: { "class.ngx-slider-active": "this.active", "attr.role": "this.role", "attr.tabindex": "this.tabindex", "attr.aria-orientation": "this.ariaOrientation", "attr.aria-label": "this.ariaLabel", "attr.aria-labelledby": "this.ariaLabelledBy", "attr.aria-valuenow": "this.ariaValueNow", "attr.aria-valuetext": "this.ariaValueText", "attr.aria-valuemin": "this.ariaValueMin", "attr.aria-valuemax": "this.ariaValueMax" } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderHandleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxSliderHandle]',
                    standalone: false,
                }]
        }], propDecorators: { active: [{
                type: HostBinding,
                args: ['class.ngx-slider-active']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], tabindex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], ariaOrientation: [{
                type: HostBinding,
                args: ['attr.aria-orientation']
            }], ariaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], ariaLabelledBy: [{
                type: HostBinding,
                args: ['attr.aria-labelledby']
            }], ariaValueNow: [{
                type: HostBinding,
                args: ['attr.aria-valuenow']
            }], ariaValueText: [{
                type: HostBinding,
                args: ['attr.aria-valuetext']
            }], ariaValueMin: [{
                type: HostBinding,
                args: ['attr.aria-valuemin']
            }], ariaValueMax: [{
                type: HostBinding,
                args: ['attr.aria-valuemax']
            }] } });

class SliderLabelDirective extends SliderElementDirective {
    allowUnsafeHtmlInSlider = inject(AllowUnsafeHtmlInSlider, {
        optional: true,
    });
    _value = null;
    get value() {
        return this._value;
    }
    setValue(value) {
        let recalculateDimension = false;
        if (!this.alwaysHide &&
            (ValueHelper.isNullOrUndefined(this.value) ||
                this.value.length !== value.length ||
                (this.value.length > 0 && this.dimension === 0))) {
            recalculateDimension = true;
        }
        this._value = value;
        if (this.allowUnsafeHtmlInSlider === false) {
            this.elemRef.nativeElement.innerText = value;
        }
        else {
            this.elemRef.nativeElement.innerHTML = value;
        }
        // Update dimension only when length of the label have changed
        if (recalculateDimension) {
            this.calculateDimension();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderLabelDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.4", type: SliderLabelDirective, isStandalone: false, selector: "[ngxSliderLabel]", usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderLabelDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxSliderLabel]',
                    standalone: false,
                }]
        }] });

class TooltipWrapperComponent {
    template;
    tooltip;
    placement;
    content;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: TooltipWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.0.4", type: TooltipWrapperComponent, isStandalone: false, selector: "ngx-slider-tooltip-wrapper", inputs: { template: "template", tooltip: "tooltip", placement: "placement", content: "content" }, ngImport: i0, template: "@if (template) {\n  <ng-template *ngTemplateOutlet=\"template; context: {tooltip: tooltip, placement: placement, content: content}\"></ng-template>\n}\n\n@if (!template) {\n  <div class=\"ngx-slider-inner-tooltip\" [attr.title]=\"tooltip\" [attr.data-tooltip-placement]=\"placement\">\n    {{content}}\n  </div>\n}", styles: [".ngx-slider-inner-tooltip{height:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: TooltipWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-slider-tooltip-wrapper', standalone: false, template: "@if (template) {\n  <ng-template *ngTemplateOutlet=\"template; context: {tooltip: tooltip, placement: placement, content: content}\"></ng-template>\n}\n\n@if (!template) {\n  <div class=\"ngx-slider-inner-tooltip\" [attr.title]=\"tooltip\" [attr.data-tooltip-placement]=\"placement\">\n    {{content}}\n  </div>\n}", styles: [".ngx-slider-inner-tooltip{height:100%}\n"] }]
        }], propDecorators: { template: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], placement: [{
                type: Input
            }], content: [{
                type: Input
            }] } });

class Tick {
    selected = false;
    style = {};
    tooltip = null;
    tooltipPlacement = null;
    value = null;
    valueTooltip = null;
    valueTooltipPlacement = null;
    legend = null;
}
class Dragging {
    active = false;
    value = 0;
    difference = 0;
    position = 0;
    lowLimit = 0;
    highLimit = 0;
}
class ModelValues {
    value;
    highValue;
    static compare(x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value && x.highValue === y.highValue;
    }
}
class ModelChange extends ModelValues {
    // Flag used to by-pass distinctUntilChanged() filter on input values
    // (sometimes there is a need to pass values through even though the model values have not changed)
    forceChange;
    static compare(x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return (x.value === y.value &&
            x.highValue === y.highValue &&
            x.forceChange === y.forceChange);
    }
}
class InputModelChange extends ModelChange {
    controlAccessorChange;
    internalChange;
}
class OutputModelChange extends ModelChange {
    controlAccessorChange;
    userEventInitiated;
}
const NGX_SLIDER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef(() => SliderComponent),
    multi: true,
};
class SliderComponent {
    renderer = inject(Renderer2);
    elementRef = inject(ElementRef);
    changeDetectionRef = inject(ChangeDetectorRef);
    zone = inject(NgZone);
    allowUnsafeHtmlInSlider = inject(AllowUnsafeHtmlInSlider, { optional: true });
    // Add ngx-slider class to the host element - this is static, should never change
    sliderElementNgxSliderClass = true;
    // Model for low value of slider. For simple slider, this is the only input. For range slider, this is the low value.
    value = null;
    // Output for low value slider to support two-way bindings
    valueChange = new EventEmitter();
    // Model for high value of slider. Not used in simple slider. For range slider, this is the high value.
    highValue = null;
    // Output for high value slider to support two-way bindings
    highValueChange = new EventEmitter();
    // An object with all the other options of the slider.
    // Each option can be updated at runtime and the slider will automatically be re-rendered.
    options = new Options();
    // Event emitted when user starts interaction with the slider
    userChangeStart = new EventEmitter();
    // Event emitted on each change coming from user interaction
    userChange = new EventEmitter();
    // Event emitted when user finishes interaction with the slider
    userChangeEnd = new EventEmitter();
    manualRefreshSubscription;
    // Input event that triggers slider refresh (re-positioning of slider elements)
    set manualRefresh(manualRefresh) {
        this.unsubscribeManualRefresh();
        this.manualRefreshSubscription = manualRefresh.subscribe(() => {
            setTimeout(() => this.calculateViewDimensionsAndDetectChanges());
        });
    }
    triggerFocusSubscription;
    // Input event that triggers setting focus on given slider handle
    set triggerFocus(triggerFocus) {
        this.unsubscribeTriggerFocus();
        this.triggerFocusSubscription = triggerFocus.subscribe((pointerType) => {
            this.focusPointer(pointerType);
        });
    }
    cancelUserChangeSubscription;
    set cancelUserChange(cancelUserChange) {
        this.unsubscribeCancelUserChange();
        this.cancelUserChangeSubscription = cancelUserChange.subscribe(() => {
            if (this.moving) {
                this.positionTrackingHandle(this.preStartHandleValue);
                this.forceEnd(true);
            }
        });
    }
    // Slider type, true means range slider
    get range() {
        return (!ValueHelper.isNullOrUndefined(this.value) &&
            !ValueHelper.isNullOrUndefined(this.highValue));
    }
    // Set to true if init method already executed
    initHasRun = false;
    // Changes in model inputs are passed through this subject
    // These are all changes coming in from outside the component through input bindings or reactive form inputs
    inputModelChangeSubject = new Subject();
    inputModelChangeSubscription = null;
    // Changes to model outputs are passed through this subject
    // These are all changes that need to be communicated to output emitters and registered callbacks
    outputModelChangeSubject = new Subject();
    outputModelChangeSubscription = null;
    // Low value synced to model low value
    viewLowValue = null;
    // High value synced to model high value
    viewHighValue = null;
    // Options synced to model options, based on defaults
    viewOptions = new Options();
    // Half of the width or height of the slider handles
    handleHalfDimension = 0;
    // Maximum position the slider handle can have
    maxHandlePosition = 0;
    // Which handle is currently tracked for move events
    currentTrackingPointer = null;
    // Internal variable to keep track of the focus element
    currentFocusPointer = null;
    // Used to call onStart on the first keydown event
    firstKeyDown = false;
    // Current touch id of touch event being handled
    touchId = null;
    // Values recorded when first dragging the bar
    dragging = new Dragging();
    // Value of hanlde at the beginning of onStart()
    preStartHandleValue = null;
    /* Slider DOM elements */
    // Left selection bar outside two handles
    leftOuterSelectionBarElement;
    // Right selection bar outside two handles
    rightOuterSelectionBarElement;
    // The whole slider bar
    fullBarElement;
    // Highlight between two handles
    selectionBarElement;
    // Left slider handle
    minHandleElement;
    // Right slider handle
    maxHandleElement;
    // Floor label
    floorLabelElement;
    // Ceiling label
    ceilLabelElement;
    // Label above the low value
    minHandleLabelElement;
    // Label above the high value
    maxHandleLabelElement;
    // Combined label
    combinedLabelElement;
    // The ticks
    ticksElement;
    // Optional custom template for displaying tooltips
    tooltipTemplate;
    // Host element class bindings
    sliderElementVerticalClass = false;
    sliderElementAnimateClass = false;
    sliderElementWithLegendClass = false;
    sliderElementDisabledAttr = null;
    sliderElementAriaLabel = 'ngx-slider';
    // CSS styles and class flags
    barStyle = {};
    minPointerStyle = {};
    maxPointerStyle = {};
    fullBarTransparentClass = false;
    selectionBarDraggableClass = false;
    ticksUnderValuesClass = false;
    // Restricted range bars styles
    restrictedBars = [];
    // Whether to show/hide ticks
    get showTicks() {
        return this.viewOptions.showTicks;
    }
    /* If tickStep is set or ticksArray is specified.
       In this case, ticks values should be displayed below the slider. */
    intermediateTicks = false;
    // Ticks array as displayed in view
    ticks = [];
    // Event listeners
    eventListenerHelper = null;
    onMoveEventListener = null;
    onEndEventListener = null;
    onCancelEventListener = null;
    // Whether currently moving the slider (between onStart() and onEnd())
    moving = false;
    // Observer for slider element resize events
    resizeObserver = null;
    // Callbacks for reactive forms support
    onTouchedCallback = null;
    onChangeCallback = null;
    document = inject(DOCUMENT);
    constructor() {
        this.eventListenerHelper = new EventListenerHelper(this.renderer);
    }
    // OnInit interface
    ngOnInit() {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        // We need to run these two things first, before the rest of the init in ngAfterViewInit(),
        // because these two settings are set through @HostBinding and Angular change detection
        // mechanism doesn't like them changing in ngAfterViewInit()
        this.updateDisabledState();
        this.updateVerticalState();
        this.updateAriaLabel();
    }
    // AfterViewInit interface
    ngAfterViewInit() {
        this.applyOptions();
        this.subscribeInputModelChangeSubject();
        this.subscribeOutputModelChangeSubject();
        // Once we apply options, we need to normalise model values for the first time
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.updateVerticalState(); // need to run this again to cover changes to slider elements
        this.manageElementsStyle();
        this.updateDisabledState();
        this.calculateViewDimensions();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        this.initHandles();
        this.manageEventsBindings();
        this.updateAriaLabel();
        this.subscribeResizeObserver();
        this.initHasRun = true;
        // Run change detection manually to resolve some issues when init procedure changes values used in the view
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    }
    // OnChanges interface
    ngOnChanges(changes) {
        // Always apply options first
        if (!ValueHelper.isNullOrUndefined(changes.options) &&
            JSON.stringify(changes.options.previousValue) !==
                JSON.stringify(changes.options.currentValue)) {
            this.onChangeOptions();
        }
        // Then value changes
        if (!ValueHelper.isNullOrUndefined(changes.value) ||
            !ValueHelper.isNullOrUndefined(changes.highValue)) {
            this.inputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                controlAccessorChange: false,
                forceChange: false,
                internalChange: false,
            });
        }
    }
    // OnDestroy interface
    ngOnDestroy() {
        this.unbindEvents();
        this.unsubscribeResizeObserver();
        this.unsubscribeInputModelChangeSubject();
        this.unsubscribeOutputModelChangeSubject();
        this.unsubscribeManualRefresh();
        this.unsubscribeTriggerFocus();
    }
    // ControlValueAccessor interface
    writeValue(obj) {
        if (obj instanceof Array) {
            this.value = obj[0];
            this.highValue = obj[1];
        }
        else {
            this.value = obj;
        }
        // ngOnChanges() is not called in this instance, so we need to communicate the change manually
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            forceChange: false,
            internalChange: false,
            controlAccessorChange: true,
        });
    }
    // ControlValueAccessor interface
    registerOnChange(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
    // ControlValueAccessor interface
    registerOnTouched(onTouchedCallback) {
        this.onTouchedCallback = onTouchedCallback;
    }
    // ControlValueAccessor interface
    setDisabledState(isDisabled) {
        this.viewOptions.disabled = isDisabled;
        this.updateDisabledState();
        if (this.initHasRun) {
            this.manageEventsBindings();
        }
    }
    setAriaLabel(ariaLabel) {
        this.viewOptions.ariaLabel = ariaLabel;
        this.updateAriaLabel();
    }
    onResize(event) {
        this.calculateViewDimensionsAndDetectChanges();
    }
    subscribeInputModelChangeSubject() {
        this.inputModelChangeSubscription = this.inputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), 
        // Hack to reset the status of the distinctUntilChanged() - if a "fake" event comes through with forceChange=true,
        // we forcefully by-pass distinctUntilChanged(), but otherwise drop the event
        filter((modelChange) => !modelChange.forceChange && !modelChange.internalChange))
            .subscribe((modelChange) => this.applyInputModelChange(modelChange));
    }
    subscribeOutputModelChangeSubject() {
        this.outputModelChangeSubscription = this.outputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare))
            .subscribe((modelChange) => this.publishOutputModelChange(modelChange));
    }
    subscribeResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => this.calculateViewDimensionsAndDetectChanges());
        this.resizeObserver.observe(this.elementRef.nativeElement);
    }
    unsubscribeResizeObserver() {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
    }
    unsubscribeOnMove() {
        if (!ValueHelper.isNullOrUndefined(this.onMoveEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
            this.onMoveEventListener = null;
        }
    }
    unsubscribeOnEnd() {
        if (!ValueHelper.isNullOrUndefined(this.onEndEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onEndEventListener);
            this.onEndEventListener = null;
        }
        if (!ValueHelper.isNullOrUndefined(this.onCancelEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onCancelEventListener);
            this.onCancelEventListener = null;
        }
    }
    unsubscribeInputModelChangeSubject() {
        if (!ValueHelper.isNullOrUndefined(this.inputModelChangeSubscription)) {
            this.inputModelChangeSubscription.unsubscribe();
            this.inputModelChangeSubscription = null;
        }
    }
    unsubscribeOutputModelChangeSubject() {
        if (!ValueHelper.isNullOrUndefined(this.outputModelChangeSubscription)) {
            this.outputModelChangeSubscription.unsubscribe();
            this.outputModelChangeSubscription = null;
        }
    }
    unsubscribeManualRefresh() {
        if (!ValueHelper.isNullOrUndefined(this.manualRefreshSubscription)) {
            this.manualRefreshSubscription.unsubscribe();
            this.manualRefreshSubscription = null;
        }
    }
    unsubscribeTriggerFocus() {
        if (!ValueHelper.isNullOrUndefined(this.triggerFocusSubscription)) {
            this.triggerFocusSubscription.unsubscribe();
            this.triggerFocusSubscription = null;
        }
    }
    unsubscribeCancelUserChange() {
        if (!ValueHelper.isNullOrUndefined(this.cancelUserChangeSubscription)) {
            this.cancelUserChangeSubscription.unsubscribe();
            this.cancelUserChangeSubscription = null;
        }
    }
    getPointerElement(pointerType) {
        if (pointerType === PointerType.Min) {
            return this.minHandleElement;
        }
        else if (pointerType === PointerType.Max) {
            return this.maxHandleElement;
        }
        return null;
    }
    getCurrentTrackingValue() {
        if (this.currentTrackingPointer === PointerType.Min) {
            return this.viewLowValue;
        }
        else if (this.currentTrackingPointer === PointerType.Max) {
            return this.viewHighValue;
        }
        return null;
    }
    modelValueToViewValue(modelValue) {
        if (ValueHelper.isNullOrUndefined(modelValue)) {
            return NaN;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) &&
            !this.viewOptions.bindIndexForStepsArray) {
            return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
        }
        return +modelValue;
    }
    viewValueToModelValue(viewValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) &&
            !this.viewOptions.bindIndexForStepsArray) {
            return this.getStepValue(viewValue);
        }
        return viewValue;
    }
    getStepValue(sliderValue) {
        const step = this.viewOptions.stepsArray[sliderValue];
        return !ValueHelper.isNullOrUndefined(step) ? step.value : NaN;
    }
    applyViewChange() {
        this.value = this.viewValueToModelValue(this.viewLowValue);
        if (this.range) {
            this.highValue = this.viewValueToModelValue(this.viewHighValue);
        }
        this.outputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            controlAccessorChange: false,
            userEventInitiated: true,
            forceChange: false,
        });
        // At this point all changes are applied and outputs are emitted, so we should be done.
        // However, input changes are communicated in different stream and we need to be ready to
        // act on the next input change even if it is exactly the same as last input change.
        // Therefore, we send a special event to reset the stream.
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            controlAccessorChange: false,
            forceChange: false,
            internalChange: true,
        });
    }
    // Apply model change to the slider view
    applyInputModelChange(modelChange) {
        const normalisedModelChange = this.normaliseModelValues(modelChange);
        // If normalised model change is different, apply the change to the model values
        const normalisationChange = !ModelValues.compare(modelChange, normalisedModelChange);
        if (normalisationChange) {
            this.value = normalisedModelChange.value;
            this.highValue = normalisedModelChange.highValue;
        }
        this.viewLowValue = this.modelValueToViewValue(normalisedModelChange.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(normalisedModelChange.highValue);
        }
        else {
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
            this.updateCombinedLabel();
        }
        // At the end, we need to communicate the model change to the outputs as well
        // Normalisation changes are also always forced out to ensure that subscribers always end up in correct state
        this.outputModelChangeSubject.next({
            value: normalisedModelChange.value,
            highValue: normalisedModelChange.highValue,
            controlAccessorChange: modelChange.controlAccessorChange,
            forceChange: normalisationChange,
            userEventInitiated: false,
        });
    }
    // Publish model change to output event emitters and registered callbacks
    publishOutputModelChange(modelChange) {
        const emitOutputs = () => {
            this.valueChange.emit(modelChange.value);
            if (this.range) {
                this.highValueChange.emit(modelChange.highValue);
            }
            // If this change is coming from a control accessor (i.e. angular called `writeValue`)
            // then we do not want to call the angular callbacks.
            if (modelChange.controlAccessorChange) {
                return;
            }
            if (!ValueHelper.isNullOrUndefined(this.onChangeCallback)) {
                if (this.range) {
                    this.onChangeCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    this.onChangeCallback(modelChange.value);
                }
            }
            if (!ValueHelper.isNullOrUndefined(this.onTouchedCallback)) {
                if (this.range) {
                    this.onTouchedCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    this.onTouchedCallback(modelChange.value);
                }
            }
        };
        if (modelChange.userEventInitiated) {
            // If this change was initiated by a user event, we can emit outputs in the same tick
            emitOutputs();
            this.userChange.emit(this.getChangeContext());
        }
        else {
            // But, if the change was initated by something else like a change in input bindings,
            // we need to wait until next tick to emit the outputs to keep Angular change detection happy
            setTimeout(() => {
                emitOutputs();
            });
        }
    }
    normaliseModelValues(input) {
        const normalisedInput = new ModelValues();
        normalisedInput.value = input.value;
        normalisedInput.highValue = input.highValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            // When using steps array, only round to nearest step in the array
            // No other enforcement can be done, as the step array may be out of order, and that is perfectly fine
            if (this.viewOptions.enforceStepsArray) {
                const valueIndex = ValueHelper.findStepIndex(normalisedInput.value, this.viewOptions.stepsArray);
                normalisedInput.value = this.viewOptions.stepsArray[valueIndex].value;
                if (this.range) {
                    const highValueIndex = ValueHelper.findStepIndex(normalisedInput.highValue, this.viewOptions.stepsArray);
                    normalisedInput.highValue =
                        this.viewOptions.stepsArray[highValueIndex].value;
                }
            }
            return normalisedInput;
        }
        if (this.viewOptions.enforceStep) {
            normalisedInput.value = this.roundStep(normalisedInput.value);
            if (this.range) {
                normalisedInput.highValue = this.roundStep(normalisedInput.highValue);
            }
        }
        if (this.viewOptions.enforceRange) {
            normalisedInput.value = MathHelper.clampToRange(normalisedInput.value, this.viewOptions.floor, this.viewOptions.ceil);
            if (this.range) {
                normalisedInput.highValue = MathHelper.clampToRange(normalisedInput.highValue, this.viewOptions.floor, this.viewOptions.ceil);
            }
            // Make sure that range slider invariant (value <= highValue) is always satisfied
            if (this.range && input.value > input.highValue) {
                // We know that both values are now clamped correctly, they may just be in the wrong order
                // So the easy solution is to swap them... except swapping is sometimes disabled in options, so we make the two values the same
                if (this.viewOptions.noSwitching) {
                    normalisedInput.value = normalisedInput.highValue;
                }
                else {
                    const tempValue = input.value;
                    normalisedInput.value = input.highValue;
                    normalisedInput.highValue = tempValue;
                }
            }
        }
        return normalisedInput;
    }
    renormaliseModelValues() {
        const previousModelValues = {
            value: this.value,
            highValue: this.highValue,
        };
        const normalisedModelValues = this.normaliseModelValues(previousModelValues);
        if (!ModelValues.compare(normalisedModelValues, previousModelValues)) {
            this.value = normalisedModelValues.value;
            this.highValue = normalisedModelValues.highValue;
            this.outputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                controlAccessorChange: false,
                forceChange: true,
                userEventInitiated: false,
            });
        }
    }
    onChangeOptions() {
        if (!this.initHasRun) {
            return;
        }
        const previousOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        this.applyOptions();
        const newOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        // Avoid re-binding events in case nothing changes that can influence it
        // It makes it possible to change options while dragging the slider
        const rebindEvents = !ValueHelper.areArraysEqual(previousOptionsInfluencingEventBindings, newOptionsInfluencingEventBindings);
        // With new options, we need to re-normalise model values if necessary
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.resetSlider(rebindEvents);
    }
    // Read the user options and apply them to the slider model
    applyOptions() {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        this.viewOptions.draggableRange =
            this.range && this.viewOptions.draggableRange;
        this.viewOptions.draggableRangeOnly =
            this.range && this.viewOptions.draggableRangeOnly;
        if (this.viewOptions.draggableRangeOnly) {
            this.viewOptions.draggableRange = true;
        }
        this.viewOptions.showTicks =
            this.viewOptions.showTicks ||
                this.viewOptions.showTicksValues ||
                !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray);
        if (this.viewOptions.showTicks &&
            (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) ||
                !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray))) {
            this.intermediateTicks = true;
        }
        this.viewOptions.showSelectionBar =
            this.viewOptions.showSelectionBar ||
                this.viewOptions.showSelectionBarEnd ||
                !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            this.applyStepsArrayOptions();
        }
        else {
            this.applyFloorCeilOptions();
        }
        if (ValueHelper.isNullOrUndefined(this.viewOptions.combineLabels)) {
            this.viewOptions.combineLabels = (minValue, maxValue) => {
                return minValue + ' - ' + maxValue;
            };
        }
        if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
            throw Error("Can't use floor=0 with logarithmic scale");
        }
    }
    applyStepsArrayOptions() {
        this.viewOptions.floor = 0;
        this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
        this.viewOptions.step = 1;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = (modelValue) => {
                if (this.viewOptions.bindIndexForStepsArray) {
                    return String(this.getStepValue(modelValue));
                }
                return String(modelValue);
            };
        }
    }
    applyFloorCeilOptions() {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.step)) {
            this.viewOptions.step = 1;
        }
        else {
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
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = (value) => String(value);
        }
    }
    // Resets slider
    resetSlider(rebindEvents = true) {
        this.manageElementsStyle();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        if (rebindEvents) {
            this.unbindEvents();
            this.manageEventsBindings();
        }
        this.updateDisabledState();
        this.updateAriaLabel();
        this.calculateViewDimensions();
        this.refocusPointerIfNeeded();
    }
    // Sets focus on the specified pointer
    focusPointer(pointerType) {
        // If not supplied, use min pointer as default
        if (pointerType !== PointerType.Min && pointerType !== PointerType.Max) {
            pointerType = PointerType.Min;
        }
        if (pointerType === PointerType.Min) {
            this.minHandleElement.focus();
        }
        else if (this.range && pointerType === PointerType.Max) {
            this.maxHandleElement.focus();
        }
    }
    refocusPointerIfNeeded() {
        if (!ValueHelper.isNullOrUndefined(this.currentFocusPointer)) {
            const element = this.getPointerElement(this.currentFocusPointer);
            element.focusIfNeeded();
        }
    }
    // Update each elements style based on options
    manageElementsStyle() {
        this.updateScale();
        this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        const hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
        this.minHandleLabelElement.setAlwaysHide(hideLabelsForTicks || this.viewOptions.hidePointerLabels);
        this.maxHandleLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.combinedLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.selectionBarElement.setAlwaysHide(!this.range && !this.viewOptions.showSelectionBar);
        this.leftOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.rightOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.fullBarTransparentClass =
            this.range && this.viewOptions.showOuterSelectionBars;
        this.selectionBarDraggableClass =
            this.viewOptions.draggableRange && !this.viewOptions.onlyBindHandles;
        this.ticksUnderValuesClass =
            this.intermediateTicks && this.options.showTicksValues;
        if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
            this.updateVerticalState();
            // The above change in host component class will not be applied until the end of this cycle
            // However, functions calculating the slider position expect the slider to be already styled as vertical
            // So as a workaround, we need to reset the slider once again to compute the correct values
            setTimeout(() => {
                this.resetSlider();
            });
        }
        // Changing animate class may interfere with slider reset/initialisation, so we should set it separately,
        // after all is properly set up
        if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
            setTimeout(() => {
                this.sliderElementAnimateClass = this.viewOptions.animate;
            });
        }
        this.updateRotate();
    }
    // Manage the events bindings based on readOnly and disabled options
    manageEventsBindings() {
        if (this.viewOptions.disabled || this.viewOptions.readOnly) {
            this.unbindEvents();
        }
        else {
            this.bindEvents();
        }
    }
    // Set the disabled state based on disabled option
    updateDisabledState() {
        this.sliderElementDisabledAttr = this.viewOptions.disabled
            ? 'disabled'
            : null;
    }
    // Set the aria-label state based on ariaLabel option
    updateAriaLabel() {
        this.sliderElementAriaLabel = this.viewOptions.ariaLabel || 'nxg-slider';
    }
    // Set vertical state based on vertical option
    updateVerticalState() {
        this.sliderElementVerticalClass = this.viewOptions.vertical;
        for (const element of this.getAllSliderElements()) {
            // This is also called before ngAfterInit, so need to check that view child bindings work
            if (!ValueHelper.isNullOrUndefined(element)) {
                element.setVertical(this.viewOptions.vertical);
            }
        }
    }
    updateScale() {
        for (const element of this.getAllSliderElements()) {
            element.setScale(this.viewOptions.scale);
        }
    }
    updateRotate() {
        for (const element of this.getAllSliderElements()) {
            element.setRotate(this.viewOptions.rotate);
        }
    }
    getAllSliderElements() {
        return [
            this.leftOuterSelectionBarElement,
            this.rightOuterSelectionBarElement,
            this.fullBarElement,
            this.selectionBarElement,
            this.minHandleElement,
            this.maxHandleElement,
            this.floorLabelElement,
            this.ceilLabelElement,
            this.minHandleLabelElement,
            this.maxHandleLabelElement,
            this.combinedLabelElement,
            this.ticksElement,
        ];
    }
    // Initialize slider handles positions and labels
    // Run only once during initialization and every time view port changes size
    initHandles() {
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
            this.updateCombinedLabel();
        }
        this.updateTicksScale();
    }
    // Adds accessibility attributes, run only once during initialization
    addAccessibility() {
        this.updateAriaAttributes();
        this.minHandleElement.role = 'slider';
        if (this.viewOptions.keyboardSupport &&
            !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
            this.minHandleElement.tabindex = '0';
        }
        else {
            this.minHandleElement.tabindex = '';
        }
        this.minHandleElement.ariaOrientation =
            this.viewOptions.vertical || this.viewOptions.rotate !== 0
                ? 'vertical'
                : 'horizontal';
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabel)) {
            this.minHandleElement.ariaLabel = this.viewOptions.ariaLabel;
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledBy)) {
            this.minHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledBy;
        }
        if (this.range) {
            this.maxHandleElement.role = 'slider';
            if (this.viewOptions.keyboardSupport &&
                !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
                this.maxHandleElement.tabindex = '0';
            }
            else {
                this.maxHandleElement.tabindex = '';
            }
            this.maxHandleElement.ariaOrientation =
                this.viewOptions.vertical || this.viewOptions.rotate !== 0
                    ? 'vertical'
                    : 'horizontal';
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelHigh)) {
                this.maxHandleElement.ariaLabel = this.viewOptions.ariaLabelHigh;
            }
            else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledByHigh)) {
                this.maxHandleElement.ariaLabelledBy =
                    this.viewOptions.ariaLabelledByHigh;
            }
        }
    }
    // Updates aria attributes according to current values
    updateAriaAttributes() {
        this.minHandleElement.ariaValueNow = (+this.value).toString();
        this.minHandleElement.ariaValueText = this.viewOptions.translate(+this.value, LabelType.Low);
        this.minHandleElement.ariaValueMin = this.viewOptions.floor.toString();
        this.minHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        if (this.range) {
            this.maxHandleElement.ariaValueNow = (+this.highValue).toString();
            this.maxHandleElement.ariaValueText = this.viewOptions.translate(+this.highValue, LabelType.High);
            this.maxHandleElement.ariaValueMin = this.viewOptions.floor.toString();
            this.maxHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        }
    }
    // Calculate dimensions that are dependent on view port size
    // Run once during initialization and every time view port changes size.
    calculateViewDimensions() {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.handleDimension)) {
            this.minHandleElement.setDimension(this.viewOptions.handleDimension);
        }
        else {
            this.minHandleElement.calculateDimension();
        }
        const handleWidth = this.minHandleElement.dimension;
        this.handleHalfDimension = handleWidth / 2;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.barDimension)) {
            this.fullBarElement.setDimension(this.viewOptions.barDimension);
        }
        else {
            this.fullBarElement.calculateDimension();
        }
        this.maxHandlePosition = this.fullBarElement.dimension - handleWidth;
        if (this.initHasRun) {
            this.updateFloorLabel();
            this.updateCeilLabel();
            this.initHandles();
        }
    }
    calculateViewDimensionsAndDetectChanges() {
        this.calculateViewDimensions();
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    }
    /**
     * If the slider reference is already destroyed
     * @returns boolean - true if ref is destroyed
     */
    isRefDestroyed() {
        return this.changeDetectionRef['destroyed'];
    }
    // Update the ticks position
    updateTicksScale() {
        if (!this.viewOptions.showTicks && this.sliderElementWithLegendClass) {
            setTimeout(() => {
                this.sliderElementWithLegendClass = false;
            });
            return;
        }
        const ticksArray = !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray)
            ? this.viewOptions.ticksArray
            : this.getTicksArray();
        const translate = this.viewOptions.vertical
            ? 'translateY'
            : 'translateX';
        if (this.viewOptions.rightToLeft) {
            ticksArray.reverse();
        }
        const tickValueStep = !ValueHelper.isNullOrUndefined(this.viewOptions.tickValueStep)
            ? this.viewOptions.tickValueStep
            : !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)
                ? this.viewOptions.tickStep
                : this.viewOptions.step;
        let hasAtLeastOneLegend = false;
        const newTicks = ticksArray.map((value) => {
            let position = this.valueToPosition(value);
            if (this.viewOptions.vertical) {
                position = this.maxHandlePosition - position;
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
            if (tick.selected &&
                !ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
                tick.style['background-color'] = this.getSelectionBarColor();
            }
            if (!tick.selected &&
                !ValueHelper.isNullOrUndefined(this.viewOptions.getTickColor)) {
                tick.style['background-color'] = this.getTickColor(value);
            }
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.ticksTooltip)) {
                tick.tooltip = this.viewOptions.ticksTooltip(value);
                tick.tooltipPlacement = this.viewOptions.vertical ? 'right' : 'top';
            }
            if (this.viewOptions.showTicksValues &&
                !ValueHelper.isNullOrUndefined(tickValueStep) &&
                MathHelper.isModuloWithinPrecisionLimit(value, tickValueStep, this.viewOptions.precisionLimit)) {
                tick.value = this.getDisplayValue(value, LabelType.TickValue);
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.ticksValuesTooltip)) {
                    tick.valueTooltip = this.viewOptions.ticksValuesTooltip(value);
                    tick.valueTooltipPlacement = this.viewOptions.vertical
                        ? 'right'
                        : 'top';
                }
            }
            let legend = null;
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
                const step = this.viewOptions.stepsArray[value];
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.getStepLegend)) {
                    legend = this.viewOptions.getStepLegend(step);
                }
                else if (!ValueHelper.isNullOrUndefined(step)) {
                    legend = step.legend;
                }
            }
            else if (!ValueHelper.isNullOrUndefined(this.viewOptions.getLegend)) {
                legend = this.viewOptions.getLegend(value);
            }
            if (!ValueHelper.isNullOrUndefined(legend)) {
                tick.legend = legend;
                hasAtLeastOneLegend = true;
            }
            return tick;
        });
        if (this.sliderElementWithLegendClass !== hasAtLeastOneLegend) {
            setTimeout(() => {
                this.sliderElementWithLegendClass = hasAtLeastOneLegend;
            });
        }
        // We should avoid re-creating the ticks array if possible
        // This both improves performance and makes CSS animations work correctly
        if (!ValueHelper.isNullOrUndefined(this.ticks) &&
            this.ticks.length === newTicks.length) {
            for (let i = 0; i < newTicks.length; ++i) {
                Object.assign(this.ticks[i], newTicks[i]);
            }
        }
        else {
            this.ticks = newTicks;
            if (!this.isRefDestroyed()) {
                this.changeDetectionRef.detectChanges();
            }
        }
    }
    getTicksArray() {
        if (!this.viewOptions.showTicks) {
            return [];
        }
        const step = !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)
            ? this.viewOptions.tickStep
            : this.viewOptions.step;
        const ticksArray = [];
        const numberOfValues = 1 +
            Math.floor(MathHelper.roundToPrecisionLimit(Math.abs(this.viewOptions.ceil - this.viewOptions.floor) / step, this.viewOptions.precisionLimit));
        for (let index = 0; index < numberOfValues; ++index) {
            ticksArray.push(MathHelper.roundToPrecisionLimit(this.viewOptions.floor + step * index, this.viewOptions.precisionLimit));
        }
        return ticksArray;
    }
    isTickSelected(value) {
        if (!this.range) {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                const center = this.viewOptions.showSelectionBarFromValue;
                if (this.viewLowValue > center &&
                    value >= center &&
                    value <= this.viewLowValue) {
                    return true;
                }
                else if (this.viewLowValue < center &&
                    value <= center &&
                    value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBarEnd) {
                if (value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBar &&
                value <= this.viewLowValue) {
                return true;
            }
        }
        if (this.range &&
            value >= this.viewLowValue &&
            value <= this.viewHighValue) {
            return true;
        }
        return false;
    }
    // Update position of the floor label
    updateFloorLabel() {
        if (!this.floorLabelElement.alwaysHide) {
            this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor));
            this.floorLabelElement.calculateDimension();
            const position = this.viewOptions.rightToLeft
                ? this.fullBarElement.dimension - this.floorLabelElement.dimension
                : 0;
            this.floorLabelElement.setPosition(position);
        }
    }
    // Update position of the ceiling label
    updateCeilLabel() {
        if (!this.ceilLabelElement.alwaysHide) {
            this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil));
            this.ceilLabelElement.calculateDimension();
            const position = this.viewOptions.rightToLeft
                ? 0
                : this.fullBarElement.dimension - this.ceilLabelElement.dimension;
            this.ceilLabelElement.setPosition(position);
        }
    }
    // Update slider handles and label positions
    updateHandles(which, newPos) {
        if (which === PointerType.Min) {
            this.updateLowHandle(newPos);
        }
        else if (which === PointerType.Max) {
            this.updateHighHandle(newPos);
        }
        this.updateSelectionBar();
        this.updateTicksScale();
        if (this.range) {
            this.updateCombinedLabel();
        }
    }
    // Helper function to work out the position for handle labels depending on RTL or not
    getHandleLabelPos(labelType, newPos) {
        const labelDimension = labelType === PointerType.Min
            ? this.minHandleLabelElement.dimension
            : this.maxHandleLabelElement.dimension;
        const nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDimension;
        const endOfBarPos = this.fullBarElement.dimension - labelDimension;
        if (!this.viewOptions.boundPointerLabels) {
            return nearHandlePos;
        }
        if ((this.viewOptions.rightToLeft && labelType === PointerType.Min) ||
            (!this.viewOptions.rightToLeft && labelType === PointerType.Max)) {
            return Math.min(nearHandlePos, endOfBarPos);
        }
        else {
            return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
        }
    }
    // Update low slider handle position and label
    updateLowHandle(newPos) {
        this.minHandleElement.setPosition(newPos);
        this.minHandleLabelElement.setValue(this.getDisplayValue(this.viewLowValue, LabelType.Low));
        this.minHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Min, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.minPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Min),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    }
    // Update high slider handle position and label
    updateHighHandle(newPos) {
        this.maxHandleElement.setPosition(newPos);
        this.maxHandleLabelElement.setValue(this.getDisplayValue(this.viewHighValue, LabelType.High));
        this.maxHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Max, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.maxPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Max),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    }
    // Show/hide floor/ceiling label
    updateFloorAndCeilLabelsVisibility() {
        // Show based only on hideLimitLabels if pointer labels are hidden
        if (this.viewOptions.hidePointerLabels) {
            return;
        }
        let floorLabelHidden = false;
        let ceilLabelHidden = false;
        const isMinLabelAtFloor = this.isLabelBelowFloorLabel(this.minHandleLabelElement);
        const isMinLabelAtCeil = this.isLabelAboveCeilLabel(this.minHandleLabelElement);
        const isMaxLabelAtCeil = this.isLabelAboveCeilLabel(this.maxHandleLabelElement);
        const isCombinedLabelAtFloor = this.isLabelBelowFloorLabel(this.combinedLabelElement);
        const isCombinedLabelAtCeil = this.isLabelAboveCeilLabel(this.combinedLabelElement);
        if (isMinLabelAtFloor) {
            floorLabelHidden = true;
            this.floorLabelElement.hide();
        }
        else {
            floorLabelHidden = false;
            this.floorLabelElement.show();
        }
        if (isMinLabelAtCeil) {
            ceilLabelHidden = true;
            this.ceilLabelElement.hide();
        }
        else {
            ceilLabelHidden = false;
            this.ceilLabelElement.show();
        }
        if (this.range) {
            const hideCeil = this.combinedLabelElement.isVisible()
                ? isCombinedLabelAtCeil
                : isMaxLabelAtCeil;
            const hideFloor = this.combinedLabelElement.isVisible()
                ? isCombinedLabelAtFloor
                : isMinLabelAtFloor;
            if (hideCeil) {
                this.ceilLabelElement.hide();
            }
            else if (!ceilLabelHidden) {
                this.ceilLabelElement.show();
            }
            // Hide or show floor label
            if (hideFloor) {
                this.floorLabelElement.hide();
            }
            else if (!floorLabelHidden) {
                this.floorLabelElement.show();
            }
        }
    }
    isLabelBelowFloorLabel(label) {
        const pos = label.position;
        const dim = label.dimension;
        const floorPos = this.floorLabelElement.position;
        const floorDim = this.floorLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos + dim >= floorPos - 2
            : pos <= floorPos + floorDim + 2;
    }
    isLabelAboveCeilLabel(label) {
        const pos = label.position;
        const dim = label.dimension;
        const ceilPos = this.ceilLabelElement.position;
        const ceilDim = this.ceilLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos <= ceilPos + ceilDim + 2
            : pos + dim >= ceilPos - 2;
    }
    // Update slider selection bar, combined label and range label
    updateSelectionBar() {
        let position = 0;
        let dimension = 0;
        const isSelectionBarFromRight = this.viewOptions.rightToLeft
            ? !this.viewOptions.showSelectionBarEnd
            : this.viewOptions.showSelectionBarEnd;
        const positionForRange = this.viewOptions.rightToLeft
            ? this.maxHandleElement.position + this.handleHalfDimension
            : this.minHandleElement.position + this.handleHalfDimension;
        if (this.range) {
            dimension = Math.abs(this.maxHandleElement.position - this.minHandleElement.position);
            position = positionForRange;
        }
        else {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                const center = this.viewOptions.showSelectionBarFromValue;
                const centerPosition = this.valueToPosition(center);
                const isModelGreaterThanCenter = this.viewOptions.rightToLeft
                    ? this.viewLowValue <= center
                    : this.viewLowValue > center;
                if (isModelGreaterThanCenter) {
                    dimension = this.minHandleElement.position - centerPosition;
                    position = centerPosition + this.handleHalfDimension;
                }
                else {
                    dimension = centerPosition - this.minHandleElement.position;
                    position = this.minHandleElement.position + this.handleHalfDimension;
                }
            }
            else if (isSelectionBarFromRight) {
                dimension = Math.ceil(Math.abs(this.maxHandlePosition - this.minHandleElement.position) +
                    this.handleHalfDimension);
                position = Math.floor(this.minHandleElement.position + this.handleHalfDimension);
            }
            else {
                dimension = this.minHandleElement.position + this.handleHalfDimension;
                position = 0;
            }
        }
        this.selectionBarElement.setDimension(dimension);
        this.selectionBarElement.setPosition(position);
        if (this.range && this.viewOptions.showOuterSelectionBars) {
            if (this.viewOptions.rightToLeft) {
                this.rightOuterSelectionBarElement.setDimension(position);
                this.rightOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.leftOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.leftOuterSelectionBarElement.setPosition(position + dimension);
            }
            else {
                this.leftOuterSelectionBarElement.setDimension(position);
                this.leftOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.rightOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.rightOuterSelectionBarElement.setPosition(position + dimension);
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
            const color = this.getSelectionBarColor();
            this.barStyle = {
                backgroundColor: color,
            };
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
            const offset = !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)
                ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
                : 0;
            const reversed = (offset - position > 0 && !isSelectionBarFromRight) ||
                (offset - position <= 0 && isSelectionBarFromRight);
            const direction = this.viewOptions.vertical
                ? reversed
                    ? 'bottom'
                    : 'top'
                : reversed
                    ? 'left'
                    : 'right';
            this.barStyle = {
                backgroundImage: 'linear-gradient(to ' +
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
                            (reversed ? -this.handleHalfDimension : 0)) +
                        'px';
                this.barStyle.backgroundSize =
                    '100% ' +
                        (this.fullBarElement.dimension - this.handleHalfDimension) +
                        'px';
            }
            else {
                this.barStyle.backgroundPosition =
                    offset -
                        position +
                        (reversed ? this.handleHalfDimension : 0) +
                        'px center';
                this.barStyle.backgroundSize =
                    this.fullBarElement.dimension - this.handleHalfDimension + 'px 100%';
            }
        }
        this.updateRestrictionBar();
    }
    // Update restricted area bar(s)
    updateRestrictionBar() {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.restrictedRange)) {
            this.restrictedBars = [];
            return;
        }
        // Normalize restrictedRange to always be an array
        const restrictedRanges = Array.isArray(this.viewOptions.restrictedRange)
            ? this.viewOptions.restrictedRange
            : [this.viewOptions.restrictedRange];
        this.restrictedBars = restrictedRanges.map((range) => {
            const from = this.valueToPosition(range.from);
            const to = this.valueToPosition(range.to);
            const dimension = Math.abs(to - from);
            const position = this.viewOptions.rightToLeft
                ? to + this.handleHalfDimension
                : from + this.handleHalfDimension;
            const style = {};
            if (this.viewOptions.vertical) {
                style.bottom = position + 'px';
                style.height = dimension + 'px';
            }
            else {
                style.left = position + 'px';
                style.width = dimension + 'px';
            }
            return { style };
        });
    }
    // Wrapper around the getSelectionBarColor of the user to pass to correct parameters
    getSelectionBarColor() {
        if (this.range) {
            return this.viewOptions.getSelectionBarColor(this.value, this.highValue);
        }
        return this.viewOptions.getSelectionBarColor(this.value);
    }
    // Wrapper around the getPointerColor of the user to pass to  correct parameters
    getPointerColor(pointerType) {
        if (pointerType === PointerType.Max) {
            return this.viewOptions.getPointerColor(this.highValue, pointerType);
        }
        return this.viewOptions.getPointerColor(this.value, pointerType);
    }
    // Wrapper around the getTickColor of the user to pass to correct parameters
    getTickColor(value) {
        return this.viewOptions.getTickColor(value);
    }
    // Update combined label position and value
    updateCombinedLabel() {
        let isLabelOverlap = null;
        if (this.viewOptions.rightToLeft) {
            isLabelOverlap =
                this.minHandleLabelElement.position -
                    this.minHandleLabelElement.dimension -
                    10 <=
                    this.maxHandleLabelElement.position;
        }
        else {
            isLabelOverlap =
                this.minHandleLabelElement.position +
                    this.minHandleLabelElement.dimension +
                    10 >=
                    this.maxHandleLabelElement.position;
        }
        if (isLabelOverlap) {
            const lowDisplayValue = this.getDisplayValue(this.viewLowValue, LabelType.Low);
            const highDisplayValue = this.getDisplayValue(this.viewHighValue, LabelType.High);
            const combinedLabelValue = this.viewOptions.rightToLeft
                ? this.viewOptions.combineLabels(highDisplayValue, lowDisplayValue)
                : this.viewOptions.combineLabels(lowDisplayValue, highDisplayValue);
            this.combinedLabelElement.setValue(combinedLabelValue);
            const pos = this.viewOptions.boundPointerLabels
                ? Math.min(Math.max(this.selectionBarElement.position +
                    this.selectionBarElement.dimension / 2 -
                    this.combinedLabelElement.dimension / 2, 0), this.fullBarElement.dimension - this.combinedLabelElement.dimension)
                : this.selectionBarElement.position +
                    this.selectionBarElement.dimension / 2 -
                    this.combinedLabelElement.dimension / 2;
            this.combinedLabelElement.setPosition(pos);
            this.minHandleLabelElement.hide();
            this.maxHandleLabelElement.hide();
            this.combinedLabelElement.show();
        }
        else {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
            this.updateLowHandle(this.valueToPosition(this.viewLowValue));
            this.maxHandleLabelElement.show();
            this.minHandleLabelElement.show();
            this.combinedLabelElement.hide();
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    }
    // Return the translated value if a translate function is provided else the original value
    getDisplayValue(value, which) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) &&
            !this.viewOptions.bindIndexForStepsArray) {
            value = this.getStepValue(value);
        }
        return this.viewOptions.translate(value, which);
    }
    // Round value to step and precision based on minValue
    roundStep(value, customStep) {
        const step = !ValueHelper.isNullOrUndefined(customStep)
            ? customStep
            : this.viewOptions.step;
        let steppedDifference = MathHelper.roundToPrecisionLimit((value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
        steppedDifference = Math.round(steppedDifference) * step;
        return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
    }
    // Translate value to pixel position
    valueToPosition(val) {
        let fn = ValueHelper.linearValueToPosition;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customValueToPosition)) {
            fn = this.viewOptions.customValueToPosition;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logValueToPosition;
        }
        val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
        let percent = fn(val, this.viewOptions.floor, this.viewOptions.ceil);
        if (ValueHelper.isNullOrUndefined(percent)) {
            percent = 0;
        }
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        return percent * this.maxHandlePosition;
    }
    // Translate position to model value
    positionToValue(position) {
        let percent = position / this.maxHandlePosition;
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        let fn = ValueHelper.linearPositionToValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customPositionToValue)) {
            fn = this.viewOptions.customPositionToValue;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logPositionToValue;
        }
        const value = fn(percent, this.viewOptions.floor, this.viewOptions.ceil);
        return !ValueHelper.isNullOrUndefined(value) ? value : 0;
    }
    // Get the X-coordinate or Y-coordinate of an event
    getEventXY(event) {
        return this.viewOptions.vertical || this.viewOptions.rotate !== 0
            ? event.clientY
            : event.clientX;
    }
    // Compute the event position depending on whether the slider is horizontal or vertical
    getEventPosition(event) {
        const sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
        const sliderPos = this.viewOptions.vertical || this.viewOptions.rotate !== 0
            ? sliderElementBoundingRect.bottom
            : sliderElementBoundingRect.left;
        let eventPos = 0;
        if (this.viewOptions.vertical || this.viewOptions.rotate !== 0) {
            eventPos = -this.getEventXY(event) + sliderPos;
        }
        else {
            eventPos = this.getEventXY(event) - sliderPos;
        }
        return eventPos * this.viewOptions.scale - this.handleHalfDimension;
    }
    // Get the handle closest to an event
    getNearestHandle(event) {
        if (!this.range) {
            return PointerType.Min;
        }
        const position = this.getEventPosition(event);
        const distanceMin = Math.abs(position - this.minHandleElement.position);
        const distanceMax = Math.abs(position - this.maxHandleElement.position);
        if (distanceMin < distanceMax) {
            return PointerType.Min;
        }
        else if (distanceMin > distanceMax) {
            return PointerType.Max;
        }
        else if (!this.viewOptions.rightToLeft) {
            // if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
            return position < this.minHandleElement.position
                ? PointerType.Min
                : PointerType.Max;
        }
        // reverse in rtl
        return position > this.minHandleElement.position
            ? PointerType.Min
            : PointerType.Max;
    }
    // Bind pointer events to slider handles
    bindEvents() {
        const draggableRange = this.viewOptions.draggableRange;
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.on('pointerdown', (event) => this.onBarStart(null, draggableRange, event, true, true, true));
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.on('pointerdown', (event) => this.onBarStart(PointerType.Min, draggableRange, event, true, true));
            this.maxHandleElement.on('pointerdown', (event) => this.onBarStart(PointerType.Max, draggableRange, event, true, true));
        }
        else {
            this.minHandleElement.on('pointerdown', (event) => this.onStart(PointerType.Min, event, true, true));
            if (this.range) {
                this.maxHandleElement.on('pointerdown', (event) => this.onStart(PointerType.Max, event, true, true));
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.on('pointerdown', (event) => this.onStart(null, event, true, true, true));
                this.ticksElement.on('pointerdown', (event) => this.onStart(null, event, true, true, true, true));
            }
        }
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.onPassive('pointerdown', (event) => this.onBarStart(null, draggableRange, event, true, true, true));
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.onPassive('pointerdown', (event) => this.onBarStart(PointerType.Min, draggableRange, event, true, true));
            this.maxHandleElement.onPassive('pointerdown', (event) => this.onBarStart(PointerType.Max, draggableRange, event, true, true));
        }
        else {
            this.minHandleElement.onPassive('pointerdown', (event) => this.onStart(PointerType.Min, event, true, true));
            if (this.range) {
                this.maxHandleElement.onPassive('pointerdown', (event) => this.onStart(PointerType.Max, event, true, true));
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.onPassive('pointerdown', (event) => this.onStart(null, event, true, true, true));
                this.ticksElement.onPassive('pointerdown', (event) => this.onStart(null, event, false, false, true, true));
            }
        }
        if (this.viewOptions.keyboardSupport) {
            this.minHandleElement.on('focus', () => this.onPointerFocus(PointerType.Min));
            if (this.range) {
                this.maxHandleElement.on('focus', () => this.onPointerFocus(PointerType.Max));
            }
        }
    }
    getOptionsInfluencingEventBindings(options) {
        return [
            options.disabled,
            options.readOnly,
            options.draggableRange,
            options.draggableRangeOnly,
            options.onlyBindHandles,
            options.keyboardSupport,
        ];
    }
    // Unbind mouse and touch events to slider handles
    unbindEvents() {
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        for (const element of this.getAllSliderElements()) {
            if (!ValueHelper.isNullOrUndefined(element)) {
                element.off();
            }
        }
    }
    onBarStart(pointerType, draggableRange, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        if (draggableRange) {
            this.onDragStart(pointerType, event, bindMove, bindEnd);
        }
        else {
            this.onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
        }
    }
    // onStart event handler
    onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        event.stopPropagation();
        // Only call preventDefault() when handling non-passive events (passive events don't need it)
        if (event.pointerType !== 'touch' && !supportsPassiveEvents) {
            event.preventDefault();
        }
        this.moving = false;
        // We have to do this in case the HTML where the sliders are on
        // have been animated into view.
        this.calculateViewDimensions();
        if (ValueHelper.isNullOrUndefined(pointerType)) {
            pointerType = this.getNearestHandle(event);
        }
        this.currentTrackingPointer = pointerType;
        const pointerElement = this.getPointerElement(pointerType);
        pointerElement.active = true;
        // Store currentTrackingValue as soon as it is available to allow
        // the slide to be canceled. (E.g. on scroll detected.)
        this.preStartHandleValue = this.getCurrentTrackingValue();
        if (this.viewOptions.keyboardSupport) {
            pointerElement.focus();
        }
        if (bindMove) {
            this.unsubscribeOnMove();
            const onMoveCallback = (e) => (this.dragging.active ? this.onDragMove(e) : this.onMove(e));
            if (event.pointerType === 'touch') {
                this.onMoveEventListener =
                    this.eventListenerHelper.attachPassiveEventListener(this.document, 'pointermove', onMoveCallback);
            }
            else {
                this.onMoveEventListener = this.eventListenerHelper.attachEventListener(this.document, 'pointermove', onMoveCallback);
            }
        }
        if (bindEnd) {
            this.unsubscribeOnEnd();
            const onEndCallback = (e) => this.onEnd(e);
            if (event.pointerType === 'touch') {
                this.onEndEventListener =
                    this.eventListenerHelper.attachPassiveEventListener(this.document, 'pointerup', onEndCallback);
                // Touch event that triggers browser scrolling won't call `pointerup` on the original element that initiated it (the slider).
                // But `pointercancel` will be called once all touch events finish.
                this.onCancelEventListener =
                    this.eventListenerHelper.attachPassiveEventListener(this.document, 'pointercancel', onEndCallback);
            }
            else {
                this.onEndEventListener = this.eventListenerHelper.attachEventListener(this.document, 'pointerup', onEndCallback);
                // Opening context-menu in safari - in mouse context - doesn't trigger `pointerup`, so still need to listen for
                // `pointercancel` to clear up any lingering listeners.
                this.onCancelEventListener = this.eventListenerHelper.attachPassiveEventListener(this.document, 'pointercancel', onEndCallback);
            }
        }
        this.userChangeStart.emit(this.getChangeContext());
        if (event.pointerType === 'touch' && event.isPrimary) {
            // Store the touch identifier
            this.touchId = event.pointerId;
        }
        // Click events, either with mouse or touch gesture are weird. Sometimes they result in full
        // start, move, end sequence, and sometimes, they don't - they only invoke pointerdown
        // As a workaround, we simulate the first move event and the end event if it's necessary
        if (simulateImmediateMove) {
            this.onMove(event, true);
        }
        if (simulateImmediateEnd) {
            this.onEnd(event);
        }
    }
    // onMove event handler
    onMove(event, fromTick) {
        if (event.pointerType === 'touch' && !event.isPrimary) {
            return;
        }
        if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
            if (this.moving) {
                this.sliderElementAnimateClass = false;
            }
        }
        this.moving = true;
        const newPos = this.getEventPosition(event);
        let newValue;
        const ceilValue = this.viewOptions.rightToLeft
            ? this.viewOptions.floor
            : this.viewOptions.ceil;
        const floorValue = this.viewOptions.rightToLeft
            ? this.viewOptions.ceil
            : this.viewOptions.floor;
        if (newPos <= 0) {
            newValue = floorValue;
        }
        else if (newPos >= this.maxHandlePosition) {
            newValue = ceilValue;
        }
        else {
            newValue = this.positionToValue(newPos);
            if (fromTick &&
                !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) {
                newValue = this.roundStep(newValue, this.viewOptions.tickStep);
            }
            else {
                newValue = this.roundStep(newValue);
            }
        }
        this.positionTrackingHandle(newValue);
    }
    forceEnd(disableAnimation = false) {
        this.moving = false;
        if (this.viewOptions.animate) {
            this.sliderElementAnimateClass = true;
        }
        if (disableAnimation) {
            this.sliderElementAnimateClass = false;
            // make sure the slider animate class is set according to the viewOptions after forceEnd() with disabled animations finishes
            setTimeout(() => { this.sliderElementAnimateClass = this.viewOptions.animate; });
        }
        this.touchId = null;
        if (!this.viewOptions.keyboardSupport) {
            this.minHandleElement.active = false;
            this.maxHandleElement.active = false;
            this.currentTrackingPointer = null;
        }
        this.dragging.active = false;
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        this.userChangeEnd.emit(this.getChangeContext());
    }
    onEnd(event) {
        if (event.pointerType === 'touch' && !event.isPrimary) {
            return;
        }
        this.forceEnd();
    }
    onPointerFocus(pointerType) {
        const pointerElement = this.getPointerElement(pointerType);
        pointerElement.on('blur', () => this.onPointerBlur(pointerElement));
        pointerElement.on('keydown', (event) => this.onKeyboardEvent(event));
        pointerElement.on('keyup', () => this.onKeyUp());
        pointerElement.active = true;
        this.currentTrackingPointer = pointerType;
        this.currentFocusPointer = pointerType;
        this.firstKeyDown = true;
    }
    onKeyUp() {
        this.firstKeyDown = true;
        // Re-enable animation after keyboard navigation ends
        if (this.viewOptions.animate) {
            this.sliderElementAnimateClass = true;
        }
        this.userChangeEnd.emit(this.getChangeContext());
    }
    onPointerBlur(pointer) {
        pointer.off('blur');
        pointer.off('keydown');
        pointer.off('keyup');
        pointer.active = false;
        if (ValueHelper.isNullOrUndefined(this.touchId)) {
            this.currentTrackingPointer = null;
            this.currentFocusPointer = null;
        }
    }
    getKeyActions(currentValue) {
        const valueRange = this.viewOptions.ceil - this.viewOptions.floor;
        let increaseStep = currentValue + this.viewOptions.step;
        let decreaseStep = currentValue - this.viewOptions.step;
        let increasePage = currentValue + valueRange / 10;
        let decreasePage = currentValue - valueRange / 10;
        if (this.viewOptions.reversedControls) {
            increaseStep = currentValue - this.viewOptions.step;
            decreaseStep = currentValue + this.viewOptions.step;
            increasePage = currentValue - valueRange / 10;
            decreasePage = currentValue + valueRange / 10;
        }
        // Left to right default actions
        const actions = {
            UP: increaseStep,
            DOWN: decreaseStep,
            LEFT: decreaseStep,
            RIGHT: increaseStep,
            PAGEUP: increasePage,
            PAGEDOWN: decreasePage,
            HOME: this.viewOptions.reversedControls
                ? this.viewOptions.ceil
                : this.viewOptions.floor,
            END: this.viewOptions.reversedControls
                ? this.viewOptions.floor
                : this.viewOptions.ceil,
        };
        // right to left means swapping right and left arrows
        if (this.viewOptions.rightToLeft) {
            actions.LEFT = increaseStep;
            actions.RIGHT = decreaseStep;
            // right to left and vertical means we also swap up and down
            if (this.viewOptions.vertical || this.viewOptions.rotate !== 0) {
                actions.UP = decreaseStep;
                actions.DOWN = increaseStep;
            }
        }
        return actions;
    }
    onKeyboardEvent(event) {
        const currentValue = this.getCurrentTrackingValue();
        const keyCode = !ValueHelper.isNullOrUndefined(event.keyCode)
            ? event.keyCode
            : event.which;
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
        if (ValueHelper.isNullOrUndefined(action) ||
            ValueHelper.isNullOrUndefined(this.currentTrackingPointer)) {
            return;
        }
        event.preventDefault();
        if (this.firstKeyDown) {
            this.firstKeyDown = false;
            this.userChangeStart.emit(this.getChangeContext());
        }
        const actionValue = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
        let newValue = this.roundStep(actionValue);
        // Apply skipRestrictedRangesWithArrowKeys if enabled
        if (this.viewOptions.skipRestrictedRangesWithArrowKeys) {
            newValue = this.skipRestrictedRanges(keyCode, newValue);
        }
        // Disable animation during keyboard navigation
        this.sliderElementAnimateClass = false;
        if (!this.viewOptions.draggableRangeOnly) {
            this.positionTrackingHandle(newValue);
        }
        else {
            const difference = this.viewHighValue - this.viewLowValue;
            let newMinValue;
            let newMaxValue;
            if (this.currentTrackingPointer === PointerType.Min) {
                newMinValue = newValue;
                newMaxValue = newValue + difference;
                if (newMaxValue > this.viewOptions.ceil) {
                    newMaxValue = this.viewOptions.ceil;
                    newMinValue = newMaxValue - difference;
                }
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
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
    onDragStart(pointerType, event, bindMove, bindEnd) {
        const position = this.getEventPosition(event);
        this.dragging = new Dragging();
        this.dragging.active = true;
        this.dragging.value = this.positionToValue(position);
        this.dragging.difference = this.viewHighValue - this.viewLowValue;
        this.dragging.lowLimit = this.viewOptions.rightToLeft
            ? this.minHandleElement.position - position
            : position - this.minHandleElement.position;
        this.dragging.highLimit = this.viewOptions.rightToLeft
            ? position - this.maxHandleElement.position
            : this.maxHandleElement.position - position;
        this.onStart(pointerType, event, bindMove, bindEnd);
    }
    /** Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft */
    getMinValue(newPos, outOfBounds, isAbove) {
        const isRTL = this.viewOptions.rightToLeft;
        let value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor
                    : this.viewOptions.ceil - this.dragging.difference;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil - this.dragging.difference
                    : this.viewOptions.floor;
            }
        }
        else {
            value = isRTL
                ? this.positionToValue(newPos + this.dragging.lowLimit)
                : this.positionToValue(newPos - this.dragging.lowLimit);
        }
        return this.roundStep(value);
    }
    /** Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft */
    getMaxValue(newPos, outOfBounds, isAbove) {
        const isRTL = this.viewOptions.rightToLeft;
        let value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor + this.dragging.difference
                    : this.viewOptions.ceil;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil
                    : this.viewOptions.floor + this.dragging.difference;
            }
        }
        else {
            if (isRTL) {
                value =
                    this.positionToValue(newPos + this.dragging.lowLimit) +
                        this.dragging.difference;
            }
            else {
                value =
                    this.positionToValue(newPos - this.dragging.lowLimit) +
                        this.dragging.difference;
            }
        }
        return this.roundStep(value);
    }
    onDragMove(event) {
        const newPos = this.getEventPosition(event);
        if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
            if (this.moving) {
                this.sliderElementAnimateClass = false;
            }
        }
        this.moving = true;
        let ceilLimit, floorLimit, floorHandleElement, ceilHandleElement;
        if (this.viewOptions.rightToLeft) {
            ceilLimit = this.dragging.lowLimit;
            floorLimit = this.dragging.highLimit;
            floorHandleElement = this.maxHandleElement;
            ceilHandleElement = this.minHandleElement;
        }
        else {
            ceilLimit = this.dragging.highLimit;
            floorLimit = this.dragging.lowLimit;
            floorHandleElement = this.minHandleElement;
            ceilHandleElement = this.maxHandleElement;
        }
        const isUnderFloorLimit = newPos <= floorLimit;
        const isOverCeilLimit = newPos >= this.maxHandlePosition - ceilLimit;
        let newMinValue;
        let newMaxValue;
        if (isUnderFloorLimit) {
            if (floorHandleElement.position === 0) {
                return;
            }
            newMinValue = this.getMinValue(newPos, true, false);
            newMaxValue = this.getMaxValue(newPos, true, false);
        }
        else if (isOverCeilLimit) {
            if (ceilHandleElement.position === this.maxHandlePosition) {
                return;
            }
            newMaxValue = this.getMaxValue(newPos, true, true);
            newMinValue = this.getMinValue(newPos, true, true);
        }
        else {
            newMinValue = this.getMinValue(newPos, false, false);
            newMaxValue = this.getMaxValue(newPos, false, false);
        }
        this.positionTrackingBar(newMinValue, newMaxValue);
    }
    // Set the new value and position for the entire bar
    positionTrackingBar(newMinValue, newMaxValue) {
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
        this.updateHandles(PointerType.Min, this.valueToPosition(newMinValue));
        this.updateHandles(PointerType.Max, this.valueToPosition(newMaxValue));
    }
    // Set the new value and position to the current tracking handle
    positionTrackingHandle(newValue) {
        newValue = this.applyMinMaxLimit(newValue);
        newValue = this.applyRestrictedRange(newValue);
        if (this.range) {
            if (this.viewOptions.pushRange) {
                newValue = this.applyPushRange(newValue);
            }
            else {
                if (this.viewOptions.noSwitching) {
                    if (this.currentTrackingPointer === PointerType.Min &&
                        newValue > this.viewHighValue) {
                        newValue = this.applyMinMaxRange(this.viewHighValue);
                    }
                    else if (this.currentTrackingPointer === PointerType.Max &&
                        newValue < this.viewLowValue) {
                        newValue = this.applyMinMaxRange(this.viewLowValue);
                    }
                }
                newValue = this.applyMinMaxRange(newValue);
                /* This is to check if we need to switch the min and max handles */
                if (this.currentTrackingPointer === PointerType.Min &&
                    newValue > this.viewHighValue) {
                    this.viewLowValue = this.viewHighValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Min, this.maxHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Max;
                    this.minHandleElement.active = false;
                    this.maxHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.maxHandleElement.focus();
                    }
                }
                else if (this.currentTrackingPointer === PointerType.Max &&
                    newValue < this.viewLowValue) {
                    this.viewHighValue = this.viewLowValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Max, this.minHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Min;
                    this.maxHandleElement.active = false;
                    this.minHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.minHandleElement.focus();
                    }
                }
            }
        }
        if (this.getCurrentTrackingValue() !== newValue) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewLowValue = newValue;
                this.applyViewChange();
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewHighValue = newValue;
                this.applyViewChange();
            }
            this.updateHandles(this.currentTrackingPointer, this.valueToPosition(newValue));
            this.updateAriaAttributes();
        }
    }
    applyMinMaxLimit(newValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) &&
            newValue < this.viewOptions.minLimit) {
            return this.viewOptions.minLimit;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) &&
            newValue > this.viewOptions.maxLimit) {
            return this.viewOptions.maxLimit;
        }
        return newValue;
    }
    applyMinMaxRange(newValue) {
        const oppositeValue = this.currentTrackingPointer === PointerType.Min
            ? this.viewHighValue
            : this.viewLowValue;
        const difference = Math.abs(newValue - oppositeValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange)) {
            if (difference < this.viewOptions.minRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxRange)) {
            if (difference > this.viewOptions.maxRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
            }
        }
        return newValue;
    }
    applyPushRange(newValue) {
        const difference = this.currentTrackingPointer === PointerType.Min
            ? this.viewHighValue - newValue
            : newValue - this.viewLowValue;
        const minRange = !ValueHelper.isNullOrUndefined(this.viewOptions.minRange)
            ? this.viewOptions.minRange
            : this.viewOptions.step;
        const maxRange = this.viewOptions.maxRange;
        // if smaller than minRange
        if (difference < minRange) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(Math.min(newValue + minRange, this.viewOptions.ceil), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(Math.max(newValue - minRange, this.viewOptions.floor), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        else if (!ValueHelper.isNullOrUndefined(maxRange) &&
            difference > maxRange) {
            // if greater than maxRange
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        return newValue;
    }
    // Apply restricted range constraint to the new value
    applyRestrictedRange(newValue) {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.restrictedRange)) {
            return newValue;
        }
        // Normalize restrictedRange to always be an array
        const restrictedRanges = Array.isArray(this.viewOptions.restrictedRange)
            ? this.viewOptions.restrictedRange
            : [this.viewOptions.restrictedRange];
        for (const range of restrictedRanges) {
            if (newValue > range.from && newValue < range.to) {
                const halfWidth = (range.to - range.from) / 2;
                if (this.currentTrackingPointer === PointerType.Min) {
                    // For min handle, snap to the closer edge
                    return newValue > range.from + halfWidth ? range.to : range.from;
                }
                if (this.currentTrackingPointer === PointerType.Max) {
                    // For max handle, snap to the closer edge
                    return newValue < range.to - halfWidth ? range.from : range.to;
                }
            }
        }
        return newValue;
    }
    // Skip restricted ranges when using arrow keys
    skipRestrictedRanges(keyCode, newValue) {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.restrictedRange)) {
            return newValue;
        }
        // Normalize restrictedRange to always be an array
        const restrictedRanges = Array.isArray(this.viewOptions.restrictedRange)
            ? this.viewOptions.restrictedRange
            : [this.viewOptions.restrictedRange];
        const isLeftOrDown = keyCode === 37 || keyCode === 40; // LEFT or DOWN
        const isRightOrUp = keyCode === 38 || keyCode === 39; // UP or RIGHT
        for (const range of restrictedRanges) {
            // If new value falls inside a restricted range, jump to the appropriate edge
            if (newValue > range.from && newValue < range.to) {
                if (isRightOrUp) {
                    // Moving right/up: jump to the end of restricted range
                    newValue = range.to;
                }
                else if (isLeftOrDown) {
                    // Moving left/down: jump to the start of restricted range
                    newValue = range.from;
                }
            }
        }
        return newValue;
    }
    getChangeContext() {
        const changeContext = new ChangeContext();
        changeContext.pointerType = this.currentTrackingPointer;
        changeContext.value = +this.value;
        if (this.range) {
            changeContext.highValue = +this.highValue;
        }
        return changeContext;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.0.4", type: SliderComponent, isStandalone: false, selector: "ngx-slider", inputs: { value: "value", highValue: "highValue", options: "options", manualRefresh: "manualRefresh", triggerFocus: "triggerFocus", cancelUserChange: "cancelUserChange" }, outputs: { valueChange: "valueChange", highValueChange: "highValueChange", userChangeStart: "userChangeStart", userChange: "userChange", userChangeEnd: "userChangeEnd" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class.ngx-slider": "this.sliderElementNgxSliderClass", "class.vertical": "this.sliderElementVerticalClass", "class.animate": "this.sliderElementAnimateClass", "class.with-legend": "this.sliderElementWithLegendClass", "attr.disabled": "this.sliderElementDisabledAttr", "attr.aria-label": "this.sliderElementAriaLabel" } }, providers: [NGX_SLIDER_CONTROL_VALUE_ACCESSOR], queries: [{ propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }], viewQueries: [{ propertyName: "leftOuterSelectionBarElement", first: true, predicate: ["leftOuterSelectionBar"], descendants: true, read: SliderElementDirective }, { propertyName: "rightOuterSelectionBarElement", first: true, predicate: ["rightOuterSelectionBar"], descendants: true, read: SliderElementDirective }, { propertyName: "fullBarElement", first: true, predicate: ["fullBar"], descendants: true, read: SliderElementDirective }, { propertyName: "selectionBarElement", first: true, predicate: ["selectionBar"], descendants: true, read: SliderElementDirective }, { propertyName: "minHandleElement", first: true, predicate: ["minHandle"], descendants: true, read: SliderHandleDirective }, { propertyName: "maxHandleElement", first: true, predicate: ["maxHandle"], descendants: true, read: SliderHandleDirective }, { propertyName: "floorLabelElement", first: true, predicate: ["floorLabel"], descendants: true, read: SliderLabelDirective }, { propertyName: "ceilLabelElement", first: true, predicate: ["ceilLabel"], descendants: true, read: SliderLabelDirective }, { propertyName: "minHandleLabelElement", first: true, predicate: ["minHandleLabel"], descendants: true, read: SliderLabelDirective }, { propertyName: "maxHandleLabelElement", first: true, predicate: ["maxHandleLabel"], descendants: true, read: SliderLabelDirective }, { propertyName: "combinedLabelElement", first: true, predicate: ["combinedLabel"], descendants: true, read: SliderLabelDirective }, { propertyName: "ticksElement", first: true, predicate: ["ticksElement"], descendants: true, read: SliderElementDirective }], usesOnChanges: true, ngImport: i0, template: "<!-- // 0 Left selection bar outside two handles -->\n<span ngxSliderElement #leftOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 1 Right selection bar outside two handles -->\n<span ngxSliderElement #rightOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 2 The whole slider bar -->\n<span ngxSliderElement #fullBar [class.ngx-slider-transparent]=\"fullBarTransparentClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 3 Selection bar between two handles -->\n<span ngxSliderElement #selectionBar [class.ngx-slider-draggable]=\"selectionBarDraggableClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-selection\" [ngStyle]=\"barStyle\"></span>\n</span>\n<!-- // 4 Restricted range bars -->\n@for (bar of restrictedBars; track bar) {\n  <span class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-restricted-bar\">\n    <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-restricted\" [ngStyle]=\"bar.style\"></span>\n  </span>\n}\n<!-- // 5 Low slider handle -->\n<span ngxSliderHandle #minHandle class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min\" [ngStyle]=minPointerStyle></span>\n<!-- // 5 High slider handle -->\n<span ngxSliderHandle #maxHandle [style.display]=\"range ? 'inherit' : 'none'\" class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max\" [ngStyle]=maxPointerStyle></span>\n<!-- // 6 Floor label -->\n<span ngxSliderLabel #floorLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor\"></span>\n<!-- // 7 Ceiling label -->\n<span ngxSliderLabel #ceilLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil\"></span>\n<!-- // 8 Label above the low slider handle -->\n<span ngxSliderLabel #minHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-value\"></span>\n<!-- // 9 Label above the high slider handle -->\n<span ngxSliderLabel #maxHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-high\"></span>\n<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->\n<span ngxSliderLabel #combinedLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-combined\"></span>\n<!-- // 11 The ticks -->\n<span ngxSliderElement #ticksElement [hidden]=\"!showTicks\" [class.ngx-slider-ticks-values-under]=\"ticksUnderValuesClass\" class=\"ngx-slider-ticks\">\n  @for (t of ticks; track t) {\n    <span class=\"ngx-slider-tick\" [ngClass]=\"{'ngx-slider-selected': t.selected}\" [ngStyle]=\"t.style\">\n      <ngx-slider-tooltip-wrapper [template]=\"tooltipTemplate\" [tooltip]=\"t.tooltip\" [placement]=\"t.tooltipPlacement\"></ngx-slider-tooltip-wrapper>\n      @if (t.value !== null && t.value !== undefined) {\n        <ngx-slider-tooltip-wrapper class=\"ngx-slider-span ngx-slider-tick-value\"\n        [template]=\"tooltipTemplate\" [tooltip]=\"t.valueTooltip\" [placement]=\"t.valueTooltipPlacement\" [content]=\"t.value\"></ngx-slider-tooltip-wrapper>\n      }\n      @if (t.legend !== null && t.legend !== undefined && allowUnsafeHtmlInSlider === false) {\n        <span class=\"ngx-slider-span ngx-slider-tick-legend\" [innerText]=\"t.legend\"></span>\n      }\n      @if (t.legend !== null && t.legend !== undefined && (allowUnsafeHtmlInSlider === null || allowUnsafeHtmlInSlider === undefined || allowUnsafeHtmlInSlider)) {\n        <span class=\"ngx-slider-span ngx-slider-tick-legend\" [innerHTML]=\"t.legend\"></span>\n      }\n    </span>\n  }\n</span>\n", styles: ["::ng-deep .ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;user-select:none;touch-action:pan-y}::ng-deep .ngx-slider.with-legend{margin-bottom:40px}::ng-deep .ngx-slider[disabled]{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}::ng-deep .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}::ng-deep .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ngx-slider .ngx-slider-draggable{cursor:move}::ng-deep .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:transparent}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}::ng-deep .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-restricted{z-index:3;background:red;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px}::ng-deep .ngx-slider .ngx-slider-pointer:after{content:\"\";width:8px;height:8px;position:absolute;top:12px;left:12px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;background:#fff}::ng-deep .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}::ng-deep .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}::ng-deep .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}::ng-deep .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;transform:translate(-50%)}::ng-deep .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;transform:translate(-50%);max-width:50px;white-space:normal}::ng-deep .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}::ng-deep .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;transform:translateY(-28%)}::ng-deep .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;transform:translateY(-28%);max-width:none;white-space:nowrap}::ng-deep .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ngx-slider *{transition:none}::ng-deep .ngx-slider.animate .ngx-slider-bar-wrapper{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-selection{transition:background-color linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-pointer{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-pointer:after{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-tick{transition:background-color linear .3s}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: SliderElementDirective, selector: "[ngxSliderElement]" }, { kind: "directive", type: SliderHandleDirective, selector: "[ngxSliderHandle]" }, { kind: "directive", type: SliderLabelDirective, selector: "[ngxSliderLabel]" }, { kind: "component", type: TooltipWrapperComponent, selector: "ngx-slider-tooltip-wrapper", inputs: ["template", "tooltip", "placement", "content"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-slider', providers: [NGX_SLIDER_CONTROL_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.Default, standalone: false, template: "<!-- // 0 Left selection bar outside two handles -->\n<span ngxSliderElement #leftOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 1 Right selection bar outside two handles -->\n<span ngxSliderElement #rightOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 2 The whole slider bar -->\n<span ngxSliderElement #fullBar [class.ngx-slider-transparent]=\"fullBarTransparentClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 3 Selection bar between two handles -->\n<span ngxSliderElement #selectionBar [class.ngx-slider-draggable]=\"selectionBarDraggableClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-selection\" [ngStyle]=\"barStyle\"></span>\n</span>\n<!-- // 4 Restricted range bars -->\n@for (bar of restrictedBars; track bar) {\n  <span class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-restricted-bar\">\n    <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-restricted\" [ngStyle]=\"bar.style\"></span>\n  </span>\n}\n<!-- // 5 Low slider handle -->\n<span ngxSliderHandle #minHandle class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min\" [ngStyle]=minPointerStyle></span>\n<!-- // 5 High slider handle -->\n<span ngxSliderHandle #maxHandle [style.display]=\"range ? 'inherit' : 'none'\" class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max\" [ngStyle]=maxPointerStyle></span>\n<!-- // 6 Floor label -->\n<span ngxSliderLabel #floorLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor\"></span>\n<!-- // 7 Ceiling label -->\n<span ngxSliderLabel #ceilLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil\"></span>\n<!-- // 8 Label above the low slider handle -->\n<span ngxSliderLabel #minHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-value\"></span>\n<!-- // 9 Label above the high slider handle -->\n<span ngxSliderLabel #maxHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-high\"></span>\n<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->\n<span ngxSliderLabel #combinedLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-combined\"></span>\n<!-- // 11 The ticks -->\n<span ngxSliderElement #ticksElement [hidden]=\"!showTicks\" [class.ngx-slider-ticks-values-under]=\"ticksUnderValuesClass\" class=\"ngx-slider-ticks\">\n  @for (t of ticks; track t) {\n    <span class=\"ngx-slider-tick\" [ngClass]=\"{'ngx-slider-selected': t.selected}\" [ngStyle]=\"t.style\">\n      <ngx-slider-tooltip-wrapper [template]=\"tooltipTemplate\" [tooltip]=\"t.tooltip\" [placement]=\"t.tooltipPlacement\"></ngx-slider-tooltip-wrapper>\n      @if (t.value !== null && t.value !== undefined) {\n        <ngx-slider-tooltip-wrapper class=\"ngx-slider-span ngx-slider-tick-value\"\n        [template]=\"tooltipTemplate\" [tooltip]=\"t.valueTooltip\" [placement]=\"t.valueTooltipPlacement\" [content]=\"t.value\"></ngx-slider-tooltip-wrapper>\n      }\n      @if (t.legend !== null && t.legend !== undefined && allowUnsafeHtmlInSlider === false) {\n        <span class=\"ngx-slider-span ngx-slider-tick-legend\" [innerText]=\"t.legend\"></span>\n      }\n      @if (t.legend !== null && t.legend !== undefined && (allowUnsafeHtmlInSlider === null || allowUnsafeHtmlInSlider === undefined || allowUnsafeHtmlInSlider)) {\n        <span class=\"ngx-slider-span ngx-slider-tick-legend\" [innerHTML]=\"t.legend\"></span>\n      }\n    </span>\n  }\n</span>\n", styles: ["::ng-deep .ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;user-select:none;touch-action:pan-y}::ng-deep .ngx-slider.with-legend{margin-bottom:40px}::ng-deep .ngx-slider[disabled]{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}::ng-deep .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}::ng-deep .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ngx-slider .ngx-slider-draggable{cursor:move}::ng-deep .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:transparent}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}::ng-deep .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-restricted{z-index:3;background:red;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px}::ng-deep .ngx-slider .ngx-slider-pointer:after{content:\"\";width:8px;height:8px;position:absolute;top:12px;left:12px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;background:#fff}::ng-deep .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}::ng-deep .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}::ng-deep .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}::ng-deep .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;transform:translate(-50%)}::ng-deep .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;transform:translate(-50%);max-width:50px;white-space:normal}::ng-deep .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}::ng-deep .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;transform:translateY(-28%)}::ng-deep .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;transform:translateY(-28%);max-width:none;white-space:nowrap}::ng-deep .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ngx-slider *{transition:none}::ng-deep .ngx-slider.animate .ngx-slider-bar-wrapper{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-selection{transition:background-color linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-pointer{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-pointer:after{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble{transition:all linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity linear .3s}::ng-deep .ngx-slider.animate .ngx-slider-tick{transition:background-color linear .3s}\n"] }]
        }], ctorParameters: () => [], propDecorators: { sliderElementNgxSliderClass: [{
                type: HostBinding,
                args: ['class.ngx-slider']
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], highValue: [{
                type: Input
            }], highValueChange: [{
                type: Output
            }], options: [{
                type: Input
            }], userChangeStart: [{
                type: Output
            }], userChange: [{
                type: Output
            }], userChangeEnd: [{
                type: Output
            }], manualRefresh: [{
                type: Input
            }], triggerFocus: [{
                type: Input
            }], cancelUserChange: [{
                type: Input
            }], leftOuterSelectionBarElement: [{
                type: ViewChild,
                args: ['leftOuterSelectionBar', {
                        read: SliderElementDirective,
                        static: false,
                    }]
            }], rightOuterSelectionBarElement: [{
                type: ViewChild,
                args: ['rightOuterSelectionBar', {
                        read: SliderElementDirective,
                        static: false,
                    }]
            }], fullBarElement: [{
                type: ViewChild,
                args: ['fullBar', { read: SliderElementDirective, static: false }]
            }], selectionBarElement: [{
                type: ViewChild,
                args: ['selectionBar', { read: SliderElementDirective, static: false }]
            }], minHandleElement: [{
                type: ViewChild,
                args: ['minHandle', { read: SliderHandleDirective, static: false }]
            }], maxHandleElement: [{
                type: ViewChild,
                args: ['maxHandle', { read: SliderHandleDirective, static: false }]
            }], floorLabelElement: [{
                type: ViewChild,
                args: ['floorLabel', { read: SliderLabelDirective, static: false }]
            }], ceilLabelElement: [{
                type: ViewChild,
                args: ['ceilLabel', { read: SliderLabelDirective, static: false }]
            }], minHandleLabelElement: [{
                type: ViewChild,
                args: ['minHandleLabel', { read: SliderLabelDirective, static: false }]
            }], maxHandleLabelElement: [{
                type: ViewChild,
                args: ['maxHandleLabel', { read: SliderLabelDirective, static: false }]
            }], combinedLabelElement: [{
                type: ViewChild,
                args: ['combinedLabel', { read: SliderLabelDirective, static: false }]
            }], ticksElement: [{
                type: ViewChild,
                args: ['ticksElement', { read: SliderElementDirective, static: false }]
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate', { static: false }]
            }], sliderElementVerticalClass: [{
                type: HostBinding,
                args: ['class.vertical']
            }], sliderElementAnimateClass: [{
                type: HostBinding,
                args: ['class.animate']
            }], sliderElementWithLegendClass: [{
                type: HostBinding,
                args: ['class.with-legend']
            }], sliderElementDisabledAttr: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], sliderElementAriaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

/**
 * NgxSlider module
 *
 * The module exports the slider component
 */
class NgxSliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: NgxSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.4", ngImport: i0, type: NgxSliderModule, declarations: [SliderComponent,
            SliderElementDirective,
            SliderHandleDirective,
            SliderLabelDirective,
            TooltipWrapperComponent], imports: [CommonModule], exports: [SliderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: NgxSliderModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.4", ngImport: i0, type: NgxSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SliderComponent,
                        SliderElementDirective,
                        SliderHandleDirective,
                        SliderLabelDirective,
                        TooltipWrapperComponent
                    ],
                    exports: [
                        SliderComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AllowUnsafeHtmlInSlider, ChangeContext, LabelType, NgxSliderModule, Options, PointerType, SliderComponent };
//# sourceMappingURL=angular-slider-ngx-slider.mjs.map
