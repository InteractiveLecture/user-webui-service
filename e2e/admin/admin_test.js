/* global describe, beforeEach, it, browser, expect */
'use strict';

var AdminPagePo = require('./admin.po');

describe('Admin page', function () {
  var adminPage;

  beforeEach(function () {
    adminPage = new AdminPagePo();
    browser.get('/#/admin');
  });

  it('should say AdminCtrl', function () {
    expect(adminPage.heading.getText()).toEqual('admin');
    expect(adminPage.text.getText()).toEqual('AdminCtrl');
  });
});
