import { by, ElementFinder } from 'protractor';

import { BaseSimpleSliderDemoPage } from '../base-simple-slider-demo.po';
import { SliderSubElement } from '../utils';

export class TicksSliderDemoPage extends BaseSimpleSliderDemoPage {
  getSliderTick(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.ng5-slider-tick:nth-of-type(${sliderNumber})`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }

  getSliderTickValue(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(
      by.css(`span.ng5-slider-tick:nth-of-type(${sliderNumber}) .ng5-slider-tick-value`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }

  getSliderTickLegend(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(
      by.css(`span.ng5-slider-tick:nth-of-type(${sliderNumber}) .ng5-slider-tick-legend`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
