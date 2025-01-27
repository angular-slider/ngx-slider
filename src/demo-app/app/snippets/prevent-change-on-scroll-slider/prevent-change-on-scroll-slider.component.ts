import { Component, HostListener, EventEmitter } from '@angular/core';
import { Options } from '@local/ngx-slider';

@Component({
  selector: 'app-prevent-change-on-scroll-slider',
  templateUrl: './prevent-change-on-scroll-slider.component.html'
})
export class PreventChangeOnScrollSliderComponent {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  emitOnScroll: EventEmitter<void> = new EventEmitter<void>;

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: any): void {
    this.emitOnScroll.emit();
  }
}
