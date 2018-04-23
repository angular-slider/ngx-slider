import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng2-slider',
  templateUrl: './ng2-slider.component.html',
  styleUrls: ['./ng2-slider.component.scss']
})
export class Ng2SliderComponent implements OnInit {
  barStyle: string = '';
  minPointerStyle: string = '';
  maxPointerStyle: string = '';
  ticks: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
