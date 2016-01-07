/* global describe, beforeEach, it, browser, expect */
'use strict';

var OverviewPagePo = require('./overview.po');

describe('Overview page', function () {
  var overviewPage;

  beforeEach(function () {
    overviewPage = new OverviewPagePo();
    browser.get('/#/overview');
  });

  it('should say OverviewCtrl', function () {
    expect(overviewPage.heading.getText()).toEqual('overview');
    expect(overviewPage.text.getText()).toEqual('OverviewCtrl');
  });
});
