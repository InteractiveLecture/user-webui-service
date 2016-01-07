/* global describe, beforeEach, it, browser, expect */
'use strict';

var WorksheetPagePo = require('./worksheet.po');

describe('Worksheet page', function () {
  var worksheetPage;

  beforeEach(function () {
    worksheetPage = new WorksheetPagePo();
    browser.get('/#/worksheet');
  });

  it('should say WorksheetCtrl', function () {
    expect(worksheetPage.heading.getText()).toEqual('worksheet');
    expect(worksheetPage.text.getText()).toEqual('WorksheetCtrl');
  });
});
