import { browser, by, element, ElementFinder } from 'protractor';
import { SliderSubElement } from './utils';

export class BaseSimpleSliderDemoPage {
  navigateTo(demo: string): void {
    browser.get(`/${demo}?testMode=true`);
  }

  getSliderElement(): ElementFinder {
    return element(by.css('ngx-slider'));
  }

  getSliderFullBar(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-full-bar');
  }

  getSliderSelectionBar(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-selection-bar');
  }

  getSliderFloorLabel(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-floor');
  }

  getSliderCeilLabel(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-ceil');
  }

  getSliderPointer(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-pointer-min');
  }

  getSliderPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ngx-slider-model-value');
  }

  private getSliderSubElement(subElementClass: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.${subElementClass}`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
