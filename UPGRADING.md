# Upgrading from ng5-slider v1.x.x to ngx-slider v2.0.0

v2.0.0 re-branded the slider component from ng5-slider to ngx-slider, putting it under a different NPM namespace.

The upgrade process is relatively straightforward, with mostly cosmetic changes of finding "ng5" and replacing it with "ngx".

This is a step-by-step guide to doing this:

1. Change the package name `ng5-slider` -> `@angular-slider/ngx-slider` in your `package.json`:

Before:
```json
   "dependencies": {
     "ng5-slider": "^1.x.x",
     // ...
   }
```

After:
```json
   "dependencies": {
     "@angular-slider/ngx-slider": "^2.0.0",
     // ...
   }
```

2. Run `npm install` to pull the new package.

3. Replace reference to slider module `Ng5SliderModule` -> `NgxSliderModule` in your `app.module.ts`:

Before:
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

After:
```typescript
import { NgxSliderModule } from '@angular-slider/ngx-slider';

...

@NgModule({
   ...
   imports: [
     ...
     NgxSliderModule,
    ...
   ],
   ...
})
export class AppModule {}
```

4. Rename all slider imports in your Typescript files `import ... from 'ng5-slider'` -> `import ... from '@angular-slider/ngx-slider'`:

Before:
```typescript
import { Options } from 'ng5-slider';

...
export class MyComponent {
 ...
 options: Options = {
      floor: 0,
      ceil: 100
 };
}
```

After:
```typescript
import { Options } from '@angular-slider/ngx-slider';

...
export class MyComponent {
 ...
 options: Options = {
      floor: 0,
      ceil: 100
 };
}
```

5. Rename all usages of slider directive `<ng5-slider>` -> `<ngx-slider>` in your HTML templates:

Before:
```html
<ng5-slider [(value)]="value" [options]="options"></ng5-slider>
```

After:
```html
<ngx-slider [(value)]="value" [options]="options"></ngx-slider>
```

6. If you use custom CSS styling for the slider, replace `ng5` -> `ngx` in the CSS class names.

Before:
```scss
.custom-slider {
  .ng5-slider {
    .ng5-slider-selection {
      background: rgb(255, 255, 0) !important;
    }
  }
}
```

After:
```scss
.custom-slider {
  .ngx-slider {
    .ngx-slider-selection {
      background: rgb(255, 255, 0) !important;
    }
  }
}
```

7. Try building and running your app. If there are no errors, you should be all good to go!
