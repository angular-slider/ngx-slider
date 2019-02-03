import { by, element, ElementFinder } from 'protractor';

import { BaseRangeSliderDemoPage } from '../base-range-slider-demo.po';

export class ReactiveFormRangeSliderDemoPage extends BaseRangeSliderDemoPage {
  getLowValueTextElement(): ElementFinder {
    return element(by.css('p:nth-child(1)'));
  }

  getHighValueTextElement(): ElementFinder {
    return element(by.css('p:nth-child(2)'));
  }

  getFormResetButton(): ElementFinder {
    return element(by.css('button'));
  }
}
