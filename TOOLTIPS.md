# Tooltips

Prior to version 1.1, the library used to have a dependency on ng-bootstrap to support tooltips.

As of version 1.1, this dependency has been removed, and tooltips are rendered by default by using the standard HTML `title` attribute (e.g. `<div title="Some tooltip">Some content</div>`), but it's also possible to customise this behaviour by specifying a custom template.

When using a custom template, elements that would normally be rendered as `<div title=...>` tags, are instead rendered using the specified template. Inside the custom template, the user is free to choose any way of rendering the tooltips, including, but of course not limited to, using ng-bootstrap.

The syntax for specifying the custom template is the following:
```html
<ngx-slider [(value)]="value" [options]="options">
  <ng-template #tooltipTemplate let-tooltip="tooltip" let-placement="placement" let-content="content">
    <!-- TODO: provide tooltip around the content.
         {{tooltip}} will bind to the tooltip text
         {{placement}} will bind to the tooltip placement ('top', 'bottom', 'right', 'left') -->
    <div>{{content}}</div>
  </ng-template>
</ngx-slider>
```

For more concrete examples, please refer to tooltip samples on [official site](https://angular-slider.github.io/ngx-slider/demos#ticks-custom-tooltips-slider).