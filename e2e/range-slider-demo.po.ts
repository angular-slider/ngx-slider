import { browser, by, element, promise, ElementFinder } from 'protractor';
import { ElementLocation, ElementSize, SliderSubElement } from './utils';

export class RangeSliderDemoPage {
  navigateTo(demo: string): void {
    browser.get(`/${demo}?testMode=true`);
  }

  getSliderElement(): ElementFinder {
    return element(by.css('ng5-slider'));
  }

  getSliderFullBar(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderfullbarelem');
  }

  getSliderSelectionBar(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderselbarelem');
  }

  getSliderFloorLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderflrlabelem');
  }

  getSliderCeilLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderceillabelem');
  }

  getSliderLowPointer(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderminhelem');
  }

  getSliderLowPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderminlabelem');
  }

  getSliderHighPointer(): SliderSubElement {
    return this.getSliderSubElement('ng5slidermaxhelem');
  }

  getSliderHighPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5slidermaxlabelem');
  }

  getSliderCombinedLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5slidercmblabelem');
  }

  private getSliderSubElement(subElementAttribute: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span[${subElementAttribute}]`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
