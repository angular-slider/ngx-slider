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
Full API documentation is available on [official website](https://angular-slider.github.io/ng5-slider/docs).

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
