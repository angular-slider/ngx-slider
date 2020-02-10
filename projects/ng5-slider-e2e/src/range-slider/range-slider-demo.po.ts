import { by, element, ElementFinder } from 'protractor';

import { BaseRangeSliderDemoPage } from '../base-range-slider-demo.po';

export class RangeSliderDemoPage extends BaseRangeSliderDemoPage {
  getLowValueInput(): ElementFinder {
    return element(by.css('p:nth-child(1) input'));
  }

  getHighValueInput(): ElementFinder {
    return element(by.css('p:nth-child(2) input'));
  }
}
