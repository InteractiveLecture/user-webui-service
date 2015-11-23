/* global describe, beforeEach, it, browser, expect */
'use strict';

var TutorialTextUploadPagePo = require('./tutorial-text-upload.po');

describe('Tutorial text upload page', function () {
  var tutorialTextUploadPage;

  beforeEach(function () {
    tutorialTextUploadPage = new TutorialTextUploadPagePo();
    browser.get('/#/tutorial-text-upload');
  });

  it('should say TutorialTextUploadCtrl', function () {
    expect(tutorialTextUploadPage.heading.getText()).toEqual('tutorialTextUpload');
    expect(tutorialTextUploadPage.text.getText()).toEqual('TutorialTextUploadCtrl');
  });
});
