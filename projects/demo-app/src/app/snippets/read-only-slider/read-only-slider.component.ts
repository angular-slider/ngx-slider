import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-read-only-slider',
  templateUrl: './read-only-slider.component.html'
})
export class ReadOnlySliderComponent {
  readOnly = true;
  value = 50;
  options: Options = {
    floor: 0,
    ceil: 100,
    readOnly: true
  };

  /* Due to the way Angular 2+ handles change detection, we have to create a new options object. */
  onChangeReadOnly(): void {
    this.options = Object.assign({}, this.options, {readOnly: this.readOnly});
  }
}
