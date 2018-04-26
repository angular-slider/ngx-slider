import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sliderValue: number = 200;
  sliderOptions = {
    floor: 0,
    ceil: 500
  };
}
