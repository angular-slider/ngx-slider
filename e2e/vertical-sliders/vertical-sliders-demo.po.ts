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
    return this.getSliderSubElement(sliderNumber, 'ng5sliderfullbarelem');
  }

  getSliderSelectionBar(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5sliderselbarelem');
  }

  getSliderFloorLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5sliderflrlabelem');
  }

  getSliderCeilLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5sliderceillabelem');
  }

  getSliderLowPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5sliderminhelem');
  }

  getSliderLowPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5sliderminlabelem');
  }

  getSliderHighPointer(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5slidermaxhelem');
  }

  getSliderHighPointerLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5slidermaxlabelem');
  }

  getSliderCombinedLabel(sliderNumber: number): SliderSubElement {
    return this.getSliderSubElement(sliderNumber, 'ng5slidercmblabelem');
  }

  private getSliderSubElement(sliderNumber: number, subElementAttribute: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement(sliderNumber);
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span[${subElementAttribute}]`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
