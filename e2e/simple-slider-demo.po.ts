import { browser, by, element, promise, ElementFinder } from 'protractor';
import { ElementLocation, ElementSize, SliderSubElement } from './utils';

export class SimpleSliderDemoPage {
  navigateTo(demo: string): void {
    browser.get(`/${demo}?testMode=true`);
  }

  getSliderElement(): ElementFinder {
    return element(by.css('ng5-slider'));
  }

  getSliderBar(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderfullbarelem');
  }

  getSliderFloorLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderflrlabelem');
  }

  getSliderCeilLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderceillabelem');
  }

  getSliderPointer(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderminhelem');
  }

  getSliderPointerLabel(): SliderSubElement {
    return this.getSliderSubElement('ng5sliderminlabelem');
  }

  private getSliderSubElement(subElementAttribute: string): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span[${subElementAttribute}]`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
