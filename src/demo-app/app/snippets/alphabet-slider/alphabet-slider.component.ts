import { Component } from '@angular/core';
import { Options, LabelType, CustomStepDefinition } from '@local/ngx-slider';

@Component({
  selector: 'app-alphabet-slider',
  templateUrl: './alphabet-slider.component.html'
})
export class AlphabetSliderComponent {
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  value: number = this.letterToIndex('E');
  options: Options = {
    stepsArray: this.alphabet.split('').map((letter: string): CustomStepDefinition => {
      return { value: this.letterToIndex(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value);
    }
  };

  indexToLetter(index: number): string {
    return this.alphabet[index];
  }

  letterToIndex(letter: string): number {
    return this.alphabet.indexOf(letter);
  }
}
