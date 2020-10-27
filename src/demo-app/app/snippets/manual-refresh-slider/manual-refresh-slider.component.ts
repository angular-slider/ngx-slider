import { Component, EventEmitter } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-manual-refresh-slider',
  templateUrl: './manual-refresh-slider.component.html'
})
export class ManualRefreshSliderComponent {
  // 2019-06-11 UPDATE: The use-case in this example is now resolved on newest browser version which support ResizeObserver API
  // (https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) - at this time it is Chrome >= 64 and Opera >= 51.
  // For other browsers, or older browser versions, the workaround with manualRefresh still applies.
  manualRefreshEnabled: boolean = true;
  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  isCollapsed: boolean = true;
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5,
    animate: false // animations don't play nicely with collapse
  };

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.manualRefreshEnabled) {
      // Bootstrap uses display CSS property to effect the collapse, so we need this to manually trigger a refresh
      this.manualRefresh.emit();
    }
  }
}
