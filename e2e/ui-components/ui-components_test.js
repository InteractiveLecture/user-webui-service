/* global describe, beforeEach, it, browser, expect */
'use strict';

var UiComponentsPagePo = require('./ui-components.po');

describe('Ui components page', function () {
  var uiComponentsPage;

  beforeEach(function () {
    uiComponentsPage = new UiComponentsPagePo();
    browser.get('/#/ui-components');
  });

  it('should say UiComponentsCtrl', function () {
    expect(uiComponentsPage.heading.getText()).toEqual('uiComponents');
    expect(uiComponentsPage.text.getText()).toEqual('UiComponentsCtrl');
  });
});
