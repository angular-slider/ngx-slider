# ng5-slider
[![npm version](https://badge.fury.io/js/ng5-slider.svg)](https://badge.fury.io/js/ng5-slider)
[![Travis CI Build](https://travis-ci.org/angular-slider/ng5-slider.svg?branch=master)](https://travis-ci.org/angular-slider/ng5-slider)

Website: https://angular-slider.github.io/ng5-slider/

Self-contained, mobile friendly slider component for Angular 5+ based on [angularjs-slider](https://github.com/angular-slider/angularjs-slider).

## Demos

 * Single slider - [StackBlitz](https://stackblitz.com/edit/ng5-slider-simple-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![simple slider image](https://raw.githubusercontent.com/angular-slider/ng5-slider/master/assets/simple-slider.png)

 * Range slider - [StackBlitz](https://stackblitz.com/edit/ng5-slider-range-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![range slider image](https://raw.githubusercontent.com/angular-slider/ng5-slider/master/assets/range-slider.png)

 * Slider with ticks - [StackBlitz](https://stackblitz.com/edit/ng5-slider-ticks-example?file=src%2Fapp%2Fapp.component.ts)

   ![ticks slider image](https://raw.githubusercontent.com/angular-slider/ng5-slider/master/assets/ticks-slider.png)

 * Customised slider - [StackBlitz](https://stackblitz.com/edit/ng5-slider-customised-range-slider-example?file=src%2Fapp%2Fapp.component.ts)

   ![customised slider image](https://raw.githubusercontent.com/angular-slider/ng5-slider/master/assets/customised-slider.png)

 * [More examples on official website](https://angular-slider.github.io/ng5-slider/demos)

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

*Note:* Instead of binding to `value` and `highValue`, it is also possible to bind the values using Angular [reactive forms](https://angular.io/guide/reactive-forms) (`formControl` and `formControlName` directives). For an example of this, refer to relevant examples on Github pages: [simple slider in reactive form](https://angular-slider.github.io/ng5-slider/demos#reactive-form-simple-slider) and [range slider in reactive form](https://angular-slider.github.io/ng5-slider/demos#reactive-form-range-slider).

`manualRefresh` input is provided to solve some cases where the slider is not being updated after CSS style changes. This is for example changing the `display` property to show/hide the slider (or any parent DOM element). Instead of observing the CSS changes, the slider provides this input to manually trigger a refresh. An example of how this can be used can be found [in the demo app on Github pages](https://angular-slider.github.io/ng5-slider/demos#manual-refresh-slider).

`userChangeStart`, `userChange` and `userChangeEnd` provide output events that are triggered by user interaction (through keyboard, mouse or touchpad). The event handler also passes a `ChangeContext` object which contains details about the changes. A good example of using these events can be found [in the demo app on Github pages](https://angular-slider.github.io/ng5-slider/demos#user-events-slider).

`valueChange` and `highValueChange` outputs are emitted whenever the model values change (including programmatically). They are provided to support two-way binding of the model values but they can also be used to attach custom event handlers.

The full set of API docs including internal classes can be found [here](https://angular-slider.github.io/ng5-slider/docs/index.html).

## Styling

An overview of how to apply your own style to the slider is described in [STYLING.md](STYLING.md).

## Tooltips

The slider allows for customising how to implement tooltips. See [TOOLTIPS.md](TOOLTIPS.md) for more information.

## Bugs

You can report any bugs as [Github issues](https://github.com/angular-slider/ng5-slider/issues).

Please describe the issue in detail pasting any relevant code, or preferrably a StackBlitz with reproduction of the problem by [forking and editing this sample StackBlitz](https://stackblitz.com/edit/ng5-slider-simple-slider-example?file=src/app/app.component.ts). Please also provide the version of NPM package you are using.

## Developer information

If you'd like to contribute to the project, or check out the plans for future, see [DEVELOPERS.md](DEVELOPERS.md).

## License

The project is licensed under the MIT license.
