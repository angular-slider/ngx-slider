import { by, element, ElementFinder } from 'protractor';

import { BaseSimpleSliderDemoPage } from '../base-simple-slider-demo.po';

export class ReactiveFormSimpleSliderDemoPage extends BaseSimpleSliderDemoPage {
  getValueTextElement(): ElementFinder {
    return element(by.css('p:nth-child(1)'));
  }

  getFormResetButton(): ElementFinder {
    return element(by.css('button'));
  }
}
