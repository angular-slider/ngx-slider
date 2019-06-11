import { browser, by, element, ElementFinder } from 'protractor';
import { SliderSubElement } from '../utils';

export class VerticalSlidersDemoPage {
  navigateTo(): void {
    browser.get(`/vertical-sliders?testMode=true`);
  }

  getSliderElement(sliderNumber: number): ElementFinder {
    return element(by.css(`.row .col-2:nth-of-type(${sliderNumber}) ng5-slider`));
  }

  getSliderFullBar(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-full-bar');
  }

  getSliderSelectionBar(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-selection-bar');
  }

  getSliderFloorLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-floor');
  }

  getSliderCeilLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-ceil');
  }

  getSliderLowPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-pointer-min');
  }

  getSliderLowPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-model-value');
  }

  getSliderHighPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-pointer-max');
  }

  getSliderHighPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-model-high');
  }

  getSliderCombinedLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5-slider-combined');
  }

  private getSliderSubElement(sliderNumber: number, subElementClass: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement(sliderNumber);
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.${subElementClass}`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
