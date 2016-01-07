/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditPagePo = require('./edit.po');

describe('Edit page', function () {
  var editPage;

  beforeEach(function () {
    editPage = new EditPagePo();
    browser.get('/#/edit');
  });

  it('should say EditCtrl', function () {
    expect(editPage.heading.getText()).toEqual('edit');
    expect(editPage.text.getText()).toEqual('EditCtrl');
  });
});
