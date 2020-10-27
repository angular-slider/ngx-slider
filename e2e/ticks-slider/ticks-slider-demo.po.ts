import { by, ElementFinder } from 'protractor';

import { BaseSimpleSliderDemoPage } from '../base-simple-slider-demo.po';
import { SliderSubElement } from '../utils';

export class TicksSliderDemoPage extends BaseSimpleSliderDemoPage {
  getSliderTick(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(by.css(`span.ngx-slider-tick:nth-of-type(${sliderNumber})`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }

  getSliderTickValue(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(
      by.css(`span.ngx-slider-tick:nth-of-type(${sliderNumber}) .ngx-slider-tick-value`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }

  getSliderTickLegend(sliderNumber: number): SliderSubElement {
    const sliderElement: ElementFinder = this.getSliderElement();
    const sliderSubElement: ElementFinder = sliderElement.element(
      by.css(`span.ngx-slider-tick:nth-of-type(${sliderNumber}) .ngx-slider-tick-legend`));
    return new SliderSubElement(sliderElement, sliderSubElement);
  }
}
