const assert = require("assert");
export default class Page {
    constructor() {
        this.title = 'Sign In with BioBright';
    }
    open (path) {
        browser.url(path);
        browser.pause(3000);
        assert.strictEqual(browser.getTitle(), this.title);
    }
    verifyTextInPage(text) {
        const pageText = $('body').getText();
        const position = pageText.search(text);
        chai.expect(position).to.be.above(0);
      }
}