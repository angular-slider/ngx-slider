import { browser, by, element, promise } from 'protractor';

export class AppPage {
  navigateTo(): void {
    browser.get('/');
  }

  getParagraphText(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }
}
