# Known issues

## Slider is not refreshing when used in a dynamic component

If you use slider in a dynamic component (e.g. pop-up dialog shown on user action), then the slider may not be shown properly on first render. You may see the slider elements being stacked together like so:
![slider not refreshed](https://raw.githubusercontent.com/angular-slider/ng5-slider/master/assets/slider-not-refreshed.png)

This is a known problem which comes from the way DOM updates are published (or more precisely not published) as changes visible to Angular components.

The workaround is to use `manualRefresh` input to the slider, and trigger the manual refresh when the slider is shown for the first time.

Please refer to [manual refresh demo](https://angular-slider.github.io/ng5-slider/demos#manual-refresh-slider) for an example of how to use it.

## Rendering performance

When using multiple instances of slider on single page, the first page render will likely take a longer time to complete.

This is caused by the slider initialisation code, which waits for the first render of its elements before it can determine their bounds and then re-position them as necessary.

There is no easy way to solve this other than re-writing the rendering code. This is closely related to the problem with Angular Universal described below. However, if the use-case is simple enough, there is a workaround available which could help - see the discussion on [issue #45](https://github.com/angular-slider/ng5-slider/issues/45) for details.

## Compatibility with Angular Universal

The slider component is currently strictly tied to browser environment, because it positions its elements based on current geometry of its elements in browser window. This makes it incompatible with Angular Universal.

Unfortunately, there is no easy fix for this, other than re-writing all of the layouting code in the slider, and applying style changes through CSS. For more detailed explanation and discussion, please see [issue #66](https://github.com/angular-slider/ng5-slider/issues/66).

Therefore, for the present and near future, Angular Universal will not be supported.

