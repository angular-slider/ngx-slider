import { Component, EventEmitter } from '@angular/core';
import { Options } from '@local/ng5-slider';

@Component({
  selector: 'app-manual-refresh-slider',
  templateUrl: './manual-refresh-slider.component.html'
})
export class ManualRefreshSliderComponent {
  manualRefreshEnabled: boolean = true;
  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  isCollapsed: boolean = true;
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.manualRefreshEnabled) {
      // Bootstrap uses display CSS property to effect the collapse, so we need this to manually trigger a refresh
      this.manualRefresh.emit();
    }
  }
}
