import { browser, by, element, ElementFinder } from 'protractor';
import { SliderSubElement } from './utils';

export class BaseRangeSliderDemoPage {
  navigateTo(demo: string): void {
    browser.get(`/${demo}?testMode=true`);
  }

  getSliderElement(): ElementFinder {
    return element(by.css('ng5-slider'));
  }

  getSliderFullBar(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-full-bar');
  }

  getSliderSelectionBar(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-selection-bar');
  }

  getSliderFloorLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-floor');
  }

  getSliderCeilLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-ceil');
  }

  getSliderLowPointer(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-pointer-min');
  }

  getSliderLowPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-model-value');
  }

  getSliderHighPointer(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-pointer-max');
  }

  getSliderHighPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-model-high');
  }

  getSliderCombinedLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5-slider-combined');
  }

  private getSliderSubElement(subElementClass: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.${subElementClass}`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
