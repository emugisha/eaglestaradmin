import { EaglestaradminPage } from './app.po';

describe('eaglestaradmin App', function() {
  let page: EaglestaradminPage;

  beforeEach(() => {
    page = new EaglestaradminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
