/* global describe, beforeEach, it, browser, expect */
'use strict';

var ModuleEditPagePo = require('./module-edit.po');

describe('Module edit page', function () {
  var moduleEditPage;

  beforeEach(function () {
    moduleEditPage = new ModuleEditPagePo();
    browser.get('/#/module-edit');
  });

  it('should say ModuleEditCtrl', function () {
    expect(moduleEditPage.heading.getText()).toEqual('moduleEdit');
    expect(moduleEditPage.text.getText()).toEqual('ModuleEditCtrl');
  });
});
