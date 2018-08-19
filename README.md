# ng5-slider
[![npm version](https://badge.fury.io/js/ng5-slider.svg)](https://badge.fury.io/js/ng5-slider)
[![Travis CI Build](https://travis-ci.org/angular-slider/ng5-slider.svg?branch=master)](https://travis-ci.org/angular-slider/ng5-slider)

Website: https://angular-slider.github.io/ng5-slider/

A rewrite of [angularjs-slider](https://github.com/angular-slider/angularjs-slider) for Angular 5+.

Self-contained, mobile friendly slider component.

## Demos

 * [Simple plunker demo](https://plnkr.co/XhzcMg)
 * [More examples](https://angular-slider.github.io/ng5-slider/)

## Dependencies

 * Angular 5+

## Installation

To add the slider to your Angular project:
```
npm install --save ng5-slider
```

Once installed, add the slider to your `app.module.ts`:
```typescript
import { Ng5SliderModule } from 'ng5-slider';

...

@NgModule({
   ...
   imports: [
     ...
     Ng5SliderModule,
    ...
   ],
   ...
})
export class AppModule {}
```

## Sample usage

Now you can use the slider component in your app components, for example in `app.component.ts`:
```typescript
import { Options } from 'ng5-slider';
...

@Component({...})
export class AppComponent {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
}
```

And in template file `app.component.html`:
```html
<ng5-slider [(value)]="value" [options]="options"></ng5-slider>
```

## Documentation

The slider component takes the following inputs and outputs:
```html
<ng5-slider
  [(value)]="<number>"
  [(highValue)]="<number>"
  [options]="<options object>"
  [manualRefresh]="<event emitter>"
  (userChangeStart)="<event handler>"
  (userChange)="<event handler>"
  (userChangeEnd)="<event handler>"
  (valueChange)="<event handler>"
  (highValueChange)="<event handler>"
></ng5-slider>
```

For single value slider, `value` specifies the model value of the slider. For range sliders, `value` is the minimum model value and `highValue` is the maximum model value. `options` is an object of options that configure the slider (e.g. minimum, maximum values, legend values, etc.). Documentation of all available options is included [in the API docs](https://angular-slider.github.io/ng5-slider/docs/classes/_options_.options.html).

`manualRefresh` input is provided to solve some cases where the slider is not being updated after CSS style changes. This is for example changing the `display` property to show/hide the slider (or any parent DOM element). Instead of observing the CSS changes, the slider provides this input to manually trigger a refresh. An example of how this can be used can be found [in the demo app on Github pages](https://angular-slider.github.io/ng5-slider/#manual-refresh-slider).

`userChangeStart`, `userChange` and `userChangeEnd` provide output events that are triggered by user interaction (through keyboard, mouse or touchpad). The event handler also passes a `ChangeContext` object which contains details about the changes. A good example of using these events can be found [in the demo app on Github pages](https://angular-slider.github.io/ng5-slider/#user-events-slider).

`valueChange` and `highValueChange` outputs are emitted whenever the model values change (including programmatically). They are provided to support two-way binding of the model values but they can also be used to attach custom event handlers.

The full set of API docs including internal classes can be found [here](https://angular-slider.github.io/ng5-slider/docs/index.html).

## Tooltips

Prior to version 1.1, the library used to have a dependency on ng-bootstrap to support tooltips.

As of version 1.1, this dependency has been removed, and tooltips are rendered by default by using the standard HTML `title` attribute (e.g. `<div title="Some tooltip">Some content</div>`), but it's also possible to customise this behaviour by specifying a custom template.

When using a custom template, elements that would normally be rendered as `<div title=...>` tags, are instead rendered using the specified template. Inside the custom template, the user is free to choose any way of rendering the tooltips, including, but of course not limited to, using ng-bootstrap.

The syntax for specifying the custom template is the following:
```html
<ng5-slider [(value)]="value" [options]="options">
  <ng-template #tooltipTemplate let-tooltip="tooltip" let-placement="placement" let-content="content">
    <!-- TODO: provide tooltip around the content.
         {{tooltip}} will bind to the tooltip text
         {{placement}} will bind to the tooltip placement ('top', 'bottom', 'right', 'left') -->
    <div>{{content}}</div>
  </ng-template>
</ng5-slider>
```

For more concrete examples, please refer to tooltip samples on [Github pages](https://angular-slider.github.io/ng5-slider/#ticks-custom-tooltips-slider).

## Developer information

If you'd like to contribute to the project, or check out the plans for future, see [DEVELOPERS.md](DEVELOPERS.md).

## License

Licensed under the MIT license
