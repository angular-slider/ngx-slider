import { AppPage } from './app.po';

describe('demo app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBe('ngx-slider');
  });
});
