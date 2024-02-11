## Introduction

These pages are generated from source code of ngx-slider using Typedoc.

Below, you will find an overview of using the slider directive, and following the navigation links, you can explore the public API portion of the library.

The public API is made up of all declarations made available when importing the `ngx-slider` package, for instance the `Options` class:
```ts
import { Options } from '@angular-slider/ngx-slider';
```

You can see that Typedoc organises the files into global "modules", but it is only an artefact of code organisation. All declarations described here are available directly by importing them from `ngx-slider`.

**NOTE:** If you are looking for old documentation of v1.2.x releases under the old name of ng5-slider, they are [archived in the Github repository](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/archive/ng5-slider-v1.2.6-site-archive.zip).

## Slider directive

The slider component takes the following inputs and outputs:
```html
<ngx-slider
  [(value)]="<number>"
  [(highValue)]="<number>"
  [options]="<options object>"
  [manualRefresh]="<event emitter>"
  [triggerFocus]="<event emitter>"
  (userChangeStart)="<event handler>"
  (userChange)="<event handler>"
  (userChangeEnd)="<event handler>"
  (valueChange)="<event handler>"
  (highValueChange)="<event handler>"
></ngx-slider>
```

### Model bindings

For single value slider, `value` specifies the model value of the slider. For range sliders, `value` is the minimum model value and `highValue` is the maximum model value.

### Alternative bindings using reactive forms

Instead of binding to `value` and `highValue`, it is also possible to bind the values using Angular [reactive forms](https://angular.io/guide/reactive-forms) (`formControl` and `formControlName` directives). For an example of this, refer to relevant examples: [simple slider in reactive form](routerLink:///demos#reactive-form-simple-slider) and [range slider in reactive form](routerLink:///demos#reactive-form-range-slider).

### Options

`options` is an object of options that configure the slider (e.g. minimum, maximum values, legend values, etc.). Available options are documented in [Options class](routerLink:///docs/classes/_options_.options.html).

**Note**: Due to the way change detection works in Angular, runtime changes in nested values of options object will not be picked up automatically. To work around this, you need to re-create the options object every time you make a change:
```ts
changeOptions() {
  const newOptions: Options = Object.assign({}, currentOptions);
  newOptions.ceil = 100;
  currentOptions = newOptions;
}
```
For a complete example, see the [dynamic options slider demo](routerLink:///demos#dynamic-options-slider).

### Manual refresh

`manualRefresh` input is provided to solve some cases where the slider is not being updated after CSS style changes. This is for example changing the `display` property to show/hide the slider (or any parent DOM element). Instead of observing the CSS changes, the slider provides this input to manually trigger a refresh. Refer to the [example demo](routerLink:///demos#manual-refresh-slider) to see how it can be used.

### Trigger focus

`triggerFocus` input is provided to set the focus programmatically on a slider handle. The emitter takes a `PointerType` as argument, or if left `undefined`, will default to `PointerType.Min`. Refer to the [example demo](routerLink:///demos#trigger-focus-slider) to see how it works.

### User change events

`userChangeStart`, `userChange` and `userChangeEnd` provide output events that are triggered by user interaction (through keyboard, mouse or touchpad). The event handler also passes a `ChangeContext` object which contains details about the changes. Refer to the [example demo](routerLink:///demos#user-events-slider) to see how it works.

### Value change events

`valueChange` and `highValueChange` outputs are emitted whenever the model values change (including programmatically). They are provided to support two-way binding of the model values but they can also be used to attach custom event handlers.
