import { by, element, ElementFinder } from 'protractor';

import { SimpleSliderDemoPage } from '../simple-slider-demo.po';

export class ReactiveFormSimpleSliderDemoPage extends SimpleSliderDemoPage {
  getValueTextElement(): ElementFinder {
    return element(by.css('p:nth-child(1)'));
  }

  getFormResetButton(): ElementFinder {
    return element(by.css('button'));
  }
}
