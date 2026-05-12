import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-slider-tooltip-wrapper',
  templateUrl: './tooltip-wrapper.component.html',
  styleUrls: ['./tooltip-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TooltipWrapperComponent {
  @Input()
  template: TemplateRef<any>;

  @Input()
  tooltip: string;

  @Input()
  placement: string;

  @Input()
  content: string;
}
