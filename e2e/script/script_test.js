/* global describe, beforeEach, it, browser, expect */
'use strict';

var ScriptPagePo = require('./script.po');

describe('Script page', function () {
  var scriptPage;

  beforeEach(function () {
    scriptPage = new ScriptPagePo();
    browser.get('/#/script');
  });

  it('should say ScriptCtrl', function () {
    expect(scriptPage.heading.getText()).toEqual('script');
    expect(scriptPage.text.getText()).toEqual('ScriptCtrl');
  });
});
