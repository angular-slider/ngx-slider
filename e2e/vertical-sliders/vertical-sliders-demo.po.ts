import { browser, by, element, ElementFinder } from 'protractor';
import { SliderSubElement } from '../utils';

export class VerticalSlidersDemoPage {
  navigateTo(): void {
    browser.get(`/vertical-sliders?testMode=true`);
  }

  getSliderElement(sliderNumber: number): ElementFinder {
    return element(by.css(`.row .col-2:nth-of-type(${sliderNumber}) ngx-slider`));
  }

  getSliderFullBar(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-full-bar');
  }

  getSliderSelectionBar(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-selection-bar');
  }

  getSliderFloorLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-floor');
  }

  getSliderCeilLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-ceil');
  }

  getSliderLowPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-pointer-min');
  }

  getSliderLowPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-model-value');
  }

  getSliderHighPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-pointer-max');
  }

  getSliderHighPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-model-high');
  }

  getSliderCombinedLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ngx-slider-combined');
  }

  private getSliderSubElement(sliderNumber: number, subElementClass: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement(sliderNumber);
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.${subElementClass}`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
