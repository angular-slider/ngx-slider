import { Directive, Input, NgModule } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[ngbTooltip]'})
export class NgbTooltipFakeDirective {
  @Input()
  ngbTooltip: string;
}

// tslint:disable-next-line:directive-selector
@Directive({selector: '[placement]'})
export class PlacementFakeDirective {
  @Input()
  placement: string;
}

@NgModule({
  imports: [],
  declarations: [
    NgbTooltipFakeDirective,
    PlacementFakeDirective
  ],
  exports: [
    NgbTooltipFakeDirective,
    PlacementFakeDirective
  ]
})
export class NgBootstrapFakesModule {}
