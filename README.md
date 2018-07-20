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
 * ng-bootstrap (optional, used only for tooltips; see notes below)

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

The slider component takes three inputs:
```html
<ng5-slider
  value="<number>"
  highValue="<number>"
  options="<options object>">
```

For single value slider, `value` specifies the model value of the slider. For range sliders, `value` is the minimum model value and `highValue` is the maximum model value. `options` is an object of options that configure the slider (e.g. minimum, maximum values, legend values, etc.). Documentation of all available options is included [in the API docs](https://angular-slider.github.io/ng5-slider/docs/classes/_options_.options.html).

The full set of API docs including internal classes can be found [here](https://angular-slider.github.io/ng5-slider/docs/index.html).

## Notes on ng-bootstrap

ng-bootstrap is an optional dependency, which means that you can use the slider without having ng-bootstrap in your `package.json`.

`npm install` and `ng build` will still complain about missing ng-bootstrap, but these will be warnings rather than errors, and they can be safely ignored.

When ng-bootstrap is not available, using tooltip options will have no effect.

## Developer information

If you'd like to contribute to the project, or check out the plans for future, see [DEVELOPERS.md](DEVELOPERS.md).

## License

Licensed under the MIT license
