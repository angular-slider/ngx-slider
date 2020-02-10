import { by, element, ElementFinder } from 'protractor';

import { BaseSimpleSliderDemoPage } from '../base-simple-slider-demo.po';

export class SimpleSliderDemoPage extends BaseSimpleSliderDemoPage {
  getValueInput(): ElementFinder {
    return element(by.css('input:nth-child(1)'));
  }
}
