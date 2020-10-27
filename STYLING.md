# Styling guide

This is a short guide to customising the slider using CSS that covers the most frequently asked questions.

## Slider anatomy

Let's start with exploring the elements that make up the slider.

### Labels

![slider label anatomy](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/slider-anatomy-labels.png)

A range slider displays the following labels:
 - floor label - text showing the lowest value,
 - ceil label - text showing the highest value,
 - low pointer label - text showing the current low value,
 - high pointer label - text showing with the current high value.

A simple slider is the same, except it doesn't have the high pointer value.

![slider combined label anatomy](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/slider-anatomy-combined-label.png)

There is also a special case where low and high pointer labels would normally overlap, and so instead, a single combined label is displayed.

### Bars

![slider bars anatomy](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/slider-anatomy-bars.png)

Normally a slider features two selection bars:
 - full bar - the gray element in background,
 - selection bar - the blue element in foreground, marking current selection.

For certain use cases, you may want to style the left and right side of full bar differently. If you specify `showOuterSelectionBars: true` in slider options, the following elements will also be displayed:
 - left outer selection bar - element in the foreground to the left of low pointer,
 - right outer selection bar - element in the foreground to the right of high pointer.

### Ticks

![slider ticks anatomy](https://raw.githubusercontent.com/angular-slider/ngx-slider/master/assets/slider-anatomy-ticks.png)

When using ticks, the slider features additional elements:
 - ticks - small circles on the slider bar,
 - tick value labels - showing values associated with ticks,
 - tick legend labels - showing additional legend for the ticks.

### Tooltips

Tooltips are associated with ticks and their labels (value or legend). The slider allows users to customise how to display tooltips. For more details, see [TOOLTIPS.md](TOOLTIPS.md).

## Overriding default style

Slider is normally styled using a bundled style sheet, but it's possible to override it.

As a starting point, it's good idea to have a look at the [SCSS source file of the bundled style sheet](https://github.com/angular-slider/ngx-slider/blob/master/src/ngx-slider/lib/slider.component.scss) to have an idea of how the CSS is structured by default.

The hierarchy slider elements and their CSS classes is:
 - `ngx-slider` class is applied to the `ngx-slider` element
    * `ngx-slider-pointer` class is applied to slider pointers:
       - `ngx-slider-pointer-min` is applied to low pointer
       - `ngx-slider-pointer-max` is applied to high pointer
    * `ngx-slider-bubble` class is applied to all labels:
       - `ngx-slider-floor` class is applied to floor label
       - `ngx-slider-ceil` class is applied to floor label
       - `ngx-slider-model-value` class is applied to low pointer label
       - `ngx-slider-model-high` class is applied to high pointer label
       - `ngx-slider-combined` class is appied to combined label
    * `ngx-slider-bar` class is applied to all bar elements:
       - no additional class is applied to full bar
       - `ngx-slider-selection` is applied to selection bar
       - `ngx-slider-left-out-selection` is applied to left outer selection bar
       - `ngx-slider-right-out-selection` is applied to right outer selection bar
    * `ngx-slider-tick` class is applied to each tick element:
       - `ngx-slider-tick-value` is applied to tick value label
       - `ngx-slider-tick-legend` is applied to tick legend label

### Example

Say we want to change the selection bar colour to yellow for a specific slider.

An easy way to achieve this is to first add a custom class to a container of the slider element:
```html
<div class="custom-slider">
  <ngx-slider [(value)]="minValue" [(highValue)]="maxValue" [options]="options"></ngx-slider>
</div>
```

Then apply the following stylesheet (using SCSS syntax):
```scss
.custom-slider {
  .ngx-slider {
    .ngx-slider-selection {
      background: rgb(255, 255, 0) !important;
    }
  }
}
```

Or, if you prefer plain CSS:
```css
.custom-slider .ngx-slider .ngx-slider-selection {
  background: rgb(255, 255, 0) !important;
}
```

Note that the above code is an example of a global stylesheet, applied across your app (`styles.css` or `styes.scss`). If you want to apply this stylesheet in a specific component of your app (`*.component.scss` or `*.component.css`), you will need to surround it with `::ng-deep {}` selector to overcome shadow DOM encapsulation:
```scss
::ng-deep {
  .custom-slider {
    .ngx-slider {
      .ngx-slider-selection {
        background: rgb(255, 255, 0) !important;
      }
    }
  }
}
```

For a complete example, see the slider with custom style demo on [official site](https://angular-slider.github.io/ngx-slider/demos#styled-slider).