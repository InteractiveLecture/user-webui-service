/* global describe, beforeEach, it, browser, expect */
'use strict';

var ModuleOverviewPagePo = require('./module-overview.po');

describe('Module overview page', function () {
  var moduleOverviewPage;

  beforeEach(function () {
    moduleOverviewPage = new ModuleOverviewPagePo();
    browser.get('/#/module-overview');
  });

  it('should say ModuleOverviewCtrl', function () {
    expect(moduleOverviewPage.heading.getText()).toEqual('moduleOverview');
    expect(moduleOverviewPage.text.getText()).toEqual('ModuleOverviewCtrl');
  });
});
